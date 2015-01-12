!function(a) {
    a(jQuery, radic);
}(function(a, b) {
    a.widget("radic.faq", {
        version: "0.0.1",
        options: {
            username: "",
            template: {
                title: "Recent events"
            },
            baseUrl: "projects/blade-extensions",
            items: {},
            templateDataSelector: 'script[data-template-id="faq"]'
        },
        _create: function() {
            var b = this;
            b._getData(function(c) {
                console.log(c);
                var d = a(b.options.templateDataSelector).html(), e = _.template(d);
                console.log("pre temp data", c), a.extend(c, b.options.template);
                var f = a(e({
                    items: c
                }));
                b.element.html(f);
            });
        },
        _getData: function(c) {
            var d = this, e = b.keys(d.data).length, f = 0;
            d.data = d.options.items, a.each(d.data, function(b, g) {
                console.log("async each", d.data, b, g), a.get(g.file, function(a) {
                    d.data[b].content = a, f++, f >= e && c(d.data);
                });
            });
        },
        _init: function() {},
        _getCreateEventData: function() {},
        _destroy: function() {
            this.element.html("");
        },
        _setOptions: function(a) {
            var b = a.value;
            delete a.value, this._super(a), this.options.value = this._constrainedValue(b), 
            this._refreshValue();
        },
        _setOption: function(a, b) {
            "max" === a && (b = Math.max(this.min, b)), "disabled" === a && this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), 
            this._super(a, b);
        }
    });
}), function(a) {
    a(jQuery);
}(function(a) {
    a.widget("radic.highlightCollapse", {
        version: "0.0.1",
        options: {
            speed: 1e3,
            height: 80,
            select: function(b) {
                var c = b.element.prev("p");
                return c.filter(function() {
                    var b = a(this);
                    return console.log(b), b.has("strong") && 1 == b[0].childNodes.length ? !0 : void 0;
                });
            }
        },
        _create: function() {
            var b = this;
            this._each(function(c, d) {
                console.log(this, b), c.on("click", function(c) {
                    c.preventDefault(), $this = a(this), $this.attr("data-highcolap-expanded") ? b._colapAll() : (b._colapAll(), 
                    $this.attr("data-highcolap-expanded", "1"), Metronic.destroySlimScroll(d), $this.find("i").removeClass("fa-caret-square-o-down").addClass("fa-caret-square-o-up"), 
                    d.unbind("touchstart"), d.unbind("touchmove"), d.unbind("mouseenter mouseleave"));
                }), c.addClass("highcolap");
                var e = a(document.createElement("i"));
                e.addClass("fa fa-caret-square-o-down pull-right"), c.prepend(e), d.attr("data-height", b.options.height), 
                Metronic.initSlimScroll(d);
            });
        },
        _colapAll: function() {
            console.log("colapall"), a(".highcolap").find("i.fa-caret-square-o-up").each(function() {
                a(this).removeClass("fa-caret-square-o-up").addClass("fa-caret-square-o-down");
            }), Metronic.initSlimScroll(a(".highcolap").removeAttr("data-highcolap-expanded").next(".highlight"));
        },
        _each: function(b) {
            this.options.select(this).each(function() {
                var c = a(this), d = c.next(".highlight");
                b(c, d);
            });
        },
        _init: function() {},
        _destroy: function() {
            this.options.select(this).off("click");
        },
        _setOptions: function(a) {
            var b = a.value;
            delete a.value, this._super(a), this.options.value = this._constrainedValue(b), 
            this._refreshValue();
        },
        _setOption: function(a, b) {
            "max" === a && (b = Math.max(this.min, b)), "disabled" === a && this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), 
            this._super(a, b);
        }
    });
}), function(a) {
    a(jQuery, radic);
}(function(a, b) {
    a.widget("radic.pageTopUser", {
        version: "0.0.1",
        $template: {},
        options: {
            username: "",
            templateDataSelector: 'script[data-template-id="page-top-user"]'
        },
        _create: function() {
        },
        refresh: function() {
            var a = this;
            a._getData(function(b) {
                a._createHTML(b);
            });
        },
        _createHTML: function(b) {
            var c = this;
            c.element.html("");
            var d = a(c.options.templateDataSelector).html(), e = _.template(d);
            c.$template = a(e(b)), c._bindEvents(), c.element.append(c.$template), Metronic.initAjax();
        },
        _getData: function(a) {
            var c = this.options.username, d = {};
            b.async.waterfall([ function(a) {
                var b = radic.github.users(c, function(c) {
                    console.log("fetched data ", c, "u=", b), d.user = c, a(null, d);
                });
                console.log("fetched data 2 u=", b);
            }, function(a, b) {
                a.loggedin = !1, b(null, a);
            } ], function(b, c) {
                a(c);
            });
        },
        _bindEvents: function() {
            var b = this;
            this.$oauth = this.$template.find(".github-oauth"), this.$oauth.on("click", function(a) {
                a.preventDefault(), radic.github.loggedin() ? radic.github.logout() : radic.github.login(function() {
                    b.refresh();
                }), b.refresh();
            }), this.element.find('[data-action="clear-local-storage"]').on("click", function(b) {
                b.preventDefault(), a.storage.clear();
            });
        },
        _init: function() {},
        _getCreateEventData: function() {},
        _destroy: function() {
            this.element.html("");
        }
    });
}), function(a) {
    a(jQuery);
}(function(a) {
    a.widget("radic.postsFilter", {
        version: "0.0.1",
        options: {
            tableSelector: ".posts-by-tag-table",
            tagSelector: ".posts-by-tag-picker",
            categorySelector: ".posts-by-category-picker",
            viewAllSelector: ".post-view-all"
        },
        _create: function() {
            this.refresh();
        },
        refresh: function() {
            this._refresh();
        },
        _refresh: function() {
            this.$table = this.element.find(this.options.tableSelector), this.$tagPickers = this.element.find(this.options.tagSelector), 
            this.$categoryPickers = this.element.find(this.options.categorySelector), this.$viewAllButton = this.element.find(this.options.viewAllSelector), 
            this.$rows = this.$table.find("tbody tr"), this._bindObjects();
        },
        _bindObjects: function() {
            var b = this;
            this.$categoryPickers.on("click", function(c) {
                b._onPickerClick(c, a(this), "category");
            }), this.$tagPickers.on("click", function(c) {
                b._onPickerClick(c, a(this), "tags");
            }), this.$viewAllButton.on("click", function(a) {
                a.preventDefault(), b.$rows.show(), b.$table.show();
            });
        },
        _onPickerClick: function(b, c, d) {
            var e = this;
            b.preventDefault(), e.$table.hide(), e.$rows.hide();
            var f = c.data(d);
            console.log(d, f), e.$rows.each(function(b, c) {
                var g = a(c), h = g.data(d).split(",");
                a.isArray(h) === !1 && (h = [ h ]);
                for (var i = 0; i < h.length; i++) h[i] = h[i].toLowerCase();
                console.log(b, h, f), -1 !== h.indexOf(f.toLowerCase()) && (console.log(b, "has", f, h, c), 
                g.show(), e.$table.show());
            });
        },
        _sortBy: function() {},
        _init: function() {
            this.$table.hide(), this.$rows.hide();
        },
        _getCreateEventData: function() {},
        _destroy: function() {
            this.$table.show(), this.$rows.show(), this.$tagPickers.off("click"), this.$categoryPickers.off("click"), 
            this.$viewAllButton.off("click");
        },
        _setOptions: function(a) {
            var b = a.value;
            delete a.value, this._super(a), this.options.value = this._constrainedValue(b), 
            this._refreshValue();
        },
        _setOption: function(a, b) {
            "max" === a && (b = Math.max(this.min, b)), "disabled" === a && this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), 
            this._super(a, b);
        }
    });
}), function(a) {
    a(jQuery, radic);
}(function(a, b) {
    a.widget("radic.postSearch", {
        version: "0.0.1",
        options: {
            initialSearchString: !1,
            baseurl: "/",
            resultTableSelector: "#posts-search-result",
            templateDataSelector: 'script[data-template-id="posts-search"]',
            limit: 10
        },
        _create: function() {
            this.posts = [], this.$input = this.element.find('input[name="query"]'), this.$container = a(document.createElement("div")).addClass("page-content page-content-search"), 
            a(".page-content-wrapper").prepend(this.$container), this._bindAll();
        },
        _bindAll: function() {
            var b = this;
            b.element.off("submit").on("submit", function(a) {
                return a.preventDefault(), b.search(b.$input.val()), b.$input.blur(), !1;
            }), a("a[data-tag]").off("click").on("click", function(c) {
                c.preventDefault(), b.search(a(this).data("tag"), "tags");
            });
        },
        _showResultTable: function(b) {
            var c = this;
            c.$container.html(""), c.$container.hide();
            var d = {
                results: b,
                converter: new Showdown.converter()
            }, e = a(this.options.templateDataSelector).html(), f = a(_.template(e)(d));
            f.find(".portlet-title .actions a").on("click", function() {
                c.$container.hide("slow", function() {
                    c.$container.html("");
                });
            }), c.$container.append(f), c._bindAll(), c.$container.show("slow"), a("html, body").animate({
                scrollTop: 0
            }, 500);
        },
        _getData: function(b) {
            {
                var c = this;
                this.options.search;
            }
            a.get(this.options.baseurl + "/search.json", function(a) {
                c.posts = a, console.log(a), b();
            });
        },
        search: function(c, d) {
            var e = this, f = {};
            if (e.element.spin(), !(e.posts.length > 0)) return void this._getData(function() {
                e.search(c, d);
            });
            var g = b.cloneDeep(e.posts);
            "undefined" == typeof d && (d = !1), a.each(g, function(b, e) {
                e !== !1 && (e.content = e.content.replace(/<(?:.|\n)*?>/gm, ""), d && "tags" == d ? _.contains(e.tags, c) !== !1 && (_.isUndefined(f[e.id]) ? (f[e.id] = e, 
                f[e.id].rating = 1) : f[e.id].rating++) : a.each(e, function(a, b) {
                    _.isArray(b) && (b = b.join(" ")), "string" == typeof b && b.indexOf(c) > -1 && ("undefined" == typeof f[e.id] && (f[e.id] = e), 
                    "undefined" == typeof f[e.id].rating ? f[e.id].rating = 1 : f[e.id].rating++);
                }));
            });
            var h = [];
            a.each(f, function(a, b) {
                h.push(b);
            }), h.sort(function(a, b) {
                return a.rating < b.rating ? 1 : a.rating > b.rating ? -1 : 0;
            }), e._showResultTable(h.slice(0, e.options.limit)), e.element.spin(!1);
        },
        _init: function() {},
        _getCreateEventData: function() {},
        _destroy: function() {
            this.element.html(""), a("a[data-tag]").off("click");
        },
        _setOptions: function(a) {
            var b = a.value;
            delete a.value, this._super(a), this.options.value = this._constrainedValue(b), 
            this._refreshValue();
        },
        _setOption: function(a, b) {
            "max" === a && (b = Math.max(this.min, b)), "disabled" === a && this.element.toggleClass("ui-state-disabled", !!b).attr("aria-disabled", b), 
            this._super(a, b);
        }
    });
});