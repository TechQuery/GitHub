require(['jquery', 'EasyWebApp', 'BootStrap'],  function ($, EWA) {

    var iWebApp = new EWA();


    EWA.component(function (data) {

        $('.nav-tabs').parent().tab().on(
            'shown.bs.tab',  'a[data-toggle="tab"]',  function () {

                var ID = arguments[0].target.getAttribute('href');

                var target = $( ID )[0];

                if ((! target.firstElementChild)  &&  target.dataset.href)
                    iWebApp.load( target ).then(function () {

                        iWebApp.setURLData('tab', ID.slice(1));
                    });
            }
        );

        data.tabState = function (item, active) {

            active = active || true;

            if (! data.tab)
                return  item.previousElementSibling ? '' : active;

            return (
                data.tab === (
                   item.id || item.firstElementChild.getAttribute('href').slice(1)
                )
            ) ? active : '';
        };
    });
});
