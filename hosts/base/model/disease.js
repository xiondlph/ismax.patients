/**
 * Disease model
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Модель данных
 * заболевания
 **/

// Объявление модулей
var mongo         = require('../../../lib/db');

// Получения получение списка заболеваний
exports.list = function(httpErr, user, accept){
  mongo.db.collection('diseases', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.find({user: user}).toArray(httpErr.bind(function(err, diseases){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(diseases);
      }
    }));
  }));
};

// Создание объекта заболевания
exports.create = function(httpErr, user, accept){
  mongo.db.collection('diseases', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.insert({user: user}, httpErr.bind(function(err, disease){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(disease[0]);
      }
    }));
  }));
};

// Обновление данных заболевания
exports.update = function(httpErr, user, id, disease, accept){
  mongo.db.collection('diseases', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({user: user, _id: new mongo.bson.ObjectID(id)}, {$set: disease}, httpErr.bind(function(err, result){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(result);
      }
    }));
  }));
};

// Удаление объекта заболевания
exports.remove = function(httpErr, user, id, accept){
  mongo.db.collection('diseases', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.remove({user: user, _id: new mongo.bson.ObjectID(id)}, httpErr.bind(function(err, result){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(result);
      }
    }));
  }));
};