<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/model/connect.php");
include_once($path . "/utils/utils_DAO.php");

class DAO_search
{

    function list_categorys()
    {
        $sql = "SELECT `category_id`,`category_name` FROM `category`;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array($result);
    } //end list_categorys

    function list_brands($category_name)
    {
        $sql = "SELECT DISTINCT b.brand_id, b.brand_name FROM car c INNER JOIN models m ON m.model_id = c.model INNER JOIN brands b ON b.brand_id = m.model_brand INNER JOIN category cat ON cat.category_id = c.category WHERE cat.category_name = '" . $category_name . "';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array($result);
    } //end list_categorys

    function city_all($data)
    {
        $sql = "SELECT DISTINCT c.city FROM car c INNER JOIN models m ON c.model = m.model_id WHERE c.category IN (SELECT `category_id` FROM category WHERE category_name = '" . $data['category'] . "') AND m.model_brand IN (SELECT brand_id FROM brands WHERE brand_name = '" . $data['brand'] . "') AND c.city LIKE '%" . $data['city'] . "%';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'city');
    } //city_all

    function city_none($data)
    {
        $sql = "SELECT DISTINCT c.city FROM car c INNER JOIN models m ON c.model = m.model_id WHERE c.city LIKE '%" . $data['city'] . "%';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'city');
    } //city_none

    function city_category($data)
    {
        $sql = "SELECT DISTINCT c.city FROM car c INNER JOIN models m ON c.model = m.model_id WHERE c.category IN (SELECT `category_id` FROM category WHERE category_name = '" . $data['category'] . "') AND c.city LIKE '%" . $data['city'] . "%';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'city');
    } //city_category

}//class
