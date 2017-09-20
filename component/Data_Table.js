require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    var iWebApp = new EWA();


    EWA.component(function () {

        var iEvent = {
                type:      'data',
                target:    this.$_View.find('tbody')[0]
            },
            VM = this.on('update',  function () {

                this.$_View.find(
                    '[name="'  +  Object.keys( arguments[1] )[0]  +  '"]'
                ).change();
            });

        iWebApp.off( iEvent ).on(iEvent,  function (_, data) {

            var total = VM.total || data.total;

            VM.render({
                total:      total,
                pageSum:    Math.ceil(total / VM.rows)
            });

            return data.list;
        });

        $.extend(arguments[0], {
            pageChange:    function (event) {

                var target = event.target,  value;

                if (value = parseInt(target.value || target.textContent)) {

                    this[target.name || 'page'] = value;

                    iWebApp.load( iEvent.target );

                    event.stopPropagation();    event.preventDefault();
                }
            }
        });
    });
});
