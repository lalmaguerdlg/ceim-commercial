$(document).ready(function(){
    "use strict";

    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value)
    }, "type the correct answer -_-");

    // validate contactForm form
    $(function() {
        $('#contactForm').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                name: {
                    required: "El nombre es requerido",
                    minlength: "El nombre debe conter mínimo 2 caracteres"
                },
                email: {
                    required: "El correo es requerido"
                },
            },
            submitHandler: function(form) {
                $('#submitContact').replaceWith('<p class="processing">Enviando...</p>');
                $.ajax({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"/mail/contact",
                    contentType: 'application/x-www-form-urlencoded',
                    success: function() {
                        $('#contactForm :input').attr('disabled', 'disabled');
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor','default');
                            $('#success').fadeIn()
                            $('.modal').modal('hide');
		                	$('#success').modal('show');
                        });
                    },
                    error: function() {
                        $('#contactForm').fadeTo( "slow", 1, function() {
                            $('#error').fadeIn()
                            $('.modal').modal('hide');
		                	$('#error').modal('show');
                        });
                    }
                })
                return false;
            }
        })
    })
})