
var URL_TOPOLOGY = 'http://localhost:8181/restconf/operational/network-topology:network-topology/topology/flow:1/';   
var topologyData={};
topologyData.nodes=[];
topologyData.links=[];
$.ajax({
    url: URL_TOPOLOGY,
    method:"GET",
    crossDomain: true,
    dataType:'json',
    headers: {
        "authorization": "Basic YWRtaW46YWRtaW4=",
        "content-type": "application/json",
        "accept": "application/json",
    },
    success: function(data) {
       //topologyData=data;
    //    topologyData.nodes=[];
        var x=192;
        var y=342;
        // var nodeInfoTableData = self.nodeInfoData();
        for(i=0;i<data.topology[0].node.length;i++){
            var id=0,name;
            var n=1;
            var prefix="";
            if(data.topology[0].node[i]['node-id']!=undefined){
                //console.log(data.topology[0].node[i]['node-id']);
                id=i;
                x+=10;
                y+=10;
                name=data.topology[0].node[i]['node-id'];
            }
            else{
                name="Host"+n;
                n++;
            }
            topologyData.nodes.push({
                'id':id,
                'name':name,
                'x':x,
                'y':y,
                type:"switch"
            })
            // console.log(topologyData.nodes[0]);
        }
        // topologyData.links=[];
        for(i=0;i<data.topology[0].link.length;i++){
            // console.log(data.topology[0].link.length)
            var linkID=0;
            var sourceNodeID=data.topology[0].link[i].source['source-node'];
            //console.log(sourceNodeID);
            var destinationNodeID=data.topology[0].link[i].destination['dest-node'];
            //console.log(destinationNodeID);
            for (x = 0; x < topologyData.nodes.length; x++) {
                var source = topologyData.nodes[x].id;
                id=source;
                //console.log(source);
                for (y = 0; y < topologyData.nodes.length; y++) {
                    //console.log(topoData.nodes[y]['name']);
                    if (destinationNodeID == topologyData.nodes[y]['name']) {
                        var target = topologyData.nodes[y].id;
                        //console.log(target);
                        if(source!=target){
                            topologyData.links.push({
                                 'id':id,
                                 'source': source,
                                 'target': target
                            })
                            // console.log(topologyData.links);
                        }    
                    }    
                }    
             }
       }
    }  
});
console.log(topologyData);
(function (nx) {
    /**
     * define application
     */
    var Shell = nx.define(nx.ui.Application, {
        methods: {
            start: function () {
                //your application main entry
                // initialize a topology
                var topo = new nx.graphic.Topology({
                    // set the topology view's with and height
                    type: 'nx.graphic.Topology',
                    width: 1024,
                    height: 768,
                    theme: 'green',
                    identityKey: 'id',
                    // node config
                    nodeConfig: {
                        // label display name from of node's model, could change to 'model.id' to show id
                        label: 'model.name',
                        iconType:'switch'
                    },
                    // link config
                    linkConfig: {
                        // multiple link type is curve, could change to 'parallel' to use parallel link
                        linkType: 'curve'
                    },
                    // show node's icon, could change to false to show dot
                    showIcon: true,
                    data: topologyData
                });

                //set data to topology
                topo.data(topologyData);
                //attach topology to document
                topo.attach(this);
            }
        }
    });
    var shell = new Shell();
    shell.start();
})(nx);

