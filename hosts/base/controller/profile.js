/**
 * Profile controller
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Контроллер управления
 * профилем пользователя
 **/
 
 // Объявление модулей
var jade          = require('jade'),
    model         = require('../model/profile'),
    patterns      = require('../../../lib/patterns'),
    json          = require('../../../lib/json');

//---------------------- HTTP запросы ----------------------//

// Страница профиля
exports.profile = function(httpErr, req, res){
  jade.renderFile(__dirname+'/../view/profile/index.jade', {
    user: req.user
  }, httpErr.bind(function (err, html){
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf8'
    });
    res.write(html);
    res.end();
  }));
}

// Получение данных профиля
exports.getProfile = function(httpErr, req, res){
  model.getProfile(httpErr, req.user._id, function(profile){
    if(profile){
      var response = {
        auth: true,
        success: true,
        profile: {
          id:           req.user._id,
          email:        req.user.email,
          firstname:    profile.firstname,
          lastname:     profile.lastname,
          avatar:       profile.avatar,
          gender:       profile.gender,
          date:         profile.date,
          profession:   profile.profession,
          type:         profile.type,
          country:      profile.country,
          city:         profile.city,
          hobby:        profile.hobby,
          description:  profile.description
        }
      };
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();      
    }else{
      model.create(httpErr, req.user._id, function(profile){
        var response = {
          auth: true,
          success: true,
          profile: {
            id:           req.user._id,
            email:        req.user.email,
            firstname:    profile.firstname,
            lastname:     profile.lastname,
            avatar:       profile.avatar,
            gender:       profile.gender,
            date:         profile.date,
            profession:   profile.profession,
            type:         profile.type,
            country:      profile.country,
            city:         profile.city,
            hobby:        profile.hobby,
            description:  profile.description
          }
        };
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
      });
    }
  });
};

// Обновление данных профиля
exports.setInfo = function(httpErr, req, res){
  var data = json.parse(req.post);
  var profile = {};

  if(data){
    if(data.firstname){profile.firstname = data.firstname};
    if(data.lastname){profile.lastname = data.lastname};
    if(data.avatar){profile.avatar = data.avatar};
    if(data.gender){profile.gender = data.gender};
    if(data.date){profile.date = data.date};
    if(data.profession){profile.profession = data.profession};
    if(data.type){profile.type = data.type};
    if(data.country){profile.country = data.country};
    if(data.city){profile.city = data.city};
    if(data.hobby){profile.hobby = data.hobby};
    if(data.description){profile.description = data.description};

    if(data.diseaseParam1){profile.diseaseParam1 = data.diseaseParam1};
    if(data.diseaseParam2){profile.diseaseParam2 = data.diseaseParam2};
    if(data.diseaseParam3){profile.diseaseParam3 = data.diseaseParam3};
    if(data.diseaseParam4){profile.diseaseParam4 = data.diseaseParam4};
    if(data.diseaseParam5){profile.diseaseParam5 = data.diseaseParam5};

    model.setProfile(httpErr, req.user._id, profile, function(result){
      var response = {
        auth: true,
        success: true
      };

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();
    });
  }else{
    var response = {
      auth: true,
      success: false
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
};

// Установка аватара
exports.setAvatar = function(httpErr, req, res){
  var data = json.parse(req.post);

  if(data){
    model.setAvatar(httpErr, req.user._id, data.avatar, function(result){
      var response = {
        auth: true,
        success: true
      }
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();
    });       
   
  }else{
    var response = {
      auth: true,
      success: false
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
}

// Установка локации
exports.setLocation = function(httpErr, req, res){
  var data = json.parse(req.post);
  if(data){
    model.setProfile(httpErr, req.user._id, {
      country:  data.profile.country,
      city:     data.profile.city
    }, function(result){
      var response = {
        auth: true,
        success: true
      }
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();
    });       
   
  }else{
    var response = {
      auth: true,
      success: false
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
}

// Добавление хобби
exports.addHobby = function(httpErr, req, res){
  var data = json.parse(req.post);
  if(data){
    model.addHobby(httpErr, req.user._id, data.profile.hobby, function(result){
      var response = {
        auth: true,
        success: true
      }
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();
    });       
   
  }else{
    var response = {
      auth: true,
      success: false
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
}

// Удаление хобби
exports.delHobby = function(httpErr, req, res){
  var data = json.parse(req.post);
  if(data){
    model.delHobby(httpErr, req.user._id, data.profile.hobby, function(result){
      var response = {
        auth: true,
        success: true
      }
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();
    });       
   
  }else{
    var response = {
      auth: true,
      success: false
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
}

// Установка описания
exports.setDescription = function(httpErr, req, res){
  var data = json.parse(req.post);
  if(data){
    model.setProfile(httpErr, req.user._id, {
      description:  data.profile.description,
    }, function(result){
      var response = {
        auth: true,
        success: true
      }
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application-json; charset=utf8');
      res.write(JSON.stringify(response, null, "\t"));
      res.end();
    });       
   
  }else{
    var response = {
      auth: true,
      success: false
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
}