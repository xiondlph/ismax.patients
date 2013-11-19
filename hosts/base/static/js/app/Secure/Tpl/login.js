App.Secure.Templates.Login = {
  Form: [
    '<form>',
    '  <fieldset>',
    '    <legend>Авторизация</legend>',
    '    <table>',
    '      <tr>',
    '        <td>',
    '          <input type="text" placeholder="Email" name="email" />',
    '        </td>',
    '      </tr>',
    '      <tr>',
    '        <td>',
    '          <input type="password" placeholder="Пароль" name="password" />',
    '        </td>',
    '      </tr>',
    '      <tr>',
    '        <td>',
    '          <input type="submit" value="Вход" />',
    '        </td>',
    '      </tr>',
    '      <tr>',
    '        <td>',
    '          <a href="#" id="login_forgot_link">Забыли пароль?</a>',
    '        </td>',
    '      </tr>',
    '    </table>',
    '  </fieldset>',
    '</form>'
  ].join("\n"),

  Forgot: [
    '<div id="dialog-confirm" title="Забыли пароль?">',
    '  <p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 7px 20px 0;"></span>На Ваш электронный адрес будет отправленно сообщение с новым паролем для входа!</p>',
    '</div>'
  ].join("\n"),
}