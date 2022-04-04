function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
}//end ajaxPrimise

function loadIn(ms = 500, timeout = 0) {
    setTimeout(function () {
        $("#overlay").fadeIn(ms);
    }, timeout);
};//end loadIn


function loadOut(ms = 400, timeout = 400) {
    setTimeout(function () {
        $("#overlay").fadeOut(ms);
    }, timeout);
};//end loadOut

function user_info_menu() {
    if (localStorage.getItem('token')) {
        ajaxPromise('module/login/ctrl/ctrl_login.php?op=get_user_data', 'POST', 'JSON', { 'token': localStorage.getItem('token') })
            .then(function (data) {
                if (data == 'error') {
                    $('<a></a>').attr('href', 'index.php?module=login&op=list_login').attr('data-tr', 'login').appendTo('#user_info').html('Login');
                } else {
                    $('<img>').attr('src', data.avatar).appendTo('#user_info');
                    $('<span></span>').appendTo('#user_info').html(data.username);
                    $('<span></span>').appendTo('#user_info').attr('data-tr', 'logout').attr('id', 'btn-logout').html('Logout');

                }//end else if
            })
            .catch(function () {
                console.log('user_info_catch');
                $('<a></a>').attr('href', 'index.php?module=login&op=list_login').attr('data-tr', 'login').appendTo('#user_info').html('Login');
            })//end ajaxPromise
    } else {
        $('<a></a>').attr('href', 'index.php?module=login&op=list_login').attr('data-tr', 'login').appendTo('#user_info').html('Login');
    }//end else if
}//end user_ingo_menu

function logout() {
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=logout', 'POST', 'JSON')
        .then(function (data) {
            if (data == 'ok') {
                localStorage.removeItem('token');
                var callback = 'index.php?moduke=home&op=list';
                window.location.href = callback;
            }//end if
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=logout_error_ajax';
            window.location.href = callback;
        })//end ajaxpromise
}//end logout

function user_timeout() {
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=user_timeout', 'POST', 'JSON')
        .then(function (data) {
            if (data == 'error') {
                toastr.warning('Your session will be closed because of inactivity.');
                setTimeout(function () {
                    logout();
                }, 1500);
            }//end if
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=user_timeout_error_ajax';
            window.location.href = callback;
        });//end ajaxptromise
}//end user_timeout

function user_control() {
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=user_control', 'POST', 'JSON', { 'token': localStorage.getItem('token') })
        .then(function (data) {
            if (data == 'error') {
                toastr.warning('Your session will be closed.');
                setTimeout(function () {
                    logout();
                }, 1500);
            }//end if
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=user_control_error_ajax';
            window.location.href = callback;
        });//end ajaxptromise
}//end user_control

function refresh_token_cookies() {
    ajaxPromise('module/login/ctrl/ctrl_login.php?op=refresh_token_cookies', 'POST', 'JSON', { 'token': localStorage.getItem('token') })
        .then(function (data) {
            if (data == 'error') {
                logout();
            } else {
                localStorage.setItem('token', data);
            }//end else if
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=refresh_token_error_ajax';
            window.location.href = callback;
        })//end ajaxpromise
}//end refresh_token

$(document).ready(function () {

    toastr.options = {
        "preventDuplicates": true,
    };

    $(document).on('click', '#btn-logout', function () {
        logout();
    })//end clickLogout

    setInterval(function () {
        if (!localStorage.getItem('time_interval')) {
            localStorage.setItem('time_interval', 0);
        }
        const time = 5000 + parseInt(localStorage.getItem('time_interval'));
        localStorage.setItem('time_interval', time);
        if (localStorage.getItem('time_interval') >= 600000) { //600000 default
            localStorage.setItem('time_interval', 0);
            if (localStorage.getItem('token')) {
                user_timeout();
                refresh_token_cookies();
            }
        }
    }, 5000)

    if (localStorage.getItem('token')) {
        user_control();
    }

    user_info_menu();
})//end ready