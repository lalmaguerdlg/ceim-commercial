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
                // subject: {
                //     required: true,
                //     minlength: 4
                // },
                // number: {
                //     required: true,
                //     minlength: 5
                // },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 4,
                    maxlength: 250,
                }
            },
            messages: {
                name: {
                    required: "El nombre es requerido",
                    minlength: "El nombre debe conter mínimo 2 caracteres"
                },
                // subject: {
                //     required: "come on, you have a subject, don't you?",
                //     minlength: "your subject must consist of at least 4 characters"
                // },
                // number: {
                //     required: "come on, you have a number, don't you?",
                //     minlength: "your Number must consist of at least 5 characters"
                // },
                email: {
                    required: "El correo es requerido"
                },
                message: {
                    required: "El mensaje es requerido",
                    minlength: "El mensaje debe conter mínimo 4 caracteres",
                    maxlenght: "El mensaje no debe contener más de 250 caracteres"
                }
            },
            submitHandler: function(form) {
                debugger;
                // $(form).ajaxSubmit({
                //     type:"POST",
                //     data: $(form).serialize(),
                //     url:"contact_process.php",
                //     success: function() {
                //         $('#contactForm :input').attr('disabled', 'disabled');
                //         $('#contactForm').fadeTo( "slow", 1, function() {
                //             $(this).find(':input').attr('disabled', 'disabled');
                //             $(this).find('label').css('cursor','default');
                //             $('#success').fadeIn()
                //             $('.modal').modal('hide');
		        //         	$('#success').modal('show');
                //         })
                //     },
                //     error: function() {
                //         $('#contactForm').fadeTo( "slow", 1, function() {
                //             $('#error').fadeIn()
                //             $('.modal').modal('hide');
		        //         	$('#error').modal('show');
                //         })
                //     }
                // })
                function success () {
                    $('#contactForm :input').attr('disabled', 'disabled');
                    $('#contactForm').fadeTo( "slow", 1, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor','default');
                        $('#success').fadeIn()
                        $('.modal').modal('hide');
                        $('#success').modal('show');
                    })
                }
                function error() {
                    $('#contactForm').fadeTo( "slow", 1, function() {
                        $('#error').fadeIn()
                        $('.modal').modal('hide');
                        $('#error').modal('show');
                    })
                }
                success();
                return false;
            }
        })
    })
})