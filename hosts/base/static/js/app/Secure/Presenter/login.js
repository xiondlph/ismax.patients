App.Secure.View.Login = {
  Form: Backbone.View.extend({
    tagName: 'div',
    className: 'login',
    events:{
      'submit form'               : 'submit',
      'click #login_forgot_link'  : 'forgot'
    },

    render: function(){
      var tmpl = _.template(App.Secure.Templates.Login.Form);
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
    },

    forgot: function(e){
      var me = this;
      if(this.$el.find('input[type="text"]').valid()){
        var tmpl  = $(App.Secure.Templates.Login.Forgot);
        var email = this.$el.find('input[type="text"]').val();
        tmpl.dialog({
          resizable: false,
          height:200,
          modal: true,
          buttons: {
            "Отмена": function(){
              $(this).dialog("close");
            },
  
            "Продолжить": function(){
              $.ajax({
                url: '/user/forgot',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                  email: email
                })
              }).done(function(data){
                tmpl.dialog("close");
                me.$el.prepend('<p>На ваш электронный адрес было отправлено сообщение с информацией о входе!</p>');
              });
            }
          }
        });        
      }
      return false;
    }
  })
}