
function validate_matricula(text) {
    if (text.length > 0) {
        var reg = /^[0-9]{4}[A-Z]{3}$/;
        return reg.test(text);
    }
    return false;
}//end matricula

function validate_bastidor(text) {
    if (text.length > 0) {
        var reg = /^[A-Z0-9]*$/;
        return reg.test(text);
    }
    return false;
}//end bastidor

function validate_model(text) {
    if (text.length > 0) {
        var reg = /^[a-zA-Z0-9-' '\/\(\)\?\¿\:\;\.\,\à\è\ì\ò\ù\À\È\Ì\Ò\Ù\á\é\í\ó\ú\ý\Á\É\Í\Ó\Ú\Ý\ñ\Ñ\ä\ë\ï\ö\ü\ÿ\Ä\Ë\Ï\Ö\Ü\Ÿ\ç\Ç]*$/;
        return reg.test(text);
    }
    return false;
}//end model

function validate_brand(text) {
    if (text.length > 0) {
        var reg = /^[a-zA-Z0-9-' '\/\(\)\?\¿\:\;\.\,\à\è\ì\ò\ù\À\È\Ì\Ò\Ù\á\é\í\ó\ú\ý\Á\É\Í\Ó\Ú\Ý\ñ\Ñ\ä\ë\ï\ö\ü\ÿ\Ä\Ë\Ï\Ö\Ü\Ÿ\ç\Ç]*$/;
        return reg.test(text);
    }
    return false;
}//end brand

function validate_price(text) {
    if (text.length > 0) {
        var reg = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
        return reg.test(text);
    }
    return false;
}//end price

function validate_km(text) {
    if (text.length > 0) {
        var reg = /^[0-9]*$/;
        return reg.test(text);
    }
    return false;
}//end km

function validate_desc(text) {
    if (text.length > 0) {
        var reg = /^[a-zA-Z0-9-' '\Ã\(\)\?\¿\:\;\.\,\à\è\ì\ò\ù\À\È\Ì\Ò\Ù\á\é\í\ó\ú\ý\Á\É\Í\Ó\Ú\Ý\ñ\Ñ\ä\ë\ï\ö\ü\ÿ\Ä\Ë\Ï\Ö\Ü\Ÿ\ç\Ç]*$/;
        //var reg = /^[a-zA-Z0-9-' ',]*$/;
        return reg.test(text);
    }
    return false;
}//end desc

function validate_fuel(text) {
    var ok_fuel = false;
    for (var i = 0; i < text.length; i++) {
        if (text[i].checked) {
            ok_fuel = true;
        }//end if
    }//end for array
    return ok_fuel;
}//end fuel

function validate_extras(text) {
    var ok_extras = false;
    for (var i = 0; i < text.length; i++) {
        if (text[i].checked) {
            ok_extras = true;
        }//end if
    }//end for array
    return ok_extras;
}//end extras

function validate_f_mat(text) {
    if (text.length > 0) {
        return true;
    }
    return false;
}//end f_mat

function validate_dummies(text) {
    if ((text > 0) && (text <= 1000)) {
        return true;
    }
    return false;
}//end dummies

function validate() {
    var ok = true;
    var matricula = validate_matricula(document.getElementById('matricula').value);
    var bastidor = validate_bastidor(document.getElementById('bastidor').value);
    var model = validate_model(document.getElementById('model').value);
    var brand = validate_brand(document.getElementById('brand').value);
    var price = validate_price(document.getElementById('price').value);
    var km = validate_km(document.getElementById('km').value);
    var desc = validate_desc(document.getElementById('desc').value);
    var fuel = validate_fuel(document.querySelectorAll("[id='fuel']"));
    var extras = validate_extras(document.querySelectorAll("[id='extras']"));
    var f_mat = validate_f_mat(document.getElementById('f_mat').value);

    /* console.log("mat " + matricula);
    console.log("bast " + bastidor);
    console.log("model " + model);
    console.log("brand " + brand);
    console.log("price " + price);
    console.log("km " + km);
    console.log("desc " + desc);
    console.log("fuel " + fuel);
    console.log("extras " + extras);
    console.log("date " + f_mat);
    console.log(document.getElementById('f_mat').value);
    var test = document.querySelectorAll("[id='extras']");
    console.log(test[1]); */

    if (!matricula) {
        document.getElementById('error_matricula').innerHTML = " *The Number Plate is NOT valid";
        ok = false;
    } else {
        document.getElementById('error_matricula').innerHTML = "";
    }//end matricula

    if (!bastidor) {
        document.getElementById('error_bastidor').innerHTML = " *The Chassis Number is NOT valid";
        ok = false;
    } else {
        document.getElementById('error_bastidor').innerHTML = "";
    }//end bastidor

    if (!model) {
        document.getElementById('error_model').innerHTML = " *The Model is NOT valid";
        ok = false;
    } else {
        document.getElementById('error_model').innerHTML = "";
    }//end model

    if (!brand) {
        document.getElementById('error_brand').innerHTML = " *The Brand is NOT valid";
        ok = false;
    } else {
        document.getElementById('error_brand').innerHTML = "";
    }//end brand

    if (!price) {
        document.getElementById('error_price').innerHTML = " *The Price is NOT valid";
        ok = false;
    } else {
        document.getElementById('error_price').innerHTML = "";
    }//end price

    if (!km) {
        document.getElementById('error_km').innerHTML = " *The Kilometers are NOT valid";
        ok = false;
    } else {
        document.getElementById('error_km').innerHTML = "";
    }//end km

    if (!desc) {
        document.getElementById('error_desc').innerHTML = " *The Description is NOT valid";
        ok = false;
    } else {
        document.getElementById('error_desc').innerHTML = "";
    }//end desc

    if (!fuel) {
        document.getElementById('error_fuel').innerHTML = " *You must select a fuel type";
        ok = false;
    } else {
        document.getElementById('error_fuel').innerHTML = "";
    }//end fuel

    if (!extras) {
        document.getElementById('error_extras').innerHTML = " *You must select an additional features";
        ok = false;
    } else {
        document.getElementById('error_extras').innerHTML = "";
    }//end extras

    if (!f_mat) {
        document.getElementById('error_f_mat').innerHTML = " *You must select a date";
        ok = false;
    } else {
        document.getElementById('error_f_mat').innerHTML = "";
    }//end f_mat

    if (ok == true) {

        if (document.getElementById('form_create') != null) {
            document.getElementById('form_create').submit();
            document.getElementById('form_create').action = "index.php?module=car&op=create";
        }//end if create

        if (document.getElementById('form_update') != null) {
            var id_car = document.getElementById('id_car').value;
            document.getElementById('form_update').submit();
            document.getElementById('form_update').action = "index.php?module=car&op=update&id=" + id_car;
        }//end if update


    }//end  if

    //return ok;

}//end validate

