App.Feed.Collection.Events = Backbone.Collection.extend({
  model: App.Feed.Model.Event,
  url: '/feed/list',
  parse: function(data, options){
    return data.events;
  }
});