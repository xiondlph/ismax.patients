App.Profile.View.Therapy = {
  List: Backbone.View.extend({
    tagName: 'div',
    className: 'therapyList',
    events:{
      'click [action="add"]'   : 'add'
    },
  
    initialize: function(){
      this.collection = new App.Profile.Collection.Therapy();
      this.collection.bind('destroy',  this.remove, this);
      this.collection.bind('sync',     this.sync, this);
    },
  
    render: function(){
      var me = this;
      var tmpl = _.template(App.Profile.Templates.Therapy.List);
      me.$el.html(tmpl);
      if(me.collection.length == 0){
        me.collection.fetch({success: function(collection, response, options){
          _.each(collection.models, function(item){
            me.renderTherapy(item);
          }, me);
        }});      
      }else{
        _.each(me.collection.models, function(item){
          me.renderTherapy(item);
        }, me);
      }
  
      this.options.obj.html(this.$el);
      return this.$el;
    },
  
    renderTherapy: function(item){
      var therapyView = new App.Profile.View.Therapy.Item({model: item});
      this.$el.find('.list').append(therapyView.render());
    },
  
    add: function(){
      this.collection.create({
        drug              : '',
        appointment       : '',
        evaluation        : '',
        sideeffect        : '',
        term              : '',
        frequency         : '',
        dosage            : '',
        contraindications : '',
        additional        : ''
      },{wait: true});
    },
  
    sync: function(model){
      this.renderTherapy(model);
    },
  
    remove: function(model, collection, options){
      this.$el.find('[_id="'+model.id+'"]').remove();
    }
  }),

  Item: Backbone.View.extend({
    tagName: 'div',
    className: 'therapy',
    events:{
      'submit form'             : 'submit',
      'change input'            : 'сhange',
      'click [action="remove"]' : 'remove'
    },

    initialize: function(){
      this.render();
    },

    render: function(){
      var tmpl = _.template(App.Profile.Templates.Therapy.Item);
      this.$el.html(tmpl(this.model.toJSON()));
      return this.$el;
    },
  
    submit: function(){

      this.model.save({
        drug              : this.$el.find('input[name="drug"]').val(),
        appointment       : this.$el.find('input[name="appointment"]').val(),
        evaluation        : this.$el.find('input[name="evaluation"]').val(),
        sideeffect        : this.$el.find('input[name="sideeffect"]').val(),
        term              : this.$el.find('input[name="term"]').val(),
        frequency         : this.$el.find('input[name="frequency"]').val(),
        dosage            : this.$el.find('input[name="dosage"]').val(),
        contraindications : this.$el.find('input[name="contraindications"]').val(),
        additional        : this.$el.find('input[name="additional"]').val()
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
    }
  })
}