#!/usr/bin/python

from mininet.net import Mininet
from mininet.node import Controller
from mininet.node import RemoteController
from mininet.cli import CLI
from mininet.link import Intf
from mininet.log import setLogLevel, info

def myNetwork():

    net = Mininet( topo=None,build=False,controller=lambda c0:RemoteController(c0,ip='192.168.10.204',port=6633))

    info( '*** Adding controller\n' )
    # net.addController(name='c0')

    info( '*** Add switches\n')
    s1 = net.addSwitch('s1')
    Intf( 'eth2', node=s1 )
    Intf( 'eth3', node=s1 )

    info( '*** Add hosts\n')
    #h1 = net.addHost('h1', ip='192.168.20.215')

    info( '*** Add links\n')
    #net.addLink(h1, s1)

    info( '*** Starting network\n')
    net.start()
    # h1.cmdPrint('dhclient '+h1.defaultIntf().name)
    #h1.cmdPrint('ifconfig '+h1.defaultIntf().name+' 192.168.20.215 netmask 255.255.255.0')
    CLI(net)
    net.stop()

if __name__ == '__main__':
    setLogLevel( 'info' )
    myNetwork()
