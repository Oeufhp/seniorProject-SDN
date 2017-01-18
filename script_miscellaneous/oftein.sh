#!/bin/bash
#ODL https://nexus.opendaylight.org/content/repositories/opendaylight.release/org/opendaylight/integration/distributions-virtualization/0.1.1/distributions-virtualization-0.1.1-osgipackage.zip
# Copyright 2015 SmartX Collaboration (GIST NetCS). All rights reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#
# Name			: smartx_bstar_installation.sh
# Description	: Script for installing nad Configuring OpenStack and SDN Open vSwitch Bridges 
#
# Created by    : TEIN_GIST@nm.gist.ac.kr
# Version       : 0.1
# Last Update	: June, 2015
#

# Specific Parameter

SITE=TEST
PHY_EXT=eth5
BR1_DPID=1111111111111101
BR2_DPID=1111111111111102
BRCAP_DPID=3333333333333301
DP_IF=eth5
DP_GW=61.252.52.1
HUB=GIST

# Copy the source of OpenStack through DevStack for Juno Stable Release

start=$(date +"%s")
echo Installation Start at `date +"%r"`


echo "Copying source code from DevStack GIT Repository"
sleep 2

cd /opt
apt-get install git

# Check existing installation directory

DEVSTACK=`ls -la | grep devstack`
   
if [ "${DEVSTACK:-null}" = null ]; then
	echo "No existing DevStack Installation"
	git clone https://github.com/openstack-dev/devstack.git -b stable/juno
else
	echo "DevStack Installation exist.. Update git information"
	git clone https://github.com/openstack-dev/devstack.git -b stable/juno temp
	mv temp/.git devstack/.git
	rm -rf temp
fi

echo "Copying OpenStack configuration from NetCS server"
sleep 2

scp netcs@103.22.221.53:SmartX-BStar/$SITE"_OpenStack_Local_Conf.txt" devstack/local.conf
scp netcs@103.22.221.53:SmartX-BStar/dnsmasq-neutron.conf devstack/dnsmasq-neutron.conf

echo "Creating Stack User and changing ownership"
sleep 2

devstack/tools/create-stack-user.sh
chown -R stack:stack devstack/
cd devstack

echo "Installing OpenStack using DevStack"
sleep 3
su -l stack -c 'cd /opt/devstack/ ; ./stack.sh'
current=`date +"%r"` 
echo "Current time is" $current
sleep 10

echo "Change the default configuration"
sleep 2

# Change configuration of NOVA Compute

su -l stack -c "sed -i 's/vif_plugging_timeout = 300/vif_plugging_timeout = 0/g' /etc/nova/nova.conf"
su -l stack -c "sed -i 's/vif_plugging_is_fatal = True/vif_plugging_is_fatal = False/g' /etc/nova/nova.conf"

# Change NEUTRON ML2 PLUGIN configuration

su -l stack -c "sed -i 's/firewall_driver/#firewall_driver/g' /etc/neutron/plugins/ml2/ml2_conf.ini"
iptables -F

echo "You need to Restart Nova Compute (n-cpu) and Neutron Service (q-svc) manually !!!"
echo "Please use command : ./rejoin-stack.sh"
echo "If failed because of privilege of the terminal, change owner terminal using command:"
echo "sudo chown stack:stack <terminal_name>"
echo "Then use Crtl+a+<service_numbber> , n-cpu=9, q-svc=4"
echo "Stop with Ctrl+C, and Run again by using UP arrow and ENTER."
echo ""

while [[ "$RESTART" != "Yes" && "$RESTART" != "No" ]]; do
	echo -n "Restart is done ? [Yes] or [No] :  "
		read RESTART
		done
										
if [ $RESTART = "Yes" ]; then
	echo "Continue to Configuring SDN Switches"
						
elif [ $RESTART = "No" ]; then
	echo "Stop the configuration."
	exit 1
fi
 


# ADDING THE BRIDGE (WITH BR1 AND BR2) - COMMON
# =============================================

echo "Configuring SDN Open vSwitch Bridges common configuration"
sleep 2

# use super user (root) and add phyical interface for OpenStack BR external

echo "Adding interface for bridge external"
sleep 2
ovs-vsctl add-port br-ex $PHY_EXT


echo "Adding SDN bridge and patch ports"
sleep 2


