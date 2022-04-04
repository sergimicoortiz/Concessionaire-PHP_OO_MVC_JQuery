<?php

function dummies($num)
{
    $DAO_car_dummies = new DAO_car;
    $char = range('A', 'Z'); // rango num 0-25
    $numbers = range(0, 9); // rango num 0-9
    $numbers_char = array_merge($numbers, $char); // rango num 0-35

    $categorys_tmp = $DAO_car_dummies->category_id_list();
    $fuel_type_tmp = $DAO_car_dummies->fuel_type_id_list();
    $models_tmp = $DAO_car_dummies->model_id_list();
    $categorys = array();
    $fuel_type = array();
    $models = array();

    foreach ($categorys_tmp as $row) {
        $categorys[] = $row;
    } //end foreach

    foreach ($fuel_type_tmp as $row) {
        $fuel_type[] = $row;
    } //end foreach

    foreach ($models_tmp as $row) {
        $models[] = $row;
    } //end foreach

    $res_dell_all_img = $DAO_car_dummies->del_all_img();

    if (!$res_dell_all_img) {
        $callback = 'index.php?module=error&op=503&desc=dummies_delete_img_error';
        die('<script>window.location.href="' . $callback . '";</script>');
    } //end if

    $res_dell_all = $DAO_car_dummies->del_all();

    if (!$res_dell_all) {
        $callback = 'index.php?module=error&op=503&desc=dummies_delete_error';
        die('<script>window.location.href="' . $callback . '";</script>');
    } //end if

    for ($i = 0; $i < $num; $i++) {

        $matNum = rand(1111, 9999);
        $matchar1 = $char[rand(0, 25)];
        $matchar2 = $char[rand(0, 25)];
        $matchar3 = $char[rand(0, 25)];
        $matricula = $matNum . $matchar1 . $matchar2 . $matchar3;

        $data['matricula'] = $matricula;
        $data['city'] = "city_" . rand(1, 10);
        $data['lat'] = rand(37, 40) . "." . rand(160118464982375, 2294246031861);
        $data['lon'] = rand(-7, 1) . "." . rand(325760284451144, 6007728415948083);

        $bastidor = "";
        for ($z = 0; $z < 17; $z++) {
            $bastidor = $bastidor . $numbers_char[rand(0, 35)];
        } //end for bast

        $data['bastidor'] = $bastidor;
        $data['view_count'] = rand(0, 100);
        $data['model'] = $models[rand(0, count($models) - 1)]['model_id'];
        $data['fuel_type'] = $fuel_type[rand(0, count($fuel_type) - 1)]['fuel_type_id'];


        $data['price'] = rand(1000, 1000000);
        $data['km'] = rand(0, 300000);

        $data['category'] = $categorys[rand(0, count($categorys) - 1)]['category_id'];

        $data['description'] =  preg_replace("[\n|\r|\n\r]", "", file_get_contents("https://loripsum.net/api/1/short/plaintext"));

        $data['f_mat'] = rand(1, 28) . "/" . rand(1, 12) . "/" . rand(1980, 2030);

        $extres_list = ["GPS", "Rear camera", "Fronatal camera", "Hands free"];
        $contExtras = 0;
        $extras = null;

        while ($extras == null) {
            for ($z = 0; $z < count($extres_list) - 1; $z++) {
                if (rand(0, 1) == 1) {
                    $extras[$contExtras] = $extres_list[$z];
                    $contExtras++;
                } //end if
            } //end for extras
        } //end while

        $data['extras'] = $extras;

        if (validate_car($data)) {
            $result = $DAO_car_dummies->create($data);

            if (!$result) {
                $callback = 'index.php?module=error&op=503&desc=dummies_error_result_' . $i;
                die('<script>window.location.href="' . $callback . '";</script>');
            } //end if

            for ($z = 1; $z <= 3; $z++) {
                $result_img = $DAO_car_dummies->add_img($data['bastidor'], 'view/images/placeholder_cars/placeholder_cars_' . $z . '.png');

                if (!$result_img) {
                    $callback = 'index.php?module=error&op=503&desc=dummies_error_result_img' . $z . '_' . $i;
                    die('<script>window.location.href="' . $callback . '";</script>');
                } //end if
            } //end for img

        } //end if

    } //end for
}//end dummies
