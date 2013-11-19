App = {
  Profile: {
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
    'index':    'index',
    'disease':  'disease',
    'therapy':  'therapy'
  },
  
  index: function(){
    var emailChangeView           = new EmailChangeView({model: profile, obj: $('#center')});
    var passwordChangeView        = new PasswordChangeView({model: profile, obj: $('#center')});
    var avatarChangeView          = new AvatarChangeView({model: profile, obj: $('#center')});
    var infoChangeView            = new InfoChangeView({model: profile, obj: $('#center')});
    var locationChangeView        = new LocationChangeView({model: profile, obj: $('#center')});
    var hobbyChangeView           = new HobbyChangeView({model: profile, obj: $('#center')});
    var descriptionChangeView     = new DescriptionChangeView({model: profile, obj: $('#center')});

    $('.user_menu li a.active').removeClass('active');
    $('.user_menu li a[href="#index"]').addClass('active');
    if(window.profile.isNew()){
      window.profile.fetch();
    }
  },

  disease: function(){
    App.Profile.Apps.Disease.render();
    $('.user_menu li a.active').removeClass('active');
    $('.user_menu li a[href="#disease"]').addClass('active');
  },

  therapy: function(){
    App.Profile.Apps.Therapy.render();
    $('.user_menu li a.active').removeClass('active');
    $('.user_menu li a[href="#therapy"]').addClass('active');
  },
});

$(document).ready(function(){
  window.profile = new Profile();
  App.Profile.Apps.Disease = new App.Profile.View.Disease.List({obj: $('#center')});
  App.Profile.Apps.Therapy = new App.Profile.View.Therapy.List({obj: $('#center')});
  var route = new Route();
  Backbone.history.start();
});