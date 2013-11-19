App = {
  Feed: {
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
    '':         'index',
    'index':    'index'
  },
  
  index: function(){
    App.Feed.Apps.Events.render();
    $('.user_menu li a.active').removeClass('active');
    $('.user_menu li a[href="#disease"]').addClass('active');
  }
});

$(document).ready(function(){
  App.Feed.Apps.Events = new App.Feed.View.Events.List({obj: $('#center')});
  var route = new Route();
  Backbone.history.start();
});