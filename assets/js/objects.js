$(function () {
    $('form#objectCreate').submit(async function (event) {
        event.preventDefault();

        const form = this;

        $('button[type=submit]', form)
            .prop({
                disabled: true,
            })
            .html('<i class="fas fa-spinner fa-pulse"></i>');

        await axios.post('http://192.168.0.63:3000/object/create', {
            name: $('input[name=name]', form).val(),
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
                        .html(`O objeto "${$('input[name=name]', form).val()}" foi criado`);
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
})
