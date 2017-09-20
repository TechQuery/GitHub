//  GitHub API 数据整理

define(['jquery', 'TimePassed'],  function ($, TimePassed) {

    function FixOne(item) {

        var data = { },  base = this;

        $.each(item,  function (key) {

            if (this === self)  return;

            var name = key.split('_');

            switch ( name.slice(-1)[0] ) {
                case 'at':
                    data[name.slice(0, -1).join('_') + 'Time'] = TimePassed( this );
                    break;
                case 'url':
                    data[ key ] = this.replace(base, '');
                    break;
                default:
                    data[ key ] = (typeof this.valueOf() === 'object')  ?
                        FixData.call(base, this)  :  this;
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
