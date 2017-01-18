#!/bin/bash

#set ip for all of interface in the machine
# sudo ./staticIP.sh


# if ovs has bridge --> delete bridge
sudo ovs-vsctl --if-exists del-br br94 
sudo ovs-vsctl --may-exist add-br br94 

# add physical interface to bridge
sudo ovs-vsctl --may-exist add-port br94 eth1 
sudo ovs-vsctl --may-exist add-port br94 eth2
sudo ovs-vsctl --may-exist add-port br94 eth3 

#config ip of interface to bridge 
#ip=""
#sudo ifconfig eth1 0.0.0.0
#ip=$(ip addr show dev eth0 | grep "inet " | awk '{ print $2 }')
#sudo ifconfig br94 192.168.20.204 255.255.255.0
#sudo ifconfig eth1 down
#sudo ifconfig eth1 up
#sudo ifconfig br94 down
#sudo ifconfig br94 up

#set controller to ovs
#sudo ovs-vsctl set-controller br0 tcp:192.168.20.200:6633

#add rules to switch
#sudo ovs-ofctl add-flow "br94" in_port=3,actions:output=2
#sudo ovs-ofctl add-flow "br94" in_port=2,actions:output=3


#check configuration
sudo ovs-vsctl show

#check flows that has recently added
#sudo ovs-ofctl dump-flows br94

