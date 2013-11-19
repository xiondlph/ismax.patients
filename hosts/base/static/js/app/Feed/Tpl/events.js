App.Feed.Templates.Events = {
  List: [
    '<div class="list">',
    '</div>'
  ].join("\n"),

  Item: [
    '<form action="#">',
    '  <table width="100%">',
    '    <tr>',
    '      <td>Тип: <%= type %>',
    '      </td>',
    '    </tr>',
    '    <tr>',
    '      <td>',
    '        Диагностированно: <%= content.diagnosed %>',
    '      </td>',
    '    </tr>',
    '  </table>',
    '<form>'
  ].join("\n"),
}