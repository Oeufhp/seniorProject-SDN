#!/bin/bash

echo "---------- Adding OVS bridge ------"
#create bridge s1
sudo ovs-vsctl --if-exists del-br s1
sudo ovs-vsctl --may-exist add-br s1

#map bridge s1 to physical port
sudo ovs-vsctl add-port s1 eth3
sudo ifconfig eth3 down
sudo ifconfig eth3 up
sudo ifconfig s1 down
sudo ifconfig s1 up

#set datapath id to bridge s1
sudo ovs-vsctl set bridge s1 other-config:datapath-id=1111111111111101

#add vlan port and connect s1 and s2
sudo ovs-vsctl add-port s1 s1_s2
sudo ovs-vsctl set Interface s1_s2 type=patch
sudo ovs-vsctl set Interface s1_s2 options:peer=s2_s1

#create bridge s2
sudo ovs-vsctl --if-exists del-br s2
sudo ovs-vsctl --may-exist add-br s2

sudo ifconfig s2 down
sudo ifconfig s2 up

#set datapath id to bridge s2
sudo ovs-vsctl set bridge s2 other-config:datapath-id=1111111111111102

#add vlan and connect s2 and s1
sudo ovs-vsctl add-port s2 s2_s1
sudo ovs-vsctl set Interface s2_s1 type=patch
sudo ovs-vsctl set Interface s2_s1 options:peer=s1_s2

#add vlan and connect s2 and s3
sudo ovs-vsctl add-port s2 s2_s3
sudo ovs-vsctl set Interface s2_s3 type=patch
sudo ovs-vsctl set Interface s2_s3 options:peer=s3_s2

#create bridge s3
sudo ovs-vsctl --if-exists del-br s3
sudo ovs-vsctl --may-exist add-br s3

#map bridge s3 to physical port
sudo ovs-vsctl add-port s3 eth4
sudo ifconfig eth4 down
sudo ifconfig eth4 up
sudo ifconfig s3 down
sudo ifconfig s3 up

#set datapath id to bridge s3
sudo ovs-vsctl set bridge s3 other-config:datapath-id=1111111111111103

#add vlan and connect s3 and s2
sudo ovs-vsctl add-port s3 s3_s2
sudo ovs-vsctl set Interface s3_s2 type=patch
sudo ovs-vsctl set Interface s3_s2 options:peer=s2_s3




