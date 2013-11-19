App.Feed.Model.Event = Backbone.Model.extend({
  idAttribute: '_id',
  parse: function(data, options){
    if(options){
      return data.event
    }else{
      return data;
    }
  }
});