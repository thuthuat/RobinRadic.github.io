
(function (factory) {

    factory(jQuery);

}(function ($) {


    $.widget('radic.pageTopUser', {
        version: '0.0.1',
        $template: {},
        options: {
            username: '',
            templateDataSelector: 'script[data-template-id="page-top-user"]',
        },

        _create: function () {
            var self = this;
            this.refresh();
        },

        refresh: function(){
            var self = this;
            self._getData(function (data) {
                self._createHTML(data);
            });
        },

        _createHTML: function(data){
            var self = this;
            self.element.html('');
            var templateHTML = $(self.options.templateDataSelector).html();
            var template = jQuery.template(templateHTML);
            self.$template = $(template(data));
            self._bindEvents();
            self.element.append(self.$template);
            Metronic.initAjax();

        },

        _getData: function (callback) {
            var self = this;
            var username = this.options.username;
            var data = {};
            $.async.waterfall([
                function (done) {
                    $.github.user(username, function (userData) {
                       // console.log('fetched data ', userData);
                        data.user = userData;
                        done(null, data);
                    });
                },
                function(data, done){
                    data.loggedin = $.github.loggedin();
                    done(null, data);
                }
            ], function(err, data){
                callback(data);
            })
        },


        _bindEvents: function(){
            var self = this;
            this.$oauth = this.$template.find('.github-oauth');
            this.$oauth.on('click', function(e){
                e.preventDefault();
                if($.github.loggedin()){
                    $.github.logout();
                } else {
                    $.github.login(function(){
                        self.refresh();
                    });
                }
                self.refresh();
            })
        },

        /* The _init method is called after _create when the widget is first applied to its elements.
         The _init method is also called every time thereafter when the widget is invoked with no arguments or with options.
         This method is the recommended place for setting up more complex initialization and is a good way to support reset functionality for the widget if this is required.
         It's common for widgets to not implement an _init method. */
        _init: function (callback) {


        },



        _getCreateEventData: function () {

        },

        _destroy: function () {
            this.element.html('');
        },



    });

}));
