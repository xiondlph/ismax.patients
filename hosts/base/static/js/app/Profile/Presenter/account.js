var hobby = [
  {
    value: "хобби1",
    label: "хобби1"
  },
  {
    value: "хобби2",
    label: "хобби2"
  },
  {
    value: "хобби3",
    label: "хобби3"
  }
];

var country = [
  {
    value: "Франция",
    label: "Франция"
  },
  {
    value: "Россия",
    label: "Россия"
  },
  {
    value: "Таджикистан",
    label: "Таджикистан"
  }
];

var city = [
  {
    value: "Париж",
    label: "Париж"
  },
  {
    value: "Москва",
    label: "Москва"
  },
  {
    value: "Чкаловск",
    label: "Чкаловск"
  }
];

/// Модель профиля
var Profile = Backbone.Model.extend({
  sync: function(method, model, options){
    var param = {
      url:  '/profile/get',
      type: 'GET'
    };

    if(method == 'update'){
      param.type  = 'POST';
      param.data  = {};
      
      _.each(options.changes, function(val, key){
        if(val){param.data[key] = model.get(key)};
      }, this);

      param.url   = this.getUrl(options);
    }

    $.ajax({
      url:        param.url,
      type:       param.type,
      dataType:   'json',
      data:       JSON.stringify(param.data)
    }).done(function(data, status, xhr){
      if(data.auth){
        if(data.success){
          options.success(data, status, xhr)
        }
      }
    });
  },

  parse: function(data, options) {
    return data.profile;
  },

  getUrl: function(options){
    if(options.changes.email){
      return '/user/mail';
    };

    return '/profile/info/set';
  }
});


// Вид формы редактирования E-mail
var EmailChangeView = Backbone.View.extend({
  tagName: 'div',
  className: 'emailChange',
  events:{
    'submit form' :         'submit',
    'change input#email' :  'сhange',
  },

  initialize: function(){
    this.model.bind('change:email', this.bind, this);
    this.render();
  },

  render: function(){
    this.$el.html(_.template($("#emailChangeTemplate").html()));

    this.$el.find('form').validate({
      onkeyup: false,
      onfocusout: false,
      rules: {
        email: {
          required: true,
          email: true
        }
      },

      messages: {
        email: {
          required: "Укажите E-mail",
          email: "Укажите корректный E-mail"
        }
      }
    });
    this.options.obj.html(this.$el);
    if(!this.model.isNew()){this.bind()};
    return this.$el;
  },

  bind: function(){
    this.$el.find('#email').val(this.model.get('email'));
  },

  submit: function(){
    var input = this.$el.find('input#email');

    this.model.save({
      email: this.$el.find('input#email').val()
    }, {
      success: function(model, data, options){
        if(data.exist){
          //input.validationEngine('showPrompt', 'E-mail уже занят!', 'load');
          return;
        }
        alert('done');
      }
    });
    return false;
  },

  сhange: function(e){
    if($(e.currentTarget).valid()){
      this.$el.find('form').submit();
    }
  }
});


// Вид формы редактирования пароля
var PasswordChangeView = Backbone.View.extend({
  tagName: 'div',
  className: 'passwordChange',
  events:{
    'submit form'             : 'submit',
    'change input'            : 'сhange'
  },

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(_.template($("#passwordChangeTemplate").html()));

    this.$el.find('form').validate({
      onkeyup: false,
      onfocusout: false,
      rules: {
        password: 'required',
        repeatpwd: {
          required: true,
          equalTo: '#required'
        }
      },

      messages: {
        password: {
          required: 'Укажите пароль'
        },
        repeatpwd: {
          required: 'Повторите пароль',
          equalTo: 'Пароли не совпадают'
        }
      }
    });
    this.options.obj.append(this.$el);
    return this.$el;
  },

  submit: function(){
    $.ajax({
      url: '/user/password',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({
        password: this.$el.find('input#password').val(),
      })
    }).done(function(data){
      if(data.auth){
        if(data.success){
          alert('done');
        }
      }
    });      

    return false;
  },

  сhange: function(e){
    if($(e.currentTarget).valid()){
      this.$el.find('form').submit();
    }
  }
});

