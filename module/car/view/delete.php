<div id="delete">
    <p>Are you sure that you wont to delete the car with <i>Number Plate:<b> <?php echo $matricula ?> </b></i> and <i>Chassis Number:<b>  <?php echo $bastidor ?></b></i></p>
    <form method="POST" id="form_delete">
    <input type="hidden" id="id_car" name="id_car" value="<?php echo $_GET['id'] ?>">
    <button type="button" class="btn btn-primary" onclick="delete_car();">YES</button>
    <a href="index.php?module=car&op=list"><button type="button" class="btn btn-secondary">NO</button></a>
    </form>
</div>