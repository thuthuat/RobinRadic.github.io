(function (factory) {

    factory(jQuery);

}(function ($) {


    $.widget('radic.githubEditor', {
        version: '0.0.1',

        options: {
            provider: 'github',
            url: 'http://0.0.0.0:4000/editor',

            owner: 'RobinRadic',
            repo: 'ghpages-radic-theme',
            branch: 'gh-pages'
        },

        _create: function () {
            var self = this;
            this.api = {};

            this.type = this.element.data('github-editor');


            if (this.type === 'redirect') {
                this._bindRedirect();
            } else if (this.type === 'edit') {
                this._initOAuth(function () {
                    self._createEditor();
                });
            } else if (this.type === 'create') {
                this._initOAuth(function () {
                    self._createEditor();
                });

            }
        },

        _bindRedirect: function () {
            var self = this;
            self.element.on('click', function (e) {
                e.preventDefault();
                OAuth.redirect(self.options.provider, self.options.url);
            });
        },

        _initOAuth: function (callback) {
            var self = this;
            var promise = OAuth.callback(self.options.provider);
            promise.done(function (result) {
                self.api = result;
                self.endpoints = {
                    content: "/repos/:owner/:repo/contents/"
                };

                $.each(self.endpoints, function (name, val) {
                    self.endpoints[name] = val.replace(':owner', self.options.owner).replace(':repo', self.options.repo);
                });

                callback();
            });

            promise.fail(function (error) {
                console.error('github editor oauth callback error:', error);
            });
        },

        _createEditor: function () {
            var self = this;
            this.templateData = {
                date: moment().format("ddd, D MMMM"),
                title: 'My awsome post',
                description: 'This post is about bull and shit',
                tags: ['General'],
                image: '/images/abstract-1.jpg'
            };
            this.converter = new Showdown.converter();
            this.$form = this.element.find('form');
            this.form = {
                title: this.$form.find('#editor-form-title'),
                tags: this.$form.find('#editor-form-tags'),
                description: this.$form.find('#editor-form-description'),
                image: this.$form.find('.fileinput')
            };
            this.$preview = this.element.find('#editor-preview');
            this.$editor = this.element.find('#editor-source');
            this.$header = this.element.find('#editor-post-header');


            this.$form.on('submit', function (e) {
                e.preventDefault();
                self._save();
                return false;
            });

            this.form.tags.tagsInput({
                width: 'auto',
                'onChange': function () {
                    self.templateData.tags = self.form.tags.val().split(',');
                    self._applyHeaderTemplate();
                }
            });

            this.form.image.on('change.bs.fileinput', function (e) {
                var src = self.form.image.find('img').attr('src');
                self.form.image.find('.fileinput-preview').hide();
                self.templateData.image = src;
                self._applyHeaderTemplate();
                console.log('file is altered', src);
            });


            this.form.title.on('change', function () {
                self.templateData.title = $(this).val();
                self._applyHeaderTemplate();
            });


            this.form.description.on('change', function () {
                self.templateData.description = $(this).val();
                self._applyHeaderTemplate();
            });


            this.$preview.hallo({
                plugins: {
                    'halloformat': {},
                    'halloheadings': {},
                    'hallolists': {},
                    'halloreundo': {}
                },
                toolbar: 'halloToolbarFixed'
            });

            this.$preview.bind('hallomodified', function (event, data) {
                self._showSource(data.content);
            });
            this.$editor.bind('keyup', function () {
                self._updateHtml(this.value);
            });
            this._showSource(this.$preview.html());

            this._applyHeaderTemplate();
        },

        _applyHeaderTemplate: function () {
            this.$header.html('');
            var templateHTML = $('script[data-template-id="post-header"]').html();
            var template = jQuery.template(templateHTML);
            var $widget = $(template(this.templateData));
            this.$header.append($widget);
        },


        _markdownize: function (content) {

            var html = content.split("\n").map($.trim).filter(function (line) {
                return line != "";
            }).join("\n");
            return toMarkdown(html);
        },

        _showSource: function (content) {
            var markdown = this._markdownize(content);
            if (this.$editor.get(0).value == markdown) {
                return;
            }
            this.$editor.get(0).value = markdown;
        },


        _updateHtml: function (content) {
            if (this._markdownize(this.$preview.html()) == content) {
                return;
            }
            var html = this.converter.makeHtml(content);
            this.$preview.html(html);
        },


        _slugify: function (Text) {
            return Text
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
                ;
        },

        _base64_encode: function (data) {
            //  discuss at: http://phpjs.org/functions/base64_encode/
            // original by: Tyler Akins (http://rumkin.com)
            // improved by: Bayron Guevara
            // improved by: Thunder.m
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Rafał Kukawski (http://kukawski.pl)
            // bugfixed by: Pellentesque Malesuada
            //   example 1: base64_encode('Kevin van Zonneveld');
            //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
            //   example 2: base64_encode('a');
            //   returns 2: 'YQ=='

            var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
                ac = 0,
                enc = '',
                tmp_arr = [];

            if (!data) {
                return data;
            }

            do { // pack three octets into four hexets
                o1 = data.charCodeAt(i++);
                o2 = data.charCodeAt(i++);
                o3 = data.charCodeAt(i++);

                bits = o1 << 16 | o2 << 8 | o3;

                h1 = bits >> 18 & 0x3f;
                h2 = bits >> 12 & 0x3f;
                h3 = bits >> 6 & 0x3f;
                h4 = bits & 0x3f;

                // use hexets to index into b64, and append result to encoded string
                tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while (i < data.length);

            enc = tmp_arr.join('');

            var r = data.length % 3;

            return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
        },
        _save: function () {
            var self = this;
            var content = "---" +
                "\ntitle: " + this.form.title.val() +
                "\nlayout: post" +
                "\ndescription: " + this.form.description.val() +
                "\ntags: [" + this.form.tags.val() + "]" +
                "\nimage: '" + this.templateData.image + "'" +
                "\ncomments: true" +
                "\n---" +
                "\n" + this.$editor.val();

            var date = new Date();
            var filename = moment().format('YYYY-MM-DD') + '-' + this._slugify(this.form.title.val()) + '.md';
            console.log(filename, content);
            this.api.put(this.endpoints.content + '_posts/' + filename, {
                data: JSON.stringify({
                    path: "_posts/" + filename,
                    message: 'Creating a new post',
                    branch: self.options.branch,
                    content: self._base64_encode(content)
                })
            });
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