############
#To Configure brvlan to connect with br-int
ovs-vsctl add-port brvlan vlan_br-int
ovs-vsctl set Interface vlan_br-int type=patch
ovs-vsctl set Interface vlan_br-int options:peer=br-int_vlan
#To configure br-int to connect with brvlan
ovs-vsctl add-port br-int br-int_vlan
ovs-vsctl set Interface br-int_vlan type=patch
ovs-vsctl set Interface br-int_vlan options:peer=vlan_br-int



# Add patch port in brvlan
ovs-vsctl add-br brvlan


ovs-vsctl add-port brvlan vlan_br1
ovs-vsctl set Interface vlan_br1 type=patch
ovs-vsctl set Interface vlan_br1 options:peer=br1_vlan

# Add patch port in bridge br1

ovs-vsctl add-br br1
ovs-vsctl add-port br1 br1_vlan
ovs-vsctl set Interface br1_vlan type=patch
ovs-vsctl set Interface br1_vlan options:peer=vlan_br1

ovs-vsctl add-port br1 br1_br2
ovs-vsctl set Interface br1_br2 type=patch
ovs-vsctl set Interface br1_br2 options:peer=br2_br1

# Add patch port in bridge br2

ovs-vsctl add-br br2

ovs-vsctl add-port br2 br2_br1
ovs-vsctl set Interface br2_br1 type=patch
ovs-vsctl set Interface br2_br1 options:peer=br1_br2

ovs-vsctl add-port br2 br2_cap
ovs-vsctl set Interface br2_cap type=patch
ovs-vsctl set Interface br2_cap options:peer=brcap_br2

# Add patch port in bridge brcap

ovs-vsctl add-br brcap 
ovs-vsctl add-port brcap brcap_br2
ovs-vsctl set Interface brcap_br2 type=patch
ovs-vsctl set Interface brcap_br2 options:peer=br2_cap

ovs-vsctl add-port brcap eth1

# SET OVERLAY VXLAN PORTS TO MYREN
# =================================

echo "Configuring Route and Overlay Network"
sleep 2

if [ $HUB = "GIST" ]; then
	echo "Route and Overlay Network to GIST site"

	# Add Route
	route add -net 61.252.52.0/24 gw $DP_GW dev $DP_IF

	# Add VXLAN port 
	ovs-vsctl add-port brcap ovs_vxlan_GIST
	ovs-vsctl set Interface ovs_vxlan_GIST type=vxlan
	ovs-vsctl set Interface ovs_vxlan_GIST options:remote_ip=61.252.52.11

	echo "Setting the Datapath ID and Controller Information"
	sleep 2

												
elif [ $HUB = "MYREN" ]; then
	echo "Route and Overlay Network to MYREN site"
	
	# Add Route
	route add -host 103.26.47.229/32 gw $DP_GW dev $DP_IF

	# Add VXLAN port 
	ovs-vsctl add-port brcap ovs_vxlan_MYREN
	ovs-vsctl set Interface ovs_vxlan_MYREN type=vxlan
	ovs-vsctl set Interface ovs_vxlan_MYREN options:remote_ip=103.26.47.229

	echo "Setting the Datapath ID and Controller Information"
	sleep 2
	
fi


# SET DATAPATH ID AND CONTROLLER WITH FLOWVISOR
# =============================================

# Set datapath ID


BR1_DPID=1111111111111101
BR2_DPID=1111111111111102
BRCAP_DPID=3333333333333301
ovs-vsctl set bridge br1 other-config:datapath-id=$BR1_DPID
ovs-vsctl set bridge br2 other-config:datapath-id=$BR2_DPID
ovs-vsctl set bridge brcap other-config:datapath-id=$BRCAP_DPID


ovs-vsctl set bridge br1 other-config:datapath-id=1111111111111101
ovs-vsctl set bridge br2 other-config:datapath-id=1111111111111102
ovs-vsctl set bridge brcap other-config:datapath-id=3333333333333301



ovs-vsctl set-controller br1 tcp:103.22.221.52:6633
ovs-vsctl set-controller br2 tcp:103.22.221.52:6633
ovs-vsctl set-controller brcap tcp:103.22.221.152:6633

ovs-vsctl set-controller br1 tcp:192.168.9.201:6633
ovs-vsctl set-controller br2 tcp:192.168.9.201:6633
ovs-vsctl set-controller brcap tcp:192.168.9.211:6633

# Calculate the installation time duration

stop=$(date +"%s")
echo Installation Finish at `date +"%r"`
diff=$(($stop-$start))
echo "$(($diff / 3600)) hours $(($diff / 60)) minutes and $(($diff % 60)) seconds elapsed."
