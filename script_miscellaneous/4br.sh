#!/bin/bash

echo "---------- Adding OVS bridge ----------"
#create bridge s1
sudo ovs-vsctl --if-exists del-br s1
sudo ovs-vsctl --may-exist add-br s1

#create bridge s2
sudo ovs-vsctl --if-exists del-br s2
sudo ovs-vsctl --may-exist add-br s2

#create bridge s3
sudo ovs-vsctl --if-exists del-br s3
sudo ovs-vsctl --may-exist add-br s3

#create bridge s4
sudo ovs-vsctl --if-exists del-br s4
sudo ovs-vsctl --may-exist add-br s4

#set datapath id to bridge s1
sudo ovs-vsctl set bridge s1 other-config:datapath-id=1111111111111101

#set datapath id to bridge s2
sudo ovs-vsctl set bridge s2 other-config:datapath-id=1111111111111102

#set datapath id to bridge s3
sudo ovs-vsctl set bridge s3 other-config:datapath-id=1111111111111103

#set datapath id to bridge s4
sudo ovs-vsctl set bridge s4 other-config:datapath-id=1111111111111104

echo "---------- Adding OVS bridge complete ----------"

#add vlan port and connect s1 and s2
sudo ovs-vsctl add-port s1 s1_s2
sudo ovs-vsctl set Interface s1_s2 type=patch
sudo ovs-vsctl set Interface s1_s2 options:peer=s2_s1

# sudo ovs-vsctl set port s1_s2 trunks=10,20,30

#add vlan and connect s2 and s1
sudo ovs-vsctl add-port s2 s2_s1
sudo ovs-vsctl set Interface s2_s1 type=patch
sudo ovs-vsctl set Interface s2_s1 options:peer=s1_s2

#add vlan port and connect s1 and s3
sudo ovs-vsctl add-port s1 s1_s3
sudo ovs-vsctl set Interface s1_s3 type=patch
sudo ovs-vsctl set Interface s1_s3 options:peer=s3_s1

#add vlan and connect s3 and s1
sudo ovs-vsctl add-port s3 s3_s1
sudo ovs-vsctl set Interface s3_s1 type=patch
sudo ovs-vsctl set Interface s3_s1 options:peer=s1_s3

#add vlan port and connect s1 and s4
sudo ovs-vsctl add-port s1 s1_s4
sudo ovs-vsctl set Interface s1_s4 type=patch
sudo ovs-vsctl set Interface s1_s4 options:peer=s4_s1

#add vlan and connect s4 and s1
sudo ovs-vsctl add-port s4 s4_s1
sudo ovs-vsctl set Interface s4_s1 type=patch
sudo ovs-vsctl set Interface s4_s1 options:peer=s1_s4

#add vlan and connect s2 and s3
sudo ovs-vsctl add-port s2 s2_s3
sudo ovs-vsctl set Interface s2_s3 type=patch
sudo ovs-vsctl set Interface s2_s3 options:peer=s3_s2

#add vlan and connect s3 and s2
sudo ovs-vsctl add-port s3 s3_s2
sudo ovs-vsctl set Interface s3_s2 type=patch
sudo ovs-vsctl set Interface s3_s2 options:peer=s2_s3


#add vlan and connect s3 and s4
sudo ovs-vsctl add-port s3 s3_s4
sudo ovs-vsctl set Interface s3_s4 type=patch
sudo ovs-vsctl set Interface s3_s4 options:peer=s4_s3

#add vlan and connect s4 and s3
sudo ovs-vsctl add-port s4 s4_s3
sudo ovs-vsctl set Interface s4_s3 type=patch
sudo ovs-vsctl set Interface s4_s3 options:peer=s4_s3


#set openflow version to all of bridge
sudo ovs-vsctl set bridge s1 protocols=OpenFlow13
sudo ovs-vsctl set bridge s2 protocols=OpenFlow13
sudo ovs-vsctl set bridge s3 protocols=OpenFlow13
sudo ovs-vsctl set bridge s4 protocols=OpenFlow13

#wait for user input
echo -n "Enter IP address of SDN controller: "
read ip

#set controller to ovs
sudo ovs-vsctl set-controller s1 tcp:$ip:6633
sudo ovs-vsctl set-controller s2 tcp:$ip:6633
sudo ovs-vsctl set-controller s3 tcp:$ip:6633
sudo ovs-vsctl set-controller s4 tcp:$ip:6633


