function validate_regex_register() {
    const username = $('#username').val();
    const password = $('#password').val();
    const email = $('#email').val();
    var email_regex = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var user_regex = /^[a-zA-Z0-9]*$/;
    var error = false;

    $('#register_errors_username').html(null);
    $('#register_errors_email').html(null);
    $('#register_errors_password').html(null);

    if (username.length === 0) {
        $('#register_errors_username').html('*You have to introduce an username');
        error = true;
    } else if (user_regex.test(username) === false) {
        $('#register_errors_username').html("*The username's format is incorrect");
        error = true;
    };//end else if

    if (email.length === 0) {
        $('#register_errors_email').html('*You have to introduce an email');
        error = true;
    } else if (email_regex.test(email) === false) {
        $('#register_errors_email').html("*The email's format is incorrect");
        error = true;
    };//end else if

    if (password.length < 8) {
        $('#register_errors_password').html('*The password need a minimum of 8 characters');
        error = true;
    }

    if (error === false) {
        validate_php_register();
    }//end if

}//end validate_regex_register

function validate_php_register() {
    const data_form = Object.fromEntries(new FormData(document.getElementById('form_register')));
    console.log(data_form);
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=validate_register', 'POST', 'JSON', data_form)
        .then(function (data) {
            if (data == true) {
                document.getElementById('form_register').action = 'index.php?module=login&op=register';
                document.getElementById('form_register').submit();
            } else {
                $('#register_errors_email').html('*The username or the email are already taken.');
            }//end else if
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=login_register_validate_error_ajax';
            window.location.href = callback;
        })//end ajaxpromise

}//end validate_php_register


function clicks_register() {
    $(document).on('click', '#send_btn', function (e) {
        e.preventDefault();
        validate_regex_register();
    })//end click

    $(document).keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            validate_regex_register();
        }//end if
    });
}//end clicks_register

$(document).ready(function () {
    clicks_register();
})//end ready