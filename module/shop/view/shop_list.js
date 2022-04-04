function ajaxForSearch(url, f_data = undefined) {
    ajaxPromise(url, 'POST', 'JSON', f_data)
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_ajaxForSearch_error_data';
                window.location.href = callback;
            } else if (data == "noresult") {
                $('<span></span>').appendTo('#shop_list').attr('data-tr', "NO RESULTS").attr('class', 'noresult').html('NO RESULTS');

            } else {
                AddMap();
                var last = "";
                var cont_last = 0;
                var count_box = 0;
                var box = true;
                data.forEach(car => {
                    //const img = "view/images/placeholder_cars/placeholder_cars_1.png";
                    const img = car.img;
                    map_list(car, img);
                    var id = car['car_id'];
                    var title = car['brand_name'] + ': ' + car['model_name'];
                    title = title.toUpperCase();
                    last = '#main_' + id;
                    var extres = formatter_extres.format(car['extres'].split(':').slice(0, -1));

                    if (box == true) {
                        $('<div></div>').attr('id', 'box_' + count_box).attr('class', 'block-1 box-1').appendTo('#shop_list')
                        box = false;
                    }//end if
                    $('<div></div>').attr('id', 'main_' + id).attr('class', 'div_hover').appendTo('#box_' + count_box);
                    $('<img>').attr('src', img).attr('class', 'img').appendTo('#main_' + id);
                    $('<p></p>').attr('class', 'text-1').appendTo('#main_' + id).html(title + '<strong>' + car['price'] + '€</strong>');
                    $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="category_name">category</b>: <span  data-tr="' + car['category_name'] + '">' + car['category_name'] + '</span>');
                    $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="fuel_type_name">fuel</b>: <span data-tr="' + car['fuel_type_name'] + '">' + car['fuel_type_name'] + '</span>');
                    $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="km">km</b>: ' + car['km']);
                    $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="view_count">View count</b>: ' + car['view_count']);
                    $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="extres">extres</b>: ' + extres);
                    $('<a></a>').attr('href', '#').attr('class', 'button').attr('id', id).attr('data-tr', 'See More').appendTo('#main_' + id).html('See More');
                    print_like(id);
                    if (cont_last == 3) {
                        $(last).addClass('last');
                        count_box++;
                        cont_last = 0;
                        box = true;
                    } else {
                        cont_last++;
                    }//end else if

                });//end foreach
                $(last).addClass('last');
            }//end else if
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_list_error_ajax';
            window.location.href = callback;
        })//end ajaxPromise
}//end ajaxForSearch

function loadCars(offset = 0, limit = 8) {
    localStorage.setItem('actual_page', "car_list");
    GetQuerystring();
    const urlsearch = window.location.search;
    const params = new URLSearchParams(urlsearch);
    var url_params = new Array;
    url_params.push(params.get('c.price'));
    url_params.push(params.get('b.brand_name'));
    url_params.push(params.get('cat.category_name'));
    url_params.push(params.get('f.fuel_type_name'));
    url_params.push(params.get('c.city'));
    url_params.push(params.get('c.view_count'));

    url_params.forEach(param => {
        if (param === null) {
            SetQuerystring();
        }
    });

    if (localStorage.getItem('token')) {
        get_user_likes();
    } else {
        localStorage.removeItem('user_likes');
    }//end if

    var option = 'all';
    var filters = JSON.parse(localStorage.getItem('filters'));
    loadIn();
    $('#shop_list').empty();
    $('#shop_list').removeClass()
    $('#shop_list').addClass('content');
    printfilters();

    filters.forEach(filter => {
        if (filter[1] != 'null') {
            option = 'filters';
        }//end if
    });//end foreach

    switch (option) {
        case 'filters':
            ajaxForSearch('module/shop/ctrl/ctrl_shop.php?op=filters', { "f_data": filters, "offset": offset, "limit": limit });
            break;

        case 'all':
            ajaxForSearch('module/shop/ctrl/ctrl_shop.php?op=listajax', { "offset": offset, "limit": limit });
            break;
    }//end swich
    loadOut();

    $(document).on('click', '#send_filters', function () {
        var price = $('#price').val();
        var view_count = $('#view_count').val();
        var brands = $('#brands').val();
        var category = $('#category').val();
        var fuel = $('#fuel').val();
        var city = $('#city').val()
        const filters = [['c.price', price], ['b.brand_name', brands], ['cat.category_name', category], ['f.fuel_type_name', fuel], ['c.city', city], ['c.view_count', view_count]];
        localStorage.setItem('filters', JSON.stringify(filters));
        SetQuerystring();
    })//end click send

    $(document).on('click', '#reset_filters', function () {
        resetFilters();
        SetQuerystring();
    })//end click reset

}//end loadCars

