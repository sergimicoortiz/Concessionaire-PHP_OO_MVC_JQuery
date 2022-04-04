<?php
//console_log("DAO_car");

$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/model/connect.php");
//console_log("DAO_car.php");
class DAO_car
{
    function listall()
    {
        $sql = "SELECT c.car_id, c.matricula, c.bastidor, m.model_name, b.brand_name, c.price, c.km, c.description, f.fuel_type_name, c.extres, c.f_mat, cat.category_name FROM car c INNER JOIN models m ON m.model_id = c.model INNER JOIN brands b ON b.brand_id = m.model_brand INNER JOIN fuel_type f ON f.fuel_type_id = c.fuel_type INNER JOIN category cat ON cat.category_id = c.category ORDER BY c.car_id ASC;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end read_all

    function read($id)
    {
        $sql = "SELECT c.car_id, c.matricula, c.bastidor, m.model_name, b.brand_name, c.price, c.km, c.description, f.fuel_type_name, c.extres, c.f_mat, cat.category_name FROM car c INNER JOIN models m ON m.model_id = c.model INNER JOIN brands b ON b.brand_id = m.model_brand INNER JOIN fuel_type f ON f.fuel_type_id = c.fuel_type INNER JOIN category cat ON cat.category_id = c.category WHERE c.car_id=" . $id . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end read_one

    function read_delete($id)
    {
        $sql = "SELECT `matricula`, `bastidor` FROM `car` WHERE car_id=" . $id . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end read_one

    function validate_matricula($data)
    {
        $sql = "SELECT COUNT(*) FROM `car` WHERE `matricula` = '" . $data . "';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end validate_matricula

    function validate_bastidor($data)
    {
        $sql = "SELECT COUNT(*) FROM `car` WHERE `bastidor` = '" . $data . "';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end validate_bastidor


    function delete($id)
    {
        $sql = "DELETE FROM `car` WHERE car_id = " . $id . ";";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end delete

    function del_all()
    {
        $sql = "DELETE FROM `car`;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end dell all

    function del_all_img()
    {
        $sql = "DELETE FROM `car_img`;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end dell all img

    function category_id_list()
    {
        $sql = "SELECT `category_id` FROM `category`;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end category_id_list

    function fuel_type_id_list()
    {
        $sql = "SELECT `fuel_type_id` FROM `fuel_type`;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end fuel_type_id_list

    function model_id_list()
    {
        $sql = "SELECT `model_id` FROM `models`;";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end model_id_list

    function create($data)
    {

        $matricula = $data['matricula'];
        $bastidor = $data['bastidor'];
        $model = $data['model'];
        $price = $data['price'];
        $km = $data['km'];
        $desc = $data['description'];
        $fuel_type = $data['fuel_type'];
        $category = $data['category'];
        $f_mat = $data['f_mat'];
        $lat = $data['lat'];
        $lon = $data['lon'];
        $city = $data['city'];
        $view_count = $data['view_count'];

        $extras = "";
        foreach ($data['extras'] as $extras_individual) {
            $extras = $extras . $extras_individual . ":";
        } //end foreach

        $sql = "INSERT INTO `car`(`matricula`, `bastidor`, `model`, `price`, `km`, `description`, `fuel_type`, `extres`, `f_mat`, `category`, `lat`, `lon`, `city`, `view_count`) VALUES ( '" . $matricula . "', '" . $bastidor . "'," . $model . "," . $price . "," . $km . ", '" . $desc . "'," . $fuel_type . ", '" . $extras . "', '" . $f_mat . "'," . $category . ",'" . $lat . "', '" . $lon . "','" . $city . "', " . $view_count . ");";

        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //cend reate

    function update($data, $id)  //PER ACTUALITZAR
    {

        $matricula = $data['matricula'];
        $bastidor = $data['bastidor'];
        $model = $data['model'];
        $brand = $data['brand'];
        $price = $data['price'];
        $km = $data['km'];
        $desc = $data['description'];
        $fuel = $data['fuel'];

        $extras = "";
        foreach ($data['extras'] as $extras_individual) {
            $extras = $extras . $extras_individual . ":";
        } //end foreach

        $f_mat = $data['f_mat'];

        $sql = "UPDATE `car` SET `matricula`='" . $matricula . "',`bastidor`='" . $bastidor . "',`model`='" . $model . "',`brand`='" . $brand . "',`price`='" . $price . "',`km`=" . $km . ",`description`='" . $desc . "',`fuel_type`='" . $fuel . "', `extres` = '" . $extras . "', `f_mat` = '" . $f_mat . "' WHERE `id` = " . $id . ";";

        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end update

    function add_img($bastidor, $ruta)
    {
        $sql = "INSERT INTO `car_img`(`car_ref`, `car_img_file`) VALUES ((SELECT car_id FROM car WHERE bastidor = '" . $bastidor . "'), '" . $ruta . "');";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end add_img

}//class
