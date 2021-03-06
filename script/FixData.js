//  GitHub API 数据整理

define(['jquery', 'TimeKit', 'marked'],  function ($, TimeKit, marked) {

    function FixOne(item) {

        var data = { };

        $.each(item,  function (key, value) {

            if (this === self)  return;

            var name = key.split('_');

            switch ( name.slice(-1)[0] ) {
                case 'date':           ;
                case 'on':             ;
                case 'at':             {
                    data[ key ] = value;

                    data[name.slice(0, -1).join('_') + 'Time'] =
                        TimeKit.distanceOf( this );
                    break;
                }
                case 'url':
                    data[ key ] = this.replace('https://api.github.com/', '');
                    break;
                case 'body':           ;
                case 'description':
                    data[ key ] = /[\*~_\-\[\(]/.test( this )  ?
                        marked( this.valueOf() )  :  this;
                    break;
                case 'content':
                    if (/MarkDown/i.test( item.language )) {

                        data[ key ] = marked( this );    break;
                    }
                default:
                    data[ key ] = (typeof value === 'object')  ?
                        FixData( this )  :  value;
            }
        });

        return data;
    }

    function FixData(data) {

        return  (data instanceof Array)  ?
            $.map(data, FixOne)  :  FixOne( data );
    }

    return FixData;
});
