#!/bin/bash

#delete bridge if exists
sudo ovs-vsctl --if-exists del-br br0
sudo ovs-vsctl --may-exist add-br br0

sudo ovs-vsctl --may-exist add-port br0 eth1
 
sudo ifconfig eth1 0.0.0.0
sudo ifconfig br0 192.168.20.204 netmask 255.255.255.0
sudo ifconfig eth1 down
sudo ifconfig eth1 up
sudo ifconfig br0 down
sudo ifconfig br0 up


