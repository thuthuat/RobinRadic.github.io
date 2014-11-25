
(function (factory) {

    factory(jQuery);

}(function ($) {


    $.widget('radic.admin', {
        version: '0.0.1',
        $template: {},
        options: {
            owner: 'RobinRadic',
            repo: 'ghpages-radic-theme',
            branch: 'gh-pages'
        },

        _create: function () {
            var self = this;
            this.endpoints = $.github.createEndpoints(this.options.owner, this.options.repo);
            this._initConfigEditor();
            this._initPostsEditor();
        },


        _initConfigEditor: function(){
            var self = this;
            this.$configTab = this.element.find('#tab-config');
            this.$configTab.spin();
            this.$configFileList = this.$configTab.find('ul.editor-file-list');
            this.$configFileSave = this.$configTab.find('.editor-save');
            this.$configFileReload = this.$configTab.find('.editor-reload');

            this.ceditor = ace.edit("config-editor");
            this.ceditor.setTheme("ace/theme/solarized_light");
            this.ceditor.getSession().setMode("ace/mode/yaml");
            this.ceditor.getSession().setUseSoftTabs(true);
            this.ceditor.getSession().setTabSize(2);


            this.openConfigFile('_config.yml');

            $.github.get(this.endpoints.contents + '_data', {
                data: {
                    path: '_data',
                    ref: self.options.branch
                }
            }).done(function(result){
                console.log(result);
                $.each(result, function(i, item){
                    self.$configFileList.append('<li><a href="#" data-path="' + item.path + '">' + item.name + '</a></li>');
                });
                self.$configFileList.find('a').on('click', function(e){
                    e.preventDefault();
                    self.$configFileList.find('li').removeClass('active');
                    $el = $(this);
                    $el.parent('li').addClass('active');
                    self.openConfigFile($el.data('path'));
                });
                self.$configTab.spin(false);
            });

            this.$configFileReload.on('click', function(e){
                self.openConfigFile(self.currentConfigFile.path);
            });

            this.$configFileSave.on('click', function(e){
                bootbox.prompt("Commit message", function(result) {
                    if (result !== null) {
                        self._saveConfigFile(result);
                    }
                });
            });
        },

        openConfigFile: function(path){
            var self = this;
            this.$configTab.spin();

            $.github.get(this.endpoints.contents +  path, {
                data: {
                    path: path,
                    ref: self.options.branch
                }
            }).done(function(result){
                self.$configTab.spin(false);
                self.currentConfigFile = result;
                var content = atob(result.content);
                self.ceditor.setValue(content);
                self.ceditor.gotoLine(1,0,true);
                self.ceditor.getSession().setScrollTop(1);
                self.ceditor.getSession().setScrollLeft(1);

            });
        },

        _saveConfigFile: function(message){
            var self = this;
            self.$configTab.spin();
            var path = self.currentConfigFile.path;
            $.github.put(this.endpoints.contents + path, {
                data: JSON.stringify({
                    path: path,
                    message: message,
                    branch: self.options.branch,
                    sha: self.currentConfigFile.sha,
                    content: btoa(self.ceditor.getValue())
                })
            }).done(function(result){
                self.$configTab.spin(false);
            });
        },


        _initPostsEditor: function () {
            var self = this;

            this.showdown = new Showdown.converter();
            this.$postsTab = this.element.find('#tab-posts');
            //this.$postsTab.spin();
            this.$postPreview = this.$postsTab.find('.post-preview');
            this.$postsFileList = this.$postsTab.find('ul.editor-file-list');
            this.$postsFileSave = this.$postsTab.find('.editor-save');
            this.$postsFileReload = this.$postsTab.find('.editor-reload');
            this.$postsFileCreate = this.$postsTab.find('.editor-create');
            this.$postsFilePreview = this.$postsTab.find('.editor-preview');

            this.peditor = ace.edit("posts-editor");
            this.peditor.setTheme("ace/theme/solarized_light");
            this.peditor.getSession().setMode("ace/mode/markdown");
            this.peditor.getSession().setUseSoftTabs(true);
            this.peditor.getSession().setTabSize(2);

            this.$postPreview.hide();

            $.github.get(this.endpoints.contents + '_posts', {
                data: {
                    path: '_posts',
                    ref: self.options.branch
                }
            }).done(function(result){
                console.log(result);
                $.each(result, function(i, item){
                    self.$postsFileList.append('<li><a href="#" data-path="' + item.path + '">' + item.name + '</a></li>');
                });
                self.$postsFileList.find('a').on('click', function(e){
                    e.preventDefault();
                    self.$postsFileList.find('li').removeClass('active');
                    $el = $(this);
                    $el.parent('li').addClass('active');
                    self.openPostFile($el.data('path'));
                });
                //self.$postsTab.spin(false);
            });

            this.$postsFileReload.on('click', function(e){
                self.openPostFile(self.currentPostFile.path);
            });

            this.$postsFileSave.on('click', function(e){
                bootbox.prompt("Commit message", function(result) {
                    if (result !== null) {
                        self._savePostFile(result);
                    }
                });
            });

            this.$postsFilePreview.on('click', function(e){
                self._previewPost();
            });

            this.$postsFileCreate.on('click', function(e){
                window.location.href = '/admin/editor'
            });
        },

        openPostFile: function(path){
            var self = this;
            this.$postsTab.spin();

            $.github.get(this.endpoints.contents +  path, {
                data: {
                    path: path,
                    ref: self.options.branch
                }
            }).done(function(result){
                self.$postsTab.spin(false);
                self.currentPostFile = result;
                var content = atob(result.content);
                self.peditor.setValue(content);
                self.peditor.gotoLine(1,0,true);
                self.peditor.getSession().setScrollTop(1);
                self.peditor.getSession().setScrollLeft(1);

            });
        },

        _savePostFile: function(message){
            var self = this;
            self.$postsTab.spin();
            var path = self.currentPostFile.path;
            $.github.put(this.endpoints.contents + path, {
                data: JSON.stringify({
                    path: path,
                    message: message,
                    branch: self.options.branch,
                    sha: self.currentPostFile.sha,
                    content: btoa(self.peditor.getValue())
                })
            }).done(function(result){
                self.$postsTab.spin(false);
            });
        },

        _previewPost: function(){
            var self = this;
            var $el = this.$postPreview;
            var $content = $el.find('.preview-content');
            var $close = $el.find('.close-preview');

            $close.on('click', function(){
                $el.hide("slow");
                $close.off('click');
            });

            var pygmentsRegex = /\{\%\s*highlight\s*(\w*)\s*\%\}\n([\n\w\W]*?)\{\%\s*endhighlight\s*\%\}/g;
            // 1 = lang, 2 = code
            var frontMattterRegex = /---\n([\w\n:\s"\.',-\[\]]*)---/;

            var markdown = self.peditor.getValue();
            var matches = markdown.match(frontMattterRegex);
            console.log(matches);
            var html = this.showdown.makeHtml(markdown.replace(frontMattterRegex, '').replace(pygmentsRegex, '<pre><code class="language-$1">$2</code></pre>'));

            $content.html(html);

            $el.show("slow");
            Prism.highlightAll();
        },




        _init: function () {


        },



        _getCreateEventData: function () {

        },

        _destroy: function () {
            this.element.html('');
        },



    });

}));
