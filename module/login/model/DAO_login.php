<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
include_once($path . "/model/connect.php");
include_once($path . "/utils/middleware.php");
include_once($path . "/utils/utils_DAO.php");

class DAO_login
{

    function register($data)
    {
        $password = password_hash(strval($data['password']), PASSWORD_DEFAULT, ['cost' => 12]);
        $avatar = 'https://i.pravatar.cc/150?u=' . md5(trim($data['email']));
        //$avatar = "https://robohash.org/" . md5(trim($data['email']));
        $sql = "INSERT INTO `user`(`username`, `email`, `password`, `type`, `avatar`) VALUES ('" . $data['username'] . "','" . $data['email'] . "','" . $password . "','client','" . $avatar . "');";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        return $result;
    } //end add_user


    function validate_register($data)
    {
        $sql = "SELECT COUNT(*) cont FROM user WHERE username = '" . $data['username'] . "' UNION SELECT COUNT(*) FROM user WHERE email = '" . $data['email'] . "';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        $data = json_decode(result_to_array_onecolumn($result, 'cont'));
        $validate = true;
        if ($data == 'error') {
            $validate = false;
        } else {
            foreach ($data as $row) {
                if ($row == 1) {
                    $validate = false;
                } //end if
            } //end foreach
        } //end else if
        return $validate;
    } //end validate_register

    function login($data)
    {
        $sql = "SELECT password, type FROM user WHERE username = '" . $data['username'] . "';";
        $conn = connect();
        $result = $conn->query($sql);
        disconect($conn);
        if (($result) && ($result->num_rows == 1)) {
            $password = $result->fetch_array()['password'];
            $password_correct = password_verify(strval($data['password']), $password);
            if ($password_correct) {
                session_start();
                $_SESSION['time'] = time();
                $_SESSION['user'] = $data['username'];
                $path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
                $jwt_ini = parse_ini_file($path . '/model/jwt.ini');
                include_once($path . "/model/JWT.php");
                $JWT = new JWT;
                $payload = '{"iat":"' . time() . '","exp":"' . (time() + (60 * 60)) . '","name":"' . $data["username"] . '"}';
                $token = $JWT->encode($jwt_ini['header'], $payload, $jwt_ini['secret']);
                return $token;
            } else {
                return 'error';
            } //end else 
        } else {
            return 'error';
        } //end else if
    } //end login

    function get_user_data($token)
    {
        $token_info = middleware_auth($token);
        if ($token_info['exp'] == null) {
            return 'error';
        } else {
            $sql = "SELECT username, email, type, avatar FROM user WHERE username = '" . $token_info['name'] . "';";
            $conn = connect();
            $result = $conn->query($sql);
            disconect($conn);
            return $result->fetch_assoc();
        } //end else if
    } //end get_user_data

    function refresh_token_cookies($token)
    {
        $path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
        $jwt_ini = parse_ini_file($path . '/model/jwt.ini');
        include_once($path . "/model/JWT.php");
        $JWT = new JWT;
        $json = $JWT->decode($token, $jwt_ini['secret']);
        $user = json_decode($json, TRUE)['name'];
        if ($_SESSION['user'] == $user) {
            if (session_regenerate_id()) {
                $payload = '{"iat":"' . time() . '","exp":"' . (time() + (60 * 60)) . '","name":"' . $user . '"}';
                $token = $JWT->encode($jwt_ini['header'], $payload, $jwt_ini['secret']);
                return $token;
            } else {
                return 'error';
            } //end else if
        } else {
            return 'error';
        } //end else if
    } //end refresh_token
}//class
