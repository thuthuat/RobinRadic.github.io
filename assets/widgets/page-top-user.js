
(function (factory) {

    factory(jQuery);

}(function ($) {


    $.widget('radic.pageTopUser', {
        version: '0.0.1',

        options: {
            username: '',
            templateDataSelector: 'script[data-template-id="page-top-user"]',
        },

        _create: function () {
            var self = this;
            self._getData(function (data) {
              //  console.log(data);
                var templateHTML = $(self.options.templateDataSelector).html();
                var template = jQuery.template(templateHTML);
              //  console.log('pre temp data', data);
                var $widget = $(template(data));
                self.element.append(template(data));
                Metronic.initAjax();
            });
        },

// _getData, _getDataTopLanguages, _getDataTopRepos, _combineData

        _getData: function (callback) {
            var self = this;
            var username = this.options.username;
            var data = {};
            $.async.waterfall([
                function (done) {
                    $.github.user(username, function (userData) {
                       // console.log('fetched data ', userData);
                        data.user = userData;
                        callback(data);
                        done(null);

                    });
                }
            ])
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


        _setOptions: function (options) {
            // Ensure "value" option is set after other values (like max)
            var value = options.value;
            delete options.value;

            this._super(options);

            this.options.value = this._constrainedValue(value);
            this._refreshValue();
        },

        _setOption: function (key, value) {
            if (key === "max") {
                // Don't allow a max less than min
                value = Math.max(this.min, value);
            }
            if (key === "disabled") {
                this.element
                    .toggleClass("ui-state-disabled", !!value)
                    .attr("aria-disabled", value);
            }
            this._super(key, value);
        },


    });

}));
