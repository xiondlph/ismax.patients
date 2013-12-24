App.Index.Templates.Index = {
  Login: [
    '<form action="#">',
    '  <input type="text" name="email" placeholder="Email" info="Укажите Email" class="invalid"/>',
    '  <input type="password" name="password" placeholder="Пароль" info="Укажите пароль" class="invalid"/>',
    '  <a href="#" class="btn send"><span>Вход</span></a>',
    '  <img src="/images/ajax-loader.gif" class="loader" />',
    '  <br /><a href="#" class="forgot">Забыли пароль?</a>',
    '</form>',
    '<span>Войти</span>'
  ].join("\n")
}