function resetFilters() {
    const filters = [['c.price', 'null'], ['b.brand_name', 'null'], ['cat.category_name', 'null'], ['f.fuel_type_name', 'null'], ['c.city', 'null'], ['c.view_count', 'null']];
    localStorage.setItem('filters', JSON.stringify(filters));
}//end reset filters

function shop_read(id) {
    localStorage.setItem('actual_page', "car_details");
    $('#pagination').empty();
    $('#shop_list').empty();
    $('#shop_list').removeClass()

    loadIn();

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=readajax&id=' + id, 'GET', 'JSON').then(function (data) {
        ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=readajax_img&id=' + id, 'GET', 'JSON').then(function (img) {
            if (data == 'error' || img == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_details_error_data';
                window.location.href = callback;
            } else {
                $('<div></div>').attr('id', 'details').attr('class', 'details').appendTo('#shop_list');
                $('<div></div>').attr('id', 'slider').appendTo('#details');
                var car_img = null;
                var first_img = true;
                img.forEach(img_row => {
                    if (first_img == true) { car_img = img_row['car_img_file']; first_img = false; }
                    $('<div></div>').attr('class', 'item').appendTo('#slider').html("<img src=" + img_row['car_img_file'] + ">")
                });//end foreach img
                var extres = formatter_extres.format(data['extres'].split(':').slice(0, -1));

                $('<div></div>').attr('id', 'detail_content').appendTo('#details');
                print_like(data['car_id'], '#detail_content');
                $('<p></p>').appendTo('#detail_content').html('<span data-tr="brand_name">brand</span>: <span class="text-detail">' + data['brand_name'] + '</span>');
                $('<p></p>').appendTo('#detail_content').html('<span data-tr="model_name">model</span>: <span class="text-detail">' + data['model_name'] + '</span>');
                $('<p></p>').appendTo('#detail_content').html('<span data-tr="price">price</span>: <span class="text-detail">' + data['price'] + ' €</span>');
                $('<p></p>').appendTo('#detail_content').html('<span data-tr="km">km</span>: <span class="text-detail">' + data['km'] + '</span>');
                $('<p></p>').appendTo('#detail_content').html('<span data-tr="category_name">category</span>: <span class="text-detail" data-tr="' + data['category_name'] + '">' + data['category_name'] + '</span>');
                $('<p></p>').appendTo('#detail_content').html('<span data-tr="fuel_type_name">fuel</span>: <span class="text-detail" data-tr="' + data['fuel_type_name'] + '">' + data['fuel_type_name'] + '</span>');
                $('<p></p>').appendTo('#detail_content').html('<span data-tr="extres">extres</span>: <span class="text-detail">' + extres + '</span>');
                $('<p></p>').appendTo('#detail_content').html('<span data-tr="description">description</span>:<br> <textarea cols="70" rows="13" disabled>' + data['description'] + '</textarea>');
                $('<i></i>').attr('class', 'fa-solid fa-x fa-3x').attr('id', 'close_btn').appendTo('#details');
                AddMap([data['lon'], data['lat']], 8, 'width: 100px; height: 500px; padding-left: 20%; margin-left: 20%; margin-top: 2%;');
                map_details(data, car_img);
                $('#slider').addClass('owl-carousel');
                $('#slider').addClass('owl-theme');
                $('.owl-carousel').owlCarousel({
                    items: 1,
                    loop: true,
                    margin: 10,
                    nav: false,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    smartSpeed: 800
                });//end owlCarousel
                related_cars(data);
            }//end else if

        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_list_error_ajax_img_' + data['car_id'];
            window.location.href = callback;
        })//end ajaxPromise img
    }).catch(function () {
        var callback = 'index.php?module=error&op=503&desc=shop_details_error_ajax';
        window.location.href = callback;
    })//end ajaxPromise
    loadOut();
}//end read

