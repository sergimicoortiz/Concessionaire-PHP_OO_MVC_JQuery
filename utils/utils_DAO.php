<?php
function result_to_array($result)
{
    if (!$result) {
        return "error";
    } else {
        $array = array();
        foreach ($result as $row) {
            $array[] = $row;
        } //end foreach
        return json_encode($array);
    } //end else if
} //end result_to_array

function result_to_array_onecolumn($result, $column)
{
    if (!$result) {
        return "error";
    } else {
        $array = array();
        foreach ($result as $row) {
            $array[] = $row[$column];
        } //end foreach
        return json_encode($array);
    } //end else if
} //end result_to_array
