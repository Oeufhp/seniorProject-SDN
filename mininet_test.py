#!/usr/bin/env python

import re
import sys
from minient.cli import CLI
from mininet.net import Mininet
from mininet.node import Node,Host,OVSSwitch,RemoteController
from mininet.link import Intf,Link
from mininet.topo import Topo
from mininet.log import setLogLevel, info, error
from mininet.util import quietRun

def checkIntf(intf):
	"Make sure intf exists and is not configured."
    config = quietRun( 'ifconfig %s 2>/dev/null' % intf, shell=True )
    if not config:
        error( 'Error:', intf, 'does not exist!\n' )
        exit( 1 )
    ips = re.findall( r'\d+\.\d+\.\d+\.\d+', config )
    if ips:
        error( 'Error:', intf, 'has an IP address,'
               'and is probably in use!\n' )
        exit( 1 )

def myNetwork():     

	net=Mininet(topo=None,build=False)
	info("*** Creating Nodes ***\n")
	s1 = net.addSwitch('s1',inNamespace=False)
	h1 = net.addHost('h1')
	h2 = net.addHost('h2')
	c0 = net.addController('c0',ip="127.0.0.1",port=6633)
	
	info("*** Creating links ***\n")
	net.addLink(h1,s1)
	net.addLink(h2,s1)

	# try to get hw intf from the command line; by default, use eth1
    intfName = sys.argv[ 1 ] if len( sys.argv ) > 1 else 'eth1'
    info( '*** Connecting to hw intf: %s' % intfName )

	info( '*** Checking', intfName, '\n' )
    checkIntf( intfName )

	info("*** Adding physical interface to switch ***\n")
	info('*** Adding physical interface',intfName,'to switch',s1.name,'\n')
	_intf(intfName,node=s1)

	info("*** Configuring hosts ***\n")
	h1.setIP('192.168.20.210/24')
	h2.setIP('192.168.20.211/24')
	# info(str( h1 ))
    # info(str( h2 ))


	info("*** Starting network using OVS ***\n")
	net.start()
	s1.cmd('ovs-vsctl del-br br0')
	s1.cmd('ovs-vsctl add-br br0')
    # s1.cmd('ovs-vsctl add-port br0 eth1')
	s1.cmd('ifconfig eth1 0.0.0.0')
	s1.cmd('ifconfig br0 192.168.20.204 255.255.255.0')
	s1.cmd('ifconfig eth1 down')
	s1.cmd('ifconfig eth1 up')
	s1.cmd('ifconfig br0 down')
	s1.cmd('ifconfig br0 up')
	CLI(net)


	info("*** Adding default flows ***\n")
	s1.cmd('ovs-ofctl add-flow s1 priority=500,dl_type=0x800,nw_src=192.168.20.0/24,nw_dst=192.168.20.0/24,actions=normal')

	net.stop()

if __name__ == '__main__':
	setLogLevel( 'info' )

	myNetwork()    

