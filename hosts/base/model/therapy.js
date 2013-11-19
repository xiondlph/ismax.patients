/**
 * Therapy model
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Модель данных
 * лечения
 **/

// Объявление модулей
var mongo         = require('../../../lib/db');

// Получение списка заболеваний
exports.list = function(httpErr, user, accept){
  mongo.db.collection('therapys', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.find({user: user}).toArray(httpErr.bind(function(err, therapys){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(therapys);
      }
    }));
  }));
};

// Создание объекта заболевания
exports.create = function(httpErr, user, accept){
  mongo.db.collection('therapys', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.insert({user: user}, httpErr.bind(function(err, therapy){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(therapy[0]);
      }
    }));
  }));
};

// Обновление данных заболевания
exports.update = function(httpErr, user, id, therapy, accept){
  mongo.db.collection('therapys', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({user: user, _id: new mongo.bson.ObjectID(id)}, {$set: therapy}, httpErr.bind(function(err, result){
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
  mongo.db.collection('therapys', httpErr.bind(function(err, collection){
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