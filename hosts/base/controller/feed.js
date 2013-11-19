/**
 * Feed controller
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 */

/**!
 * Контроллер управления
 * лентой событий
 **/
 
 // Объявление модулей
var jade          = require('jade'),
    model         = require('../model/feed'),
    patterns      = require('../../../lib/patterns'),
    json          = require('../../../lib/json');

//---------------------- HTTP запросы ----------------------//

// Получения списка событий
exports.list = function(httpErr, req, res){
  model.list(httpErr, req.user._id, function(events){
    var response = {
      auth: true,
      success: true,
      events: events
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application-json; charset=utf8');
    res.write(JSON.stringify(response, null, "\t"));
    res.end();
  });
};

// Создание объекта события
exports.create = function(httpErr, req, res){
  var data = json.parse(req.post);
  var event = {};

  if(data){
    event.user = req.user._id;
    if(data.type){event.type = data.type};
    if(data.content){event.content = data.content};

    model.create(httpErr, event, function(event){
      console.log(event);
      var response = {
        auth: true,
        success: true,
        event: event
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

// Страница ленты
exports.index = function(httpErr, req, res){
  jade.renderFile(__dirname+'/../view/feed/index.jade', {
    user: req.user
  }, httpErr.bind(function (err, html){
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf8'
    });
    res.write(html);
    res.end();
  }));
}