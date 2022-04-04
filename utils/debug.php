<?php
function debug_php_print_r($array)
{
    echo '<pre>';
    print_r($array);
    echo '</pre>';
}

function debug_php_var_dump($array)
{
    echo '<pre>';
    var_dump($array);
    echo '</pre>';
}

function console_log($data)
{
    echo '<script>';
    echo 'console.log(' . json_encode($data) . ')';
    echo '</script>';
}
