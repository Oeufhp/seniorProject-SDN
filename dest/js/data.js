var topologyData={};

var jsonToCTM=function(data){
    var topology=data.topology[0];
    var topologyNext={nodes:[] , links:[]};
    //push nodes to array
    for(var i=0;i<topology.node.length;i++){
        var node={};
        if (topology.node[i].hasOwnProperty('node-id')) {
			node.name = topology.node[i]['node-id'];
            node.id=i;
            node.type = "switch";
		}
        topologyNext.nodes.push(node);
    }
    //push links to array
    for(var j=0;j<topology.link.length;j++){
        var link={
            id:j,
            source: topology.link[j].source['source-node'],
            target:topology.link[j].destination['dest-node']
        };
        topologyNext.links.push(link);
    }
    return topologyNext;
};