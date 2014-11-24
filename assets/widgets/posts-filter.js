(function (factory) {

    factory(jQuery);

}(function ($) {


    $.widget('radic.postsFilter', {
        version: '0.0.1',

        options: {
            tableSelector: '.posts-by-tag-table',
            tagSelector: '.posts-by-tag-picker',
            categorySelector: '.posts-by-category-picker',
            viewAllSelector: '.post-view-all'
        },

        _create: function () {
            var self = this;
            this.refresh();
        },

// _getData, _getDataTopLanguages, _getDataTopRepos, _combineData

        refresh: function () {
            this._refresh();
        },

        _refresh: function() {
            this.$table = this.element.find(this.options.tableSelector);
            this.$tagPickers = this.element.find(this.options.tagSelector);
            this.$categoryPickers = this.element.find(this.options.categorySelector);
            this.$viewAllButton = this.element.find(this.options.viewAllSelector);
            this.$rows = this.$table.find('tbody tr');
            this._bindObjects();
        },

        _bindObjects: function(){
            var self = this;

            this.$categoryPickers.on('click', function(e){
                self._onPickerClick(e, $(this), 'category');
            });

            this.$tagPickers.on('click', function(e){
                self._onPickerClick(e, $(this), 'tags');
            });

            this.$viewAllButton.on('click', function(e){
                e.preventDefault();
                self.$rows.show();
                self.$table.show();
            })

        },

        _onPickerClick: function(e, $el, type){
            var self = this;

            e.preventDefault();
            self.$table.hide();
            self.$rows.hide();

            var sorter = $el.data(type);
            console.log(type, sorter);

            self.$rows.each(function(i, a){
                var $row = $(a);
                var sortables = $row.data(type).split(',');
                if($.isArray(sortables) === false){
                    sortables = [sortables];
                }
                for(var s = 0; s < sortables.length; s++){
                    sortables[s] = sortables[s].toLowerCase();
                }
                console.log(i, sortables, sorter);
                if(sortables.indexOf(sorter.toLowerCase()) !== -1){
                    console.log(i, 'has', sorter, sortables, a);
                    $row.show();
                    self.$table.show();
                }
            });
        },

        _sortBy: function(){

        },


        /* The _init method is called after _create when the widget is first applied to its elements.
         The _init method is also called every time thereafter when the widget is invoked with no arguments or with options.
         This method is the recommended place for setting up more complex initialization and is a good way to support reset functionality for the widget if this is required.
         It's common for widgets to not implement an _init method. */
        _init: function (callback) {
            this.$table.hide();
            this.$rows.hide();
        },


        _getCreateEventData: function () {

        },

        _destroy: function () {
            this.$table.show();
            this.$rows.show();

            this.$tagPickers.off('click');
            this.$categoryPickers.off('click');
            this.$viewAllButton.off('click');
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
        }


    });

}));
