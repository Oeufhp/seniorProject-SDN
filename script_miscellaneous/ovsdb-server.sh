#!/bin/bash

#load ovs kernel module

modprobe openvswitch

 
ovsdb-server --remote=punix:/usr/local/var/run/openvswitch/db.sock \
                     --remote=db:Open_vSwitch,Open_vSwitch,manager_options \
                     --private-key=db:Open_vSwitch,SSL,private_key \
                     --certificate=db:Open_vSwitch,SSL,certificate \
                     --bootstrap-ca-cert=db:Open_vSwitch,SSL,ca_cert \
                     --pidfile --detach
ovs-vsctl --no-wait init
ovs-vswitchd --pidfile --detach

#create virtual topology for show in opendaylight
#mn --topo=tree,3 --mac --switch=ovsk --controller=remote,ip=x.x.x.x,port=6633
