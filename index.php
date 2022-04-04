<?php
include_once "utils/utils.php";
include_once "view/top_page/top_page.html";

switch ($_GET['module']) {
    case 'car':
        include_once "view/top_page/top_page_car.html";
        break;

    case 'home':
        include_once "view/top_page/top_page_home.html";
        break;

    case 'shop':
        include_once "view/top_page/top_page_shop.html";
        break;
    case 'login':
        switch ($_GET['op']) {
            case 'list_login':
                include_once "view/top_page/top_page_login.html";
                break;

            case 'list_register':
                include_once "view/top_page/top_page_register.html";
                break;
        }
        break;
} //end switch

include_once "view/menu.html";
include_once "view/pages.php";
include_once "view/footer.html";
