<div id="list_log">
<?php


    if ($result->num_rows != 0) {

        echo "<table class='table table-striped'><tr>";
        echo "<thead><td><b data-tr='ID'>ID</b></td>";
        echo "<td><b data-tr='Date'>Date</b></td>";
        echo "<td><b data-tr='Error Type'>Error Type</b></td>";
        echo "<td><b data-tr='Description'>Description</b></td>";
        echo "</tr></thead><tbody>";

        foreach ($result as $row) {

            echo "<tr><td>";
            echo $row["error_id"];
            echo "</td><td>";
            echo $row["error_date"];
            echo "</td><td>";
            echo $row["error_type"];
            echo "</td><td>";
            echo $row["error_description"];
            echo "</td><tr>";
        } //end foreach
        echo "</tbody></table>";
    } else {
        echo "<h2>NO RESULTS</h2>";
    } //end else

    ?>

</div>