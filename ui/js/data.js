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
            if(topology.node[i]['node-id'].substring(0,4)=='host'){
                node.icon='host';
            }
            else node.icon = "switch";
		}
        topologyNext.nodes.push(node);
    }
    //push links to array
    if(topology.link!= undefined){
        for(var j=0;j<topology.link.length;j++){
            var link={
                id:j,
                source: topology.link[j].source['source-node'],
                target:topology.link[j].destination['dest-node']
            };
            topologyNext.links.push(link);
        }
    }
    return topologyNext;
};