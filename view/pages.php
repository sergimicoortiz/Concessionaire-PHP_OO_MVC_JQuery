<?php
if (isset($_GET["module"])) {
    if ((include_once 'module/' . $_GET["module"] . '/ctrl/ctrl_' . $_GET["module"] . '.php') == FALSE) {
        $callback = 'index.php?module=error&op=404&desc=module_not_found_' . $_GET['module'];
        die('<script>window.location.href="' . $callback . '";</script>');
    } //end else
} else {
    $callback = 'index.php?module=home&op=list';
    die('<script>window.location.href="' . $callback . '";</script>');
}//end else
