App = {
  Index: {
    Collection: {},
    Model: {},
    View: {},
    Templates: {},
    Apps: {}
  }
}

// Маршрутизатор
var Route = Backbone.Router.extend({
  routes: {
    '':       'index',
    'index':  'index',
  },
  
  index: function(){
    App.Index.Apps.Login.render();
  }
});

$(document).ready(function(){
  App.Index.Apps.Login        = new App.Index.View.Index.Login({obj: $('#panel .top')});

  var route = new Route();
  Backbone.history.start();
});
