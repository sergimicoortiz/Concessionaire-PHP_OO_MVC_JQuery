<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once $path . "/model/connect.php";

class DAO_error
{
function create($error, $desc) {

    $sql = "INSERT INTO `error`(`error_date`, `error_type`, `error_description`) VALUES (CURRENT_TIME(),'" . $error . "','" . $desc . "');";

    $conn = connect();
    $result = $conn->query($sql);
    disconect($conn);
    return $result;

}//end create

function listall()
{
    $sql = "SELECT `error_id`, `error_date`, `error_type`, `error_description` FROM `error` ORDER BY `error_date` DESC;";
    $conn = connect();
    $result = $conn->query($sql);
    disconect($conn);
    return $result;
} //end read_all

}//end class
?>