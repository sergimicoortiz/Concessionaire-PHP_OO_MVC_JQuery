<?php
//console_log('ctrl HOME');
$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/module/home/model/DAO_home.php");
$DAO_home = new DAO_home;
session_start();
if (isset($_SESSION["time"])) {
    $_SESSION["time"] = time();
}
switch ($_GET['op']) {

    case 'list':
        include_once "module/home/view/home.html";
        break;

    case 'slide':
        $result = $DAO_home->list_brands_random(6);
        if (!$result) {
            echo "error";
            exit;
        } else {
            $brands = array();
            foreach ($result as $brand) {
                $brands[] = $brand;
            } //end foreach
            echo json_encode($brands);
            exit;
        } //end else

        break;

    case 'category':
        $result = $DAO_home->list_category_random(4);
        if (!$result) {
            echo "error";
            exit;
        } else {
            $categoryarray = array();
            foreach ($result as $category) {
                $categoryarray[] = $category;
            } //end foreach
            echo json_encode($categoryarray);
            exit;
        } //end else

        break;

    case 'fuel':
        //$result = $DAO_home->list_fuel_random(4);
        $result = $DAO_home->list_fuel_random_eco(2);
        if (!$result) {
            echo "error";
            exit;
        } else {
            $fuelarray = array();
            foreach ($result as $fuel) {
                $fuelarray[] = $fuel;
            } //end foreach
            echo json_encode($fuelarray);
            exit;
        } //end else

        break;
    default:
        $callback = 'index.php?module=home&op=list';
        die('<script>window.location.href="' . $callback . '";</script>');
        break;
}//end swich
