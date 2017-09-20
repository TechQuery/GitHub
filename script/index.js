require([
    'jquery', 'EasyWebApp', 'FixData', 'BootStrap'
],  function ($, EWA, FixData) {

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
            src:       'gists'
        },  function (event, data) {

            if (data instanceof Array)
                return {
                    list:     data,
                    total:
                        (data.length  <  $.paramJSON( event.src ).pre_page)  ?
                            data.length  :  3000
                };
        });

    //  主导航栏 状态维护

        var $_Nav = $('#Main_Nav > ul');

        iWebApp.on({
            type:    'ready',
            href:    'page/'
        },  function () {

            $_Nav.children(
                ':has(a[href^="' +
                    $.filePath( this.getRoute().split('?')[0] )  +
                '"])'
            ).addClass('active').siblings().removeClass('active');
        });
    });
});
