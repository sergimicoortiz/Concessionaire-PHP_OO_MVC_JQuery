<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/module/shop/model/DAO_shop.php");
$DAO_shop = new DAO_shop;
session_start();
if (isset($_SESSION["time"])) {
    $_SESSION["time"] = time();
}

switch ($_GET['op']) {
    case 'list':
        include_once "module/shop/view/shop_list.html";
        break;

    case 'listajax':
        $result = $DAO_shop->list_cars($_POST['offset'], $_POST['limit']);
        echo $result;
        exit;
        break;

    case 'listajax_img':
        $result = $DAO_shop->list_img_car_limit($_GET['id'], 1);
        echo json_encode(json_decode($result)[0]);
        exit;
        break;

    case 'readajax':
        $result = $DAO_shop->add_view_car($_GET['id']);
        if (!$result) {
            echo 'error';
            exit;
        } else {
            $result = $DAO_shop->read_car($_GET['id']);
            echo json_encode(json_decode($result)[0]);
            exit;
        } //end else
        break;

    case 'readajax_img':
        $result = $DAO_shop->list_img_car_limit($_GET['id'], 3);
        echo $result;
        exit;
        break;
    case 'list_brands':
        $result = $DAO_shop->list_brands();
        echo $result;
        break;

    case 'list_categorys':
        $result = $DAO_shop->list_categorys();
        echo $result;
        exit;
        break;

    case 'list_fuels':
        $result = $DAO_shop->list_fuels();
        echo $result;
        exit;
        break;

    case 'list_city':
        $result = $DAO_shop->list_city();
        echo $result;
        exit;
        break;

    case 'filters':
        $result = $DAO_shop->list_cars_filters($_POST['f_data'], $_POST['offset'], $_POST['limit']);
        echo $result;
        exit;
        break;

    case 'count_cars':
        if ($_POST['filters'] == null) {
            $result = $DAO_shop->count_cars();
            echo $result;
            exit;
        } else {
            $result = $DAO_shop->count_cars_filters($_POST['filters']);
            echo $result;
            exit;
        }
        break;

    case 'get_user_likes':
        $result = $DAO_shop->get_likes($_POST['token']);
        echo json_encode($result);
        exit;
        break;

    case 'user_like':
        $result = $DAO_shop->user_like($_POST['id'], $_POST['token']);
        echo json_encode($result);
        exit;
        break;
    default:
        $callback = 'index.php?module=error&op=404&desc=shop_op_not_found_' . $_GET['op'];
        die('<script>window.location.href="' . $callback . '";</script>');
        break;
}//end swich
