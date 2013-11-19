App.Profile.Model.Disease = Backbone.Model.extend({
  idAttribute: '_id',
  sync: function(method, model, options){

    var hasAttributes = false;
    var param = {
      url:  '/disease/update',
      type: 'GET'
    };

    if(method == 'create'){
      param.type  = 'POST';
      param.data  = {};

      hasAttributes = true;
      param.url   = '/disease/create';
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
      param.url   = '/disease/remove';
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
            options.success(data, status, xhr);
            
            // Сохранение события
            $.ajax({
              url: '/feed/create',
              type: 'POST',
              dataType:   'json',
              data: JSON.stringify({
                type: method,
                content: param.data
              })
            });
          }
        }
      });      
    }
  },
  getUrl: function(options){
    return '/disease/update';
  },
  parse: function(data, options){
    if(options){
      return data.disease
    }else{
      return data;
    }
  }
});