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
// Объявление модулей
var jade    = require('jade'),
    socket  = require('../../../server/socket'),
    cookie  = require('../../../lib/cookie');

//---------------------- HTTP запросы ----------------------//


// Домашняя страница
exports.index = function(httpErr, req, res){
  // Работа с индексом сессии
  var _cookie = cookie.parse(req.headers.cookie);
  var index  = (_cookie) ? _cookie.ismax_session : '';
  if(index == ''){
    var index = cookie.uid(64);
    res.setHeader("Set-Cookie", 'ismax_session='+index+'; path=/; domain=ismaxonline.com');
  }else{
    res.setHeader("Set-Cookie", 'ismax_session='+index+'; path=/; domain=ismaxonline.com');
  }

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