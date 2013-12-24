/**!
 * Panel index
 *
 * @package    ismax
 * @subpackage Base host
 * @author     Xiondlph <admin@ismax.ru>
 **/

/**!
 * Модуль инициализации хоста
 **/

// Подклучения сервера
var server = require('../../server');

// Нобор контроллеров
var index     = require('./controller/index');
var xhr       = require('./controller/xhr');
var secure    = require('./controller/secure');
var profile   = require('./controller/profile');
var disease   = require('./controller/disease');
var therapy   = require('./controller/therapy');
var feed      = require('./controller/feed');

// Инициализация хоста
var host = server.init('patients.ismaxonline.my');

//Установка путей для статики и шаблонов
host.setStaticPath(__dirname+'/static/');
host.setViewPath(__dirname+'/view/');

// Назначение HTTP маршрутов
host.setRoute('/', secure.user, index.index);

host.setRoute('/user/isauth', xhr.isXhr, secure.user, secure.auth, secure.isAuth);
host.setRoute('/user/signin', xhr.isXhr, secure.user, secure.guest, secure.signin);
host.setRoute('/user/signout', secure.user, secure.auth, secure.signout);
host.setRoute('/user/password', xhr.isXhr, secure.user, secure.auth, secure.password);
host.setRoute('/user/mail', xhr.isXhr, secure.user, secure.auth, secure.email);
host.setRoute('/user', secure.user, secure.guest, secure.index);
host.setRoute('/user/create', secure.user, secure.guest, secure.create);
host.setRoute('/user/forgot', xhr.isXhr, secure.user, secure.guest, secure.forgot);

host.setRoute('/profile', secure.user, secure.auth, profile.profile);
host.setRoute('/profile/get', secure.user, secure.auth, profile.getProfile);
host.setRoute('/profile/info/set', secure.user, secure.auth, profile.setInfo);
host.setRoute('/profile/avatar/set', secure.user, secure.auth, profile.setAvatar);
host.setRoute('/profile/location/set', secure.user, secure.auth, profile.setLocation);
host.setRoute('/profile/hobby/add', secure.user, secure.auth, profile.addHobby);
host.setRoute('/profile/hobby/del', secure.user, secure.auth, profile.delHobby);
host.setRoute('/profile/description/set', secure.user, secure.auth, profile.setDescription);

host.setRoute('/disease/list', secure.user, secure.auth, disease.list);
host.setRoute('/disease/create', secure.user, secure.auth, disease.create);
host.setRoute('/disease/update', secure.user, secure.auth, disease.update);
host.setRoute('/disease/remove', secure.user, secure.auth, disease.remove);

host.setRoute('/therapy/list', secure.user, secure.auth, therapy.list);
host.setRoute('/therapy/create', secure.user, secure.auth, therapy.create);
host.setRoute('/therapy/update', secure.user, secure.auth, therapy.update);
host.setRoute('/therapy/remove', secure.user, secure.auth, therapy.remove);

host.setRoute('/feed', secure.user, secure.auth, feed.index);
host.setRoute('/feed/list', secure.user, secure.auth, feed.list);
host.setRoute('/feed/create', secure.user, secure.auth, feed.create);