function add_related_cars(car, box_num) {
    const filters = [['c.price', 'null'], ['b.brand_name', car.brand_name], ['cat.category_name', 'null'], ['f.fuel_type_name', 'null'], ['c.city', 'null'], ['c.view_count', 'null']];
    const limit = 4;
    const offset = box_num * limit;
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=filters', 'POST', 'JSON', { "f_data": filters, "offset": offset, "limit": limit })
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_related_cars_error_data';
                window.location.href = callback;
            } else if (data == 'noresult') {
                $('#see_more_cars').empty();
                $('<p></p>').attr('class', 'titels').attr('data-tr', 'NO RESULTS').attr('id', 'scroll_end').appendTo('#shop_list').html('NO RESULTS');
            } else {
                $('<div></div>').attr('id', 'box_' + box_num).attr('class', 'block-1 box-1').appendTo('#related_cars')
                data.forEach(car_data => {
                    if (car_data['car_id'] != car['car_id']) {
                        var id = car_data['car_id'];
                        var title = car_data['brand_name'] + ': ' + car_data['model_name'].toUpperCase();
                        last = '#main_' + id;
                        var extres = formatter_extres.format(car_data['extres'].split(':').slice(0, -1));
                        const img = car_data.img;
                        $('<div></div>').attr('id', 'main_' + id).attr('class', 'div_hover').appendTo('#box_' + box_num);
                        $('<img>').attr('src', img).attr('class', 'img').appendTo('#main_' + id);
                        $('<p></p>').attr('class', 'text-1').appendTo('#main_' + id).html(title + '<strong>' + car_data['price'] + '€</strong>');
                        $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="category_name">category</b>: <span  data-tr="' + car_data['category_name'] + '">' + car_data['category_name'] + '</span>');
                        $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="fuel_type_name">fuel</b>: <span data-tr="' + car_data['fuel_type_name'] + '">' + car_data['fuel_type_name'] + '</span>');
                        $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="km">km</b>: ' + car_data['km']);
                        $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="view_count">View count</b>: ' + car_data['view_count']);
                        $('<p></p>').attr('class', 'upper').appendTo('#main_' + id).html('<b data-tr="extres">extres</b>: ' + extres);
                        $('<a></a>').attr('href', '#').attr('class', 'button').attr('id', id).attr('data-tr', 'See More').appendTo('#main_' + id).html('See More');
                        print_like(id);
                    }
                });//end foreach
            }//end else
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_related_cars_error_ajax';
            window.location.href = callback;
        })//end promise
}//end add_related_cars

function related_cars(car) {
    var box_num = 0;
    //$('#scroll_end').empty();
    $('<div></div>').attr('id', 'related_cars').appendTo('#shop_list');
    $('<p></p>').attr('class', 'titels').attr('data-tr', 'related_cars').appendTo('#related_cars').html('Related cars');
    add_related_cars(car, box_num);
    $('<div></div>').attr('id', 'see_more_cars').appendTo('#shop_list').html('<span data-tr="See More" class="btn-see_more">See More</span>')

    $(document).on('click', '#see_more_cars', function () {
        box_num++;
        add_related_cars(car, box_num);
    });//end click

    $(window).on("scroll", function () {
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            if ($('#scroll_end').html() == undefined) {
                box_num++;
                add_related_cars(car, box_num);
            }//end if
        }
    });//end scroll
}//end related_cars

