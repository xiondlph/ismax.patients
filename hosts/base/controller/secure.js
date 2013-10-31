/**
 * Secure controller
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Контроллер управления,
 * системой безопастности
 **/

// Объявление модулей
var crypto        = require('crypto'),
    jade          = require('jade')
    nodemailer    = require("nodemailer"),
    model         = require('../model/secure'),
    cookie        = require('../../../lib/cookie'),
    patterns      = require('../../../lib/patterns'),
    json          = require('../../../lib/json');

//---------------------- HTTP запросы ----------------------//

// Получение пользователя
exports.user = function(httpErr, req, res, next){
  // Работа с индексом сессии
  var _cookie = cookie.parse(req.headers.cookie);
  var index  = (_cookie) ? _cookie.ismax_session : '';

  if(index == ''){
    next();
    return;
  }
  
  model.getUserBySession(httpErr, index, function(user){
    if(!user){
      next();
      return;
    }else{
      req.user = user;
      next();
    }
  });
};

// Проверка авторизации
exports.isAuth = function(httpErr, req, res){
  var response = {
    auth: true
  }
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application-json; charset=utf8');
  res.write(JSON.stringify(response, null, "\t"));
  res.end();
  return;
};

// Авторизация
exports.signin = function(httpErr, req, res){
  var data = json.parse(req.post);
  if(data){

    // Работа с индексом сессии
    var _cookie = cookie.parse(req.headers.cookie);
    var index  = (_cookie) ? _cookie.ismax_session : '';
  
    if(!patterns.email.test(data.email)){
      throw new Error('Validate error - email is invalid');
    }
  
    model.getUserByEmail(httpErr, data.email, function(user){
      if(!user){
        var response = {
          auth: false
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
  
        return;
      }
  
      if(crypto.createHmac('sha256', data.password).digest('hex') != user.password){
        var response = {
          auth: false
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
  
        return
      }
      
      model.setSession(httpErr, data.email, index, function(result){
        var response = {
          auth: true
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
      });
    });    
  }else{
    var response = {
      auth: false,
      success: false
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  }
};

// Выход из сессии
exports.signout = function(httpErr, req, res){
  // Работа с индексом сессии
  var _cookie = cookie.parse(req.headers.cookie);
  var index  = (_cookie) ? _cookie.ismax_session : '';

  model.unsetSession(httpErr, index, function(result){
    res.statusCode = 302;
    res.setHeader('Location', req.headers.referer);
    res.end();
  });
};

// Проверка авторизации
exports.auth = function(httpErr, req, res, next){
  if(!req.user){
    if(req.headers['x-requested-with']){
      if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
        var response = {
          auth: false
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();   
        return;
      }
    }
    
    res.statusCode = 302;
    res.setHeader('Location','/user#login');
    res.end();
    return;
  }else{
    next();
  }
};

// Проверка на НЕ авторизованность
exports.guest = function(httpErr, req, res, next){
  if(!req.user){
    next();
    return;
  }else{
    if(req.headers['x-requested-with']){
      if(req.headers['x-requested-with'] == 'XMLHttpRequest'){
        var response = {
          auth: true,
          success: false
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();   
        return;
      }
    }

    
    res.statusCode = 302;
    res.setHeader('Location','/profile');
    res.end();
    return;
  }
};

// Создание нового пользователя
exports.create = function(httpErr, req, res){
  var data = json.parse(req.post);

  if(data){
    if(!patterns.email.test(data.user.email)){
      throw new Error('Validate error - email is invalid');
    }
    model.isExistByEmail(httpErr, data.user.email, function(count){
      if(count > 0){
        var response = {
          auth: true,
          exist: true
        };
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
      }else{
        // Шифрование
        data.user.password  = crypto.createHmac('sha256', data.user.password).digest('hex');
        data.user.salt      = crypto.createHmac('sha256', data.user.email).digest('hex');

        data.user.active    = false;
        model.create(httpErr, data.user, function(user){
          var smtpTransport = nodemailer.createTransport("SMTP",{
            service: "Gmail",
            auth: {
              user: "admin@ismax.ru",
              pass: "474484237QwErT"
            }
          });
        
          smtpTransport.sendMail({
            from: "Shukhrat <admin@ismax.ru",
            to: user[0].email,
            subject: "User activation",
            text: '<a href="/profile/active?sl='+user[0].salt+'">Activation link</a>'
          }, function(error, response){
            if(error){
              var response = {
                auth: false,
                success: false
              }
            }else{
              var response = {
                auth: false,
                success: true
              }
            }
              
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application-json; charset=utf8');
            res.write(JSON.stringify(response, null, "\t"));
            res.end();
          });
        });
      }
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

// Смена текущего пароля
exports.password = function(httpErr, req, res){
  var data = json.parse(req.post);

  if(data){
    var password = crypto.createHmac('sha256', data.password).digest('hex');

    model.setPassword(httpErr, req.user._id, password, function(result){
      var response = {
        auth: true,
        success: true,
        old: true
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

// Смена текущего почтового адреса
exports.email = function(httpErr, req, res){
  var data = json.parse(req.post);

  if(data){
    if(!patterns.email.test(data.email)){
      throw new Error('Validate error - email is invalid');
    }

    model.isExistByEmail(httpErr, data.email, function(count){
      if(count > 0){
        if(data.email == req.user.email){
          var response = {
            auth: true,
            success: true,
            exist: false
          };   
        }else{
          var response = {
            auth: true,
            success: true,
            exist: true
          };
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
      }else{
        model.setEmail(httpErr, req.user._id, data.email, function(result){
          var response = {
            auth: true,
            success: true,
            exist: false
          }
          
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application-json; charset=utf8');
          res.write(JSON.stringify(response, null, "\t"));
          res.end();
        });
      }
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

// Генирация нового пароля
exports.forgot = function(httpErr, req, res, next){
  var data = json.parse(req.post);
  if(data){  
    if(!patterns.email.test(data.email)){
      throw new Error('Validate error - email is invalid');
    }

    model.getUserByEmail(httpErr, data.email, function(user){
      if(!user){
        var response = {
          auth: false,
          success: false
        }
  
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application-json; charset=utf8');
        res.write(JSON.stringify(response, null, "\t"));
        res.end();
  
        return;
      }
      var password = crypto.createHmac('sha256', '123').digest('hex');

      model.setPasswordByEmail(httpErr, user.email, password, function(result){
        var smtpTransport = nodemailer.createTransport("SMTP",{
          service: "Gmail",
          auth: {
            user: "admin@ismax.ru",
            pass: "474484237QwErT"
          }
        });
      
        smtpTransport.sendMail({
          from: "Shukhrat <admin@ismax.ru",
          to: user.email,
          subject: "Password",
          text: "new password: 123"
        }, function(error, response){
          if(error){
            var response = {
              auth: false,
              success: false
            }
          }else{
            var response = {
              auth: false,
              success: true
            }
          }
            
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application-json; charset=utf8');
          res.write(JSON.stringify(response, null, "\t"));
          res.end();
        });
      });
    });
  }
};

// Страница пользователя
exports.index = function(httpErr, req, res){
  jade.renderFile(__dirname+'/../view/secure/index.jade', {
    user: req.user
  }, httpErr.bind(function (err, html){
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf8'
    });
    res.write(html);
    res.end();
  }));
}
