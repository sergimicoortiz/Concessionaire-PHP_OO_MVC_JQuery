function slider() {
    ajaxPromise('module/home/ctrl/ctrl_home.php?op=slide', 'GET', 'JSON').then(function (data) {
        if (data == 'error') {
            var callback = 'index.php?module=error&op=503&desc=slider_read_error_data';
            window.location.href = callback;
        } else {
            data.forEach(brand => {
                var name = brand['brand_name'].replace(" ", "_");
                $('<div></div>').attr('id', name).attr('class', 'buttons_home item').attr('data-filter', 'b.brand_name').appendTo('#slider');
                $('<img>').attr('src', brand['brand_img']).appendTo('#' + name);

            });//end foreach

            $('#slider').addClass('owl-carousel');
            $('#slider').addClass('owl-theme');
            $('.owl-carousel').owlCarousel({
                items: 3,
                loop: true,
                margin: 10,
                nav: false,
                autoplay: true,
                autoplayTimeout: 4000,
                smartSpeed: 800
            });//end owlCarousel
        }//end else if
    }).catch(function () {
        var callback = 'index.php?module=error&op=503&desc=slide_read_error_ajax';
        window.location.href = callback;
    })//end ajaxPrimise

}//end slider

function category() {

    ajaxPromise('module/home/ctrl/ctrl_home.php?op=category', 'GET', 'JSON').then(function (data) {
        if (data == 'error') {
            var callback = 'index.php?module=error&op=503&desc=category_read_error_data';
            window.location.href = callback;
        } else {
            var last = "";

            data.forEach(category => {
                var name = category['category_name'].replace(" ", "_");
                last = name;
                $('<div></div>').attr('id', name).appendTo('#category');
                $('<img>').attr('src', category['category_img']).appendTo('#' + name);
                $('<p></p>').attr('id', 'title_' + name).attr('class', 'text-1').attr('data-tr', category['category_name']).appendTo('#' + name).html(category['category_name']);
                $('<a></a>').attr('id', name).attr('class', 'button buttons_home').attr('data-tr', 'See More').attr('data-filter', 'cat.category_name').appendTo('#' + name).html('See More');
            });//end foreach

            $('#' + last).addClass('last');

        }//end else if
    }).catch(function () {
        var callback = 'index.php?module=error&op=503&desc=category_read_error_ajax';
        window.location.href = callback;
    });
}//end category

function fuel() {

    ajaxPromise('module/home/ctrl/ctrl_home.php?op=fuel', 'GET', 'JSON').then(function (data) {
        if (data == 'error') {
            var callback = 'index.php?module=error&op=503&desc=fuel_read_error_data';
            window.location.href = callback;
        } else {
            var last = "";

            if (data.length == 2) {
                $('#fuel_type').addClass('box_fuel');
            } else {
                $('#fuel_type').addClass('box-1');
            }//end else if

            data.forEach(fuel_type => {
                var name = fuel_type['fuel_type_name'].replace(" ", "_");
                last = name;
                $('<div></div>').attr('id', name).appendTo('#fuel_type');
                $('<img>').attr('src', fuel_type['fuel_type_img']).appendTo('#' + name);
                $('<p></p>').attr('id', 'title_' + name).attr('class', 'text-1').attr('data-tr', fuel_type['fuel_type_name']).appendTo('#' + name).html(fuel_type['fuel_type_name']);
                $('<a></a>').attr('id', name).attr('class', 'button buttons_home').attr('data-tr', 'See More').attr('data-filter', 'f.fuel_type_name').appendTo('#' + name).html('See More');
            });//end foreach

            $('#' + last).addClass('last');

        }//end else if
    }).catch(function () {
        var callback = 'index.php?module=error&op=503&desc=fuel_read_error_ajax';
        window.location.href = callback;
    });
}//end fuel

function add_books(box_num, data) {
    $('<div></div>').attr('id', 'box_' + box_num).attr('class', 'block-1 box-1').appendTo('#related_books')
    var last = "";
    var offset = box_num * 4;
    var limit = offset + 4;
    //console.log(data.length);
    for (var i = offset; i < limit; i++) {
        const id = 'b' + box_num + 'i' + i;
        last = id;
        $('<div></div>').attr('id', id).appendTo('#box_' + box_num);
        $('<img>').attr('src', data[i].img).appendTo('#' + id);
        $('<p></p>').attr('class', 'text-1').appendTo('#' + id).html(data[i].title);
        $('<p></p>').attr('class', 'upper').appendTo('#' + id).html('<b data-tr="pages">pages</b>: <span >' + data[i].pages + '</span>');
        $('<p></p>').attr('class', 'upper').appendTo('#' + id).html('<b data-tr="description">description</b>: <textarea rows=10 cols=25 class="book_textarea">' + data[i].desc + '</textarea>');
        $('<a></a>').attr('href', data[i].link).attr('class', 'button').attr('data-tr', 'See More').appendTo('#' + id).html('See More');
    }//end for
    $('#' + last).addClass('last');
}//end add_books

function related_books() {
    ajaxPromise('https://www.googleapis.com/books/v1/volumes?q=electric%20cars', 'GET', 'JSON').then(function (data) {
        if (data['error']) {
            var callback = 'index.php?module=error&op=503&desc=related_books_read_error_data';
            window.location.href = callback;
        } else {
            const books = new Array();
            data.items.forEach(book => {
                if (book.volumeInfo.description != undefined) {
                    const book_tmp = {
                        'link': book.volumeInfo.infoLink,
                        'title': book.volumeInfo.title,
                        'pages': book.volumeInfo.pageCount,
                        'desc': book.volumeInfo.description,
                        'img': book.volumeInfo.imageLinks.thumbnail
                    };
                    books.push(book_tmp);
                }//end else if
            });
            var box_num = 0;
            add_books(box_num, books);
            $('<div></div>').attr('id', 'see_more_books').appendTo('#see_more_books_div').html('<a data-tr="See More" class="button">See More</a>')

            $(document).on('click', '#see_more_books', function () {
                box_num++;
                if (box_num == 1) {
                    add_books(box_num, books);
                    $('#see_more_books').empty();
                    //$('<p></p>').attr('class', 'titels').attr('data-tr', 'NO RESULTS').attr('id', 'scroll_end').appendTo('#see_more_books_div').html('NO RESULTS');
                } else {
                    add_books(box_num, books);
                }//end else 
            });//end click
        }//end else if
    }).catch(function () {
        var callback = 'index.php?module=error&op=503&desc=related_books_read_error_ajax';
        window.location.href = callback;
    });//end ajaxpromise
}//end related_books

function clicks() {
    $(document).on('click', '.buttons_home', function () {
        const filter = this.getAttribute('data-filter');
        const id = this.getAttribute('id').replace('_', ' ');
        var callback = 'index.php?module=shop&op=list&' + filter + '=' + id;
        setTimeout(function () {
            window.location.href = callback;
        }, 250);
    })//end click
}//end clicks

$(document).ready(function () {
    loadIn();
    slider();
    category();
    fuel();
    related_books();
    clicks();
    loadOut();
});//end ready