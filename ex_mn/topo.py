from mininet.topo import Topo

class My_Topo(Topo):
    def __init__(self):
        "Create P2P topology."

        # Initialize topology
        Topo.__init__(self)

        # Add hosts and switches
        H1 = self.addHost('h1',ip='10.0.1.1/16')
        H2 = self.addHost('h2',ip='10.0.2.1/16')
        H3 = self.addHost('h3',ip='10.0.1.2/16')
        H4 = self.addHost('h4',ip='10.0.2.2/16')
        S1 = self.addSwitch('s1')
        S2 = self.addSwitch('s2')
        S3 = self.addSwitch('s3')
        S4 = self.addSwitch('s4')
        # c0 = self.addController('c0')

        # Add links
        self.addLink(H3, S1)
        self.addLink(H4, S1)
        self.addLink(S1, S2)
        self.addLink(S1, S3)
        self.addLink(S2, S3)
        self.addLink(S2, S4)
        self.addLink(S3, S4)
        self.addLink(H1, S4)
        self.addLink(H2, S4)

topos = {
        'myTopo': (lambda: My_Topo())

}
