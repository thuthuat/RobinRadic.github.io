(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['github.admin.editor'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<script type=\"text/x-handlebars-template\">\n    <div class=\"portlet light\">\n        <div class=\"portlet-body\">\n            <div class=\"row\">\n                <div class=\"btn-toolbar\">\n                    <div class=\"btn-group btn-group-sm\">\n                        <a href=\"javascript:;\" class=\"btn blue-hoki\" data-admin-editor-action=\"view-frontmatter\"><i class=\"fa fa-code\"></i> FrontMatter</a>\n                        <a href=\"javascript:;\" class=\"btn blue\" data-admin-editor-action=\"view-content\"><i class=\"fa fa-line-chart\"></i> Content</a>\n                    </div>\n                    <div class=\"btn-group btn-group-sm pull-right\">\n                        <a href=\"javascript:;\" class=\"btn blue\" title=\"New\" data-admin-editor-action=\"new\"><i class=\"fa fa-file-o\"></i> New</a>\n                        <a href=\"javascript:;\" class=\"btn yellow\" title=\"Save\" data-admin-editor-action=\"save\"><i class=\"fa fa-save\"></i> Save</a>\n                        <a href=\"javascript:;\" class=\"btn green\" title=\"Preview\" data-admin-editor-action=\"preview\"><i class=\"fa fa-eye\"></i> Preview</a>\n                        <a href=\"javascript:;\" class=\"btn purple\" title=\"Settings\" data-admin-editor-action=\"settings\"><i class=\"fa fa-cogs\"></i> Settings</a>\n                    </div>\n                </div>\n                <pre id=\"admin-editor\"></pre>\n            </div>\n        </div>\n    </div>\n\n</script>\n";
  },"useData":true});
})();
;
(function (factory) {
    factory(jQuery, radic, OAuth);
}(function ($, R, OAuth) {

    // helper functions
    function gitLogin(callback) {
        var promise = OAuth.popup('github', {cache: true});
        promise.done(function (result) {
            if (R.isFunction(callback)) {
                callback(result);
            }
        })
    }

    function gitLogout() {
        OAuth.clearCache('github');
    }

    function gitIsLoggedin() {
        return OAuth.create('github') !== false;
    }

    function ensureCryptoJS() {
        if (R.isUndefined(window.CryptoJS)) {
            $('body').append('<script src="/assets/vendor/cryptojslib/components/core-min.js"></script>')
                .append('<script src="/assets/vendor/cryptojslib/components/enc-base64-min.js"></script>');
        }
    }

    function ensureAce() {
        if (R.isUndefined(window.ace)) {
            $('body').append('<script src="/assets/vendor/ace-builds/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>');
            ['ext-language_tools', 'ext-settings_menu',
                'mode-markdown', 'mode-html', 'mode-yaml', 'mode-javascript', 'mode-xml', 'mode-json', 'mode-css',
                'theme-twilight'
            ].forEach(function (fileName) {
                    $('body').append('<script src="/assets/vendor/ace-builds/src-min-noconflict/' + fileName + '.js"></script>');
                })
        }
    }

    function base64encode(string) {
        ensureCryptoJS();
        var wordArray = window.CryptoJS.enc.Utf8.parse(string);
        return window.CryptoJS.enc.Base64.stringify(wordArray);
    }

    function base64decode(base64string) {
        ensureCryptoJS();
        var words = window.CryptoJS.enc.Base64.parse(base64string.replace(/\n/g, ''));
        return window.CryptoJS.enc.Utf8.stringify(words);
    }

    $.widget('radic.githubAdmin', $.github.widget, {
        version: '1.0.0',
        options: {
            publicKey: '',
            authButtonContainerSelector: '#page-top-menu',
            owner: 'RobinRadic',
            repo: 'RobinRadic.github.io',
            ref: 'master'
        },

        refresh: function () {
            var self = this;

            self.$logoutButton.addClass('hide');
            self.$loginButton.addClass('hide');
            self.$gitauth.addClass('hide');

            if (!R.isUndefined(OAuth)) {
                OAuth.initialize(self.options.publicKey);
                if (gitIsLoggedin()) {
                    self.$logoutButton.removeClass('hide');
                    self.$gitauth.removeClass('hide');
                } else {
                    self.$loginButton.removeClass('hide');
                }
            }
        },

        _create: function () {
            var self = this;
            self.$gitauth = $('.gitauth');
            self.$loginButton = $(document.createElement('a')).addClass('btn btn-success').text('Login').attr('id', 'github-admin-login');
            self.$logoutButton = $(document.createElement('a')).addClass('btn btn-primary').text('Logout').attr('id', 'github-admin-logout');
            self.$authButtonContainer = $(self.options.authButtonContainerSelector).append(
                $(document.createElement('li')).append(self.$loginButton, self.$logoutButton)
            );
            self.$pageContent = $('.page-content:not(.page-content-search)').first();

            self._on(this.document, {
                'click a.github-admin-create-post': function (e) {
                    e.preventDefault();
                    console.log('eventClickCreatePost');
                    self.displayEditor();
                },
                'click a.github-admin-edit-page': function (e, b) {
                    e.preventDefault();
                    console.log('eventClickEditPage');
                    var pagePath = $(e.target).data('github-admin-edit');
                    var editMode = $(e.target).data('github-admin-editmode');
                    self.displayEditor();
                    console.log('pagePath', pagePath);
                    self._editorOpenRepoPage(pagePath, editMode);
                },
                'click #github-admin-login': function (e) {
                    e.preventDefault();
                    console.log('login click');
                    gitLogin(function () {
                        self.refresh();
                    });
                },
                'click #github-admin-logout': function (e) {
                    e.preventDefault();
                    console.log('logout click');
                    self.logout();
                }
            });
            self.refresh();
        },

        _destroy: function () {
            this.$authButtonContainer.destroy();
            gitLogout();
        },

        save: function (update) {
            if (!R.isBoolean(update)) update = false;

            var self = this;

            R.async.waterfall([
                // Concat and encode content
                function (next) {
                    // Concat and encode content
                    var content = "---\n";
                    content += R.storage.get('github-admin-page-frontmatter');
                    content += "---\n";
                    content += R.storage.get('github-admin-page-content');
                    content = base64encode(content.replace(/\n/g, '\\n'));

                    next(null, {
                        content: content
                    })
                },
                // Only on new doc
                function (data, next) {
                    if (update === true) return next(null, data);
                    bootbox.prompt('File name:', function (result) {
                        if (result === null) {
                            next('Did not specify a file name');
                        } else {
                            $.extend(data, {fileName: result});
                            next(null, data);
                        }
                    });
                },
                // Only on update doc
                function (data, next) {
                    if (update === false) return next(null, data);
                    var pageData = JSON.parse(R.storage.get('github-admin-page-data'));
                    $.extend(data, {path: pageData.path, sha: pageData.sha})
                    next(null, data);
                },
                // Commit message
                function (data, next) {
                    bootbox.prompt('Commit message:', function (result) {
                        if (result === null) {
                            next('Did not specify a commit message');
                        } else {
                            $.extend(data, {message: result})
                            next(null, data);
                        }
                    })
                }
                // Execute
            ], function (err, result) {                                     console.log('waterfall end', err, result);
                var options = {
                    path: result.path,
                    message: result.message,
                    content: result.content,
                    branch: self.options.ref
                };
                if (update === true) {
                    options.sha = result.sha;
                }
                OAuth.create('github').put(
                        '/repos/:owner/:repo/contents/:path'
                            .replace(':owner', self.options.owner)
                            .replace(':repo', self.options.repo)
                            .replace(':path', options.path), { data: options })
                        .done(function (data) {
                            console.log('save done', data);
                        })
                        .fail(function (err) {
                            console.log('save fail', err)
                        });

            });
        },

        preview: function(){

        },

        displayEditor: function () {
            var self = this;
            var editorHtml = self._compile('github.admin.editor', {});

            self.$editorContainer = $(document.createElement('div'))
                .attr('style', self.$pageContent.attr('style'))
                .addClass('page-content')
                .append(
                $(document.createElement('div')).addClass('row').append(editorHtml)
            );
            self.$pageContent.addClass('hide');
            self.$pageContent.after(self.$editorContainer);
            self._applyAceEditor('admin-editor', 'markdown');
        },

        hideEditor: function () {
            var self = this;
            if (!R.isUndefined(self.$editorContainer)) {
                self.$editorContainer.remove();
                delete self['$editorContainer'];
                self.$pageContent.removeClass('hide');
            }
        },

        _bindEditorButtons: function () {
            var self = this;
            self.$editorContainer.find('a[data-admin-editor-action]').on('click', function (e) {
                var action = $(this).data('admin-editor-action');
                console.log('action', action);
                switch (action) {
                    case "settings":
                        self._editor.showSettingsMenu();
                        break;
                    case "view-frontmatter":
                        var frontMatter = R.storage.get('github-admin-page-frontmatter');
                        console.log('viewfrontmatter', frontMatter);
                        if (!R.isUndefined(frontMatter)) {
                            self._editor.getSession().setMode("ace/mode/yaml");
                            self._editor.setValue(frontMatter);
                            self._editor.gotoLine(1);
                            self._editor.getSession().setScrollTop(1);
                            self._editorContentType = "page-frontmatter";
                        }
                        break;
                    case "view-content":
                        var pageContent = R.storage.get('github-admin-page-content');
                        console.log('viewpagecontent', pageContent);
                        if (!R.isUndefined(pageContent)) {
                            self._editor.getSession().setMode("ace/mode/markdown");
                            self._editor.setValue(pageContent);
                            self._editor.gotoLine(1);
                            self._editor.getSession().setScrollTop(1);
                            self._editorContentType = "page-content";
                        }
                        break;
                    case "save":
                        self.save(R.storage.get('github-admin-page-data') !== null);
                        break;
                }
            })
        },

        _applyAceEditor: function (elementID, mode) {
            var self = this;
            if (R.isUndefined(mode)) mode = 'html';
            ensureAce();

            $('#' + elementID).css({
                margin: 0,
                position: 'relative',
                top: 0, bottom: 0, left: 0, right: 0,
                'min-height': 500
            });

            self._editor = ace.edit(elementID);
            ace.require("ace/ext/language_tools");
            ace.require('ace/ext/settings_menu').init(self._editor);
            self._editor.getSession().setMode("ace/mode/" + mode);
            self._editor.setTheme("ace/theme/twilight");
            self._editor.setFontSize('14px');

            self._editor.setOptions({
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: false
            });
            self._editor.commands.addCommands([{
                name: "showSettingsMenu",
                bindKey: {win: "Ctrl-q", mac: "Command-q"},
                exec: function (editor) {
                    editor.showSettingsMenu();
                },
                readOnly: true
            }]);

            self._bindEditorButtons();
        },

        _editorOpenRepoPage: function (pagePath, editMode) {
            var self = this;
            if (R.isUndefined(editMode)) editMode = 'markdown';
            OAuth.create('github').get('/repos/:owner/:repo/contents/:path?ref=:ref'
                .replace(':owner', self.options.owner)
                .replace(':repo', self.options.repo)
                .replace(':path', pagePath)
                .replace(':ref', self.options.ref))
                .done(function (data) {
                    var pageContent = base64decode(data.content);

                    var regex = /---\n([\w\W]*?)---([\w\W]*)/;
                    var matches = pageContent.match(regex);
                    if (R.isUndefined(matches[1])) {
                        console.error('extractFrontMatter did not get a match with regex');
                        return '';
                    }
                    if (R.isUndefined(matches[2])) {
                        matches[2] = '';
                    }

                    R.storage.set('github-admin-page-frontmatter', matches[1]);
                    R.storage.set('github-admin-page-content', matches[2]);
                    R.storage.set('github-admin-page-path', pagePath);
                    R.storage.set('github-admin-page-data', data, {json: true});

                    self._editor.getSession().setMode(editMode);
                    self._editor.setValue(matches[2]);
                    self._editorContentType = "page-content";
                    self._editor.gotoLine(1);
                    self._editor.getSession().setScrollTop(1);
                    self._editor.getSession().on('change', function (e) {
                        console.log('change', e);
                        var segments = self._editor.getSession().getMode().$id.split('/');
                        var editMode = segments[segments.length - 1];
                        console.log('change editmode', editMode);

                        R.storage.set('github-admin-page-' + (editMode === 'yaml' ? 'frontmatter' : 'content'), self._editor.getValue());
                    })
                })
                .fail(function (err) {
                    console.error('error', err);
                });
        }

    });

    $(function () {

    })


}));
