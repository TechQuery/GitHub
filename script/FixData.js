//  GitHub API 数据整理

define(['jquery', 'TimePassed', 'marked'],  function ($, TimePassed, marked) {

    function FixOne(item) {

        var data = { },  base = this;

        $.each(item,  function (key, value) {

            if (this === self)  return;

            var name = key.split('_');

            switch ( name.slice(-1)[0] ) {
                case 'at':             {
                    data[ key ] = value;

                    data[name.slice(0, -1).join('_') + 'Time'] =
                        TimePassed( this );
                    break;
                }
                case 'url':
                    data[ key ] = this.replace(base, '');
                    break;
                case 'description':
                    data[ key ] = marked( this );
                    break;
                case 'content':
                    if (/MarkDown/i.test( item.language )) {

                        data[ key ] = marked( this );    break;
                    }
                default:
                    data[ key ] = (typeof value === 'object')  ?
                        FixData.call(base, this)  :  value;
            }
        });

        return data;
    }

    function FixData(data) {

        return  (data instanceof Array)  ?
            $.map(data, FixOne.bind(this))  :  FixOne.call(this, data);
    }

    return FixData;
});
