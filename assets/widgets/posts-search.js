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
            limit: 10
        },

        _create: function () {
            var self = this;
            this.posts = [];
            this.$input = this.element.find('input[name="query"]');
            this.$container = $(document.createElement('div')).addClass('page-content page-content-search');
            $('.page-content-wrapper').prepend(this.$container);

            this._bindAll();
        },

        _bindAll: function(){
            var self = this;
            self.element.off('submit').on('submit', function(e){
                e.preventDefault();
                self.search(self.$input.val());
                self.$input.blur();
                return false;
            });
            $('a[data-tag]').off('click').on('click', function(e){
                e.preventDefault();
                self.search($(this).data('tag'), 'tags');
            });
        },


        _showResultTable: function(results){
            var self = this;
            self.$container.html('');
            self.$container.hide();
            var data = {
                results: results,
                converter: new Showdown.converter()
            };
            var templateHTML = $(this.options.templateDataSelector).html();
            var template = $($.template(templateHTML)(data));
            template.find('.portlet-title .actions a').on('click', function(e){
                self.$container.hide('slow', function(){
                    self.$container.html('');
                });
            });
            self.$container.append(template);
            self._bindAll();
            self.$container.show("slow");
            $('html, body').animate({
                scrollTop: 0
            }, 500);
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


        search: function(searchString, searchColumn){
            var self = this;
            var results = {};
           // console.log('starting search',searchString, searchColumn);
            self.element.spin();

            if(self.posts.length > 0) {
                var posts = $.cloneDeep(self.posts);
            } else {
                this._getData(function(){
                    self.search(searchString, searchColumn);
                });
                return;
            }

            if(typeof searchColumn === 'undefined'){
                searchColumn = false;
            }

            $.each(posts, function(i, item){
                if(item === false){
                    return;
                }
                item.content = item.content.replace(/<(?:.|\n)*?>/gm, ''); // remove html tags for better search results
                if(searchColumn && searchColumn == 'tags'){

                    if(_.contains(item.tags, searchString) !== false){
                        //console.log('found tag ',searchString, _.contains(item.tags, searchString), item.tags);
                        if(_.isUndefined(results[item.id])){
                            results[item.id] = item;
                            results[item.id].rating = 1;
                        } else {
                            results[item.id].rating++;
                        }
                       // console.log('found tag result',results);
                    }

                } else {
                    $.each(item, function (name, val) {
                        if(_.isArray(val)){
                            val = val.join(' '); // join array to string to allow searching
                        }
                        if (typeof val === 'string' && val.indexOf(searchString) > -1) {
                            if (typeof results[item.id] === 'undefined') {
                                results[item.id] = item;
                            }

                            if (typeof results[item.id].rating === 'undefined') {
                                results[item.id].rating = 1;
                            } else {
                                results[item.id].rating++;
                            }
                        }
                    });
                }
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

            self._showResultTable(searchResults.slice(0, self.options.limit));

            self.element.spin(false);
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
            $('a[data-tag]').off('click');
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
