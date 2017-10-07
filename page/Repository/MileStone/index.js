require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    var iWebApp = new EWA();


    EWA.component(function () {

        this.on('ready',  function () {

            $.each(this.$_View.find(':listview').view(),  function () {

                iWebApp.load( this.childOf()[0] );
            });
        });
    });
});