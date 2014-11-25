
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
                })
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
                console.log(content);
                self.ceditor.setValue(content);
                self.ceditor.gotoLine(1,0,true);
                self.ceditor.getSession().setScrollTop(1);
                self.ceditor.getSession().setScrollLeft(1);

            });
        },

        _saveConfigFile: function(message){
            this.$configTab.spin();
            var path = self.currentConfigFile.path;
            this.api.put(this.endpoints.contents + path, {
                data: JSON.stringify({
                    path: path,
                    message: message,
                    branch: self.options.branch,
                    content: btoa(self.ceditor.getValue())
                })
            }).done(function(result){
                console.log('saved', result);
                self.$configTab.spin(false);
            });
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
