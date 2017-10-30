require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    var iWebApp = new EWA(),  $_DOM = $( document );


    EWA.component(function (data) {

        var tree = this.$_View.find('nav').view().on('ready',  function () {

                this.$_View.find('a[data-autofocus="true"]').click();
            }),
            $_File = this.$_View.find('article');

        data.loadBranch = function () {

            iWebApp.load( tree );
        };

        data.openfile = function (event) {

            $.ajax({
                url:        new URL(this.url, iWebApp.apiRoot) + '',
                headers:    {
                    Accept:    'application/vnd.github.v3.html'
                },
                success:    (function () {

                    tree.$_View.find('li.active').removeClass('active');

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
    });
});
