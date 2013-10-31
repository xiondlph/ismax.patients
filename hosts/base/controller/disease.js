/**
 * Disease controller
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Контроллер управления
 * списком заболеваний пользователя
 **/
 
 // Объявление модулей
var jade          = require('jade'),
    model         = require('../model/disease'),
    patterns      = require('../../../lib/patterns'),
    json          = require('../../../lib/json');

//---------------------- HTTP запросы ----------------------//

// Получения получение списка заболеваний
exports.list = function(httpErr, req, res){
  model.list(httpErr, req.user._id, function(diseases){
    var response = {
      auth: true,
      success: true,
      diseases: diseases
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  });
};

// Создание объекта заболевания
exports.create = function(httpErr, req, res){
  model.create(httpErr, req.user._id, function(disease){
    var response = {
      auth: true,
      success: true,
      disease: disease
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  });
};

// Обновление данных заболевания
exports.update = function(httpErr, req, res){
  var data = json.parse(req.post);
  var disease = {};

  if(data){
    if(data.name){disease.name = data.name};
    if(data.diagnosed){disease.diagnosed = data.diagnosed};
    if(data.date){disease.date = data.date};
    if(data.symptoms){disease.symptoms = data.symptoms};

    model.update(httpErr, req.user._id, data._id, disease, function(result){
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

// Удаление объекта заболевания
exports.remove = function(httpErr, req, res){
  var data = json.parse(req.post);

  if(data){
    model.remove(httpErr, req.user._id, data._id, function(result){
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