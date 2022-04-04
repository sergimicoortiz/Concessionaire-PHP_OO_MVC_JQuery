<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/module/search/model/DAO_search.php");
$DAO_search = new DAO_search;
session_start();
if (isset($_SESSION["time"])) {
    $_SESSION["time"] = time();
}
switch ($_GET['op']) {

    case 'list_categorys':
        $result = $DAO_search->list_categorys();
        echo $result;
        exit;
        break;

    case 'list_brands':
        $result = $DAO_search->list_brands($_POST['data']);
        echo $result;
        exit;
        break;

    case 'list_city':

        $data = $_POST['data'];
        if (($data['category'] == null) && ($data['brand'] == null)) {
            $result = $DAO_search->city_none($data);
        } else if (($data['category'] != null) && ($data['brand'] != null)) {
            $result = $DAO_search->city_all($data);
        } else {
            $result = $DAO_search->city_category($data);
        } //end else if

        echo $result;
        exit;
        break;
}//end swich
