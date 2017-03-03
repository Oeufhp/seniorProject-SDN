(function (nx){
    var app = new nx.ui.Application();
	var topologyContainer = new TopologyContainer();
	// topology instance was made in TopologyContainer, but we can invoke its members through 'topology' variable for convenience
	var topology = topologyContainer.topology();
    // var formcomponent=new formComponent();
    var topologyData={};
	//assign the app to the <div>
	app.container(document.getElementById('next-app'));
	// implementing an async http request
    var URL_TOPOLOGY = 'http://localhost:8181/restconf/operational/network-topology:network-topology/topology/flow:1/';
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
        success: function(data){
            topologyData=jsonToCTM(data);
            console.log(topologyData);
            topology.data(topologyData);
            topology.attach(app);
            if(topologyData.nodes.length!==0){
                toastr['success']('query topology data complete');
            }    
        },
        error: function(xhr){
            console.log(xhr.status);
            if(xhr.status===0){
                toastr['warning']('Please run karaf shell of ODL');
            }   
        }
    });
    // topology.on("topologyGenerated", function(){
    //     // path layer - need to draw paths
    //     var pathLayer = topology.getLayer("paths");
    //     // node dictionary to get nodes by name (by default only 'id' is available)
    //     var nodesDict = topology.getLayer("nodes").nodeDictionary();

    //     var linkList = getLinkList(topology, nodesDict, pathHops);

    //     var pathInst = new nx.graphic.Topology.Path({
    //         "pathWidth": 3,
    //         "links": linkList,
    //         "arrow": "cap",
    //         "sourceNode": nodesDict.toArray()[0],
    //         "pathStyle": {
    //             "fill": "#76FF03"
    //         }
    //     });
    //     pathLayer.addPath(pathInst);
    // });
})(nx);