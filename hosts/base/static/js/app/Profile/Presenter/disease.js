App.Profile.View.Disease = {
  List: Backbone.View.extend({
    tagName: 'div',
    className: 'diseaseList',
    events:{
      'click [action="add"]'   : 'add'
    },
  
    initialize: function(){
      this.collection = new App.Profile.Collection.Disease();
      this.collection.bind('destroy',  this.remove, this);
      this.collection.bind('sync',     this.sync, this);
    },
  
    render: function(){
      var me = this;
      var tmpl = _.template(App.Profile.Templates.Disease.List);
      me.$el.html(tmpl);
      if(me.collection.length == 0){
        me.collection.fetch({success: function(collection, response, options){
          _.each(collection.models, function(item){
            me.renderDisease(item);
          }, me);
        }});      
      }else{
        _.each(me.collection.models, function(item){
          me.renderDisease(item);
        }, me);
      }
  
      this.options.obj.html(this.$el);
      return this.$el;
    },
  
    renderDisease: function(item){
      var diseaseView = new App.Profile.View.Disease.Item({model: item});
      this.$el.find('.list').append(diseaseView.render());
    },
  
    add: function(){
      this.collection.create({
        diagnosed: 0,
        date: '',
        symptoms: []
      },{wait: true});
    },
  
    sync: function(model){
      this.renderDisease(model);
    },
  
    remove: function(model, collection, options){
      this.$el.find('[_id="'+model.id+'"]').remove();
    }
  }),

  Item: Backbone.View.extend({
    tagName: 'div',
    className: 'disease',
    events:{
      'submit form'             : 'submit',
      'change input'            : 'сhange',
      'click [action="remove"]' : 'remove'
    },

    initialize: function(){
      this.model.bind('change:symptoms', this.updateSymptoms, this);
      this.render();
    },

    render: function(){
      var tmpl = _.template(App.Profile.Templates.Disease.Item);
      this.$el.html(tmpl(this.model.toJSON()));

      this.symptoms = new App.Profile.View.Disease.Symptoms({
        model: this.model,
        cont: this.$el.find('table tr:eq(1) td:eq(2)')
      });

      this.$el.find('input[name="date"]').datepicker({
        yearRange:    "c-50:c",
        dateFormat:   "yy-mm-dd",
        changeMonth:  true,
        changeYear:   true
      });

      return this.$el;
    },
  
    submit: function(){
      var symptoms = []
      _.each(this.$el.find('li[symptoms]'), function(val){
        symptoms.push({
          name:       $(val).attr('symptoms'),
          intensity:  $(val).attr('intensity')
        })
      });

      this.model.save({
        name:       this.$el.find('input[name="name"]').val(),
        diagnosed:  this.$el.find('input[name="diagnosed"]:checked').val(),
        date:       this.$el.find('input[name="date"]').val(),
        symptoms:   symptoms
      }, {
        success: function(model, data, options){
          alert('done');
        }
      });

      return false;
    },

    сhange: function(e){
      this.$el.find('form').submit();
    },

    remove: function(){
      this.model.destroy({wait: true});
    },

    updateSymptoms: function(){
      this.symptoms = new App.Profile.View.Disease.Symptoms({
        model: this.model,
        cont: this.$el.find('table tr:eq(1) td:eq(2)')
      });
    }
  }),

  Symptoms: Backbone.View.extend({
    tagName: 'div',
    className: 'disease_symptoms',
    events:{
      'change input'                            : 'сhange',
      'click .disease_symptoms_add'             : 'add',
      'click li'                                : 'edit',
      'click .disease_symptoms_intensity_save'  : 'save',
      'click .disease_symptoms_intensity_remove': 'remove',
      'click .disease_symptoms_intensity_cencel': 'cencel'
    },

    initialize: function(){
      this.render();
    },

    render: function(){
      var tmpl = _.template(App.Profile.Templates.Disease.Symptoms);
      this.$el.html(tmpl(this.model.toJSON()));
      this.options.cont.html(this.$el);
      return this.$el;
    },

    сhange: function(e){
      e.stopPropagation();
    },

    add: function(e){
      var tmpl = _.template(App.Profile.Templates.Disease.SymptomsBlank);
      this.$el.find('ul').append(tmpl(this.model.toJSON()));
    },

    edit: function(e){
      if($(e.currentTarget).attr('state') == 'view'){
        $(e.currentTarget).parent().find('li[state="edit"]').attr('state','view');
        $(e.currentTarget).attr('state','edit');
        $(e.currentTarget).find('input[name="symptoms"]').val($(e.currentTarget).attr('symptoms'));
        $(e.currentTarget).find('input[value="'+$(e.currentTarget).attr('intensity')+'"]').attr('checked','checked');        
      }
    },

    save: function(e){
      var symptoms  = $(e.currentTarget).parents('li').find('input[name="symptoms"]').val();
      var intensity = $(e.currentTarget).parents('li').find('input[name="intensity"]:checked').val();

      $(e.currentTarget).parents('li').attr('symptoms', symptoms);
      $(e.currentTarget).parents('li').attr('intensity', intensity);

      this.$el.parents('form').submit();
      e.stopPropagation();
    },

    remove: function(e){
      $(e.currentTarget).parents('li').remove();
      this.$el.parents('form').submit();
    },

    cencel: function(e){
      if($(e.currentTarget).parents('li').attr('state') == 'edit'){
        $(e.currentTarget).parents('li').attr('state', 'view');
      }else if($(e.currentTarget).parents('li').attr('state') == 'blank'){
        $(e.currentTarget).parents('li').remove();
      }

      e.stopPropagation();
    }
  })
}