#!/bin/bash

#set ip for all of interface in the machine
./staticIP.sh

sudo bash
# if ovs has bridge --> delete bridge
ovs-vsctl del-br br0
ovs-vsctl add-br br0

# add physical interface to bridge
ovs-vsctl add-port br0 eth1

#config ip of interface to bridge 
ip=''
ifconfig eth1 0.0.0.0
ip=$(ip addr show dev eth0 | grep "inet " | awk '{ print $2 }')
ifconfig br0 $ip 255.255.255.0

#add rules to switch




