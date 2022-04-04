<?php

function middleware_auth($token)
{
    $path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
    $jwt_ini = parse_ini_file($path . '/model/jwt.ini');
    include_once($path . "/model/JWT.php");
    $JWT = new JWT;
    $json = $JWT->decode($token, $jwt_ini['secret']);
    $data = json_decode($json, TRUE);
    if ($data['exp'] >= time()) {
        return $data;
    } else {
        return null;
    }
}//middleware_auth
