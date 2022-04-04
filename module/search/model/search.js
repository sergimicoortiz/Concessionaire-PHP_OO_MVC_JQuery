function category_search() {

    $('#category_search').empty();
    $('<option></option>').attr('selected', true).attr('disabled', true).appendTo('#category_search').html('<span data-tr="category_name">Category</span><span>: </span>');

    ajaxPromise('module/search/ctrl/ctrl_search.php?op=list_categorys', 'GET', 'JSON')
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=search_category_error_data';
                window.location.href = callback;
            } else {
                //console.table(data);
                data.forEach(category => {
                    $('<option></option>').attr('value', category['category_name']).appendTo('#category_search').html(category['category_name']);
                });

            }//end else if
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=search_category_error_ajax';
            window.location.href = callback;
        })//end ajaxPrimise
}//end category

function brand_search(category_name) {

    $('#brand_search').empty();
    $('<option></option>').attr('selected', true).attr('disabled', true).appendTo('#brand_search').html('<span data-tr="brand_name">Brand</span><span>: </span>');

    ajaxPromise('module/search/ctrl/ctrl_search.php?op=list_brands', 'POST', 'JSON', { 'data': category_name })
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=search_brand_error_data';
                window.location.href = callback;
            } else {
                data.forEach(brand => {
                    $('<option></option>').attr('value', brand['brand_name']).appendTo('#brand_search').html(brand['brand_name']);
                });

            }//end else if
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=search_brand_error_ajax';
            window.location.href = callback;
        })//end ajaxPrimise

}//end brand_search

function keyup() {

    const cat_search = $('#category_search').val();
    const brand_search = $('#brand_search').val();
    const city_search = $('#city_search').val();
    const search = { 'category': cat_search, 'brand': brand_search, 'city': city_search };

    ajaxPromise('module/search/ctrl/ctrl_search.php?op=list_city', 'POST', 'JSON', { 'data': search })
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=search_city_error_data';
                window.location.href = callback;
            } else {
                $('#autocomplete').empty();
                data.forEach(city => {
                    $('<div></div>').appendTo('#autocomplete').html('<span class="search-item" id="' + city + '">' + city + '</span>');
                    $('<br>').appendTo('#autocomplete');
                });
                //console.table(data);

            }
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=search_city_error_ajax';
            window.location.href = callback;
        })//end ajaxPrimise
}//end keyup

function search() {
    var search = [];
    var callback = 'index.php?module=shop&op=list&';
    if ($('#category_search').val() != null) {
        search.push('cat.category_name=' + $('#category_search').val());
    }//end if category

    if ($('#brand_search').val() != null) {
        search.push('b.brand_name=' + $('#brand_search').val());
    }//end if category

    if ($('#city_search').val() != '') {
        search.push('c.city=' + $('#city_search').val());
    }//end if category

    callback = callback + search.join('&');
    window.location.href = callback;
}

$(document).ready(function () {
    $('<option></option>').attr('selected', true).attr('disabled', true).appendTo('#brand_search').html('<span data-tr="brand_name">Brand</span><span>: </span>');
    category_search();

    $('#category_search').on('change', function () {
        $('#city_search').val(null);
        $('#autocomplete').empty();
        const id = $('#category_search').val();
        brand_search(id);
    })//end change

    $('#brand_search').on('change', function () {
        $('#city_search').val(null);
        $('#autocomplete').empty();
    })//end change

    $('#city_search').on('keyup', function () {
        if ($('#city_search').val() != '') {
            keyup();
        } else {
            $('#autocomplete').empty();
        }
    })//end keyup

    $(document).on('click', '#search_button', function () {
        search();
    })//end click search

    $(document).on('click', '.search-item', function () {
        $('#autocomplete').empty();
        const id = this.getAttribute('id');
        $('#city_search').val(id);
    })//end click

})//end ready