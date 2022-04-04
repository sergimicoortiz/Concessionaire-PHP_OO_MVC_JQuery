<?php
function connect()
{
  $path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
  $ini = parse_ini_file($path . '/model/connect.ini');
  $servername = $ini['servername'];
  $username = $ini['username'];
  $password = $ini['password'];
  $db = $ini['db'];

  $conn = new mysqli($servername, $username, $password, $db);

  if ($conn->connect_error) {
    $callback = 'index.php?module=error&op=503&desc=connect_db';
    die('<script>window.location.href="' . $callback . '";</script>');
  } //end if
  return $conn;
} //end connect

function disconect($conn)
{
  $conn->close();
}//end disconect