// Вид формы редактирования аватара
var AvatarChangeView = Backbone.View.extend({
  tagName: 'div',
  className: 'avatarChange',
  events:{
    'submit form'         : 'submit',
    'change input'        : 'сhange',
  },

  initialize: function(){
    this.model.bind('change:avatar', this.bind, this);
    this.render();
  },

  render: function(){
    this.$el.html(_.template($("#avatarChangeTemplate").html()));

    this.options.obj.append(this.$el);
    if(!this.model.isNew()){this.bind()};
    return this.$el;
  },

  bind: function(profile){
    this.$el.find('label.photo').css({'background-image': 'url(' + this.model.get('avatar') + ')'});
  },

  submit: function(){
    var reader = new FileReader();
    var photo = this.$el.find('label.photo');
    var me = this;
    reader.onload = function(event){
      me.model.save({
        avatar: event.target.result
      }, {
        success: function(model, data, options){
          photo.css({'background-image': 'url(' + event.target.result + ')'});
        }
      });
    }
    reader.readAsDataURL(this.$el.find('input#avatar').get(0).files[0]);
    return false;
  },

  сhange: function(e){
    this.$el.find('form').submit();
  }
});

// Вид формы редактирования информации
var InfoChangeView = Backbone.View.extend({
  tagName: 'div',
  className: 'infoChange',
  events:{
    'submit form'         : 'submit',
    'change input'        : 'сhange',
  },

  initialize: function(){
    this.model.bind('change:firstname', this.bind, this);
    this.model.bind('change:lastname', this.bind, this);
    this.model.bind('change:gender', this.bind, this);
    this.model.bind('change:date', this.bind, this);
    this.model.bind('change:profession', this.bind, this);
    this.model.bind('change:type', this.bind, this);
    this.render();
  },

  render: function(){
    this.$el.html(_.template($("#infoChangeTemplate").html()));
    this.$el.find('form').validate({
      onkeyup: false,
      onfocusout: false,
      rules: {
        firstname: 'required',
        lastname: 'required',
        gender: 'required',
        date: {
          required: true,
          date: true
        },
        profession: 'required',
        type: 'required',
      },

      messages: {
        firstname: 'Укажите имя',
        lastname: 'Укажите фамилию',
        gender: 'Укажите пол',
        date: {
          required: 'Неверный формат даты',
          date: 'Укажите дату рождения'
        },
        profession: 'Укажите профессию',
        type: 'Укажите тип',
      }
    });
    this.$el.find('input#birsday').datepicker({
      yearRange:    "c-50:c",
      dateFormat:   "yy-mm-dd",
      changeMonth:  true,
      changeYear:   true
    });
    this.options.obj.append(this.$el);
    if(!this.model.isNew()){this.bind()};
    return this.$el;
  },

  bind: function(profile){
    this.$el.find('input#firstname').val(this.model.get('firstname'));
    this.$el.find('input#lastname').val(this.model.get('lastname'));
    this.$el.find('input[name="gender"][value="'+this.model.get('gender')+'"]').attr('checked', true);
    this.$el.find('input#birsday').val(this.model.get('date'));
    _.each(this.model.get('type'), function(val){
      this.$el.find('input[name="type"][value="'+val+'"]').attr('checked', true);
    }, this);
    this.$el.find('input#profession').val(this.model.get('profession'));
  },

  submit: function(){
    var me    = this;
    var type  = [];
    this.$el.find('input[name="type"]:checked').each(function(){
      type.push($(this).val());
    });

    this.$el.find('input').attr('disabled', true);
    this.model.save({
      firstname:  this.$el.find('input#firstname').val(),
      lastname:   this.$el.find('input#lastname').val(),
      gender:     this.$el.find('input[name="gender"]:checked').val(),
      date:       this.$el.find('input#birsday').val(),
      profession: this.$el.find('input#profession').val(),
      type:       type
    }, {
      success: function(model, data, options){
        me.$el.find('input').attr('disabled', false);
      }
    });
    return false;
  },

  сhange: function(e){
    if($(e.currentTarget).valid()){
      this.$el.find('form').submit();
    }
  }
});

