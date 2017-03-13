(function (nx) {
	nx.define('TopologyContainer', nx.ui.Component, {
		properties: {
			topology: {
				get: function () {
					return this.view('topology');
				}
			}
		},
		view: {
			content: [
				{
					'name': 'topology', 
					'type': 'nx.graphic.Topology', 
					'props': {
						'adaptive': true, 
						'showIcon': true, 
						'nodeConfig': {
							'label': 'model.name',
							'iconType': 'model.icon',
						},
						'linkConfig': {
							'linkType': 'parallel' // also: parallel
						},
						'tooltipManagerConfig': {
    						'nodeTooltipContentClass': "extentNodetooltip"
  						},  
						'identityKey': 'name', // helps to link source and target
						'width': 1360,
						'height':750,
                        'theme':'green',
						'autoLayout':'quick',
						'dataProcessor': 'force', // arrange nodes positions if not set
						'enableSmartLabel': true, // moves the labels in order to avoid overlay of them
						'enableGradualScaling': false, // may slow down, if true
						'enableSmartNode':true,
						'supportMultipleLink': true // if true, two nodes can have more than one link
					}
				}
			]
		}
	});
})(nx);