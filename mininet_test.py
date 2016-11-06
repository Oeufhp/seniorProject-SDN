from mininet.net import Mininet
from mininet.node import Controller
from mininet.node import RemoteController
from mininet.node import Host
from mininet.cli import CLI
from mininet.link import Intf
from mininet.log import setLogLevel, info
from mininet.topo import Topo

def myNetwork():
	topo=Topo()        
	#net = Mininet()
	
        info('*** Add hosts ***\n')
        topo.addHost('h1',ip="10.0.0.1/24")
        topo.addHost('h2',ip="10.0.0.2/24")

        info('*** Add switches ***\n')
        topo.addSwitch('s1')
        #Intf('eth2',node=s1)
	
	info('*** Add links ***\n')
	topo.addLink('h1','s1')
	topo.addLink('h2','s1')
	
	net = Mininet()
        info('*** Starting network ***\n')
        net.start()
	net.pingAll()
        #h1.cmdPrint('ping -c10 '+ h2.IP())
        CLI(net)
        net.stop()

if __name__ == '__main__':
    setLogLevel( 'info' )
    myNetwork()    

