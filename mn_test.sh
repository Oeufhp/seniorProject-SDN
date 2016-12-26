#!/usr/bin/python
from mininet.net import Mininet
from mininet.node import Controller, RemoteController, OVSKernelSwitch, IVSSwitch, UserSwitch
from mininet.link import Link, TCLink
from mininet.cli import CLI
from mininet.log import setLogLevel

def topology():

    net=Mininet(controller=Controller,switch=OVSKernelSwitch)

    print "*** Creating nodes ***"
    s1 = net.addSwitch( 's1', protocols='OpenFlow13', listenPort=6673, mac='00:00:00:00:00:01' )
    h5 = net.addHost( 'h5', mac='00:00:00:00:00:05', ip='192.168.1.105' )
    h6 = net.addHost( 'h6', mac='00:00:00:00:00:06', ip='192.168.1.106' )
    c7 = net.addController( 'c7' )

    print "*** creating links ***"
    net.addLink(s1,h5)
    net.addLink(s1,h6)

    print "*** starting network ***"
    net.build()
    c7.start()
    s1.start([c7])
    print "*** Running CLI"
    CLI( net )

    print "*** Stopping network"
    net.stop()

if __name__ == '__main__':
    setLogLevel( 'info' )
    topology() 

