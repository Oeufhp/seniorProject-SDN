var topologyData={};
var jsonToCTM=function(data){
    var topology=data.topology[0];
    var topologyNext={nodes:[] , links:[]};
    //push nodes to array
    if(topology.node===undefined){
        toastr['warning']('You haven\'t create a topology yet');
    }
    else if(topology.node!==undefined){
        var flowCnt=0,flowCnt1=0;
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
            $.ajax({
                url:'http://localhost:8181/restconf/operational/opendaylight-inventory:nodes/node/'+topology.node[i]['node-id'],
                crossDomain: true,
                dataType:'json',
                async:false,
                headers: {
                    "authorization": "Basic YWRtaW46YWRtaW4=",
                    "content-type": "application/json",
                    "accept": "application/json",
                },
                success:function(data){
                    node.ports=data['node'][0]['node-connector'].length-1;
                    var deviceData=data['node'][0]['node-connector'];
                    $.each(deviceData,function(j,element){
                        if(element['id'].substring(element['id'].length,element['id'].length-5)==='LOCAL'){
                            node.brName=element['flow-node-inventory:name'];
                        }    
                    });
                }
            });
            topologyNext.nodes.push(node);
        }
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