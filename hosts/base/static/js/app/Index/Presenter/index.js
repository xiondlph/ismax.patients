App.Index.View.Index = {
  Login: Backbone.View.extend({
    tagName: 'a',
    className: 'btn enabled',
    id: 'login',
    events:{
      'click':                          'active',
      'click form':                     'hook',
      'submit form':                    'submit',
      'click .send.enabled':            'send',
      'input input[name="email"]':      'changeEmail',
      'input input[name="password"]':   'changePassword',
      'focusin input':                  'focusin',
      'focusout input':                 'focusout',
    },

    render: function(){
      var tmpl = _.template(App.Index.Templates.Index.Login);
      this.$el.append(tmpl);

      this.options.obj.append(this.$el);
      return this.$el;
    },

    active: function(e){
      if(!$(e.currentTarget).hasClass('active')){
        $(e.currentTarget).parent().trigger('click');
        $(e.currentTarget).addClass('active');

        if($(e.currentTarget).find('input[name="email"]').hasClass('invalid')){
          $(e.currentTarget).find('input[name="email"]').focus();
        }else if($(e.currentTarget).find('input[name="password"]').hasClass('invalid')){
          $(e.currentTarget).find('input[name="password"]').focus();
        }
        

        $(document).click(this.close);
        return false;
      }
    },

    close: function(e){
      $('#panel .btn').removeClass('active');
      $('#login input[aria-describedby]').tooltip('destroy');
      $(document).unbind('click', arguments.callee);
    },

    hook: function(e){
      return false;
    },

    changeEmail: function(e){
      var patern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i

      var val = $(e.currentTarget).val();
      if(val.length < 1){
        $(e.currentTarget).addClass('invalid');
        if($(e.currentTarget).hasClass('checked')){
          $(e.currentTarget).attr('info', 'Следует указать Email');
          $(e.currentTarget).tooltip('close');
          $(e.currentTarget).tooltip({ content: "Следует указать Email" });
        }
        $(e.currentTarget).tooltip('open');

        this.isValid();
        return true;
      }

      if(!patern.test(val)){
        $(e.currentTarget).addClass('invalid');
        if($(e.currentTarget).hasClass('checked')){
          $(e.currentTarget).attr('info', 'Неверный формат Email');
          $(e.currentTarget).tooltip('close');
          $(e.currentTarget).tooltip({ content: "Неверный формат Email" });
        }
        $(e.currentTarget).tooltip('open');

        this.isValid();
        return true;
      }

      $(e.currentTarget).tooltip('close');

      $(e.currentTarget).removeAttr('info');
      $(e.currentTarget).removeClass('invalid');
      $(e.currentTarget).addClass('checked');
      this.isValid();
      return true;
    },

    changePassword: function(e){
      var patern = /^([0-9a-z_])+$/i

      var val = $(e.currentTarget).val();
      if(val.length < 1){
        $(e.currentTarget).addClass('invalid');
        if($(e.currentTarget).hasClass('checked')){
          $(e.currentTarget).attr('info', 'Следует указать пароль');
          $(e.currentTarget).tooltip('close');
          $(e.currentTarget).tooltip({ content: 'Следует указать пароль' });
        }
        $(e.currentTarget).tooltip('open');

        this.isValid();
        return true;
      }

      if(!patern.test(val)){
        $(e.currentTarget).addClass('invalid');
        if($(e.currentTarget).hasClass('checked')){
          $(e.currentTarget).attr('info', 'Пароль может состоять из символов: a-z, 0-9');
          $(e.currentTarget).tooltip('close');
          $(e.currentTarget).tooltip({ content: 'Пароль может состоять из символов: a-z, 0-9' });
        }
        $(e.currentTarget).tooltip('open');

        this.isValid();
        return true;
      }

      $(e.currentTarget).tooltip('close');

      $(e.currentTarget).removeAttr('info');
      $(e.currentTarget).removeClass('invalid');
      $(e.currentTarget).addClass('checked');
      this.isValid();
      return true;
    },

    focusin: function(e){
      $(e.currentTarget).tooltip({
        items: '[info]',
        content: $(e.currentTarget).attr('info'),
        position: {my: "right center", at: "left center"}
      });

      if(!$(e.currentTarget).hasClass('checked')){
        $(e.currentTarget).trigger('input');
      }
      $(e.currentTarget).tooltip('open');
    },

    focusout: function(e){
      if($(e.currentTarget).hasClass('invalid')){
        $(e.currentTarget).addClass('checked');
        $(e.currentTarget).focus();
      }
      return false;
    },

    isValid: function(){
      if(this.$el.find('input.invalid').length == 0){
        this.$el.find('.send').addClass('enabled');
      }else{
        this.$el.find('.send').removeClass('enabled');
      }
    },

    submit: function(e){
      var me = this;

      me.$el.find('.loader').css({visibility: 'visible'});
      me.$el.find('input').attr('disabled', 'disabled');
      me.$el.find('.send').removeClass('enabled')
      $.ajax({
        url: '/user/signin',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
          email: me.$el.find('input[name="email"]').val(),
          password: me.$el.find('input[name="password"]').val()
        }),
        success: function(data){
          if(data.auth){
            window.location.href = '/profile';
          }else{
            alert('Неверные логин или пароль');
          }
        },
        complete: function(){
          me.$el.find('.loader').css({visibility: 'hidden'});
          me.$el.find('input').removeAttr('disabled');
          me.$el.find('.send').addClass('enabled');
        }
      });        

      return false;
    },

    send: function(e){
      if(!$(e.currentTarget).hasClass('disabled')){
        this.$el.find('form').submit();
      }
    }
  })
}