function printfilters() {
    var filters = JSON.parse(localStorage.getItem('filters'));
    var f_price = "";
    var f_brand = "";
    var f_category = "";
    var f_fuel = "";
    var f_city = "";
    var f_view_count = "";

    filters.forEach(filter => {
        switch (filter[0]) {
            case 'c.price':
                f_price = filter[1];
                break;
            case 'b.brand_name':
                f_brand = filter[1];
                break;
            case 'cat.category_name':
                f_category = filter[1];
                break;
            case 'f.fuel_type_name':
                f_fuel = filter[1];
                break;
            case 'c.city':
                f_city = filter[1];
                break;
            case 'c.view_count':
                f_view_count = filter[1];
                break;

        }//end swich
    });//end foreach

    $('<div></div>').attr('id', 'filter').attr('class', 'content box-1 filters').appendTo('#shop_list');
    $('<form></form>').attr('id', 'filter_form').attr('method', 'post').appendTo('#filter')
    $('<span></span>').appendTo('#filter_form').html('<label for="price" data-tr="price">Price</label>: ');
    $('<select></select>').attr('id', 'price').attr('name', 'price').appendTo('#filter_form')
    $('<option></option>').appendTo('#price').attr('value', 'null').attr('id', 'price_null').html('----------');
    $('<option></option>').attr('value', 'maytomen').attr('id', 'maytomen_price').attr('data-tr', 'Highest to lowest').appendTo('#price').html('Highest to lowest');
    $('<option></option>').attr('value', 'mentomay').attr('id', 'mentomay_price').attr('data-tr', 'Lowest to highest').appendTo('#price').html('Lowest to highest');
    $('#' + f_price + '_price').attr('selected', true);
    $('<span></span>').appendTo('#filter_form').html('<label for="view_count" data-tr="view_count">View count</label>: ');
    $('<select></select>').attr('id', 'view_count').attr('name', 'view_count').appendTo('#filter_form')
    $('<option></option>').appendTo('#view_count').attr('value', 'null').attr('id', 'view_count_null').html('----------');
    $('<option></option>').attr('value', 'maytomen').attr('id', 'maytomen_view_count').attr('data-tr', 'Highest to lowest').appendTo('#view_count').html('Highest to lowest');
    $('<option></option>').attr('value', 'mentomay').attr('id', 'mentomay_view_count').attr('data-tr', 'Lowest to highest').appendTo('#view_count').html('Lowest to highest');
    $('#' + f_view_count + '_view_count').attr('selected', true);
    $('<br>').appendTo('#filter_form')
    $('<span></span>').appendTo('#filter_form').html('<label for="brands" data-tr="brand_name">Brands</label>: ');
    $('<select></select>').attr('id', 'brands').attr('name', 'price').appendTo('#filter_form');
    $('<option></option>').appendTo('#brands').attr('value', 'null').attr('id', 'brand_null').html('----------');

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=list_brands', 'GET', 'JSON')
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_brands_error_data';
                window.location.href = callback;
            } else {
                data.forEach(brand => {
                    if (brand == f_brand) {
                        $('<option></option>').attr('value', brand).attr('id', brand).attr('selected', true).appendTo('#brands').html(brand);
                    } else {
                        $('<option></option>').attr('value', brand).attr('id', brand).appendTo('#brands').html(brand);
                    }//end else if
                });//end foreach
            }//end else if
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_brand_error_ajax';
            window.location.href = callback;
        })//end ajaxPrimise

    $('<span></span>').appendTo('#filter_form').html('<label for="category" data-tr="category_name">Category</label>: ');
    $('<select></select>').attr('id', 'category').attr('name', 'category').appendTo('#filter_form');
    $('<option></option>').appendTo('#category').attr('value', 'null').attr('id', 'category_null').html('----------');

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=list_categorys', 'GET', 'JSON')
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_category_error_data';
                window.location.href = callback;
            } else {
                data.forEach(category => {
                    if (category == f_category) {
                        $('<option></option>').attr('value', category).attr('id', category).attr('selected', true).appendTo('#category').html(category);
                    } else {
                        $('<option></option>').attr('value', category).attr('id', category).appendTo('#category').html(category);
                    }//end else if
                });//end foreach
            }//end else if
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_category_error_ajax';
            window.location.href = callback;
        })//end ajaxPrimise
    $('<span></span>').appendTo('#filter_form').html('<label for="fuel" data-tr="fuel_type_name">Fuel Type</label>: ');
    $('<select></select>').attr('id', 'fuel').attr('name', 'fuel').appendTo('#filter_form');
    $('<option></option>').appendTo('#fuel').attr('value', 'null').attr('id', 'fuel_null').html('----------');

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=list_fuels', 'GET', 'JSON')
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_fuel_error_data';
                window.location.href = callback;
            } else {
                data.forEach(fuel => {
                    if (fuel == f_fuel) {
                        $('<option></option>').attr('value', fuel).attr('id', fuel).attr('selected', true).appendTo('#fuel').html(fuel);
                    } else {
                        $('<option></option>').attr('value', fuel).attr('id', fuel).appendTo('#fuel').html(fuel);
                    }//end else if
                });//end foreach
            }//end else if
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_fuel_error_ajax';
            window.location.href = callback;
        })//end ajaxPrimise

    $('<span></span>').appendTo('#filter_form').html('<label for="fuel" data-tr="city">City</label>: ');
    $('<select></select>').attr('id', 'city').attr('name', 'city').appendTo('#filter_form');
    $('<option></option>').appendTo('#city').attr('value', 'null').attr('id', 'city_null').html('----------');

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=list_city', 'GET', 'JSON')
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_city_error_data';
                window.location.href = callback;
            } else {
                data.forEach(city => {
                    if (city == f_city) {
                        $('<option></option>').attr('value', city).attr('id', city).attr('selected', true).appendTo('#city').html(city);
                    } else {
                        $('<option></option>').attr('value', city).attr('id', city).appendTo('#city').html(city);
                    }//end else if
                });//end foreach
            }//end else if
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_city_error_ajax';
            window.location.href = callback;
        })//end ajaxPrimise
    $('<br>').appendTo('#filter_form')
    $('<span></span>').attr('id', 'send_filters').attr('data-tr', 'Send').attr('class', 'btn-filter').appendTo('#filter_form').html('Send');
    $('<span></span>').attr('id', 'reset_filters').attr('data-tr', 'Reset').attr('class', 'btn-filter').appendTo('#filter_form').html('Reset');

}//printfilters

