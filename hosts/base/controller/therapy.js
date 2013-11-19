/**
 * Therapy controller
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Контроллер управления
 * данными лечения пользователя
 **/
 
 // Объявление модулей
var jade          = require('jade'),
    model         = require('../model/therapy'),
    patterns      = require('../../../lib/patterns'),
    json          = require('../../../lib/json');

//---------------------- HTTP запросы ----------------------//

// Получение списка заболеваний
exports.list = function(httpErr, req, res){
  model.list(httpErr, req.user._id, function(therapys){
    var response = {
      auth: true,
      success: true,
      therapys: therapys
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  });
};

// Создание объекта заболевания
exports.create = function(httpErr, req, res){
  model.create(httpErr, req.user._id, function(therapy){
    var response = {
      auth: true,
      success: true,
      therapy: therapy
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
  var therapy = {};

  if(data){
    if(data.drug){therapy.drug = data.drug};
    if(data.appointment){therapy.appointment = data.appointment};
    if(data.evaluation){therapy.evaluation = data.evaluation};
    if(data.sideeffect){therapy.sideeffect = data.sideeffect};
    if(data.term){therapy.term = data.term};
    if(data.frequency){therapy.frequency = data.frequency};
    if(data.dosage){therapy.dosage = data.dosage};
    if(data.contraindications){therapy.contraindications = data.contraindications};
    if(data.additional){therapy.additional = data.additional};

    model.update(httpErr, req.user._id, data._id, therapy, function(result){
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