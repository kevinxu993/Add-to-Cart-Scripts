(function() {
    let currentTime = new Date();
    console.log('started time: ' + currentTime.toISOString());
    let checkout_URL = "https://www.supremenewyork.com/checkout";
    let items = [
        {
            item_code: 'r3cO9JxIjiI',
            preferSize_1: 'Large',
            preferSize_2: 'Medium'
        },
        {
            item_code: 'UpYUEolh5WY',
            preferSize_1: 'Large',
            preferSize_2: 'Medium'
        },
        {
            item_code: 'mTEWq6INkac',
            preferSize_1: '',
            preferSize_2: ''
        },
        {
            item_code: 'xUWquwoJt-I',
            preferSize_1: '',
            preferSize_2: ''
        }];

    let urlToItem = {};

    // all oponed window
    let wins = {};

    let cnb = "0000000000";
    let month = "11";
    let year = "2020";
    let vval = "000";

    var billing_name = "John Doe";
    var order_email = "jd@gmail.com";
    var order_tel = "1234567890";
    var order_address = "1 This Street";
    var order_unit = "";
    var order_billing_zip = "A1B 2C3";
    var order_billing_city = "Toronto";
    var order_billing_state = "ON";
    var order_billing_country = "CANADA"; 
    var auto_checkout = false;
    var checkout_delay = 1500;

    addItems();

    

    // get all selected items url 
    function getUrls() {
        let content = $('#container article div a').toArray();
        let urls = [];
        for (let k = 0; k < content.length; k ++) {
            let child = content[k];
            let img_url = $($(child).children()[0]).attr('src');
            let img_alt = $($(child).children()[0]).attr('alt');
            let url = $(child).attr('href');
            for (let i = 0; i < items.length; i ++) {
                let item_code = items[i].item_code;
                if (img_url.match(item_code) || img_alt.match(item_code)) {
                    urls.push(url);
                    urlToItem[url] = items[i]
                }
                if (urls.length === items.length) break;
            }
        }
        return urls
    }
    function addItems() {
        let itemUrls = getUrls();
        //console.log(itemUrls);
        let index = 0;
        loop(itemUrls);
                
        function loop(arr) {
            addItem(arr[index], function() {
                index ++;
                if (index < arr.length) {
                    loop(arr);
                } else {
                    setTimeout(function() {
                        checkout(itemUrls);
                    }, 0);
                }
            });
        }

        // open new window and add item to cart
        function addItem(itemUrl, callback) {
            wins[itemUrl] = window.open(itemUrl, '_blank');
            waitTillPageLoad();

            function waitTillPageLoad() {
                let win = wins[itemUrl];

                if($(win.document).find("#img-main")[0]) {
                    //console.log("page: " + itemUrl +  " opened successfully ....")

                    if ($(win.document).find('select')[0]) {
                        for(let j = 0; j < $(win.document).find('select')[0].options.length; j ++) {
                            let select = $(win.document).find('select')[0];
                            let selected_item = urlToItem[itemUrl];
                            if (select.options[j].text === (selected_item.preferSize_2)) {
                                select.selectedIndex = j;
                            } else if (select.options[j].text === (selected_item.preferSize_1)) {
                                select.selectedIndex = j;
                                break
                            }
                        }
                        //console.log("selected size for item: " + itemUrl)
                    }

                    // if sold out, skip
                    if (win.document.getElementsByName('commit')[0]) {
                        win.document.getElementsByName('commit')[0].click();
                    }

                    callback();
                    
                } else {
                    setTimeout(function() {
                        waitTillPageLoad();
                    }, 10)
                }
            }        
        }        
    }

    function checkout () {
        wins['checkout'] = window.open(checkout_URL, '_blank');
        console.log('checkout!');
        payment();
    }
    

    function payment() {
        //console.log(urls)
        let win = wins['checkout'];
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
                $(win.document).find('input#oba3')[0].value = order_unit;
            }

            if ($(win.document).find('input#order_billing_zip')[0]) {
                $(win.document).find('input#order_billing_zip')[0].value = order_billing_zip;
            }

            if ($(win.document).find('input#order_billing_city')[0]) {
                $(win.document).find('input#order_billing_city')[0].value = order_billing_city;
            }

            if ($(win.document).find('select#order_billing_country')[0]) {
                $(win.document).find('select#order_billing_country')[0].value = order_billing_country;
                win.$('select#order_billing_country').trigger('change');
            }

            if ($(win.document).find('select#order_billing_state')[0]) {
                $(win.document).find('select#order_billing_state')[0].value = order_billing_state;
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
                console.log('prepare to pay')
                
                // auto pay here .....!
                console.log('total checkout time: ' + (new Date().getTime() - currentTime.getTime())/ 1000);
                if (auto_checkout) {
                    setTimeout(() => pay(), checkout_delay)
                }

            }
        
        } else {
            setTimeout(function(){ payment(); }, 10);
            //console.log("waiting to payment...");
        }
    }

    function pay() {
        let win = wins['checkout']
        console.log('paid')
        win.document.getElementsByName('commit')[0].click();
    }
