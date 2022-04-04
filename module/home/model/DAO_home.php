<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/model/connect.php");
//console_log("DAO_home.php");
class DAO_home
{

    function list_brands_random($cant)
    {
        $sql = "SELECT DISTINCT b.brand_id, b.brand_name, b.brand_img FROM car c INNER JOIN models m ON c.model = m.model_id INNER JOIN brands b ON b.brand_id = m.model_brand ORDER BY RAND() LIMIT " . $cant . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end list_brands_random

    function list_category_random($cant)
    {
        
        $sql = "SELECT `category_id`, `category_name`, `category_img` FROM category ORDER BY RAND() LIMIT " . $cant . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end list_category_random

    function list_fuel_random($cant)
    {
        
        $sql = "SELECT fuel_type_id, fuel_type_name, fuel_type_img FROM fuel_type ORDER BY RAND() LIMIT " . $cant . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end list_fuel_random

    function list_fuel_random_eco($cant)
    {
        
        $sql = "SELECT fuel_type_id, fuel_type_name, fuel_type_img FROM fuel_type WHERE fuel_type_name NOT IN ('Gasoil', 'Gasoline') ORDER BY RAND() LIMIT " . $cant . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end list_fuel_random_eco

    function list_brand_id($name)
    {
        $sql = "SELECT brand_id FROM brands WHERE brand_name = '" . $name . "';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end list_brand_id

    function add_model($name, $brand)
    {
        $sql = "INSERT INTO `models`(`model_name`, `model_brand`) VALUES ('" . $name . "'," . $brand . ");";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end add_model

}//class