// Вид формы редактирования маста жительства
var LocationChangeView = Backbone.View.extend({
  tagName: 'div',
  className: 'locationChange',
  events:{
    'submit form'           : 'submit',
    //'change input'          : 'сhange',
    'comboboxchange input'  : 'сhange'
  },

  initialize: function(){
    this.model.bind('change:country', this.bind, this);
    this.model.bind('change:city', this.bind, this);
    this.render();
  },

  render: function(){
    this.$el.html(_.template($("#locationChangeTemplate").html()));
    this.$el.find('form').validate({
      onkeyup: false,
      onfocusout: false
    });

    /*
    this.$el.find('input#country').autocomplete({
      source: country,
      minLength: 2,
      select: function(e, ui){
        $(this).val(ui.item.value);
        $(this).trigger('change');
        return false;
      }
    });

    this.$el.find('input#city').autocomplete({
      source: city,
      minLength: 2,
      select: function(e, ui){
        $(this).val(ui.item.value);
        $(this).trigger('change');
        return false;
      }
    });
    */
    this.options.obj.append(this.$el);
    if(!this.model.isNew()){this.bind()};
    return this.$el;
  },

  bind: function(profile){
    this.$el.find('input#country').val(this.model.get('country'));
    this.$el.find('input#city').val(this.model.get('city'));

    this.$el.find('input#country').combobox({
      source: country
    });
  },

  submit: function(){
    this.model.save({
      country:    this.$el.find('input#country').val(),
      city:       this.$el.find('input#city').val()
    }, {
      success: function(model, data, options){
        alert('done');
      }
    });

    return false;
  },

  сhange: function(e){
    if($(e.currentTarget).valid()){
      this.$el.find('form').submit();
    }
  }
});

// Вид формы редактирования списка хобби
var HobbyChangeView = Backbone.View.extend({
  tagName: 'div',
  className: 'hobbyChange',
  events:{
    'submit form'                         : 'submit',
    'click ul.hobby_list li > div > span' : 'remove'
  },

  initialize: function(){
    this.model.bind('change:hobby', this.bind, this);
    this.render();
  },

  render: function(){
    this.$el.html(_.template($("#hobbyChangeTemplate").html()));
    this.$el.find('input#hobby').autocomplete({
      source: hobby,
      minLength: 2,
      select: this.add
    });

    this.options.obj.append(this.$el);
    if(!this.model.isNew()){this.bind()};
    return this.$el;
  },

  bind: function(profile){
    this.$el.find('span[hobby]').parents('li').remove();
    _.each(this.model.get('hobby'), function(val){
      var item = $('<li><div>'+val+'<span hobby="'+val+'">x</span><div></li>');
      item.insertBefore(this.$el.find('input[name="hobby"]').parent());
    }, this);
  },

  submit: function(){
    var hobby = []
    _.each(this.$el.find('span[hobby]'), function(val){
      hobby.push($(val).attr('hobby'))
    });

    this.model.save({
      hobby: hobby,
    }, {
      success: function(model, data, options){
        alert('done');
      }
    });

    return false;
  },

  add: function(e, ui){
    var item = $('<li><div>'+ui.item.value+'<span hobby="'+ui.item.value+'">x</span><div></li>');
    item.insertBefore($(this).parent());
    $(this).val('');
    $(this).parents('form').trigger('submit');
    return false;
  },

  remove: function(e){
    var form = $(e.currentTarget).parents('form');
    $(e.currentTarget).parent().remove();
    form.trigger('submit');
  }
});

// Вид формы редактирования описания
var DescriptionChangeView = Backbone.View.extend({
  tagName: 'div',
  className: 'descriptionChange',
  events:{
    'submit form'         : 'submit',
    'change textarea'     : 'сhange',
  },

  initialize: function(){
    this.model.bind('change:description', this.bind, this);
    this.render();
  },

  render: function(){
    this.$el.html(_.template($("#descriptionChangeTemplate").html()));

    this.options.obj.append(this.$el);
    if(!this.model.isNew()){this.bind()};
    return this.$el;
  },

  bind: function(profile){
    this.$el.find('textarea#description').val(this.model.get('description'));
  },

  submit: function(){
    this.model.save({
      description: this.$el.find('textarea#description').val()
    }, {
      success: function(model, data, options){
        alert('done');
      }
    });

    return false;
  },

  сhange: function(e){
    if($(e.currentTarget).validationEngine('validate')){
      return false;
    }

    this.$el.find('form').submit();
  }
});