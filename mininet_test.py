from mininet.net import Mininet
from mininet.cli import CLI
from mininet.link import Intf
from mininet.log import setLogLevel, info
from mininet.topo import Topo

def myNetwork():
	#topo=Topo()        
	topo=Topo()        
	net = Mininet()
	
        info('*** Add hosts ***\n')
        h1=net.addHost('h1')
	h2=net.addHost('h2')

        info('*** Add switches ***\n')
        #Intf('eth2',node=s1)
	s1=net.addSwitch('s1')
	s2=net.addSwitch('s2')
	s3=net.addSwitch('s3')
	
	info('*** Add links ***\n')
	net.addLink('h1','s1')
	net.addLink('h2','s3')
	net.addLink('s1','s2')
	net.addLink('s2','s3')
	
        info('*** Starting network ***\n')
	net.build()
        net.start()
        #h1.cmdPrint('ping -c10 '+ h2.IP())
        CLI(net)
        net.stop()

if __name__ == '__main__':
    setLogLevel( 'info' )
    myNetwork()    

