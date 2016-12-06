from mininet.topo import Topo

class My_Topo(Topo):
    def __init__(self):
        "Create P2P topology."

        # Initialize topology
        Topo.__init__(self)

        # Add hosts and switches
        H1 = self.addHost('h1',ip='10.0.0.1')
        H2 = self.addHost('h2',ip='10.0.0.2')
        H3 = self.addHost('h3',ip='10.0.0.3')
        H4 = self.addHost('h4',ip='10.0.0.4')
        S1 = self.addSwitch('s1')
        S2 = self.addSwitch('s2')
        # S3 = self.addSwitch('s3')
        # S4 = self.addSwitch('s4')
        # c0 = self.addController('c0')

        # Add links
        self.addLink(H1, S1)
        self.addLink(H2, S1)
        self.addLink(S1, S2)
        self.addLink(S2, H3)
        self.addLink(S2, H4)


topos = {
        'myTopo': (lambda: My_Topo())

}
