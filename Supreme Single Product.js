// Photo Name of item
var target = 'rU4GusJ_cok';

// Your size
var preferredSize = "Medium"; // "Small", "Medium", "Large", "XLarge"

//Address info
var billing_name = "asd asd";
var order_email = "aaaa@xxx.com";
var order_tel = "11111111";
var order_address = "ss ss";
var order_apt = "apt1";
var order_billing_zip = "11111";
var order_billing_city = "aa aa";
var order_billing_state = "CA";
var order_billing_country = "USA"; // "USA", "CANADA"

//Payment info
var cnb = "0000000000";
var month = "01";
var year = "2020";
var vval = "000";


/////////////////////////////////////////////////////////////////////////////////////////
var wins = {};
var checkout_URL = "https://www.supremenewyork.com/checkout";

$('#container article div img').each(function() {
    var href = $(this).attr('src');
    //console.log(href.match(target));
    if (href.match(target)) {
        $(this)[0].click();
    }
});

/*
automatically choose correct size, if applicable
*/
(function waitTillArticlePageIsOpen() {
    // check if article page has loaded by looking at main image
    if ($("#img-main")[0]) {
        // choose appropriate size, if applicable
        if ($("select")[0]) {
            for (var i = 0; i < $("select")[0].options.length; i++) {
                if ($("select")[0].options[i].text == preferredSize) {
                    $("select")[0].selectedIndex = i;
                    break;
                }
            }
        }
        console.log("done choosing size.")
        addToCart()
    } else
        setTimeout(function(){ waitTillArticlePageIsOpen(); }, 10);
    console.log("waiting to load...");

    return;
})();

function addToCart() {
    /*
    Script to use on item screen
    */
    // add to cart
    document.getElementsByName('commit')[0].click();

    // Wait until cart updates, then go to checkout
    var itemsCountElm = $("#items-count");

    (function waitTillCartUpdates() {
        if (itemsCountElm.text() == '') {
            setTimeout(function(){ waitTillCartUpdates(); }, 10);
            return;
        } else {
            // Click checkout button
            checkout();
            return;
        }
    })();
}

function checkout () {
    wins['checkout'] = window.open(checkout_URL, '_blank')
    //console.log('checkout!')
    payment()
}


function payment() {
    //console.log(urls)
    let win = wins['checkout']
    if (win.document.getElementById('checkout_form')) {
        /*
        Script to use on checkout screen
        */
        if ($(win.document).find('input#order_billing_name')[0]) {
            $(win.document).find('input#order_billing_name')[0].value = billing_name;
        }
        if ($(win.document).find('input#order_email')[0]) {
            $(win.document).find('input#order_email')[0].value = order_email;
        }
        if ($(win.document).find('input#order_tel')[0]) {
            $(win.document).find('input#order_tel')[0].value = order_tel;
        }

        if ($(win.document).find('input#bo')[0]) {
            $(win.document).find('input#bo')[0].value = order_address;
        }

        if ($(win.document).find('input#oba3')[0]) {
            $(win.document).find('input#oba3')[0].value = order_apt;
        }

        if ($(win.document).find('input#order_billing_zip')[0]) {
            $(win.document).find('input#order_billing_zip')[0].value = order_billing_zip;
        }

        if ($(win.document).find('input#order_billing_city')[0]) {
            $(win.document).find('input#order_billing_city')[0].value = order_billing_city;
        }

        if ($(win.document).find('select#order_billing_state')[0]) {
            $(win.document).find('select#order_billing_state')[0].value = order_billing_state;
        }

        if ($(win.document).find('select#order_billing_country')[0]) {
            $(win.document).find('select#order_billing_country')[0].value = order_billing_country;
        }

        if ($(win.document).find('input#nnaerb')[0]) {
            $(win.document).find('input#nnaerb')[0].value = cnb;
        }
        if ($(win.document).find('select#credit_card_month')[0]) {
            $(win.document).find('select#credit_card_month')[0].value = month;
            $(win.document).find('select#credit_card_year')[0].value = year;
        }
        if ($(win.document).find('input#orcer')[0]) {
            $(win.document).find('input#orcer')[0].value = vval;
        }

        // Check the "I Accept Terms..." button
        if ($(win.document).find('.iCheck-helper')[1]){
            $(win.document).find('.iCheck-helper')[1].click();
        }
        if ($(win.document).find('.checkbox')[1]) {
            $(win.document).find('.checkbox')[1].click();
            console.log('prepare to pay');

            //Auto payment，1500(ms) is delay setting，uncomment next line to turn on auto payment
            //setTimeout(pay, 1500);

        }

    } else {
        setTimeout(function(){ payment(); }, 10);
        return;
    }
}

function pay() {
    let win = wins['checkout']
    win.document.getElementsByName('commit')[0].click();
}