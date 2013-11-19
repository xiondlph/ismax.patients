App.Profile.Collection.Disease = Backbone.Collection.extend({
  model: App.Profile.Model.Disease,
  url: '/disease/list',
  parse: function(data, options){
    return data.diseases;
  }
});
