<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/module/login/model/DAO_login.php");
$DAO_login = new DAO_login;
session_start();

switch ($_GET['op']) {
    case 'list_login':
        include_once "module/login/view/login.html";
        break;
    case 'list_register':
        include_once "module/login/view/register.html";
        break;
    case 'validate_register':
        $result = $DAO_login->validate_register($_POST);
        echo json_encode($result);
        exit;
        break;
    case 'register':
        $result = $DAO_login->register($_POST);
        if ($result) {
            $callback = 'index.php?module=login&op=list_login';
            die('<script>window.location.href="' . $callback . '";</script>');
        } else {
            $callback = 'index.php?module=error&op=503&desc=register_fail';
            die('<script>window.location.href="' . $callback . '";</script>');
        } //end else if
        break;
    case 'login':
        $result = $DAO_login->login($_POST);
        echo json_encode($result);
        exit;
        break;
    case 'get_user_data';
        $result = $DAO_login->get_user_data($_POST['token']);
        echo json_encode($result);
        exit;
        break;
    case 'logout':
        unset($_SESSION['user']);
        unset($_SESSION['time']);
        session_destroy();
        echo json_encode('ok');
        exit;
        break;
    case 'user_timeout':
        if ((isset($_SESSION['time'])) && ((time() - $_SESSION['time']) <= 900)) { //900 default
            echo json_encode('ok');
            exit;
        } else {
            echo json_encode('error');
            exit;
        }
        break;
    case 'user_control':
        $path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
        $jwt_ini = parse_ini_file($path . '/model/jwt.ini');
        include_once($path . "/model/JWT.php");
        $JWT = new JWT;
        $json = $JWT->decode($_POST['token'], $jwt_ini['secret']);
        $user = json_decode($json, TRUE)['name'];
        $exp = json_decode($json, TRUE)['exp'];
        if (($_SESSION['user'] == $user) && ($exp >= time())) {
            echo json_encode('ok');
            exit;
        } else {
            echo json_encode('error');
            exit;
        }
        break;

    case 'refresh_token_cookies':
        $result = $DAO_login->refresh_token_cookies($_POST['token']);
        echo json_encode($result);
        exit;
        break;
    default:
        $callback = 'index.php?module=error&op=404&desc=login_op_not_found_' . $_GET['op'];
        die('<script>window.location.href="' . $callback . '";</script>');
        break;
}//end swich
