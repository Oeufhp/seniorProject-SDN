#!/usr/bin/python

from mininet.net import Mininet
from mininet.node import Node,Host,OVSSwitch,Controller
from mininet.link import Intf,TCLink
from mininet.topo import Topo
from mininet.log import setLogLevel, info

def myNetwork():
	"Create netwirk without topology."       
	
    info('*** Creating Nodes ***\n')
	s1 = OVSSwitch('s1',inNamespace=False)
	h1 = Host('h1')
	h2 = Host('h2')
	c0 = RemoteController('c0',ip="",port=6633)
	
	info("*** Creating links ***\n")
	Link(h1,s1)
	Link(h2,s1)

	info('*** Adding physical Intf to switch ***\n')
	Intf('eth1', node=s1)
	Intf('eth2', node=s1)
	Intf('eth3', node=s1)

	info("*** Configuring hosts ***\n")
	h1.setIP('192.168.20.210/24')
	h2.setIP('192.168.20.211/24')
	info( str( h1 ) + '\n' )
    info( str( h2 ) + '\n' )


	info('*** Starting network using OVS ***\n')
	s1.cmd('ovs-vsctl del-br br0')
	s1.cmd('ovs-vsctl add-br br0')
    s1.cmd('ovs-vsctl add-port br0 eth1')
	s1.cmd('ifconfig eth1 0.0.0.0')
	ip=""
	s1.cmd('ifconfig br0 '+double(%s) %ip)
	s1.cmd('ifconfig eth1 down')
	s1.cmd('ifconfig eth1 up')
	s1.cmd('ifconfig br0 down')
	s1.cmd('ifconfig br0 up')

	info('*** Adding default flows ***\n')
	s1.cmd('ovs-ofctl add-flow s1 priority=500,dl_type=0x800,nw_src=192.168.20.0/24,nw_dst=192.168.20.0/24,actions=normal')


if __name__ == '__main__':
    setLogLevel( 'info' )
	Mininet.init()
    myNetwork()    

