<div id="create">
   
<form method="POST" id="form_create">
Number Plate: <input type="text" name="matricula" id="matricula" value="<?php echo $_POST['matricula'] ?>"><span id="error_matricula" class="error"><?php echo $error_mat; ?></span><br>
Chassis Number: <input type="text" name="bastidor" id="bastidor" value="<?php echo $_POST['bastidor'] ?>"><span id="error_bastidor" class="error"><?php echo $error_bast; ?></span><br>
Model: <input type="text" name="model" id="model" value="<?php echo $_POST['model'] ?>"><span id="error_model" class="error"></span><br>
Brand: <input type="text" name="brand" id="brand" value="<?php echo $_POST['brand'] ?>"><span id="error_brand" class="error"></span><br>
Price: <input type="text" name="price" id="price" value="<?php echo $_POST['price'] ?>"><span id="error_price" class="error"></span><br>
Kilometers: <input type="number" name="km" min=0 id="km" value="<?php echo $_POST['km'] ?>"><span id="error_km" class="error"></span><br><br>
Description:<br> <textarea name="description" rows="7" cols="60" id="desc"><?php echo $_POST['description'] ?></textarea><span id="error_desc" class="error"></span><br><br>

Matriculation Date:<br>

<script>
  $( function() {
    $( "#f_mat" ).datepicker({ dateFormat: 'dd/mm/yy' });
  } );
  </script>

<input type="text" id="f_mat" name="f_mat" placeholder="dd/mm/yyyy" value="<?php echo $_POST['f_mat'] ?>">
<span id="error_f_mat" class="error"></span>
<br><br>

Fuel Type: <span id="error_type"></span><br>
<input type="radio" name="fuel" value="Gasoline" id="fuel" <?php if ($_POST['fuel'] == "Gasoline"){echo "checked";}?>>Gasoline
<input type="radio" name="fuel" value="Gasoil"id="fuel" <?php if ($_POST['fuel'] == "Gasoil"){echo "checked";}?>>Gasoil
<input type="radio" name="fuel" value="Electric"id="fuel" <?php if ($_POST['fuel'] == "Electric"){echo "checked";}?>>Electric
<span id="error_fuel" class="error"></span>
<br><br>


Additional features:<br>

<input type="checkbox" name="extras[]" id="extras" value="GPS" <?php foreach ($_POST['extras'] as $extras_ind){if($extras_ind == "GPS"){echo "checked";}} ?> >GPS
<input type="checkbox" name="extras[]" id="extras" value="Rear camera" <?php foreach ($_POST['extras'] as $extras_ind){if($extras_ind == "Rear camera"){echo "checked";}} ?>>Rear camera
<input type="checkbox" name="extras[]" id="extras" value="Fronatal camera" <?php foreach ($_POST['extras'] as $extras_ind){if($extras_ind == "Fronatal camera"){echo "checked";}} ?>>Fronatal camera
<input type="checkbox" name="extras[]" id="extras" value="Hands free" <?php foreach ($_POST['extras'] as $extras_ind){if($extras_ind == "Hands free"){echo "checked";}} ?>>Hands free

<span id="error_extras" class="error"></span>

<br><br>
<button type="button" class="btn btn-primary" onclick="validate();">Submit</button>


</form>
</div>