var topology;
(function (nx){
    var app = new nx.ui.Application();
	var topologyContainer = new TopologyContainer();
	// topology instance was made in TopologyContainer, but we can invoke its members through 'topology' variable for convenience
	topology = topologyContainer.topology();
    // var formcomponent=new formComponent();
  var topologyData={};
	//assign the app to the <div>
	app.container(document.getElementById('next-app'));
  extentNodetooltip();
	// implementing an async http request
    var URL_TOPOLOGY = 'http://localhost:8181/restconf/operational/network-topology:network-topology/topology/flow:1/';
    $.ajax({
        url: URL_TOPOLOGY,
        method:"GET",
        crossDomain: true,
        async:false,
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
function extentNodetooltip(){
    nx.define('extentNodetooltip',nx.ui.Component,{
		'properties':{
			'node':{
				set:function(value){
					var model=value.model();
					var dataCollection = new nx.data.Collection(filterModel(model));
          			this.view('list').set('items', dataCollection);
                console.log(model._data['brName']);
          			this.title(model._data['brName']);
					function filterModel(model) {
                        var newModel = [{
                            label: "Name:",
                            value: model._data['name']
                          }, {
                            label: "ID:",
                            value: model._data['id']
                          }, {
                            label: "type:",
                            value: model._data['icon']
                          },
                          {
                            label: "ports:",
                            value: model._data['ports']
                          },
                          {
                            label: "bridge name:",
                            value: model._data['brName']
                          },
                          {
                            label: "flows:",
                            value: model._data['flows']
                          },
                          {
                            label: "IP:",
                            value: model._data['IP']
                          }
                    ];
            	        return newModel;
                    }
                }		
			}, 
            "title": "",
            "nodePayload": {},
            "topology": {}
		},
      view: {
            content: [{
              name: 'header',
              props: {
                'class': 'n-topology-tooltip-header'
              },
              content: [{
                tag: 'span',
                props: {
                  'class': 'n-topology-tooltip-header-text'
                },
                name: 'title',
                content: '{#title}'
              }]
            }, {
              name: 'content',
              props: {
                'class': 'n-topology-tooltip-content n-list'
              },
              content: [{
                name: 'list',
                tag: 'ul',
                props: {
                  'class': 'n-list-wrap',
                  template: {
                    tag: 'li',
                    props: {
                      'class': 'n-list-item-i',
                      role: 'listitem'
                    },
                    content: [{
                      tag: 'label',
                      content: '{label}: '
                    }, {
                      tag: 'span',
                      content: '{value}'
                    }]
                  }
                }
              }]
            }]
          },
          "methods": {
            // inherit standard properties & methods
            "init": function(args) {
              this.inherited(args);
            }
         }
	});
}
