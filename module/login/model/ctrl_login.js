function validate_regex_login() {
    const username = $('#username').val();
    const password = $('#password').val();
    var user_regex = /^[a-zA-Z0-9]*$/;
    var error = false;

    $('#login_errors').html(null);

    if (password.length < 8) {
        $('#login_errors').html('*The password need a minimum of 8 characters');
        error = true;
    }

    if (username.length === 0) {
        $('#login_errors').html('*You have to introduce an username');
        error = true;
    } else if (user_regex.test(username) === false) {
        $('#login_errors').html("*The username's format is incorrect");
        error = true;
    };//end else if

    if (error === false) {
        login();
    }//end if

}//end validate_regex_register

function login() {
    const data_form = Object.fromEntries(new FormData(document.getElementById('form_login')));
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=login', 'POST', 'JSON', data_form)
        .then(function (data) {
            if (data == 'error') {
                $('#login_errors').html("*The username or the password are incorrect");
            } else {
                localStorage.setItem('token', data);
                if (localStorage.getItem('url_callback')) {
                    var callback = localStorage.getItem('url_callback')
                    localStorage.removeItem('url_callback')
                } else {
                    var callback = "index.php?module=home&op=list";
                }
                window.location.href = callback;
            }//end else if

        })
        .catch(function () {
            $('#login_errors').html("*The username or the password are incorrect");
        })//end ajaxPromise
}//end login

function clicks_login() {
    $(document).on('click', '#send_btn', function (e) {
        e.preventDefault();
        validate_regex_login();
    })//end click

    $(document).keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            validate_regex_login();
        }//end if
    });//end keypress
}//end clicks_login

$(document).ready(function () {
    clicks_login();
})//end ready