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
							'iconType': 'switch',
						},
						'linkConfig': {
							'linkType': 'parallel' // also: parallel
						},
						'identityKey': 'name', // helps to link source and target
						'width': 1200,
						'height': 600,
                        'theme':'green',
						'dataProcessor': 'force', // arrange nodes positions if not set
						'enableSmartLabel': true, // moves the labels in order to avoid overlay of them
						'enableGradualScaling': true, // may slow down, if true
						'supportMultipleLink': true // if true, two nodes can have more than one link
					}
				}
			]
		}
	});
})(nx);