function GetQuerystring() {
    const urlsearch = window.location.search;
    const params = new URLSearchParams(urlsearch);
    var price = params.get('c.price');
    var brands = params.get('b.brand_name');
    var category = params.get('cat.category_name');
    var fuel = params.get('f.fuel_type_name');
    var city = params.get('c.city');
    var view_count = params.get('c.view_count');

    if (price === null) {
        price = 'null';
    }//end if price

    if (brands === null) {
        brands = 'null';
    }//end if price

    if (category === null) {
        category = 'null';
    }//end if price

    if (fuel === null) {
        fuel = 'null';
    }//end if price

    if (city === null) {
        city = 'null';
    }//end if price

    if (view_count === null) {
        view_count = 'null';
    }//end if price

    const filters = [['c.price', price], ['b.brand_name', brands], ['cat.category_name', category], ['f.fuel_type_name', fuel], ['c.city', city], ['c.view_count', view_count]];
    localStorage.setItem('filters', JSON.stringify(filters));
} //end GetQuerystring

function SetQuerystring() {
    const urlsearch = window.location.search;
    const params = new URLSearchParams(urlsearch);
    var price = params.get('c.price');
    var brands = params.get('b.brand_name');
    var category = params.get('cat.category_name');
    var fuel = params.get('f.fuel_type_name');
    var city = params.get('c.city');
    var view_count = params.get('c.view_count');
    var querystring = "";
    var filters = JSON.parse(localStorage.getItem('filters'));
    var same = true;
    filters.forEach(filter => {
        querystring = querystring + ('&' + filter[0] + '=' + filter[1]);
        switch (filter[0]) {
            case 'c.price':
                if (filter[1] != price) {
                    same = false;
                }
                break;
            case 'b.brand_name':
                if (filter[1] != brands) {
                    same = false;
                }
                break;
            case 'cat.category_name':
                if (filter[1] != category) {
                    same = false;
                }
                break;
            case 'f.fuel_type_name':
                if (filter[1] != fuel) {
                    same = false;
                }
                break;
            case 'c.city':
                if (filter[1] != city) {
                    same = false;
                }
                break;
            case 'c.view_count':
                if (filter[1] != view_count) {
                    same = false;
                }
                break;
        }//end swich
    });//end foreach
    var callback = 'index.php?module=shop&op=list' + querystring;

    if (same === false) {
        localStorage.removeItem('page');
        window.location.href = callback;
    }//end if

} //end SetQuerystring

