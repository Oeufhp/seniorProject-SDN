#!/bin/bash

#set ip for all of interface in the machine
# sudo ./staticIP.sh

#ask for bridge name
echo -n "OVS bridge's name: "
read br

# if ovs has bridge --> delete bridge
sudo ovs-vsctl --if-exists del-br $br 
sudo ovs-vsctl --may-exist add-br $br 

#set openflow protocol version for bridge
sudo ovs-vsctl set bridge $br protocols=OpenFlow13

#wait for user input
echo -n "Enter IP address of SDN controller: "
read ip

#set controller to ovs
sudo ovs-vsctl set-controller $br tcp:$ip:6633

# add physical interface to bridge
sudo ovs-vsctl --may-exist add-port $br eth1 
sudo ovs-vsctl --may-exist add-port $br eth2
# sudo ovs-vsctl --may-exist add-port br94 eth3 

#add rules to switch
#sudo ovs-ofctl add-flow "br94" in_port=3,actions:output=2
#sudo ovs-ofctl add-flow "br94" in_port=2,actions:output=3


#check configuration
# sudo ovs-vsctl show

#check flows that has recently added
#sudo ovs-ofctl -O OpenFlow13 dump-flows $br


