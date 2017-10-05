require(['jquery', 'EasyWebApp'],  function ($, EWA) {

    function set_Percent() {

        this.percent = (
            this.closed_issues / (this.open_issues + this.closed_issues)
        ) * 100;
    }

    EWA.component(function (_data_) {

        if ( _data_.list )
            $.each(_data_.list, set_Percent);
        else
            set_Percent.call( _data_.milestone );

        _data_.barState = function () {

            var due = new Date( this.due_on ),  state = 'progress-bar-striped ';

            if (Date.now() > due)
                return  state + 'progress-bar-danger';

            return  (this.percent < 100)  ?
                (state + 'active')  :
                'progress-bar-success';
        };
    });
});