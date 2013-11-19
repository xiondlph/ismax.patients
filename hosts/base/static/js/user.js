var LoginView = Backbone.View.extend({
  tagName: 'div',
  className: 'login',
  events:{
    'submit form' : 'submit',
  },

  render: function(){
    this.$el.html(_.template($("#loginTemplate").html()));
    this.$el.find('form').validate({
      onkeyup: false,
      onfocusout: false,
      rules: {
        email: {
          required: true,
          email: true
        },
        _password: 'required'
      },

      messages: {
        email: {
          required: "Укажите E-mail",
          email: "Укажите корректный E-mail"
        },
        _password: 'Укажите пароль'
      }
    });
    return this.$el;
  },
  
  submit: function(){
    $.ajax({
      url: '/user/signin',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({
        email: this.$el.find('input[type="text"]').val(),
        password: this.$el.find('input[type="password"]').val()
      })
    }).done(function(data){
      if(data.auth){
        window.location.href = '/profile';
      }else{
        alert('Неверные логин или пароль');
      }
    });
    return false;
  }
});

var SignupView = Backbone.View.extend({
  tagName: "div",
  className: "signup",
  events:{
    'submit form' : 'submit',
  },
  render: function(){
    this.$el.html(_.template($("#signupTemplate").html()));
    this.$el.find('form').validationEngine();
    return this.$el;
  },

  submit: function(){
    $.ajax({
      url: '/user/create',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({
        user: {
          email: this.$el.find('input[type="text"]').val(),
          password: this.$el.find('input[type="password"]').val()         
        }
      })
    }).done(function(data){
      alert('Done');
    });
    return false;
  }
});

var Route = Backbone.Router.extend({
  routes: {
    '':       'login',
    'login':  'login',
    'signup': 'signup'
  },
  
  login: function(){
    var loginView = new LoginView();
    $('#center').html(loginView.render());
  },

  signup: function(){
    var signipView = new SignupView();
    $('#center').html(signipView.render());
  }
});

$(document).ready(function(){
  var route = new Route();
  Backbone.history.start();
});