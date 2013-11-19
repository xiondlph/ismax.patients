/**
 * Feed model
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Модель данных
 * ленты событий
 **/

// Объявление модулей
var mongo         = require('../../../lib/db');

// Получение списка событий
exports.list = function(httpErr, user, accept){
  mongo.db.collection('feed', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.find({user: user}).toArray(httpErr.bind(function(err, events){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(events);
      }
    }));
  }));
};

// Создание объекта события
exports.create = function(httpErr, event, accept){
  mongo.db.collection('feed', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.insert(event, httpErr.bind(function(err, event){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(event[0]);
      }
    }));
  }));
};