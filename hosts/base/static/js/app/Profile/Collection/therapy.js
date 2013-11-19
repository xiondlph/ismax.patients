App.Profile.Collection.Therapy = Backbone.Collection.extend({
  model: App.Profile.Model.Therapy,
  url: '/therapy/list',
  parse: function(data, options){
    return data.therapys;
  }
});
