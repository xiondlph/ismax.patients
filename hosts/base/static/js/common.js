var App = {}

var errorDlg = $('<div title="Ошибка"><p>Произошла ошибка. Попробуйте позже!</p></div>');

$(document).ajaxSuccess(function(event, xhr, settings){
  var data = JSON.parse(xhr.responseText);
  if(!data.auth){
    window.location.href = '/user#login';
  }
});

$(document).ajaxError(function(data){
  errorDlg.dialog( "open" );
});

$(document).ready(function(){
  // Работа с сокетом
  window.socket = io.connect('http://patients.ismaxonline.com:3000', {resource  :'ismax.io'});
  socket.on('connect', function(){
    socket.on('command', function(data){
      console.log('socke_init');
    });
    socket.emit('command',{command: 'socke_init'});
  });

  errorDlg.dialog({
    modal: true,
    autoOpen: false,
    buttons: {
      Ok: function() {
        $( this ).dialog( "close" );
      }
    }
  });
});