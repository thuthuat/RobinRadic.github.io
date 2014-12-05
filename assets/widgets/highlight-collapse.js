(function (factory) {

    factory(jQuery);

}(function ($) {


    $.widget('radic.highlightCollapse', {
        version: '0.0.1',

        options: {
            speed: 1000,
            height: 80,
            select: function (self) {
                var $p = self.element.prev('p');
                return $p.filter(function(index){
                    var $t = $(this);
                    console.log($t);
                    if( $t.has('strong') && $t[0].childNodes.length == 1){
                        return true;
                    }
                });
            }
        },

        _create: function () {
            var self = this; // $('.highlight')
            this._each(function ($title, $code) {
                console.log(this, self);
                $title.on('click', function (e) {
                    e.preventDefault();
                    $this = $(this);
                    if ($this.attr('data-highcolap-expanded')) {
                        self._colapAll();
                    } else {
                        self._colapAll();
                        $this.attr('data-highcolap-expanded', '1');
                        Metronic.destroySlimScroll($code);
                        $this.find('i').removeClass('fa-caret-square-o-down').addClass('fa-caret-square-o-up');
                        $code.unbind('touchstart');
                        $code.unbind('touchmove');
                        $code.unbind('mouseenter mouseleave');
                    }
                });
                $title.addClass('highcolap');
                var $icon = $(document.createElement('i'));
                $icon.addClass('fa fa-caret-square-o-down pull-right');
                $title.prepend($icon);

                $code.attr('data-height', self.options.height);
                Metronic.initSlimScroll($code);
            });
        },

        _colapAll: function () {
            console.log('colapall');

            $('.highcolap').find('i.fa-caret-square-o-up').each(function() {
                $(this).removeClass('fa-caret-square-o-up').addClass('fa-caret-square-o-down');
            });

            Metronic.initSlimScroll($('.highcolap').removeAttr('data-highcolap-expanded').next('.highlight'));

        },

        _each: function (callback) {
            this.options.select(this).each(function () {
                var $title = $(this);
                var $code = $title.next('.highlight');
                callback($title, $code);
            });
        },

        /* The _init method is called after _create when the widget is first applied to its elements.
         The _init method is also called every time thereafter when the widget is invoked with no arguments or with options.
         This method is the recommended place for setting up more complex initialization and is a good way to support reset functionality for the widget if this is required.
         It's common for widgets to not implement an _init method. */
        _init: function (callback) {


        },

        _destroy: function () {
            this.options.select(this).off('click');
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
