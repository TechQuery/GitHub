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
        });

    //  主导航栏

        iWebApp.on({
            type:    'template',
            href:    '.md'
        },  function () {

            return  marked( arguments[1] );

        }).on('route',  function (event, $_Link) {

            if ( event.src )
                $_Link = $(
                    $_Link.filter(
                        '[href*="'  +
                            event.src.split('/')[0].replace(/s$/, '')  +
                        '"]'
                    )[0] || $_Link
                );

            $( $_Link[0].parentNode ).addClass('active')
                .siblings().removeClass('active');
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
