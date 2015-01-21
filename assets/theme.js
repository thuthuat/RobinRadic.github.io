(function (factory) {

    factory(jQuery);

}(function ($) {




    function init(){
        Metronic.init(); // init metronic core components
        Layout.init(); // init current layout


        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-center",
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

        $('.noclick').on('click', function(e){
            e.preventDefault();
        });


        $('.page-content table').each(function(){
            var $t = $(this);
            if(!$t.hasClass('table')){
                $t.addClass('table table-bordered')
            }
        })
    }

    $(function(){
        init();
    });
}));
