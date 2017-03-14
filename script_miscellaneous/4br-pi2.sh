#!/bin/bash

echo "---------- Adding OVS bridge ----------"
#create bridge s5
sudo ovs-vsctl --if-exists del-br s5
sudo ovs-vsctl --may-exist add-br s5

#create bridge s6
sudo ovs-vsctl --if-exists del-br s6
sudo ovs-vsctl --may-exist add-br s6

#create bridge s7
sudo ovs-vsctl --if-exists del-br s7
sudo ovs-vsctl --may-exist add-br s7

#create bridge s8
sudo ovs-vsctl --if-exists del-br s8
sudo ovs-vsctl --may-exist add-br s8

#set datapath id to bridge s5
sudo ovs-vsctl set bridge s5 other-config:datapath-id=1111111111111105

#set datapath id to bridge s6
sudo ovs-vsctl set bridge s6 other-config:datapath-id=1111111111111106

#set datapath id to bridge s7
sudo ovs-vsctl set bridge s7 other-config:datapath-id=1111111111111107

#set datapath id to bridge s8
sudo ovs-vsctl set bridge s8 other-config:datapath-id=1111111111111108

echo "---------- Adding OVS bridge complete ----------"

#add vlan port and connect s5 and s6
sudo ovs-vsctl add-port s5 s5_s6
sudo ovs-vsctl set Interface s5_s6 type=patch
sudo ovs-vsctl set Interface s5_s6 options:peer=s6_s5

#add vlan and connect s6 and s5
sudo ovs-vsctl add-port s6 s6_s5
sudo ovs-vsctl set Interface s6_s5 type=patch
sudo ovs-vsctl set Interface s6_s5 options:peer=s5_s6

#add vlan port and connect s5 and s7
sudo ovs-vsctl add-port s5 s5_s7
sudo ovs-vsctl set Interface s5_s7 type=patch
sudo ovs-vsctl set Interface s5_s7 options:peer=s7_s5

#add vlan and connect s7 and s5
sudo ovs-vsctl add-port s7 s7_s5
sudo ovs-vsctl set Interface s7_s5 type=patch
sudo ovs-vsctl set Interface s7_s5 options:peer=s5_s7

#add vlan port and connect s5 and s8
sudo ovs-vsctl add-port s5 s5_s8
sudo ovs-vsctl set Interface s5_s8 type=patch
sudo ovs-vsctl set Interface s5_s8 options:peer=s8_s5

#add vlan and connect s8 and s5
sudo ovs-vsctl add-port s8 s8_s5
sudo ovs-vsctl set Interface s8_s5 type=patch
sudo ovs-vsctl set Interface s8_s5 options:peer=s5_s8

#add vlan and connect s6 and s7
sudo ovs-vsctl add-port s6 s6_s7
sudo ovs-vsctl set Interface s6_s7 type=patch
sudo ovs-vsctl set Interface s6_s7 options:peer=s7_s6

#add vlan and connect s7 and s6
sudo ovs-vsctl add-port s7 s7_s6
sudo ovs-vsctl set Interface s7_s6 type=patch
sudo ovs-vsctl set Interface s7_s6 options:peer=s6_s7


#add vlan and connect s7 and s8
sudo ovs-vsctl add-port s7 s7_s8
sudo ovs-vsctl set Interface s7_s8 type=patch
sudo ovs-vsctl set Interface s7_s8 options:peer=s8_s7

#add vlan and connect s8 and s7
sudo ovs-vsctl add-port s8 s8_s7
sudo ovs-vsctl set Interface s8_s7 type=patch
sudo ovs-vsctl set Interface s8_s7 options:peer=s7_s8


#link two domains
sudo ovs-vsctl add-port s5 eth1
sudo ovs-vsctl add-port s7 eth2

#set openflow version to all of bridge
sudo ovs-vsctl set bridge s5 protocols=OpenFlow13
sudo ovs-vsctl set bridge s6 protocols=OpenFlow13
sudo ovs-vsctl set bridge s7 protocols=OpenFlow13
sudo ovs-vsctl set bridge s8 protocols=OpenFlow13

#wait for user input
echo -n "Enter IP address of SDN controller: "
read ip

#set controller to ovs
sudo ovs-vsctl set-controller s5 tcp:$ip:6633
sudo ovs-vsctl set-controller s6 tcp:$ip:6633
sudo ovs-vsctl set-controller s7 tcp:$ip:6633
sudo ovs-vsctl set-controller s8 tcp:$ip:6633