function AddMap(m_center = [-4.057513058981608, 40.22894318274323], m_zoom = 5.4, m_style = 'width: 700px; height: 600px;') {
    $('<div></div>').attr('id', 'map').attr('style', m_style).appendTo('#shop_list')
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2ltaWNvb3J0aXoiLCJhIjoiY2t6eWcwbXBhMDAwYTNpcGdkMzd1d2JxNSJ9.sbrTcTaGTtPwyLzqrLUBHw';
    map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: m_center, // starting position [lng, lat]
        zoom: m_zoom // starting zoom
    });
    map.scrollZoom.disable();
}//end addmap

function map_list(car, img) {

    const title = car['brand_name'] + ': ' + car['model_name']
    var extres = formatter_extres.format(car['extres'].split(':').slice(0, -1));

    new mapboxgl.Marker()
        .setLngLat([car['lon'], car['lat']])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
            '<div><img src="' + img + '"class="img_map" ><p class="text-1">' + title.toUpperCase() + '<strong>' + car['price'] + '€</strong></p><p class="upper"><b data-tr="category_name">category</b>: <span data-tr="' + car['category_name'] + '">' + car['category_name'] + '</span></p><p class="upper"><b data-tr="fuel_type_name">fuel</b>: <span data-tr="' + car['fuel_type_name'] + '">' + car['fuel_type_name'] + '</span></p><p class="upper"><b data-tr="km">km</b>: ' + car['km'] + '</p><p class="upper"><b data-tr="city">City</b>: <span>' + car['city'] + '</span></p><p class="upper"><b data-tr="extres">extres</b>: ' + extres + '</p><a href="#" class="button" id="' + car['car_id'] + '" data-tr="See More">See More</a></div>'
        ))
        .addTo(map);
}//end map_list

function map_details(car, car_img) {
    const title = car['brand_name'] + ': ' + car['model_name']
    var extres = formatter_extres.format(car['extres'].split(':').slice(0, -1));
    const marker = new mapboxgl.Marker()
        .setLngLat([car['lon'], car['lat']])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(
            '<div><img src="' + car_img + '"class="img_map" ><p class="text-1">' + title.toUpperCase() + '<strong>' + car['price'] + '€</strong></p><p class="upper"><b data-tr="category_name">category</b>: <span data-tr="' + car['category_name'] + '">' + car['category_name'] + '</span></p><p class="upper"><b data-tr="fuel_type_name">fuel</b>: <span data-tr="' + car['fuel_type_name'] + '">' + car['fuel_type_name'] + '</span></p><p class="upper"><b data-tr="km">km</b>: ' + car['km'] + '</p><p class="upper"><b data-tr="city">City</b>: <span>' + car['city'] + '</span></p><p class="upper"><b data-tr="extres">extres</b>: ' + extres + '</p><span  id="google_map" data-lon="' + car['lon'] + '" data-lat="' + car['lat'] + '">Google Maps</span></div>'
            //'<div class="map_info"><img scr="' + data['car_img_file'] + '"><p class="text-1">' + title.toUpperCase() + '<strong>' + data['price'] + '€</strong></p><p class="upper"><b data-tr="category_name">category</b>: <span data-tr="' + data['category_name'] + '">' + data['category_name'] + '</span></p><p class="upper"><b data-tr="fuel_type_name">fuel</b>: <span data-tr="' + data['fuel_type_name'] + '">' + data['fuel_type_name'] + '</span></p><p class="upper"><b data-tr="km">km</b>: ' + data['km'] + '</p><p class="upper"><b data-tr="city">City</b>: <span>' + data['city'] + '</span></p><p class="upper"><b data-tr="extres">extres</b>: ' + extres + '</p><span  id="google_map" data-lon="' + data['lon'] + '" data-lat="' + data['lat'] + '">Google Maps</span></div>'
        ))
        .addTo(map);

    map.scrollZoom.enable();
}//end map details

