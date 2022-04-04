<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/model/connect.php");
include_once($path . "/utils/middleware.php");
include_once($path . "/utils/utils_DAO.php");

class DAO_shop
{

    function list_cars($offset, $limit)
    {
        $sql = "SELECT c.car_id, c.matricula, c.bastidor, m.model_name, b.brand_name, c.price, c.km, c.description, f.fuel_type_name, c.extres, c.f_mat, cat.category_name, c.lat, c.lon, c.city, c.view_count, (SELECT i.car_img_file FROM car_img i WHERE i.car_ref = c.car_id LIMIT 1) img FROM car c INNER JOIN models m ON m.model_id = c.model INNER JOIN brands b ON b.brand_id = m.model_brand INNER JOIN fuel_type f ON f.fuel_type_id = c.fuel_type INNER JOIN category cat ON cat.category_id = c.category LIMIT " . $offset . "," . $limit . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array($result);
    } //end list_cars

    function read_car($id)
    {
        $sql = "SELECT c.car_id, c.matricula, c.bastidor, m.model_name, b.brand_name, c.price, c.km, c.description, f.fuel_type_name, c.extres, c.f_mat, cat.category_name, c.lat, c.lon, c.city, c.view_count FROM car c INNER JOIN models m ON m.model_id = c.model INNER JOIN brands b ON b.brand_id = m.model_brand INNER JOIN fuel_type f ON f.fuel_type_id = c.fuel_type INNER JOIN category cat ON cat.category_id = c.category WHERE c.car_id=" . $id . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array($result);
    } //end read_car

    function list_img_car($id)
    {
        $sql = "SELECT `car_img_file` FROM `car_img` WHERE `car_ref` = " . $id . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array($result);
    } //end list_img_car

    function list_img_car_limit($id, $limit)
    {
        $sql = "SELECT `car_img_file` FROM `car_img` WHERE `car_ref` = " . $id . " LIMIT " . $limit . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array($result);
    } //end list_img_car_limit

    function list_city()
    {
        $sql = "SELECT DISTINCT city FROM car;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'city');
    } //end list_city

    function list_brands()
    {
        $sql = "SELECT DISTINCT b.brand_name FROM car c INNER JOIN models m ON c.model = m.model_id INNER JOIN brands b ON b.brand_id = m.model_brand;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'brand_name');
    } //end list_brands

    function list_models($brand)
    {
        $sql = "SELECT model_name FROM models WHERE model_brand = (SELECT brand_id FROM brands WHERE brand_name = '" . $brand . "');";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'model_name');
    } //end list_models

    function list_categorys()
    {
        $sql = "SELECT category_name FROM category;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'category_name');
    } //end list_categorys

    function list_fuels()
    {
        $sql = "SELECT fuel_type_name FROM fuel_type;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'fuel_type_name');
    } //end list_fuels

    function list_cars_filters($filters, $offset, $limit)
    {
        $consulta = "";
        $filters_consulta = array();
        $order_elements = array();

        for ($i = 0; $i < count($filters); $i++) {

            switch ($filters[$i][0]) {
                case 'c.price':
                    if ($filters[$i][1] == 'maytomen') {
                        $order_elements[] = ($filters[$i][0] . " DESC");
                    } else if ($filters[$i][1] == 'mentomay') {
                        $order_elements[] = ($filters[$i][0] . " ASC");
                    } //end else if
                    break;
                case 'c.view_count':
                    if ($filters[$i][1] == 'maytomen') {
                        $order_elements[] = ($filters[$i][0] . " DESC");
                    } else if ($filters[$i][1] == 'mentomay') {
                        $order_elements[] = ($filters[$i][0] . " ASC");
                    } //end else if
                    break;

                default:
                    if ($filters[$i][1] != "null") {
                        $filters_consulta[] = ($filters[$i][0] . " = '" . $filters[$i][1] . "'");
                    } //end if
                    break;
            } //end swich

        } //end for

        if (count($filters_consulta) != 0) {
            $consulta .= (" WHERE " . implode(' AND ', $filters_consulta));
        } //end if

        if (count($order_elements) != 0) {
            $consulta .= (' ORDER BY ' . implode(',', $order_elements));
        } //end if

        $sql = "SELECT c.car_id, c.matricula, c.bastidor, m.model_name, b.brand_name, c.price, c.km, c.description, f.fuel_type_name, c.extres, c.f_mat, cat.category_name, c.lat, c.lon, c.city, c.view_count, (SELECT i.car_img_file FROM car_img i WHERE i.car_ref = c.car_id LIMIT 1) img FROM car c INNER JOIN models m ON m.model_id = c.model INNER JOIN brands b ON b.brand_id = m.model_brand INNER JOIN fuel_type f ON f.fuel_type_id = c.fuel_type INNER JOIN category cat ON cat.category_id = c.category " . $consulta . " LIMIT " . $offset . "," . $limit . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);

        if (!$result) {
            return "error";
            exit;
        } else {
            $cars = array();
            foreach ($result as $row) {
                $cars[] = $row;
            } //end foreach
            if (count($cars) == 0) {
                return json_encode("noresult");
                exit;
            } else {
                return json_encode($cars);
                exit;
            } //end else if

        } //end else

    } //end list_cars_filters

    function add_view_car($id)
    {
        $sql = "UPDATE `car` SET `view_count`= view_count + 1 WHERE `car_id` = " . $id . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end add_model

    function count_cars()
    {
        $sql = "SELECT COUNT(*) count FROM car";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'count');
    } //end count_cars

    function count_cars_filters($filters)
    {
        $filters_consulta = array();

        for ($i = 0; $i < count($filters); $i++) {

            switch ($filters[$i][0]) {
                case 'c.price':
                    break;
                case 'c.view_count':
                    break;
                default:
                    if ($filters[$i][1] != "null") {
                        $filters_consulta[] = ($filters[$i][0] . " = '" . $filters[$i][1] . "'");
                    } //end if
                    break;
            } //end swich

        } //end for

        if (count($filters_consulta) != 0) {
            $consulta = (" WHERE " . implode(' AND ', $filters_consulta));
        } //end if

        $sql = "SELECT COUNT(c.car_id) count FROM car c INNER JOIN models m ON m.model_id = c.model INNER JOIN brands b ON b.brand_id = m.model_brand INNER JOIN fuel_type f ON f.fuel_type_id = c.fuel_type INNER JOIN category cat ON cat.category_id = c.category " . $consulta . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return result_to_array_onecolumn($result, 'count');
    } //end count cars_filters

    function get_likes($token)
    {
        $user = middleware_auth($token)['name'];
        if ($user == null) {
            return 'error';
        } else {
            $sql = "SELECT car_like FROM likes WHERE username_like = '" . $user . "';";
            $conn = connect();
            $result = $conn->query($sql);
            disconect($conn);
            return result_to_array_onecolumn($result, 'car_like');
        } //end else if
    } //end likes

    function user_like($id, $token)
    {
        $user = middleware_auth($token)['name'];
        if ($user) {
            $sql = "CALL likes('" . $user . "', " . $id . ");";
            $conn = connect();
            $result = $conn->query($sql);
            disconect($conn);
            if ($result) {
                return ('ok');
            } else {
                return 'error';
            }
        } else {
            return 'error';
        } //end else if
    } //end user_likes

}//class
