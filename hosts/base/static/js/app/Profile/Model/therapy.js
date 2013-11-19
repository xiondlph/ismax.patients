App.Profile.Model.Therapy = Backbone.Model.extend({
  idAttribute: '_id',
  sync: function(method, model, options){

    var hasAttributes = false;
    var param = {
      url:  '/therapy/update',
      type: 'GET'
    };

    if(method == 'create'){
      param.type  = 'POST';
      param.data  = {};

      hasAttributes = true;
      param.url   = '/therapy/create';
    }

    if(method == 'update'){
      param.type  = 'POST';
      param.data  = {
        _id: model.get('_id')
      };
      
      _.each(options.changes, function(val, key){
        if(!hasAttributes) hasAttributes = true;
        if(val){param.data[key] = model.get(key)};
      }, this);

      param.url   = this.getUrl(options);
    }

    if(method == 'delete'){
      param.type  = 'POST';
      param.data  = {
        _id: model.get('_id')
      };

      hasAttributes = true;
      param.url   = '/therapy/remove';
    }

    if(hasAttributes){
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
    }
  },
  getUrl: function(options){
    return '/therapy/update';
  },
  parse: function(data, options){
    if(options){
      return data.therapy
    }else{
      return data;
    }
  }
});