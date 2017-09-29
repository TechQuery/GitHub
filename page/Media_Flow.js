define(['jquery', 'EasyWebApp'],  function ($, EWA) {

    var iWebApp = new EWA();

    function set_State(view, next) {

        view.$_View.mediaReady().then(function () {

            view.ready = next ? 0 : 2;
        });
    }

    return  function (onInit) {

        onInit = (onInit instanceof Function)  &&  onInit;

        EWA.component(function (data) {

            var VM = this,  next,  list_view = this.$_View.find('[is]').view();

            VM.on('ready',  function (event) {

                set_State(this,  next = (event.header.link.next || '').uri);
            });

            data = (data instanceof Array)  ?  {list: data}  :  data;

            data = (onInit  &&  onInit.call(iWebApp, VM, data))  ||  data;

            return  $.extend(data, {
                ready:       1,
                loadMore:    function () {

                    this.ready = 1;

                    $.getJSON(next,  function (list, _, XHR) {

                        list_view.render(list, list_view.length);

                        set_State(
                            VM,
                            next = (
                                $.parseHeader( XHR.getAllResponseHeaders() )
                                    .link.next  ||  ''
                            ).uri
                        );
                    });
                }
            });
        });
    };
});
