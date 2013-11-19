App.Secure.View.Signup = {
  Form: Backbone.View.extend({
    tagName: "div",
    className: "signup",
    events:{
      'submit form' : 'submit',
    },
    render: function(){
      var tmpl = _.template(App.Secure.Templates.Signup.Form);
      this.$el.html(tmpl);
      this.$el.find('form').validate({
        onkeyup: false,
        onfocusout: false,
        rules: {
          email: {
            required: true,
            email: true
          },
          password: 'required'
        },
  
        messages: {
          email: {
            required: "Укажите E-mail",
            email: "Укажите корректный E-mail"
          },
          password: 'Укажите пароль'
        }
      });

      this.options.obj.html(this.$el);
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
  })
}