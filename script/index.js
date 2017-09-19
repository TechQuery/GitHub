require(['jquery', 'EasyWebApp', 'TimePassed', 'BootStrap'],  function ($, EWA, TimePassed) {

//  数据整理

    function FixOne(item) {

        var data = { },  iWebApp = this;

        $.each(item,  function (key) {

            if (this === self)  return;

            var name = key.split('_');

            switch ( name.slice(-1)[0] ) {
                case 'at':
                    data[name.slice(0, -1).join('_') + 'Time'] = TimePassed( this );
                    break;
                case 'url':
                    data[ key ] = this.replace(iWebApp.apiRoot, '');
                    break;
                default:
                    data[ key ] = (typeof this.valueOf() === 'object')  ?
                        FixData.call(iWebApp, this)  :  this;
            }
        });

        return data;
    }

    function FixData(data) {

        return  (data instanceof Array)  ?
            $.map(data, FixOne.bind(this))  :  FixOne.call(this, data);
    }

//  应用程序入口

    $( document ).ready(function () {

        var iWebApp = $('#PageBox').iWebApp('https://api.github.com/');

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

            return  FixData.call(this, data);
        }).on({
            type:      'data',
            method:    'GET',
            src:       'gists/public'
        },  function (event, data) {

            return  {list: data,  total: 3000};
        });
    });
});