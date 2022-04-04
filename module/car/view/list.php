<div id="list">
    <a href="index.php?module=car&op=create"><button class="btn btn-success" data-tr="Add">Add</button></a>
    <a href="index.php?module=car&op=dummies"><button class="btn btn-dark" data-tr="Dummies">Dummies</button></a>
    <a href='index.php?module=car&op=delete_all'><button type='button' class='btn btn-danger' data-tr="Delete All">Delete All</button></a>
<br><br>
    <?php


    if ($result->num_rows != 0) {

        echo "<table class='table table-striped' id='car_list_table'><thead><tr>";
        echo "<td><b data-tr='car_id'>ID</b></td>";
        echo "<td><b data-tr='matricula'>Number Plate</b></td>";
        echo "<td><b data-tr='bastidor'>Chassis Number</b></td>";
        echo "<td><b data-tr='model_name'>Model</b></td>";
        echo "<td><b data-tr='brand_name'>Brand</b></td>";
        echo "<td><b data-tr='price'>Price</b></td>";
        echo "<td><b data-tr='km'>Kilometers</b></td>";
        echo "<td><b data-tr='description'>Description</b></td>";
        echo "<td><b data-tr='type'>Fuel Type</b></td>";
        echo "<td><b data-tr='extres'>Additional features</b></td>";
        echo "<td><b data-tr='f_mat'>Matriculation date</b></td>";
        echo "<td><b data-tr='Actions'>Actions</b></td>";
        echo "</tr></thead><tbody>";

        foreach ($result as $row) {

            $f_mat = $row['f_mat'];

            /* $f_mat_explode = explode("-", $row["f_mat"]);
            $f_mat = $f_mat_explode[2] . "/" . $f_mat_explode[1] . "/" . $f_mat_explode[0]; */

            $extres = "<ul>";
            $extres_expode = explode(":", $row['extres']);
            foreach ($extres_expode as $extres_individual) {
                if ($extres_individual != "") {
                    $extres = $extres . "<li>" . $extres_individual . "</li>";
                } //end if     
            } //end foreach extres
            $extres = $extres . "</ul>";

            echo "<tr><td>";
            echo $row["car_id"];
            echo "</td><td>";
            echo $row["matricula"];
            echo "</td><td>";
            echo $row["bastidor"];
            echo "</td><td>";
            echo $row["model_name"];
            echo "</td><td>";
            echo $row["brand_name"];
            echo "</td><td>";
            echo $row["price"];
            echo "</td><td>";
            echo $row["km"];
            echo "</td><td>";
            echo $row["description"];
            echo "</td><td>";
            echo $row["fuel_type_name"];
            echo "</td><td>";
            echo $extres;
            echo "</td><td>";
            echo $f_mat;
            echo "</td><td>";
            //echo "<a href='index.php?module=car&op=read&id=" . $row["id"] . "'><button type='button' class='btn btn-info' data-tr='Read'>Read</button></a>";
            echo "<button type='button' class='btn btn-info modal_read' id='" . $row['car_id'] . "' data-tr='Read'>Read</button>";
            echo "<a href='index.php?module=car&op=update&id=" . $row["id"] . "'><button type='button' class='btn btn-primary' data-tr='Update'>Update</button></a>";
            echo "<a href='index.php?module=car&op=delete&id=" . $row["id"] . "'><button type='button' class='btn btn-danger' data-tr='Delete'>Delete</button></a>";
            echo "</td></tr>";
        } //end foreach
        echo "</tbody></table>";
    } else {
        echo "<h2 data-tr='NO RESULTS'>NO RESULTS</h2>";
    } //end else

    ?>

    <!-- READ MODAL -->
    <section id="car_modal">
        <div id="car_details">
        </div>
    </section>
    <!-- END READ MODAL -->
</div>