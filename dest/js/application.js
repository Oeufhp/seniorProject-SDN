(function(nx) {
    var App = nx.define(nx.ui.Application, {
        methods: {
            start: function() {
                var view = new demo.TopologyViaAPI();
                view.attach(this);
            }
        }
    });
    new App().start();
})(nx);
