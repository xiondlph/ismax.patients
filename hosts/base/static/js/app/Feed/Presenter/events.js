App.Feed.View.Events = {
  List: Backbone.View.extend({
    tagName: 'div',
    className: 'eventList',
    events:{

    },

    initialize: function(){
      this.collection = new App.Feed.Collection.Events();
    },

    render: function(){
      var me = this;
      var tmpl = _.template(App.Feed.Templates.Events.List);
      me.$el.html(tmpl);
      if(me.collection.length == 0){
        me.collection.fetch({success: function(collection, response, options){
          _.each(collection.models, function(item){
            me.renderEvent(item);
          }, me);
        }});      
      }else{
        _.each(me.collection.models, function(item){
          me.renderEvent(item);
        }, me);
      }

      this.options.obj.html(this.$el);
      return this.$el;
    },

    renderEvent: function(item){
      var eventView = new App.Feed.View.Events.Item({model: item});
      this.$el.find('.list').append(eventView.render());
    },
  }),

  Item: Backbone.View.extend({
    tagName: 'div',
    className: 'event',
    events:{

    },

    initialize: function(){
      this.render();
    },

    render: function(){
      var tmpl = _.template(App.Feed.Templates.Events.Item);
      this.$el.html(tmpl(this.model.toJSON()));

      return this.$el;
    }
  }),
}