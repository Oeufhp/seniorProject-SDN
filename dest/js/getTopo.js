
var URL_TOPOLOGY = 'http://localhost:8181/restconf/operational/network-topology:network-topology/topology/flow:1/';   
var topologyData,topoData={};
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
       topologyData=data;
        // var topoData={};
        // add nodes object array
        topoData.nodes = [];
        // var nodeInfoTableData = self.nodeInfoData();
        for(i=0;i<data.topology[0].node.length;i++){
            var id=0,name;
            var x=0;
            var y=0;
            var n=1;
            var prefix="";
            if(data.topology[0].node[i]['node-id']!=undefined){
                console.log(data.topology[0].node[i]['node-id']);
                id=i;
                x+=10;
                y+=10;
                name=data.topology[0].node[i]['node-id'];
            }
            else{
                name="Host"+n;
                n++;
            }
            topoData.nodes.push({
                'id':id,
                'name':name,
                'x':x,
                'y':y
            })
        }
        topoData.links=[];
        for(var i=0;i<data.topology[0].link.length;i++){
            console.log(data.topology[0].link[i]);
            var sourceNodeID=data.topology[0].link[i].source['source-node'];
            console.log(sourceNodeID);
            var destinationNodeID=data.topology[0].link[i].destination['dest-node'];
            console.log(destinationNodeID);
            for (x = 0; x < topoData.nodes.length; x++) {
                var source = topoData.nodes[x].name;
                console.log(source);
                for (y = 0; y < topoData.nodes.length; y++) {
                    if (destinationNodeID == topoData.nodes[y]['node-id']) {
                        var target = topoData.nodes[y].name;
                        console.log(target);
                        var linksArrayLength = topoData.links.length
                        if (linksArrayLength > 0) {
                            var count = 0;
                            var index;
                            for (z = 0; z < topoData.links.length; z++) {
                                if (source == topoData.links[z].target && target == topoData.links[z].source) {
                                    count++;
                                    index = z;
                                }
                            }  
                            if (count == 0){
                                // push link into links array
                                topoData.links.push({
                                    'source': source,
                                    'target': target
                                })
                            }
                        }
                    }    
                }    
             }
       }
    }  
});
nx.define('MyTopology', nx.ui.Component, {
   view: {
       content: {
           type: 'nx.graphic.Topology',
           props: {
               width: 1366,
               height: 768,
               nodeConfig: {
                   label: 'model.name'
               },
               showIcon: true,
               data: topoData
           }
       }
   }
});
var app = new nx.ui.Application();
var comp = new MyTopology();
comp.attach(app);
// initialize a topology
// var topo = new nx.graphic.Topology({
//     // set the topology view's with and height
//     width: 1366,
//     height: 768,
//     // node config
//     nodeConfig: {
//         // label display name from of node's model, could change to 'model.name' to show name
//         label: 'model.name'
//     },
//     // link config
//     linkConfig: {
//         // multiple link type is curve, could change to 'parallel' to use parallel link
//         linkType: 'curve'
//     },
//     // show node's icon, could change to false to show dot
//     showIcon: true,
//     data:topoData,
//     // identified with name
//     // identityKey: 'name',
    
//     // auto layout the topology
//     autoLayout: true,
//     dataProcessor: 'force'
// });

// //set converted data to topology
// console.log(topoData);
// topo.data(topoData);
// //attach topology to document
// topo.attach(this);

