    <?php

$path = $_SERVER['DOCUMENT_ROOT'] . '/concessionaire';
    include_once($path . "/module/car/model/DAO_car.php");
    include_once($path . "/module/car/model/dummies_car.php");
    $DAO_car = new DAO_car;
    include_once($path . "/module/car/model/validator_car.php");
    switch ($_GET["op"]) {

        case 'list':
            $result = $DAO_car->listall();
            if (!$result) {
                $callback = 'index.php?module=error&op=503&desc=list_result_error';
                die('<script>window.location.href="' . $callback . '";</script>');
            } else {
                include_once "module/car/view/list.php";
            } //end else
            break;

        case 'read':
            $result = $DAO_car->read($_GET['id']);
            if ((!$result) || ($result->num_rows == 0)) {
                $callback = 'index.php?module=error&op=503&desc=read_result_error';
                die('<script>window.location.href="' . $callback . '";</script>');
            } else {
                include_once "module/car/view/read.php";
            } //end else
            break;

        case 'delete':
            $result = $DAO_car->read_delete($_GET['id']);
            if ($result->num_rows == 1) {
                foreach ($result as $row) {
                    $matricula = $row['matricula'];
                    $bastidor = $row['bastidor'];
                } //end foreach
            } else {
                $callback = 'index.php?module=error&op=503&desc=delete_error_read';
                die('<script>window.location.href="' . $callback . '";</script>');
            } //end else if
            if (isset($_POST['id_car'])) {
                if ($result->num_rows == 1) {
                    $result = $DAO_car->delete($_GET['id']);
                    if ($result) {
                        $callback = 'index.php?module=car&op=list';
                        die('<script>window.location.href="' . $callback . '";</script>');
                    } else {
                        $callback = 'index.php?module=error&op=503&desc=delete_error_result';
                        die('<script>window.location.href="' . $callback . '";</script>');
                    } //end else 
                } else {
                    $callback = 'index.php?module=error&op=503&desc=delete_error_rows';
                    die('<script>window.location.href="' . $callback . '";</script>');
                } //end else
            }
            include_once "module/car/view/delete.php";
            break;


        case 'delete_all':
            if (isset($_POST['delete'])) {
                $result = $DAO_car->del_all();
                if ($result) {
                    $callback = 'index.php?module=car&op=list';
                    die('<script>window.location.href="' . $callback . '";</script>');
                } else {
                    $callback = 'index.php?module=error&op=503&desc=deleteall_error_result';
                    die('<script>window.location.href="' . $callback . '";</script>');
                } //end else 
            } //end if

            include_once "module/car/view/delete_all.php";
            break;

        case 'create':

            if (isset($_POST['matricula'])) {

                if (validate_car($_POST)) {
                    $result =  $DAO_car->create($_POST);
                    if ($result) {
                        $callback = 'index.php?module=car&op=list';
                        die('<script>window.location.href="' . $callback . '";</script>');
                    } else {
                        $callback = 'index.php?module=error&op=503&desc=create_error_result';
                        die('<script>window.location.href="' . $callback . '";</script>');
                    } //end else 
                } //end 

            } //end if
            include_once "module/car/view/create.php";
            break;

        case 'update':

            $result = $DAO_car->read($_GET['id']);
            if ($result->num_rows == 1) {
                foreach ($result as $row) {
                    $matricula = $row['matricula'];
                    $bastidor = $row['bastidor'];
                    $model = $row['model'];
                    $brand = $row['brand'];
                    $price = $row['price'];
                    $km = $row['km'];
                    $desc = $row['description'];
                    $fuel = $row['type'];

                    $extres = explode(":", $row['extres']);
                    $f_mat = $row['f_mat'];

                    /* $f_mat_explode = explode("-", $row["f_mat"]);
                    $f_mat = $f_mat_explode[2] . "/" . $f_mat_explode[1] . "/" . $f_mat_explode[0]; */
                } //end foreach
            } else {
                $callback = 'index.php?module=error&op=503&desc=update_list_error';
                die('<script>window.location.href="' . $callback . '";</script>');
            } //end else if

            if (isset($_POST['matricula'])) {
                if (validate_car_update($_POST, $matricula, $bastidor)) {
                    $result = $DAO_car->update($_POST, $_GET['id']);
                    if ($result) {
                        $callback = 'index.php?module=car&op=list';
                        die('<script>window.location.href="' . $callback . '";</script>');
                    } else {
                        $callback = 'index.php?module=error&op=503&desc=update_error_result';
                        die('<script>window.location.href="' . $callback . '";</script>');
                    } //end else 
                } //end 
            } //end if

            include_once "module/car/view/update.php";

            break;

        case "dummies":
            if (isset($_POST['num'])) {
                dummies($_POST['num']);
                $callback = 'index.php?module=car&op=list';
                die('<script>window.location.href="' . $callback . '";</script>');
            } //end if
            include_once "module/car/view/dummies.php";
            break;

        case "modal_read":

            $result = $DAO_car->read($_GET['id']);
            if (!$result) {
                echo json_encode("error");
                exit;
            } else {
                $car = $result->fetch_object();
                echo json_encode(get_object_vars($car));
                exit;
            } //end else

            /* echo json_encode($_GET['id']);
                exit; */

            break;

        case "list_ajax":

            $result = $DAO_car->listall();
            if (!$result) {
                echo json_encode("error");
                exit;
            } else {
                $cars = array();
                foreach ($result as $row) {
                    $cars[] = $row;
                } //end foreach
                echo json_encode($cars);
                exit;
            } //end else

            break;

        default:
            $callback = 'index.php?module=error&op=404&desc=car_op_not_found_' . $_GET['op'];
            die('<script>window.location.href="' . $callback . '";</script>');
            break;
    } //end swich
    ?>