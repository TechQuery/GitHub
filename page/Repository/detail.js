require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    var iWebApp = new EWA(),  $_DOM = $( document );


    EWA.component(function (data) {

        var $_Tree = this.$_View.find('nav > ul'),
            $_File = this.$_View.find('article');

        data.openfile = function (event) {

            $.ajax({
                url:        iWebApp.apiRoot + this.url,
                headers:    {
                    Accept:    'application/vnd.github.v3.html'
                },
                success:    (function () {

                    $_Tree.find('li.active').removeClass('active');

                    this.$_View.addClass('active');

                    $_File.html( arguments[0] );

                }).bind( this )
            });

            event.stopPropagation();    event.preventDefault();
        };

        data.opendir = function (event) {

            var sub = $( event.target.nextElementSibling ).view();

            if (! sub)  return;

            if (! sub[0])
                iWebApp.load( sub ).then(function () {

                    for (var i = 0;  sub[i];  i++)
                        if (sub[i].type !== 'dir')
                            $( sub[i].$_View[0].lastElementChild ).remove();
                });
            else
                sub.$_View.toggle( 250 );

            event.stopPropagation();    event.preventDefault();
        };

        this.one('ready',  function () {

            this.$_View.find('nav a[data-autofocus="true"]').click();
        });
    });
});
