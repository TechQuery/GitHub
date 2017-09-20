require([
    'jquery', 'EasyWebApp', 'FixData', 'marked', 'BootStrap'
],  function ($, EWA, FixData, marked) {

//  应用程序入口

    $( document ).ready(function () {

        var iWebApp = $('#PageBox').iWebApp('https://api.github.com/');

    //  JSON 请求预处理

        $.ajaxPrefilter('json',  function (option) {

            if (! option.url.indexOf('page/'))
                option.url = iWebApp.pageRoot + option.url;
        });

    //  GitHub API 请求处理

        iWebApp.on({
            type:      'request',
            method:    'GET',
            src:       '/'
        },  function (event, AJAX) {

            AJAX.transport.setRequestHeader(
                'Authorization',  'token 39ff883676bf43c5723e92701487a020ad1abfb2'
            );
        }).on({
            type:      'data',
            method:    'GET'
        },  function (event, data) {

            return  FixData.call(this.apiRoot, data);
        }).on({
            type:      'data',
            method:    'GET',
            src:       /gists|repos/
        },  function (event, data) {

            if ((data instanceof Array)  &&  (event.src.indexOf('/contents/') < 0))
                return {
                    list:     data,
                    total:
                        (data.length  <  $.paramJSON( event.src ).pre_page)  ?
                            data.length  :  3000
                };
        }).on({
            type:    'template',
            href:    '.md'
        },  function () {

            return  marked( arguments[1] );
        });

    //  主导航栏 状态维护

        var $_Nav = $('#Main_Nav > ul');

        function find_Nav(URL, part) {

            return $_Nav.children(
                ':has(a[href'  +  (part ? '^' : '')  +  '="'  +  URL  +  '"])'
            ).eq( 0 );
        }

        iWebApp.on({
            type:    'ready',
            href:    /page\/|\.md/i
        },  function () {

            var route = this.getRoute(),  $_Item;

            var page = route.split('?')[0];

            var path = $.filePath( page )  ||  page;

            if (
                ($_Item = find_Nav( route ))[0]  ||
                ($_Item = find_Nav( page ))[0]  ||
                ($_Item = find_Nav(path, true))[0]
            )
                $_Item.addClass('active').siblings().removeClass('active');
        });

    //  搜索框

        $('nav form').submit(function () {

            var keyword = this.elements.keyword.value;

            iWebApp.loadPage(
                (keyword.indexOf('/') < 0)  ?
                    ('page/User/detail.html?data=users/' + keyword)  :
                    ('page/Repository/detail.html?data=repos/' + keyword)
            );

            return false;
        });
    });
});
