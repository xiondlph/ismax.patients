/**
 * Profile model
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Модель данных
 * профиля
 **/

// Объявление модулей
var mongo         = require('../../../lib/db');

// Создание нового профиля
exports.create = function(httpErr, id, accept){
  mongo.db.collection('profiles', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.insert({
      _id: id
    }, httpErr.bind(function(err, profile){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(profile);
      }
    }));
  }));
};

// Получения данных профиля по id
exports.getProfile = function(httpErr, id, accept){
  mongo.db.collection('profiles', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.findOne({_id: id}, httpErr.bind(function(err, profile){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(profile);
      }
    }));
  }));
};

// Сохранение данных профиля по id
exports.setProfile = function(httpErr, id, profile, accept){
  mongo.db.collection('profiles', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({_id: id}, {$set: profile}, httpErr.bind(function(err, result){
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

// Обновление данных профиля по id
exports.setInfo = function(httpErr, id, profile, accept){
  mongo.db.collection('profiles', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({_id: id}, {
      $set: {
        firstname:  profile.firstname,
        lastname:   profile.lastname,
        gender:     profile.gender,
        date:       profile.date,
        profession: profile.profession,
        type:       profile.type
      }
    }, httpErr.bind(function(err, result){
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

// Установка аватара
exports.setAvatar = function(httpErr, id, avatar, accept){
  mongo.db.collection('profiles', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({_id: id}, {$set: {avatar: avatar}}, httpErr.bind(function(err, result){
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

// Добавление хобби
exports.addHobby = function(httpErr, id, hobby, accept){
  mongo.db.collection('profiles', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({_id: id}, {$push: {hobby: hobby}}, httpErr.bind(function(err, result){
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

// Удаление хобби
exports.delHobby = function(httpErr, id, hobby, accept){
  mongo.db.collection('profiles', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({_id: id}, {$pull: {hobby: hobby}}, httpErr.bind(function(err, result){
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