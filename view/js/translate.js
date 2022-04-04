function translate(lang) {
    lang = lang || localStorage.getItem('app-lang') || 'en';
    localStorage.setItem('app-lang', lang);
    var elementos = document.querySelectorAll('[data-tr]');

    $('#button-' + lang).prop('selected', true);

    ajaxPromise('view/lang/' + lang + '.json', 'POST', 'JSON')
        .then(function (data) {
            for (var i = 0; i < elementos.length; i++) {
                //elementos[i].innerHTML = data[lang][elementos[i].dataset.tr];
                elementos[i].innerHTML = data.hasOwnProperty(lang) ? data[lang][elementos[i].dataset.tr] : elementos[i].dataset.tr;
            }//end for
        }).catch(function () {
            var callback = 'index.php?module=error&op=503&desc=translate_error_data';
            window.location.href = callback;
        })//end ajaxPromise
}//end translate

$(document).ready(function () {
    translate();

    $('#select_lang').change(function () {
        var id = $(this).find("option:selected").attr("id");
        //console.log(id);

        switch (id) {
            case 'button-en':
                translate('en');
                break;

            case 'button-es':
                translate('es');
                break;

            case 'button-val':
                translate('val');
                break;

            default:
                break;
        }
    });//end select_lang
});//end ready