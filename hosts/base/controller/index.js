/**!
 * Index controller
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Index контроллер
 **/

// Объявление модулей
var jade    = require('jade'),
    socket  = require('../../../server/socket');

//---------------------- HTTP запросы ----------------------//


// Домашняя страница
exports.index = function(httpErr, req, res){
  jade.renderFile(__dirname+'/../view/index.jade',{
    user: req.user
  },httpErr.bind(function (err, html){
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf8'
    });
    res.write(html);
    res.end();
  }));
};

//--------------------- Socket запросы ---------------------//

// Инициализация сокет соединения
var _init = function(socketErr, sio, socket, data){
  socket.handshake.onDisconnect = function(socketErr, sio, socket){
    console.log('socke - disconnect')
  };
}

socket.setCommand('socke_init', _init);