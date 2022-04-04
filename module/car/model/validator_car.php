<?php

$error_mat = $error_bast = "";
function validate_car($data)
{

    global $error_bast;
    global $error_mat;
    $DAO_car_validate = new DAO_car;

    $matricula = $data['matricula'];
    $bastidor = $data['bastidor'];

    $resultMat = $DAO_car_validate->validate_matricula($matricula);
    $resultBast = $DAO_car_validate->validate_bastidor($bastidor);

    $ok = true;

    $rowMat = mysqli_fetch_array($resultMat);
    $rowBast = mysqli_fetch_array($resultBast);
/*     console_log($rowBast[0]);
    console_log($rowMat[0]); */

    if ($rowBast[0] != 0) {
        $ok = false;
        $error_bast = " *This chassis number alredy exist";
    } //end if bast

    if ($rowMat[0] != 0) {
        $ok = false;
        $error_mat = " *This number plate alredy exist";
    } //end if mat

    return $ok;
}//end validate_car

function validate_car_update($data, $mat_original, $bast_original)
{

    global $error_bast;
    global $error_mat;

    $DAO_car_validate = new DAO_car;

    $matricula = $data['matricula'];
    $bastidor = $data['bastidor'];

    $resultMat = $DAO_car_validate->validate_matricula($matricula);
    $resultBast = $DAO_car_validate->validate_bastidor($bastidor);
    

    $ok = true;

    $rowMat = mysqli_fetch_array($resultMat);
    $rowBast = mysqli_fetch_array($resultBast);
/*     console_log($rowBast[0]);
    console_log($rowMat[0]); */

    if (($rowBast[0] != 0) && ($bastidor != $bast_original)) {
        $ok = false;
        $error_bast = " *This chassis number alredy exist";
    } //end if bast

    if (($rowMat[0] != 0) && ($matricula != $mat_original)) {
        $ok = false;
        $error_mat = " *This number plate alredy exist";
    } //end if mat

    return $ok;
}//end validate_car_update