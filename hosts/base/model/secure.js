/**
 * Secure model
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Модель данных
 * системой безопастности
 **/

// Объявление модулей
var mongo         = require('../../../lib/db');

// Получения пользователя по индексу сессии
exports.getUserBySession = function(httpErr, index, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.findOne({'sid': index}, httpErr.bind(function(err, user){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(user);
      }
    }));
  }));  
};

// Получения пользователя по Email
exports.getUserByEmail = function(httpErr, email, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.findOne({'email': email}, httpErr.bind(function(err, user){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(user);
      }
    }));
  }));  
};

// Установка хеша текущей сессии для пользователя
exports.setSession = function(httpErr, email, index, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({'email': email}, {$set: {sid: index}}, httpErr.bind(function(err, result){
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

// Удаление хеша текущей сессии для пользователя
exports.unsetSession = function(httpErr, index, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({'sid': index}, {$unset: {sid: index}}, httpErr.bind(function(err, result){
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

// Проверка уникальности по Email
exports.isExistByEmail = function(httpErr, email, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);      
      return;
    }

    collection.count({'email': email}, httpErr.bind(function(err, count){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(count);
      }
    }));
  }));
}

// Создание нового пользователя
exports.create = function(httpErr, user, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.insert({
      email     : user.email,
      password  : user.password,
      salt      : user.salt,
      active    : user.active
    }, httpErr.bind(function(err, user){
      if(err){
        throw new Error('Mongo error - '+err.message);
        return;
      }

      if(typeof accept == 'function'){
        accept(user);
      }
    }));
  }));
};

// Установка нового пароля для пользователя
exports.setPassword = function(httpErr, id, password, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({_id: id}, {$set: {password: password}}, httpErr.bind(function(err, result){
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

// Установка нового пароля для пользователя по Email
exports.setPasswordByEmail = function(httpErr, email, password, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({email: email}, {$set: {password: password}}, httpErr.bind(function(err, result){
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

// Установка нового почтового адреса для пользователя
exports.setEmail = function(httpErr, id, email, accept){
  mongo.db.collection('users', httpErr.bind(function(err, collection){
    if(err){
      throw new Error('Mongo error - '+err.message);
      return;
    }

    collection.update({_id: id}, {$set: {email: email}}, httpErr.bind(function(err, result){
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