

var jsdom = require("jsdom");
var Firebase = require('firebase');
var libraryRef = new Firebase('https://dataviz-libraries.firebaseio.com/library');

jsdom.env("http://codefactory.kr/data-visualization-libraries", [
  'http://code.jquery.com/jquery-1.5.min.js'
],
function(errors, window) {
    var $ = window.$;

    console.log($('#table tbody tr').length);
    var itmeList = [];

    $('#table tbody tr').each(function(){

        var name = $(this).find('td').eq(0).text();
        // console.log('name: ' + name);

        var usage = $(this).find('td').eq(1).text();
        // console.log('usage: ' + usage);

        var demoURL = $(this).find('td').eq(2).find('a').attr('href');
        // console.log('demoURL: ' + demoURL);

        var element = $(this).find('td').eq(3).text();
        // console.log('element: ' + element);

        var ie8 = $(this).find('td').eq(4).text();
        ie8 = ie8 === 'O' ? true : false;
        // console.log('ie8: ' + (ie8 === 'O' ? true : false) );

        var price = $(this).find('td').eq(5).text();
        // console.log('price: ' + price);

        var description = $(this).find('td').eq(6).text();
        // console.log('description: ' + description);

        var relation = $(this).find('td').eq(7).text();
        // console.log('relation: ' + relation);

        var webURL = $(this).find('td').eq(8).find('a').attr('href');
        // console.log('webURL: ' + webURL);

        var item = {
            name          : name,
            usage         : usage,
            demoURL       : demoURL,
            element       : element,
            isSupportIE8  : ie8,
            price         : price,
            description   : description,
            relation      : relation,
            webURL        : webURL
        };

        itmeList.push(item);
    });


    function fbPush(index) {
        if (index >= itmeList.length) {
            console.log('done...');
            return;
        }
        var obj = itmeList[index];
        libraryRef.push(obj, function() {
            console.log('push success!!! index:' + index);
            ++index;
            fbPush(index);
        });
    }

    fbPush(0);
});