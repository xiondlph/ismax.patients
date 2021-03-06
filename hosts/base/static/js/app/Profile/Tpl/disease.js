App.Profile.Templates.Disease = {
  List: [
    '<div class="list">',
    '</div>',
    '<input type="button" value="+" action="add" />'
  ].join("\n"),

  Item: [
    '<form action="#">',
    '  <table width="100%">',
    '    <tr>',
    '      <td align="right" colspan="3">',
    '        <input type="button" value="x" action="remove" />',
    '      </td>',
    '    </tr>',
    '    <tr>',
    '      <td><input type="text" name="name" value="<%= name %>"/></td>',
    '      <td>',
    '        <input type="radio" name="diagnosed" id="disease_diagnosed_0" value="0" <%= (diagnosed == 0) ? \'checked="checked"\': \'\' %>>',
    '        <label for="disease_diagnosed_0">Нет</label>',
    '        <input type="radio" name="diagnosed" id="disease_diagnosed_1" value="1" <%= (diagnosed == 1) ? \'checked="checked"\': \'\' %>>',
    '        <label for="disease_diagnosed_1">Да</label><br />',
    '        <input type="text" name="date" value="<%= date %>">',
    '      </td>',
    '      <td>',
    '      </td>',
    '    </tr>',
    '  </table>',
    '<form>'
  ].join("\n"),

  Symptoms: [
    '<ul>',
    '<%  _.each(symptoms, function(items, index){ %>',
    '    <li symptoms="<%= items.name %>" intensity="<%= items.intensity %>" state="view">',
    '    <div class="disease_symptoms_view">',
    '      <span><%= items.name %></span>',
    '     <span class="disease_symptoms_intensity_color">',
    '        <a class="disease_symptoms_intensity_color_yellow <%= (items.intensity == 1)? \'active\' : \'\' %>"></a>',
    '        <a class="disease_symptoms_intensity_color_orange <%= (items.intensity == 2)? \'active\' : \'\' %>"></a>',
    '        <a class="disease_symptoms_intensity_color_red <%= (items.intensity == 3)? \'active\' : \'\' %>"></a>',
    '      </span>',
    '    </div>',
    '    <div class="disease_symptoms_edit">',
    '        <form>',
    '          <table>',
    '            <tr>',
    '              <td valign="top">',
    '                <input type="text" name="symptoms" />',
    '              </td>',
    '              <td>',
    '                <input type="radio" name="intensity" id="intensity_<%= _id %>_1[<%= index %>]" value="1" />',
    '                <label for="intensity_<%= _id%>_1[<%= index %>]">Низкая</label>',
    '                <input type="radio" name="intensity" id="intensity_<%= _id %>_2[<%= index %>]" value="2" />',
    '                <label for="intensity_<%= _id%>_2[<%= index %>]">Стредняя</label>',
    '                <input type="radio" name="intensity" id="intensity_<%= _id %>_3[<%= index %>]" value="3" />',
    '                <label for="intensity_<%= _id%>_3[<%= index %>]">Высокая</label>',
    '              </td>',
    '            </tr>',
    '            <tr>',
    '              <td align="right" colspan="2">',
    '                <input type="button" class="disease_symptoms_intensity_save" value="Сохранить"/>',
    '                <input type="button" class="disease_symptoms_intensity_remove" value="Удалить"/>',
    '                <input type="button" class="disease_symptoms_intensity_cencel" value="Отмена"/>',
    '              </td>',
    '            </tr>',
    '          </table>',
    '        </form>',
    '    </div>',
    '  </li>',
    '<% }); %>',
    '</ul>',
    '<input type="button" class="disease_symptoms_add" value="+"/>'
  ].join("\n"),

  SymptomsBlank: [
    '  <li symptoms="" intensity="" state="blank">',
    '    <div class="disease_symptoms_blank">',
    '        <form>',
    '          <table>',
    '            <tr>',
    '              <td valign="top">',
    '                <input type="text" name="symptoms" />',
    '              </td>',
    '              <td>',
    '                <input type="radio" name="intensity" id="intensity_<%= _id %>_1[blank]" value="1" />',
    '                <label for="intensity_<%= _id%>_1[blank]">Низкая</label>',
    '                <input type="radio" name="intensity" id="intensity_<%= _id %>_2[blank]" value="2" />',
    '                <label for="intensity_<%= _id%>_2[blank]">Стредняя</label>',
    '                <input type="radio" name="intensity" id="intensity_<%= _id %>_3[blank]" value="3" />',
    '                <label for="intensity_<%= _id%>_3[blank]">Высокая</label>',
    '              </td>',
    '            </tr>',
    '            <tr>',
    '              <td align="right" colspan="2">',
    '                <input type="button" class="disease_symptoms_intensity_save" value="Сохранить"/>',
    '                <input type="button" class="disease_symptoms_intensity_remove" value="Удалить"/>',
    '                <input type="button" class="disease_symptoms_intensity_cencel" value="Отмена"/>',
    '              </td>',
    '            </tr>',
    '          </table>',
    '        </form>',
    '    </div>',
    '  </li>'
  ].join("\n"),
}