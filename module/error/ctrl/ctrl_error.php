<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once $path . "/module/error/model/DAO_error.php";
$DAO_error = new DAO_error;
switch ($_GET['op']) {
    case '404':
        $DAO_error -> create('404', $_GET['desc']);
        include_once "module/error/view/404.html";
        break;
        case '503':
            $DAO_error -> create('503', $_GET['desc']);
            include_once "module/error/view/503.html";
            break;
    case 'list':
        $result = $DAO_error -> listall();
        if (!$result) {
            $callback = 'index.php?module=error&op=503&desc=error_list_result';
            die('<script>window.location.href="' . $callback . '";</script>');
        }else {
        include_once "module/error/view/list.php";
        }//end else if
        break;
    default:
    $DAO_error -> create('404', 'error_op_not_found_' . $_GET['op']);
    include_once "module/error/view/404.html";
        break;
}
