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