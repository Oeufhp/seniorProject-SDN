(function (nx){
    var app = new nx.ui.Application();
	/* TopologyContainer is a nx.ui.Component object that can contain much more things than just a nx.graphic.Topology object.
	 We can 'inject' a topology instance inside and interact with it easily
	 */
	var topologyContainer = new TopologyContainer();
	// topology instance was made in TopologyContainer, but we can invoke its members through 'topology' variable for convenience
	var topology = topologyContainer.topology();
    console.log(topology);
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
            console.log(data);
            topologyData=jsonToCTM(data);
            topology.data(topologyData);
            topology.attach(app);
        }
    });
})(nx);