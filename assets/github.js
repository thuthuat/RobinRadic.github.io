!function() {
    var a = Handlebars.template, b = Handlebars.templates = Handlebars.templates || {};
    b["github.admin.editor"] = a({
        compiler: [ 6, ">= 2.0.0-beta.1" ],
        main: function() {
            return '<script type="text/x-handlebars-template">\n    <div class="portlet light">\n        <div class="portlet-body">\n            <div class="row">\n                <div class="btn-toolbar">\n                    <div class="btn-group btn-group-sm">\n                        <a href="javascript:;" class="btn blue-hoki" data-admin-editor-action="view-frontmatter"><i class="fa fa-code"></i> FrontMatter</a>\n                        <a href="javascript:;" class="btn blue" data-admin-editor-action="view-content"><i class="fa fa-line-chart"></i> Content</a>\n                    </div>\n                    <div class="btn-group btn-group-sm pull-right">\n                        <a href="javascript:;" class="btn blue" title="New" data-admin-editor-action="new"><i class="fa fa-file-o"></i> New</a>\n                        <a href="javascript:;" class="btn yellow" title="Save" data-admin-editor-action="save"><i class="fa fa-save"></i> Save</a>\n                        <a href="javascript:;" class="btn green" title="Preview" data-admin-editor-action="preview"><i class="fa fa-eye"></i> Preview</a>\n                        <a href="javascript:;" class="btn purple" title="Settings" data-admin-editor-action="settings"><i class="fa fa-cogs"></i> Settings</a>\n                    </div>\n                </div>\n                <pre id="admin-editor"></pre>\n            </div>\n        </div>\n    </div>\n\n</script>\n';
        },
        useData: !0
    });
}(), function(a) {
    a(jQuery, radic, OAuth);
}(function(a, b, c) {
    function d(a) {
        var d = c.popup("github", {
            cache: !0
        });
        d.done(function(c) {
            b.isFunction(a) && a(c);
        });
    }
    function e() {
        c.clearCache("github");
    }
    function f() {
        return c.create("github") !== !1;
    }
    function g() {
        b.isUndefined(window.CryptoJS) && a("body").append('<script src="/assets/vendor/cryptojslib/components/core-min.js"></script>').append('<script src="/assets/vendor/cryptojslib/components/enc-base64-min.js"></script>');
    }
    function h() {
        b.isUndefined(window.ace) && (a("body").append('<script src="/assets/vendor/ace-builds/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>'), 
        [ "ext-language_tools", "ext-settings_menu", "mode-markdown", "mode-html", "mode-yaml", "mode-javascript", "mode-xml", "mode-json", "mode-css", "theme-twilight" ].forEach(function(b) {
            a("body").append('<script src="/assets/vendor/ace-builds/src-min-noconflict/' + b + '.js"></script>');
        }));
    }
    function i(a) {
        g();
        var b = window.CryptoJS.enc.Utf8.parse(a);
        return window.CryptoJS.enc.Base64.stringify(b);
    }
    function j(a) {
        g();
        var b = window.CryptoJS.enc.Base64.parse(a.replace(/\n/g, ""));
        return window.CryptoJS.enc.Utf8.stringify(b);
    }
    a.widget("radic.githubAdmin", a.github.widget, {
        version: "1.0.0",
        options: {
            publicKey: "",
            authButtonContainerSelector: "#page-top-menu",
            owner: "RobinRadic",
            repo: "RobinRadic.github.io",
            ref: "master"
        },
        refresh: function() {
            var a = this;
            a.$logoutButton.addClass("hide"), a.$loginButton.addClass("hide"), a.$gitauth.addClass("hide"), 
            b.isUndefined(c) || (c.initialize(a.options.publicKey), f() ? (a.$logoutButton.removeClass("hide"), 
            a.$gitauth.removeClass("hide")) : a.$loginButton.removeClass("hide"));
        },
        _create: function() {
            var b = this;
            b.$gitauth = a(".gitauth"), b.$loginButton = a(document.createElement("a")).addClass("btn btn-success").text("Login").attr("id", "github-admin-login"), 
            b.$logoutButton = a(document.createElement("a")).addClass("btn btn-primary").text("Logout").attr("id", "github-admin-logout"), 
            b.$authButtonContainer = a(b.options.authButtonContainerSelector).append(a(document.createElement("li")).append(b.$loginButton, b.$logoutButton)), 
            b.$pageContent = a(".page-content:not(.page-content-search)").first(), b._on(this.document, {
                "click a.github-admin-create-post": function(a) {
                    a.preventDefault(), console.log("eventClickCreatePost"), b.displayEditor();
                },
                "click a.github-admin-edit-page": function(c) {
                    c.preventDefault(), console.log("eventClickEditPage");
                    var d = a(c.target).data("github-admin-edit"), e = a(c.target).data("github-admin-editmode");
                    b.displayEditor(), console.log("pagePath", d), b._editorOpenRepoPage(d, e);
                },
                "click #github-admin-login": function(a) {
                    a.preventDefault(), console.log("login click"), d(function() {
                        b.refresh();
                    });
                },
                "click #github-admin-logout": function(a) {
                    a.preventDefault(), console.log("logout click"), b.logout();
                }
            }), b.refresh();
        },
        _destroy: function() {
            this.$authButtonContainer.destroy(), e();
        },
        save: function(d) {
            b.isBoolean(d) || (d = !1);
            var e = this;
            b.async.waterfall([ function(a) {
                var c = "---\n";
                c += b.storage.get("github-admin-page-frontmatter"), c += "---\n", c += b.storage.get("github-admin-page-content"), 
                c = i(c.replace(/\n/g, "\\n")), a(null, {
                    content: c
                });
            }, function(b, c) {
                return d === !0 ? c(null, b) : void bootbox.prompt("File name:", function(d) {
                    null === d ? c("Did not specify a file name") : (a.extend(b, {
                        fileName: d
                    }), c(null, b));
                });
            }, function(c, e) {
                if (d === !1) return e(null, c);
                var f = JSON.parse(b.storage.get("github-admin-page-data"));
                a.extend(c, {
                    path: f.path,
                    sha: f.sha
                }), e(null, c);
            }, function(b, c) {
                bootbox.prompt("Commit message:", function(d) {
                    null === d ? c("Did not specify a commit message") : (a.extend(b, {
                        message: d
                    }), c(null, b));
                });
            } ], function(a, b) {
                console.log("waterfall end", a, b);
                var f = {
                    path: b.path,
                    message: b.message,
                    content: b.content,
                    branch: e.options.ref
                };
                d === !0 && (f.sha = b.sha), c.create("github").put("/repos/:owner/:repo/contents/:path".replace(":owner", e.options.owner).replace(":repo", e.options.repo).replace(":path", f.path), {
                    data: f
                }).done(function(a) {
                    console.log("save done", a);
                }).fail(function(a) {
                    console.log("save fail", a);
                });
            });
        },
        preview: function() {},
        displayEditor: function() {
            var b = this, c = b._compile("github.admin.editor", {});
            b.$editorContainer = a(document.createElement("div")).attr("style", b.$pageContent.attr("style")).addClass("page-content").append(a(document.createElement("div")).addClass("row").append(c)), 
            b.$pageContent.addClass("hide"), b.$pageContent.after(b.$editorContainer), b._applyAceEditor("admin-editor", "markdown");
        },
        hideEditor: function() {
            var a = this;
            b.isUndefined(a.$editorContainer) || (a.$editorContainer.remove(), delete a.$editorContainer, 
            a.$pageContent.removeClass("hide"));
        },
        _bindEditorButtons: function() {
            var c = this;
            c.$editorContainer.find("a[data-admin-editor-action]").on("click", function() {
                var d = a(this).data("admin-editor-action");
                switch (console.log("action", d), d) {
                  case "settings":
                    c._editor.showSettingsMenu();
                    break;

                  case "view-frontmatter":
                    var e = b.storage.get("github-admin-page-frontmatter");
                    console.log("viewfrontmatter", e), b.isUndefined(e) || (c._editor.getSession().setMode("ace/mode/yaml"), 
                    c._editor.setValue(e), c._editor.gotoLine(1), c._editor.getSession().setScrollTop(1), 
                    c._editorContentType = "page-frontmatter");
                    break;

                  case "view-content":
                    var f = b.storage.get("github-admin-page-content");
                    console.log("viewpagecontent", f), b.isUndefined(f) || (c._editor.getSession().setMode("ace/mode/markdown"), 
                    c._editor.setValue(f), c._editor.gotoLine(1), c._editor.getSession().setScrollTop(1), 
                    c._editorContentType = "page-content");
                    break;

                  case "save":
                    c.save(null !== b.storage.get("github-admin-page-data"));
                }
            });
        },
        _applyAceEditor: function(c, d) {
            var e = this;
            b.isUndefined(d) && (d = "html"), h(), a("#" + c).css({
                margin: 0,
                position: "relative",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                "min-height": 500
            }), e._editor = ace.edit(c), ace.require("ace/ext/language_tools"), ace.require("ace/ext/settings_menu").init(e._editor), 
            e._editor.getSession().setMode("ace/mode/" + d), e._editor.setTheme("ace/theme/twilight"), 
            e._editor.setFontSize("14px"), e._editor.setOptions({
                enableBasicAutocompletion: !0,
                enableSnippets: !0,
                enableLiveAutocompletion: !1
            }), e._editor.commands.addCommands([ {
                name: "showSettingsMenu",
                bindKey: {
                    win: "Ctrl-q",
                    mac: "Command-q"
                },
                exec: function(a) {
                    a.showSettingsMenu();
                },
                readOnly: !0
            } ]), e._bindEditorButtons();
        },
        _editorOpenRepoPage: function(a, d) {
            var e = this;
            b.isUndefined(d) && (d = "markdown"), c.create("github").get("/repos/:owner/:repo/contents/:path?ref=:ref".replace(":owner", e.options.owner).replace(":repo", e.options.repo).replace(":path", a).replace(":ref", e.options.ref)).done(function(c) {
                var f = j(c.content), g = /---\n([\w\W]*?)---([\w\W]*)/, h = f.match(g);
                return b.isUndefined(h[1]) ? (console.error("extractFrontMatter did not get a match with regex"), 
                "") : (b.isUndefined(h[2]) && (h[2] = ""), b.storage.set("github-admin-page-frontmatter", h[1]), 
                b.storage.set("github-admin-page-content", h[2]), b.storage.set("github-admin-page-path", a), 
                b.storage.set("github-admin-page-data", c, {
                    json: !0
                }), e._editor.getSession().setMode(d), e._editor.setValue(h[2]), e._editorContentType = "page-content", 
                e._editor.gotoLine(1), e._editor.getSession().setScrollTop(1), void e._editor.getSession().on("change", function(a) {
                    console.log("change", a);
                    var c = e._editor.getSession().getMode().$id.split("/"), d = c[c.length - 1];
                    console.log("change editmode", d), b.storage.set("github-admin-page-" + ("yaml" === d ? "frontmatter" : "content"), e._editor.getValue());
                }));
            }).fail(function(a) {
                console.error("error", a);
            });
        }
    }), a(function() {});
});