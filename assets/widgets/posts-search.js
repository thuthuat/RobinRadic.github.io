(function (factory) {

    factory(jQuery);

}(function ($) {


    $.widget('radic.postSearch', {
        version: '0.0.1',

        options: {
            initialSearchString: false,
            baseurl: '/',
            resultTableSelector: '#posts-search-result',
            templateDataSelector: 'script[data-template-id="posts-search"]',
        },

        _create: function () {
            var self = this;
            this.posts = [];
            this.$input = this.element.find('input[name="query"]');
            this.$container = $(document.createElement('div')).addClass('page-content page-content-search');
            $('.page-content-wrapper').prepend(this.$container);

            this._bindAll();

            this._getData(function(){
                if(self.options.initialSearchString !== false) {
                    var result = self._getSearchResults(self.options.initialSearchString);
                }
                console.log(result);
            });
        },

        _bindAll: function(){
            var self = this;
            self.element.on('submit', function(e){
                e.preventDefault();
                self.element.spin();

                var result = self._getSearchResults(self.$input.val());
                self._showResultTable(result);

                self.element.spin(false);
                console.log(result);
                return false;
            })
        },


        _showResultTable: function(results){
            var self = this;
            self.$container.html('');
            var data = {
                results: results
            };
            var templateHTML = $(this.options.templateDataSelector).html();
            var template = $($.template(templateHTML)(data));
            template.find('.portlet-title .actions a').on('click', function(e){
                self.$container.html('');
            });
            self.$container.append(template);
        },

        _getData: function(done){
            var self = this;
            var search = this.options.search;
            $.get(this.options.baseurl + '/search.json', function(data){
                self.posts = data;
                console.log(data);
                done();
            })
        },

        _getSearchResults: function(searchString){
            var self = this;

            var results = {};
            var posts = $.cloneDeep(self.posts);

            $.each(posts, function(i, item){
             //   console.log('each post', i, item);
                if(item === false){
                    return;
                }
                $.each(item, function(name, val){
                    console.log('each post item', name, val);
                    if(typeof val === 'string' && val.indexOf(searchString) > -1){
                        if(typeof results[item.id] === 'undefined') {
                            results[item.id] = item;
                        }

                        if(typeof results[item.id].rating === 'undefined'){
                            results[item.id].rating = 1;
                        } else {
                            results[item.id].rating++;
                        }
                    }
                });
            });

            var searchResults = [];

            $.each(results, function(id, item){
                searchResults.push(item);
            });

            searchResults.sort(function(a,b){
                if (a.rating < b.rating)
                    return 1;
                if (a.rating > b.rating)
                    return -1;
                return 0;
            });

            return searchResults;
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
