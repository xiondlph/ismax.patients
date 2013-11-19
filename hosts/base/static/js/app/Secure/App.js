App = {
  Secure: {
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
    '':       'login',
    'login':  'login',
    'signup': 'signup'
  },
  
  login: function(){
    App.Secure.Apps.Login.render();
  },

  signup: function(){
    App.Secure.Apps.Signup.render();
  }
});

$(document).ready(function(){
  App.Secure.Apps.Login   = new App.Secure.View.Login.Form({obj: $('#center')});
  App.Secure.Apps.Signup  = new App.Secure.View.Signup.Form({obj: $('#center')});
  var route = new Route();
  Backbone.history.start();
});