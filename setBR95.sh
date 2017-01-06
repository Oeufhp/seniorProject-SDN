#!/bin/bash

#set ip for all of interface in the machine
# sudo ./staticIP.sh


# if ovs has bridge --> delete bridge
sudo ovs-vsctl --if-exists del-br br95 
sudo ovs-vsctl --may-exist add-br br95 

# add physical interface to bridge
sudo ovs-vsctl --may-exist add-port br95 eth1 
sudo ovs-vsctl --may-exist add-port br95 eth2
sudo ovs-vsctl --may-exist add-port br95 eth3 

#config ip of interface to bridge 
#ip=""
sudo ifconfig eth1 0.0.0.0
#ip=$(ip addr show dev eth0 | grep "inet " | awk '{ print $2 }')
sudo ifconfig br95 192.168.40.205 255.255.255.0
sudo ifconfig eth1 down
sudo ifconfig eth1 up
sudo ifconfig br95 down
sudo ifconfig br95 up

#set controller to ovs
sudo ovs-vsctl set-controller br95 tcp:192.168.40.200:6653

#add rules to switch
#sudo ovs-ofctl add-flow "br95" in_port=1,actions:output=2
#sudo ovs-ofctl add-flow "br95" in_port=2,actions:output=1
#sudo ovs-ofctl add-flow br0 priority=50000,dl_type=0x800,nw_src=192.168.30.0/24,nw_dst=192.168.40.0/24,actions=normal
#sudo ovs-ofctl add-flow br0 

#check configuration
sudo ovs-vsctl show

#check flows that has recently added
#sudo ovs-ofctl dump-flows br95