function delete_car() {
    if (document.getElementById('form_delete') != null) {
        var id_car = document.getElementById('id_car').value;
        document.getElementById('form_delete').submit();
        document.getElementById('form_delete').action = "index.php?module=car&op=delete&id=" + id_car;
    }//end if delete

    if (document.getElementById('form_delete_all') != null) {
        document.getElementById('form_delete_all').submit();
        document.getElementById('form_delete_all').action = "index.php?module=car&op=delete_all&";
    }//end if delete
}//end delete

function dummies_car() {

    var dummies = validate_dummies(document.getElementById('num').value);
    var ok = true

    if (!dummies) {
        document.getElementById('error_dummies').innerHTML = " *The number is NOT valid. The value must be between 1 and 1000";
        ok = false;
    } else {
        document.getElementById('error_dummies').innerHTML = "";
    }//end matricula

    if ((document.getElementById('form_dummies') != null) && (ok)) {
        document.getElementById('form_dummies').submit();
        document.getElementById('form_dummies').action = "index.php?module=car&op=dummies";
    }//end if dummies
}//end dummies

///MODAL////

function show_modal_car(title) {
    //$("#car_details").show();
    $("#car_modal").dialog({
        title: title,
        width: 850,
        height: 550,
        resizable: "true",
        modal: "true",
        hide: "fold",
        show: "fold"
    }); // end dialog

}// end show_modal_car

function modal_car_read() {
    $('.modal_read').on("click", function () {
        var id = this.getAttribute("id");
        $.ajax({
            url: 'module/car/ctrl/ctrl_car.php?op=modal_read&id=' + id,
            type: 'GET',
            dataType: 'JSON'
        }).done(
            function (data) {
                //console.log(data);
                if (data == 'error') {
                    var callback = 'index.php?module=error&op=503&desc=modal_read_error_data';
                    window.location.href = callback;
                } else {

                    $('<div></div>').attr('id', 'car_container').appendTo('#car_details');
                    $('#car_container').empty;
                    $('<div></div>').attr('id', 'car_modal_info').appendTo('#car_container');
                    $('#car_modal_info').html(function () {
                        var car_info = "";
                        for (row in data) {
                            //console.log(row);
                            switch (row) {

                                case 'extres':
                                    var extres = data['extres'].split(':');
                                    var extres_list = "<ul>";
                                    extres.forEach(extres_ind => {
                                        if (extres_ind != "") {
                                            extres_list += "<li>" + extres_ind + "</li>"
                                        }//end if
                                    });//end foreach extres
                                    extres_list += "</ul>"
                                    car_info += '<br><b><span data-tr="extres">Additional features</span><span>: </span></b><span>' + extres_list + '</span>';
                                    break;
                                case 'car_img':
                                    break;

                                default:
                                    car_info += '<br><b><span data-tr="' + row + '">' + row + '</span><span>: </span></b><span>' + data[row] + '</span>';
                                    break;

                            }//end swich
                        }//end for
                        car_info += "<br><br><a href='index.php?module=car&op=update&id=" + data['id'] + "'><button type='button' class='btn btn-primary' data-tr='Update'>Update</button></a>";
                        car_info += "<a href='index.php?module=car&op=delete&id=" + data['id'] + "'><button type='button' class='btn btn-danger' data-tr='Delete'>Delete</button></a>";
                        return car_info;
                    });//end function
                    translate();
                    show_modal_car(data['model']);
                }//end else if
            }//end done
        ).fail(
            function () {
                var callback = 'index.php?module=error&op=503&desc=modal_read_error_ajax';
                window.location.href = callback;
            }//end fail
        );//end ajax
    });//end on click
}//end modal_car_read


$(document).ready(function () {
    modal_car_read();
    $('#car_list_table').DataTable();
});//end ready