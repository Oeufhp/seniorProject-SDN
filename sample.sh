#!/bin/bash

#set ip for all of interface in the machine
# sudo ./staticIP.sh


# if ovs has bridge --> delete bridge
sudo ovs-vsctl del-br br0 
sudo ovs-vsctl add-br br0 

# add physical interface to bridge
sudo ovs-vsctl add-port br0 eth1 &&

#config ip of interface to bridge 
ip=''
sudo ifconfig eth1 0.0.0.0
ip=$(ip addr show dev eth0 | grep "inet " | awk '{ print $2 }')
sudo ifconfig br0 $ip 255.255.255.0

#set controller to ovs
sudo ovs-vsctl set-controller br0 tcp:192.168.20.200:6633

#check configuration
sudo ovs-vsctl show

#add rules to switch




