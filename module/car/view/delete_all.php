<div id="delete_all">
    <p>Are you sure that you wont to delete <b>ALL</b> the cars</p>
    <form method="POST" id="form_delete_all">
    <input type="hidden" id="delete" name="delete" value="delete">
    <button type="button" class="btn btn-primary" onclick="delete_car();">YES</button>
    <a href="index.php?module=car&op=list"><button type="button" class="btn btn-secondary">NO</button></a>
    </form>
</div>