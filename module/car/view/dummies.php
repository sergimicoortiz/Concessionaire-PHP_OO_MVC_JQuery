<div id="dummies">
<p>Are you sure that you wont to import the dummies? This will delete all the previous cars.</p>
    <form method="POST" id="form_dummies">
        Number of dummies:
    <input type="number" name="num" id="num" min="1" max="1000"><span id="error_dummies" class="error"></span> <br><br>
    <button type="button" class="btn btn-primary" onclick="dummies_car();">YES</button>
    <a href="index.php?module=car&op=list"><button type="button" class="btn btn-secondary">NO</button></a>
    </form>

</div>