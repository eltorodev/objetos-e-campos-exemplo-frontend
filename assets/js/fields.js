(async () => {
  await axios
    .get('http://192.168.0.63:3000/object').then(response => response)
    .then((response) => {
      for (table of response.data.data) {
        $('select[name=object]').append(
          `<option value="${table.Tables_in_cpexobject}">${table.Tables_in_cpexobject}</option>`
        );

        $('select[name=objects]').append(
          `<option value="${table.Tables_in_cpexobject}">${table.Tables_in_cpexobject}</option>`
        );
      }
    })
    .catch((error) => console.log(error));
})();

$(function () {

  $('form#fieldCreate').submit(async function (event) {
    event.preventDefault();

    const form = this;

    $('button[type=submit]', form)
      .prop({
        disabled: true,
      })
      .html('<i class="fas fa-spinner fa-pulse"></i>');

    await axios.post('http://192.168.0.63:3000/field/create', {
      object: $('select[name=object]', form).val(),
      name: $('input[name=name]', form).val(),
      type: $('input[name=type]', form).val(),
    })
      .then(function (response) {

        $('button[type=submit]', form)
          .prop({
            disabled: false,
          })
          .html('Salvar');

        if (response.data.success === false) {
          $('#message', form)
            .removeClass('alert alert-success')
            .addClass('alert alert-danger')
            .html(response.data.message);
        } else {
          $('#message', form)
            .removeClass('alert alert-danger')
            .addClass('alert alert-success')
            .html(`O campo "${$('input[name=name]', form).val()}" foi criado`);
        }


      })
      .catch(function (error) {
        $('button[type=submit]', form)
          .prop({
            disabled: false,
          })
          .html('Salvar');

        $('#message', form)
          .removeClass('alert alert-success')
          .addClass('alert alert-danger')
          .html(error.message);
      });
  })

  $('select[name=objects]').change(async function () {
    await axios
      .get(`http://192.168.0.63:3000/field/${$(this).val()}`)
      .then((response) => {

        $('#data').removeClass('d-none');

        $('#tbody').html('');
        for (data of response.data.data) {

          $('#tbody').append(
            `
            <tr>
              <th scope="row">${data.Field}</th>
              <td>${data.Type}</td>
              <td>${data.Null}</td>
              <td>${data.Key}</td>
              <td>${data.Default}</td>
              <td>${data.Extra}</td>
            </tr>
            `
          );
        }
      })
      .catch((error) => {
        alert(error.message)
      });
  })
})