function load_pagination(limit = 8) {
    var filters = JSON.parse(localStorage.getItem('filters'));
    var data_filters = null;
    filters.forEach(filter => {
        if (filter[1] != 'null') {
            data_filters = filters;
        }//end if
    });//end foreach

    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=count_cars', 'POST', 'JSON', { "filters": data_filters })
        .then(function (data) {

            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_pagination_error_img';
                window.location.href = callback;
            } else {
                var actual_page = localStorage.getItem('page') | 1;
                var total_pages = 0;
                var total_car = data[0];
                var offset = 0;
                if (total_car >= limit) {
                    total_pages = Math.ceil(total_car / limit);
                } else {
                    total_pages = 1;
                }

                if (total_pages != 1) {

                    $('#pagination').bootpag({
                        total: total_pages,
                        page: actual_page,
                        maxVisible: total_pages,
                        next: null,
                        prev: null,
                    }).on('page', function (event, num) {
                        localStorage.setItem('page', num);
                        offset = limit * (num - 1);
                        loadCars(offset, limit);
                    });
                }

            }//end else if
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_pagination_error_ajax';
            window.location.href = callback;
        })//end ajaxPromise img
}//end load pagination

function get_user_likes() {
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=get_user_likes', 'POST', 'JSON', { 'token': localStorage.getItem('token') })
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_get_user_likes_error_data';
                window.location.href = callback;
            } else {
                localStorage.setItem('user_likes', JSON.stringify(data));
            }//end if
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_get_user_likes_error_ajax';
            window.location.href = callback;
        })//end ajaxpromise
}//end get_user_likes

function print_like(id, append = '#main_' + id) {
    $('<div></div>').attr('class', 'heart').attr('id', 'heart_' + id).appendTo(append);
    if (localStorage.getItem('user_likes')) {
        if (JSON.parse(localStorage.getItem('user_likes')).includes(id)) {
            $('#heart_' + id).addClass("heart-active");
        }//end if
    }//end if
}//end print likes

function user_like(id) {
    ajaxPromise('module/shop/ctrl/ctrl_shop.php?op=user_like', 'POST', 'JSON', { 'id': id, 'token': localStorage.getItem('token') })
        .then(function (data) {
            if (data == 'error') {
                var callback = 'index.php?module=error&op=503&desc=shop_user_like_error_data';
                window.location.href = callback;
            }//end if
        })
        .catch(function () {
            var callback = 'index.php?module=error&op=503&desc=shop_user_like_error_ajax';
            window.location.href = callback;
        })//end ajaxPromise
}//end user_like

function clicks() {
    $(document).on("click", ".button", function () {
        const id = this.getAttribute('id');
        localStorage.setItem('details_id', id);
        location.reload();
    });//end click button

    $(document).on("click", "#close_btn", function () {
        location.reload();
    });//end close

    $(document).on('click', "#google_map", function () {
        const lat = this.getAttribute('data-lat');
        const lon = this.getAttribute('data-lon');
        const callback = 'https://www.google.es/maps/dir//' + lat + ', ' + lon;
        window.open(callback, '_blank');
    })//end button googlemap

    $(document).on("click", ".heart", function () {
        const id = this.getAttribute('id').split('_')['1'];
        if (localStorage.getItem('token')) {
            user_like(id);
            $(this).toggleClass("heart-active");
        } else {
            toastr.warning('Your need to be loged to do this.');
            setTimeout(function () {
                if (localStorage.getItem('actual_page') == 'car_details') {
                    localStorage.setItem('details_id', id);
                }
                localStorage.setItem('url_callback', window.location.href);
                var callback = 'index.php?module=login&op=list_login';
                window.location.href = callback;
            }, 1500)
        }//end else if
    });

}//end clicks

$(document).ready(function () {
    localStorage.removeItem('url_callback');
    var lang_formater = "";
    if (localStorage.getItem('app-lang') == 'en') {
        lang_formater = 'en-US';
    } else {
        lang_formater = 'es-ES';
    }//end else 
    window.formatter_extres = new Intl.ListFormat(lang_formater, { style: 'long', type: 'conjunction' });
    const map = null;

    if (localStorage.getItem('token')) {
        get_user_likes();
    } else {
        localStorage.removeItem('user_likes');
    }//end if

    if (localStorage.getItem('details_id')) {
        shop_read(localStorage.getItem('details_id'))
        localStorage.removeItem('details_id');
    } else {
        if (localStorage.getItem('page')) {
            const limit = 8;
            const offset = limit * (localStorage.getItem('page') - 1);
            loadCars(offset, limit);
        } else {
            loadCars();
        }//end else if
        load_pagination();
    }//end else if
    clicks();
});//end ready