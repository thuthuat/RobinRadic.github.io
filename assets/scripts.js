var Metronic = function() {
    var a, b = !1, c = !1, d = !1, e = !1, f = [], g = "/assets/", h = "global/img/", i = "global/plugins/", j = "global/css/", k = {
        blue: "#89C4F4",
        red: "#F3565D",
        green: "#1bbc9b",
        purple: "#9b59b6",
        grey: "#95a5a6",
        yellow: "#F8CB00"
    }, l = function() {
        "rtl" === $("body").css("direction") && (b = !0), c = !!navigator.userAgent.match(/MSIE 8.0/), 
        d = !!navigator.userAgent.match(/MSIE 9.0/), e = !!navigator.userAgent.match(/MSIE 10.0/), 
        e && $("html").addClass("ie10"), (e || d || c) && $("html").addClass("ie");
    }, m = function() {
        for (var a = 0; a < f.length; a++) {
            var b = f[a];
            b.call();
        }
    }, n = function() {
        var a;
        if (c) {
            var b;
            $(window).resize(function() {
                b != document.documentElement.clientHeight && (a && clearTimeout(a), a = setTimeout(function() {
                    m();
                }, 50), b = document.documentElement.clientHeight);
            });
        } else $(window).resize(function() {
            a && clearTimeout(a), a = setTimeout(function() {
                m();
            }, 50);
        });
    }, o = function() {
        $("body").on("click", ".portlet > .portlet-title > .tools > a.remove", function(a) {
            a.preventDefault();
            var b = $(this).closest(".portlet");
            $("body").hasClass("page-portlet-fullscreen") && $("body").removeClass("page-portlet-fullscreen"), 
            b.find(".portlet-title .fullscreen").tooltip("destroy"), b.find(".portlet-title > .tools > .reload").tooltip("destroy"), 
            b.find(".portlet-title > .tools > .remove").tooltip("destroy"), b.find(".portlet-title > .tools > .config").tooltip("destroy"), 
            b.find(".portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand").tooltip("destroy"), 
            b.remove();
        }), $("body").on("click", ".portlet > .portlet-title .fullscreen", function(a) {
            a.preventDefault();
            var b = $(this).closest(".portlet");
            if (b.hasClass("portlet-fullscreen")) $(this).removeClass("on"), b.removeClass("portlet-fullscreen"), 
            $("body").removeClass("page-portlet-fullscreen"), b.children(".portlet-body").css("height", "auto"); else {
                var c = Metronic.getViewPort().height - b.children(".portlet-title").outerHeight() - parseInt(b.children(".portlet-body").css("padding-top")) - parseInt(b.children(".portlet-body").css("padding-bottom"));
                $(this).addClass("on"), b.addClass("portlet-fullscreen"), $("body").addClass("page-portlet-fullscreen"), 
                b.children(".portlet-body").css("height", c);
            }
        }), $("body").on("click", ".portlet > .portlet-title > .tools > a.reload", function(a) {
            a.preventDefault();
            var b = $(this).closest(".portlet").children(".portlet-body"), c = $(this).attr("data-url"), d = $(this).attr("data-error-display");
            c ? (Metronic.blockUI({
                target: b,
                animate: !0,
                overlayColor: "none"
            }), $.ajax({
                type: "GET",
                cache: !1,
                url: c,
                dataType: "html",
                success: function(a) {
                    Metronic.unblockUI(b), b.html(a);
                },
                error: function() {
                    Metronic.unblockUI(b);
                    var a = "Error on reloading the content. Please check your connection and try again.";
                    "toastr" == d && toastr ? toastr.error(a) : "notific8" == d && $.notific8 ? ($.notific8("zindex", 11500), 
                    $.notific8(a, {
                        theme: "ruby",
                        life: 3e3
                    })) : alert(a);
                }
            })) : (Metronic.blockUI({
                target: b,
                animate: !0,
                overlayColor: "none"
            }), window.setTimeout(function() {
                Metronic.unblockUI(b);
            }, 1e3));
        }), $('.portlet .portlet-title a.reload[data-load="true"]').click(), $("body").on("click", ".portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand", function(a) {
            a.preventDefault();
            var b = $(this).closest(".portlet").children(".portlet-body");
            $(this).hasClass("collapse") ? ($(this).removeClass("collapse").addClass("expand"), 
            b.slideUp(200)) : ($(this).removeClass("expand").addClass("collapse"), b.slideDown(200));
        });
    }, p = function() {
        if ($().uniform) {
            var a = $("input[type=checkbox]:not(.toggle, .make-switch, .icheck), input[type=radio]:not(.toggle, .star, .make-switch, .icheck)");
            a.size() > 0 && a.each(function() {
                0 === $(this).parents(".checker").size() && ($(this).show(), $(this).uniform());
            });
        }
    }, q = function() {
        $().iCheck && $(".icheck").each(function() {
            var a = $(this).attr("data-checkbox") ? $(this).attr("data-checkbox") : "icheckbox_minimal-grey", b = $(this).attr("data-radio") ? $(this).attr("data-radio") : "iradio_minimal-grey";
            $(this).iCheck(a.indexOf("_line") > -1 || b.indexOf("_line") > -1 ? {
                checkboxClass: a,
                radioClass: b,
                insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
            } : {
                checkboxClass: a,
                radioClass: b
            });
        });
    }, r = function() {
        $().bootstrapSwitch && $(".make-switch").bootstrapSwitch();
    }, s = function() {
        $("body").on("shown.bs.collapse", ".accordion.scrollable", function(a) {
            Metronic.scrollTo($(a.target));
        });
    }, t = function() {
        if (location.hash) {
            var a = location.hash.substr(1);
            $('a[href="#' + a + '"]').parents(".tab-pane:hidden").each(function() {
                var a = $(this).attr("id");
                $('a[href="#' + a + '"]').click();
            }), $('a[href="#' + a + '"]').click();
        }
    }, u = function() {
        $("body").on("hide.bs.modal", function() {
            $(".modal:visible").size() > 1 && $("html").hasClass("modal-open") === !1 ? $("html").addClass("modal-open") : $(".modal:visible").size() <= 1 && $("html").removeClass("modal-open");
        }), $("body").on("show.bs.modal", ".modal", function() {
            $(this).hasClass("modal-scroll") && $("body").addClass("modal-open-noscroll");
        }), $("body").on("hide.bs.modal", ".modal", function() {
            $("body").removeClass("modal-open-noscroll");
        }), $("body").on("hidden.bs.modal", ".modal:not(.modal-cached)", function() {
            $(this).removeData("bs.modal");
        });
    }, v = function() {
        $(".tooltips").tooltip(), $(".portlet > .portlet-title .fullscreen").tooltip({
            container: "body",
            title: "Fullscreen"
        }), $(".portlet > .portlet-title > .tools > .reload").tooltip({
            container: "body",
            title: "Reload"
        }), $(".portlet > .portlet-title > .tools > .remove").tooltip({
            container: "body",
            title: "Remove"
        }), $(".portlet > .portlet-title > .tools > .config").tooltip({
            container: "body",
            title: "Settings"
        }), $(".portlet > .portlet-title > .tools > .collapse, .portlet > .portlet-title > .tools > .expand").tooltip({
            container: "body",
            title: "Collapse/Expand"
        });
    }, w = function() {
        $("body").on("click", ".dropdown-menu.hold-on-click", function(a) {
            a.stopPropagation();
        });
    }, x = function() {
        $("body").on("click", '[data-close="alert"]', function(a) {
            $(this).parent(".alert").hide(), $(this).closest(".note").hide(), a.preventDefault();
        }), $("body").on("click", '[data-close="note"]', function(a) {
            $(this).closest(".note").hide(), a.preventDefault();
        }), $("body").on("click", '[data-remove="note"]', function(a) {
            $(this).closest(".note").remove(), a.preventDefault();
        });
    }, y = function() {
        $('[data-hover="dropdown"]').not(".hover-initialized").each(function() {
            $(this).dropdownHover(), $(this).addClass("hover-initialized");
        });
    }, z = function() {
        $(".popovers").popover(), $(document).on("click.bs.popover.data-api", function() {
            a && a.popover("hide");
        });
    }, A = function() {
        Metronic.initSlimScroll(".scroller");
    }, B = function() {
        jQuery.fancybox && $(".fancybox-button").size() > 0 && $(".fancybox-button").fancybox({
            groupAttr: "data-rel",
            prevEffect: "none",
            nextEffect: "none",
            closeBtn: !0,
            helpers: {
                title: {
                    type: "inside"
                }
            }
        });
    }, C = function() {
        (c || d) && $("input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)").each(function() {
            var a = $(this);
            "" === a.val() && "" !== a.attr("placeholder") && a.addClass("placeholder").val(a.attr("placeholder")), 
            a.focus(function() {
                a.val() == a.attr("placeholder") && a.val("");
            }), a.blur(function() {
                ("" === a.val() || a.val() == a.attr("placeholder")) && a.val(a.attr("placeholder"));
            });
        });
    }, D = function() {
        $().select2 && $(".select2me").select2({
            placeholder: "Select",
            allowClear: !0
        });
    };
    return {
        init: function() {
            l(), n(), p(), q(), r(), A(), B(), D(), o(), x(), w(), t(), v(), z(), s(), u(), 
            C();
        },
        initAjax: function() {
            p(), q(), r(), y(), A(), D(), B(), w(), v(), z(), s();
        },
        initComponents: function() {
            this.initAjax();
        },
        setLastPopedPopover: function(b) {
            a = b;
        },
        addResizeHandler: function(a) {
            f.push(a);
        },
        runResizeHandlers: function() {
            m();
        },
        scrollTo: function(a, b) {
            var c = a && a.size() > 0 ? a.offset().top : 0;
            a && ($("body").hasClass("page-header-fixed") && (c -= $(".page-header").height()), 
            c += b ? b : -1 * a.height()), $("html,body").animate({
                scrollTop: c
            }, "slow");
        },
        initSlimScroll: function(a) {
            $(a).each(function() {
                if (!$(this).attr("data-initialized")) {
                    var a;
                    a = $(this).attr("data-height") ? $(this).attr("data-height") : $(this).css("height"), 
                    $(this).slimScroll({
                        allowPageScroll: !0,
                        size: "7px",
                        color: $(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : "#bbb",
                        wrapperClass: $(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : "slimScrollDiv",
                        railColor: $(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : "#eaeaea",
                        position: b ? "left" : "right",
                        height: a,
                        alwaysVisible: "1" == $(this).attr("data-always-visible") ? !0 : !1,
                        railVisible: "1" == $(this).attr("data-rail-visible") ? !0 : !1,
                        disableFadeOut: !0
                    }), $(this).attr("data-initialized", "1");
                }
            });
        },
        destroySlimScroll: function(a) {
            $(a).each(function() {
                if ("1" === $(this).attr("data-initialized")) {
                    $(this).removeAttr("data-initialized"), $(this).removeAttr("style");
                    var a = {};
                    $(this).attr("data-handle-color") && (a["data-handle-color"] = $(this).attr("data-handle-color")), 
                    $(this).attr("data-wrapper-class") && (a["data-wrapper-class"] = $(this).attr("data-wrapper-class")), 
                    $(this).attr("data-rail-color") && (a["data-rail-color"] = $(this).attr("data-rail-color")), 
                    $(this).attr("data-always-visible") && (a["data-always-visible"] = $(this).attr("data-always-visible")), 
                    $(this).attr("data-rail-visible") && (a["data-rail-visible"] = $(this).attr("data-rail-visible")), 
                    $(this).slimScroll({
                        wrapperClass: $(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : "slimScrollDiv",
                        destroy: !0
                    });
                    var b = $(this);
                    $.each(a, function(a, c) {
                        b.attr(a, c);
                    });
                }
            });
        },
        scrollTop: function() {
            Metronic.scrollTo();
        },
        blockUI: function(a) {
            a = $.extend(!0, {}, a);
            var b = "";
            if (b = a.animate ? '<div class="loading-message ' + (a.boxed ? "loading-message-boxed" : "") + '"><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>' : a.iconOnly ? '<div class="loading-message ' + (a.boxed ? "loading-message-boxed" : "") + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""></div>' : a.textOnly ? '<div class="loading-message ' + (a.boxed ? "loading-message-boxed" : "") + '"><span>&nbsp;&nbsp;' + (a.message ? a.message : "LOADING...") + "</span></div>" : '<div class="loading-message ' + (a.boxed ? "loading-message-boxed" : "") + '"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (a.message ? a.message : "LOADING...") + "</span></div>", 
            a.target) {
                var c = $(a.target);
                c.height() <= $(window).height() && (a.cenrerY = !0), c.block({
                    message: b,
                    baseZ: a.zIndex ? a.zIndex : 1e3,
                    centerY: void 0 !== a.cenrerY ? a.cenrerY : !1,
                    css: {
                        top: "10%",
                        border: "0",
                        padding: "0",
                        backgroundColor: "none"
                    },
                    overlayCSS: {
                        backgroundColor: a.overlayColor ? a.overlayColor : "#555",
                        opacity: a.boxed ? .05 : .1,
                        cursor: "wait"
                    }
                });
            } else $.blockUI({
                message: b,
                baseZ: a.zIndex ? a.zIndex : 1e3,
                css: {
                    border: "0",
                    padding: "0",
                    backgroundColor: "none"
                },
                overlayCSS: {
                    backgroundColor: a.overlayColor ? a.overlayColor : "#555",
                    opacity: a.boxed ? .05 : .1,
                    cursor: "wait"
                }
            });
        },
        unblockUI: function(a) {
            a ? $(a).unblock({
                onUnblock: function() {
                    $(a).css("position", ""), $(a).css("zoom", "");
                }
            }) : $.unblockUI();
        },
        startPageLoading: function(a) {
            a && a.animate ? ($(".page-spinner-bar").remove(), $("body").append('<div class="page-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>')) : ($(".page-loading").remove(), 
            $("body").append('<div class="page-loading"><img src="' + this.getGlobalImgPath() + 'loading-spinner-grey.gif"/>&nbsp;&nbsp;<span>' + (a && a.message ? a.message : "Loading...") + "</span></div>"));
        },
        stopPageLoading: function() {
            $(".page-loading, .page-spinner-bar").remove();
        },
        alert: function(a) {
            a = $.extend(!0, {
                container: "",
                place: "append",
                type: "success",
                message: "",
                close: !0,
                reset: !0,
                focus: !0,
                closeInSeconds: 0,
                icon: ""
            }, a);
            var b = Metronic.getUniqueID("Metronic_alert"), c = '<div id="' + b + '" class="Metronic-alerts alert alert-' + a.type + ' fade in">' + (a.close ? '<button type="button" class="close" data-dismiss="alert" aria-hidden="true"></button>' : "") + ("" !== a.icon ? '<i class="fa-lg fa fa-' + a.icon + '"></i>  ' : "") + a.message + "</div>";
            return a.reset && $(".Metronic-alerts").remove(), a.container ? "append" == a.place ? $(a.container).append(c) : $(a.container).prepend(c) : $("body").hasClass("page-container-bg-solid") ? $(".page-title").after(c) : $(".page-bar").size() > 0 ? $(".page-bar").after(c) : $(".page-breadcrumb").after(c), 
            a.focus && Metronic.scrollTo($("#" + b)), a.closeInSeconds > 0 && setTimeout(function() {
                $("#" + b).remove();
            }, 1e3 * a.closeInSeconds), b;
        },
        initUniform: function(a) {
            a ? $(a).each(function() {
                0 === $(this).parents(".checker").size() && ($(this).show(), $(this).uniform());
            }) : p();
        },
        updateUniform: function(a) {
            $.uniform.update(a);
        },
        initFancybox: function() {
            B();
        },
        getActualVal: function(a) {
            return a = $(a), a.val() === a.attr("placeholder") ? "" : a.val();
        },
        getURLParameter: function(a) {
            var b, c, d = window.location.search.substring(1), e = d.split("&");
            for (b = 0; b < e.length; b++) if (c = e[b].split("="), c[0] == a) return unescape(c[1]);
            return null;
        },
        isTouchDevice: function() {
            try {
                return document.createEvent("TouchEvent"), !0;
            } catch (a) {
                return !1;
            }
        },
        getViewPort: function() {
            var a = window, b = "inner";
            return "innerWidth" in window || (b = "client", a = document.documentElement || document.body), 
            {
                width: a[b + "Width"],
                height: a[b + "Height"]
            };
        },
        getUniqueID: function() {
            return "prefix_" + Math.floor(Math.random() * new Date().getTime());
        },
        isIE8: function() {
            return c;
        },
        isIE9: function() {
            return d;
        },
        isRTL: function() {
            return b;
        },
        isAngularJsApp: function() {
            return "undefined" == typeof angular ? !1 : !0;
        },
        getAssetsPath: function() {
            return g;
        },
        setAssetsPath: function(a) {
            g = a;
        },
        setGlobalImgPath: function(a) {
            h = a;
        },
        getGlobalImgPath: function() {
            return g + h;
        },
        setGlobalPluginsPath: function(a) {
            i = a;
        },
        getGlobalPluginsPath: function() {
            return g + i;
        },
        getGlobalCssPath: function() {
            return g + j;
        },
        getBrandColor: function(a) {
            return k[a] ? k[a] : "";
        }
    };
}(), Layout = function() {
    var a = "admin/layout2/img/", b = "admin/layout2/css/", c = function() {
        var a, b = $(".page-content"), c = $(".page-sidebar"), d = $("body");
        if (d.hasClass("page-footer-fixed") === !0 && d.hasClass("page-sidebar-fixed") === !1) {
            var e = Metronic.getViewPort().height - $(".page-footer").outerHeight() - $(".page-header").outerHeight();
            b.height() < e && b.attr("style", "min-height:" + e + "px");
        } else {
            if (d.hasClass("page-sidebar-fixed")) a = f(), d.hasClass("page-footer-fixed") === !1 && (a -= $(".page-footer").outerHeight()); else {
                var g = $(".page-header").outerHeight(), h = $(".page-footer").outerHeight();
                a = Metronic.getViewPort().width < 992 ? Metronic.getViewPort().height - g - h : c.outerHeight() + 10, 
                a + g + h <= Metronic.getViewPort().height && (a = Metronic.getViewPort().height - g - h);
            }
            b.attr("style", "min-height:" + a + "px");
        }
    }, d = function(a, b) {
        var c = location.hash.toLowerCase(), d = $(".page-sidebar-menu");
        if ("click" === a || "set" === a ? b = $(b) : "match" === a && d.find("li > a").each(function() {
            var a = $(this).attr("href").toLowerCase();
            return a.length > 1 && c.substr(1, a.length - 1) == a.substr(1) ? void (b = $(this)) : void 0;
        }), b && 0 != b.size() && "javascript:;" !== b.attr("href").toLowerCase() && "#" !== b.attr("href").toLowerCase()) {
            {
                parseInt(d.data("slide-speed")), d.data("keep-expanded");
            }
            d.find("li.active").removeClass("active"), d.find("li > a > .selected").remove(), 
            d.hasClass("page-sidebar-menu-hover-submenu") === !1 ? d.find("li.open").each(function() {
                0 === $(this).children(".sub-menu").size() && ($(this).removeClass("open"), $(this).find("> a > .arrow.open").removeClass("open"));
            }) : d.find("li.open").removeClass("open"), b.parents("li").each(function() {
                $(this).addClass("active"), $(this).find("> a > span.arrow").addClass("open"), 1 === $(this).parent("ul.page-sidebar-menu").size() && $(this).find("> a").append('<span class="selected"></span>'), 
                1 === $(this).children("ul.sub-menu").size() && $(this).addClass("open");
            }), "click" === a && Metronic.getViewPort().width < 992 && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click();
        }
    }, e = function() {
        $(".page-sidebar").on("click", "li > a", function(a) {
            if (!(Metronic.getViewPort().width >= 992 && 1 === $(this).parents(".page-sidebar-menu-hover-submenu").size())) {
                if ($(this).next().hasClass("sub-menu") === !1) return void (Metronic.getViewPort().width < 992 && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click());
                if (!$(this).next().hasClass("sub-menu always-open")) {
                    var b = $(this).parent().parent(), d = $(this), e = $(".page-sidebar-menu"), f = $(this).next(), g = e.data("auto-scroll"), h = parseInt(e.data("slide-speed")), i = e.data("keep-expanded");
                    i !== !0 && (b.children("li.open").children("a").children(".arrow").removeClass("open"), 
                    b.children("li.open").children(".sub-menu:not(.always-open)").slideUp(h), b.children("li.open").removeClass("open"));
                    var j = -200;
                    f.is(":visible") ? ($(".arrow", $(this)).removeClass("open"), $(this).parent().removeClass("open"), 
                    f.slideUp(h, function() {
                        g === !0 && $("body").hasClass("page-sidebar-closed") === !1 && ($("body").hasClass("page-sidebar-fixed") ? e.slimScroll({
                            scrollTo: d.position().top
                        }) : Metronic.scrollTo(d, j)), c();
                    })) : ($(".arrow", $(this)).addClass("open"), $(this).parent().addClass("open"), 
                    f.slideDown(h, function() {
                        g === !0 && $("body").hasClass("page-sidebar-closed") === !1 && ($("body").hasClass("page-sidebar-fixed") ? e.slimScroll({
                            scrollTo: d.position().top
                        }) : Metronic.scrollTo(d, j)), c();
                    })), a.preventDefault();
                }
            }
        }), $(".page-sidebar").on("click", " li > a.ajaxify", function(a) {
            a.preventDefault(), Metronic.scrollTop();
            var b = $(this).attr("href"), c = $(".page-sidebar ul"), d = ($(".page-content"), 
            $(".page-content .page-content-body"));
            c.children("li.active").removeClass("active"), c.children("arrow.open").removeClass("open"), 
            $(this).parents("li").each(function() {
                $(this).addClass("active"), $(this).children("a > span.arrow").addClass("open");
            }), $(this).parents("li").addClass("active"), Metronic.getViewPort().width < 992 && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click(), 
            Metronic.startPageLoading();
            var e = $(this);
            $.ajax({
                type: "GET",
                cache: !1,
                url: b,
                dataType: "html",
                success: function(a) {
                    0 === e.parents("li.open").size() && $(".page-sidebar-menu > li.open > a").click(), 
                    Metronic.stopPageLoading(), d.html(a), Layout.fixContentHeight(), Metronic.initAjax();
                },
                error: function() {
                    Metronic.stopPageLoading(), d.html("<h4>Could not load the requested content.</h4>");
                }
            });
        }), $(".page-content").on("click", ".ajaxify", function(a) {
            a.preventDefault(), Metronic.scrollTop();
            var b = $(this).attr("href"), c = ($(".page-content"), $(".page-content .page-content-body"));
            Metronic.startPageLoading(), Metronic.getViewPort().width < 992 && $(".page-sidebar").hasClass("in") && $(".page-header .responsive-toggler").click(), 
            $.ajax({
                type: "GET",
                cache: !1,
                url: b,
                dataType: "html",
                success: function(a) {
                    Metronic.stopPageLoading(), c.html(a), Layout.fixContentHeight(), Metronic.initAjax();
                },
                error: function() {
                    c.html("<h4>Could not load the requested content.</h4>"), Metronic.stopPageLoading();
                }
            });
        });
    }, f = function() {
        var a = Metronic.getViewPort().height - $(".page-header").outerHeight();
        return $("body").hasClass("page-footer-fixed") && (a -= $(".page-footer").outerHeight()), 
        a;
    }, g = function() {
        var a = $(".page-sidebar-menu");
        return Metronic.destroySlimScroll(a), 0 === $(".page-sidebar-fixed").size() ? void c() : void (Metronic.getViewPort().width >= 992 && (a.attr("data-height", f()), 
        Metronic.initSlimScroll(a), c()));
    }, h = function() {
        var a = $("body");
        a.hasClass("page-sidebar-fixed") && $(".page-sidebar").on("mouseenter", function() {
            a.hasClass("page-sidebar-closed") && $(this).find(".page-sidebar-menu").removeClass("page-sidebar-menu-closed");
        }).on("mouseleave", function() {
            a.hasClass("page-sidebar-closed") && $(this).find(".page-sidebar-menu").addClass("page-sidebar-menu-closed");
        });
    }, i = function() {
        var a = $("body");
        $.cookie && "1" === $.cookie("sidebar_closed") && Metronic.getViewPort().width >= 992 && ($("body").addClass("page-sidebar-closed"), 
        $(".page-sidebar-menu").addClass("page-sidebar-menu-closed")), $("body").on("click", ".sidebar-toggler", function() {
            var b = $(".page-sidebar"), c = $(".page-sidebar-menu");
            $(".sidebar-search", b).removeClass("open"), a.hasClass("page-sidebar-closed") ? (a.removeClass("page-sidebar-closed"), 
            c.removeClass("page-sidebar-menu-closed"), $.cookie && $.cookie("sidebar_closed", "0")) : (a.addClass("page-sidebar-closed"), 
            c.addClass("page-sidebar-menu-closed"), a.hasClass("page-sidebar-fixed") && c.trigger("mouseleave"), 
            $.cookie && $.cookie("sidebar_closed", "1")), $(window).trigger("resize");
        }), h(), $(".page-sidebar").on("click", ".sidebar-search .remove", function(a) {
            a.preventDefault(), $(".sidebar-search").removeClass("open");
        }), $(".page-sidebar .sidebar-search").on("keypress", "input.form-control", function(a) {
            return 13 == a.which ? ($(".sidebar-search").submit(), !1) : void 0;
        }), $(".sidebar-search .submit").on("click", function(a) {
            a.preventDefault(), $("body").hasClass("page-sidebar-closed") && $(".sidebar-search").hasClass("open") === !1 ? (1 === $(".page-sidebar-fixed").size() && $(".page-sidebar .sidebar-toggler").click(), 
            $(".sidebar-search").addClass("open")) : $(".sidebar-search").submit();
        }), 0 !== $(".sidebar-search").size() && ($(".sidebar-search .input-group").on("click", function(a) {
            a.stopPropagation();
        }), $("body").on("click", function() {
            $(".sidebar-search").hasClass("open") && $(".sidebar-search").removeClass("open");
        }));
    }, j = function() {
        $(".page-header").on("click", ".search-form", function() {
            $(this).addClass("open"), $(this).find(".form-control").focus(), $(".page-header .search-form .form-control").on("blur", function() {
                $(this).closest(".search-form").removeClass("open"), $(this).unbind("blur");
            });
        }), $(".page-header").on("keypress", ".hor-menu .search-form .form-control", function(a) {
            return 13 == a.which ? ($(this).closest(".search-form").submit(), !1) : void 0;
        }), $(".page-header").on("mousedown", ".search-form.open .submit", function(a) {
            a.preventDefault(), a.stopPropagation(), $(this).closest(".search-form").submit();
        });
    }, k = function() {
        $("body").on("shown.bs.tab", 'a[data-toggle="tab"]', function() {
            c();
        });
    }, l = function() {
        var a = 300, b = 500;
        navigator.userAgent.match(/iPhone|iPad|iPod/i) ? $(window).bind("touchend touchcancel touchleave", function() {
            $(this).scrollTop() > a ? $(".scroll-to-top").fadeIn(b) : $(".scroll-to-top").fadeOut(b);
        }) : $(window).scroll(function() {
            $(this).scrollTop() > a ? $(".scroll-to-top").fadeIn(b) : $(".scroll-to-top").fadeOut(b);
        }), $(".scroll-to-top").click(function(a) {
            return a.preventDefault(), $("html, body").animate({
                scrollTop: 0
            }, b), !1;
        });
    }, m = function() {
        var a, b = $(".full-height-content");
        if (b.hasClass("portlet")) {
            a = Metronic.getViewPort().height - $(".page-header").outerHeight(!0) - $(".page-footer").outerHeight(!0) - $(".page-title").outerHeight(!0) - $(".page-bar").outerHeight(!0), 
            $("body").hasClass("page-header-fixed") && (a -= $(".page-header").outerHeight(!0));
            var c = b.find(".portlet-body");
            if (Metronic.getViewPort().width < 992) return void Metronic.destroySlimScroll(c.find(".full-height-content-body"));
            b.find(".portlet-title") && (a -= b.find(".portlet-title").outerHeight(!0)), a -= parseInt(c.css("padding-top")), 
            a -= parseInt(c.css("padding-bottom")), b.hasClass("full-height-content-scrollable") ? (c.find(".full-height-content-body").css("height", a), 
            Metronic.initSlimScroll(c.find(".full-height-content-body"))) : c.css("min-height", a);
        }
    };
    return {
        initHeader: function() {
            j();
        },
        setSidebarMenuActiveLink: function(a, b) {
            d(a, b);
        },
        initSidebar: function() {
            g(), e(), i(), Metronic.isAngularJsApp() && d("match"), Metronic.addResizeHandler(g);
        },
        initContent: function() {
            m(), k(), Metronic.addResizeHandler(c), Metronic.addResizeHandler(m);
        },
        initFooter: function() {
            l();
        },
        init: function() {
            this.initHeader(), this.initSidebar(), this.initContent(), this.initFooter();
        },
        fixContentHeight: function() {
            c();
        },
        initFixedSidebarHoverEffect: function() {
            h();
        },
        initFixedSidebar: function() {
            g();
        },
        getLayoutImgPath: function() {
            return Metronic.getAssetsPath() + a;
        },
        getLayoutCssPath: function() {
            return Metronic.getAssetsPath() + b;
        }
    };
}(), Showdown = {
    extensions: {}
}, forEach = Showdown.forEach = function(a, b) {
    if ("function" == typeof a.forEach) a.forEach(b); else {
        var c, d = a.length;
        for (c = 0; d > c; c++) b(a[c], c, a);
    }
}, stdExtName = function(a) {
    return a.replace(/[_-]||\s/g, "").toLowerCase();
};

Showdown.converter = function(a) {
    var b, c, d, e = 0, f = [], g = [];
    if ("undefind" != typeof module && "undefined" != typeof exports && "undefind" != typeof require) {
        var h = require("fs");
        if (h) {
            var i = h.readdirSync((__dirname || ".") + "/extensions").filter(function(a) {
                return ~a.indexOf(".js");
            }).map(function(a) {
                return a.replace(/\.js$/, "");
            });
            Showdown.forEach(i, function(a) {
                var b = stdExtName(a);
                Showdown.extensions[b] = require("./extensions/" + a);
            });
        }
    }
    a && a.extensions && Showdown.forEach(a.extensions, function(a) {
        if ("string" == typeof a && (a = Showdown.extensions[stdExtName(a)]), "function" != typeof a) throw "Extension '" + a + "' could not be loaded.  It was either not found or is not a valid extension.";
        Showdown.forEach(a(this), function(a) {
            a.type ? "language" === a.type || "lang" === a.type ? f.push(a) : ("output" === a.type || "html" === a.type) && g.push(a) : g.push(a);
        });
    }), this.makeHtml = function(a) {
        return b = {}, c = {}, d = [], a = a.replace(/~/g, "~T"), a = a.replace(/\$/g, "~D"), 
        a = a.replace(/\r\n/g, "\n"), a = a.replace(/\r/g, "\n"), a = "\n\n" + a + "\n\n", 
        a = L(a), a = a.replace(/^[ \t]+$/gm, ""), Showdown.forEach(f, function(b) {
            a = k(b, a);
        }), a = y(a), a = m(a), a = l(a), a = o(a), a = J(a), a = a.replace(/~D/g, "$$"), 
        a = a.replace(/~T/g, "~"), Showdown.forEach(g, function(b) {
            a = k(b, a);
        }), a;
    };
    var j, k = function(a, b) {
        if (a.regex) {
            var c = new RegExp(a.regex, "g");
            return b.replace(c, a.replace);
        }
        return a.filter ? a.filter(b) : void 0;
    }, l = function(a) {
        return a += "~0", a = a.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|(?=~0))/gm, function(a, d, e, f, g) {
            return d = d.toLowerCase(), b[d] = F(e), f ? f + g : (g && (c[d] = g.replace(/"/g, "&quot;")), 
            "");
        }), a = a.replace(/~0/, "");
    }, m = function(a) {
        a = a.replace(/\n/g, "\n\n");
        return a = a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm, n), 
        a = a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?<\/\2>[ \t]*(?=\n+)\n)/gm, n), 
        a = a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, n), a = a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g, n), 
        a = a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, n), a = a.replace(/\n\n/g, "\n");
    }, n = function(a, b) {
        var c = b;
        return c = c.replace(/\n\n/g, "\n"), c = c.replace(/^\n/, ""), c = c.replace(/\n+$/g, ""), 
        c = "\n\n~K" + (d.push(c) - 1) + "K\n\n";
    }, o = function(a) {
        a = v(a);
        var b = z("<hr />");
        return a = a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, b), a = a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm, b), 
        a = a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm, b), a = w(a), a = x(a), a = D(a), 
        a = m(a), a = E(a);
    }, p = function(a) {
        return a = A(a), a = q(a), a = G(a), a = t(a), a = r(a), a = H(a), a = F(a), a = C(a), 
        a = a.replace(/  +\n/g, " <br />\n");
    }, q = function(a) {
        var b = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;
        return a = a.replace(b, function(a) {
            var b = a.replace(/(.)<\/?code>(?=.)/g, "$1`");
            return b = M(b, "\\`*_");
        });
    }, r = function(a) {
        return a = a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, s), 
        a = a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?(?:\(.*?\).*?)?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, s), 
        a = a.replace(/(\[([^\[\]]+)\])()()()()()/g, s);
    }, s = function(a, d, e, f, g, h, i, j) {
        void 0 == j && (j = "");
        var k = d, l = e, m = f.toLowerCase(), n = g, o = j;
        if ("" == n) if ("" == m && (m = l.toLowerCase().replace(/ ?\n/g, " ")), n = "#" + m, 
        void 0 != b[m]) n = b[m], void 0 != c[m] && (o = c[m]); else {
            if (!(k.search(/\(\s*\)$/m) > -1)) return k;
            n = "";
        }
        n = M(n, "*_");
        var p = '<a href="' + n + '"';
        return "" != o && (o = o.replace(/"/g, "&quot;"), o = M(o, "*_"), p += ' title="' + o + '"'), 
        p += ">" + l + "</a>";
    }, t = function(a) {
        return a = a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, u), a = a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, u);
    }, u = function(a, d, e, f, g, h, i, j) {
        var k = d, l = e, m = f.toLowerCase(), n = g, o = j;
        if (o || (o = ""), "" == n) {
            if ("" == m && (m = l.toLowerCase().replace(/ ?\n/g, " ")), n = "#" + m, void 0 == b[m]) return k;
            n = b[m], void 0 != c[m] && (o = c[m]);
        }
        l = l.replace(/"/g, "&quot;"), n = M(n, "*_");
        var p = '<img src="' + n + '" alt="' + l + '"';
        return o = o.replace(/"/g, "&quot;"), o = M(o, "*_"), p += ' title="' + o + '"', 
        p += " />";
    }, v = function(a) {
        function b(a) {
            return a.replace(/[^\w]/g, "").toLowerCase();
        }
        return a = a.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(a, c) {
            return z('<h1 id="' + b(c) + '">' + p(c) + "</h1>");
        }), a = a.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(a, c) {
            return z('<h2 id="' + b(c) + '">' + p(c) + "</h2>");
        }), a = a.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(a, c, d) {
            var e = c.length;
            return z("<h" + e + ' id="' + b(d) + '">' + p(d) + "</h" + e + ">");
        });
    }, w = function(a) {
        a += "~0";
        var b = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
        return e ? a = a.replace(b, function(a, b, c) {
            var d = b, e = c.search(/[*+-]/g) > -1 ? "ul" : "ol";
            d = d.replace(/\n{2,}/g, "\n\n\n");
            var f = j(d);
            return f = f.replace(/\s+$/, ""), f = "<" + e + ">" + f + "</" + e + ">\n";
        }) : (b = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g, 
        a = a.replace(b, function(a, b, c, d) {
            var e = b, f = c, g = d.search(/[*+-]/g) > -1 ? "ul" : "ol", f = f.replace(/\n{2,}/g, "\n\n\n"), h = j(f);
            return h = e + "<" + g + ">\n" + h + "</" + g + ">\n";
        })), a = a.replace(/~0/, "");
    };
    j = function(a) {
        return e++, a = a.replace(/\n{2,}$/, "\n"), a += "~0", a = a.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm, function(a, b, c, d, e) {
            var f = e, g = b;
            return g || f.search(/\n{2,}/) > -1 ? f = o(K(f)) : (f = w(K(f)), f = f.replace(/\n$/, ""), 
            f = p(f)), "<li>" + f + "</li>\n";
        }), a = a.replace(/~0/g, ""), e--, a;
    };
    var x = function(a) {
        return a += "~0", a = a.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(a, b, c) {
            var d = b, e = c;
            return d = B(K(d)), d = L(d), d = d.replace(/^\n+/g, ""), d = d.replace(/\n+$/g, ""), 
            d = "<pre><code>" + d + "\n</code></pre>", z(d) + e;
        }), a = a.replace(/~0/, "");
    }, y = function(a) {
        return a += "~0", a = a.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g, function(a, b, c) {
            var d = b, e = c;
            return e = B(e), e = L(e), e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, ""), 
            e = "<pre><code" + (d ? ' class="' + d + '"' : "") + ">" + e + "\n</code></pre>", 
            z(e);
        }), a = a.replace(/~0/, "");
    }, z = function(a) {
        return a = a.replace(/(^\n+|\n+$)/g, ""), "\n\n~K" + (d.push(a) - 1) + "K\n\n";
    }, A = function(a) {
        return a = a.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(a, b, c, d) {
            var e = d;
            return e = e.replace(/^([ \t]*)/g, ""), e = e.replace(/[ \t]*$/g, ""), e = B(e), 
            b + "<code>" + e + "</code>";
        });
    }, B = function(a) {
        return a = a.replace(/&/g, "&amp;"), a = a.replace(/</g, "&lt;"), a = a.replace(/>/g, "&gt;"), 
        a = M(a, "*_{}[]\\", !1);
    }, C = function(a) {
        return a = a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g, "<strong>$2</strong>"), 
        a = a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g, "<em>$2</em>");
    }, D = function(a) {
        return a = a.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(a, b) {
            var c = b;
            return c = c.replace(/^[ \t]*>[ \t]?/gm, "~0"), c = c.replace(/~0/g, ""), c = c.replace(/^[ \t]+$/gm, ""), 
            c = o(c), c = c.replace(/(^|\n)/g, "$1  "), c = c.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(a, b) {
                var c = b;
                return c = c.replace(/^  /gm, "~0"), c = c.replace(/~0/g, "");
            }), z("<blockquote>\n" + c + "\n</blockquote>");
        });
    }, E = function(a) {
        a = a.replace(/^\n+/g, ""), a = a.replace(/\n+$/g, "");
        for (var b = a.split(/\n{2,}/g), c = [], e = b.length, f = 0; e > f; f++) {
            var g = b[f];
            g.search(/~K(\d+)K/g) >= 0 ? c.push(g) : g.search(/\S/) >= 0 && (g = p(g), g = g.replace(/^([ \t]*)/g, "<p>"), 
            g += "</p>", c.push(g));
        }
        e = c.length;
        for (var f = 0; e > f; f++) for (;c[f].search(/~K(\d+)K/) >= 0; ) {
            var h = d[RegExp.$1];
            h = h.replace(/\$/g, "$$$$"), c[f] = c[f].replace(/~K\d+K/, h);
        }
        return c.join("\n\n");
    }, F = function(a) {
        return a = a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), a = a.replace(/<(?![a-z\/?\$!])/gi, "&lt;");
    }, G = function(a) {
        return a = a.replace(/\\(\\)/g, N), a = a.replace(/\\([`*_{}\[\]()>#+-.!])/g, N);
    }, H = function(a) {
        return a = a.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi, '<a href="$1">$1</a>'), 
        a = a.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, function(a, b) {
            return I(J(b));
        });
    }, I = function(a) {
        var b = [ function(a) {
            return "&#" + a.charCodeAt(0) + ";";
        }, function(a) {
            return "&#x" + a.charCodeAt(0).toString(16) + ";";
        }, function(a) {
            return a;
        } ];
        return a = "mailto:" + a, a = a.replace(/./g, function(a) {
            if ("@" == a) a = b[Math.floor(2 * Math.random())](a); else if (":" != a) {
                var c = Math.random();
                a = c > .9 ? b[2](a) : c > .45 ? b[1](a) : b[0](a);
            }
            return a;
        }), a = '<a href="' + a + '">' + a + "</a>", a = a.replace(/">.+:/g, '">');
    }, J = function(a) {
        return a = a.replace(/~E(\d+)E/g, function(a, b) {
            var c = parseInt(b);
            return String.fromCharCode(c);
        });
    }, K = function(a) {
        return a = a.replace(/^(\t|[ ]{1,4})/gm, "~0"), a = a.replace(/~0/g, "");
    }, L = function(a) {
        return a = a.replace(/\t(?=\t)/g, "    "), a = a.replace(/\t/g, "~A~B"), a = a.replace(/~B(.+?)~A/g, function(a, b) {
            for (var c = b, d = 4 - c.length % 4, e = 0; d > e; e++) c += " ";
            return c;
        }), a = a.replace(/~A/g, "    "), a = a.replace(/~B/g, "");
    }, M = function(a, b, c) {
        var d = "([" + b.replace(/([\[\]\\])/g, "\\$1") + "])";
        c && (d = "\\\\" + d);
        var e = new RegExp(d, "g");
        return a = a.replace(e, N);
    }, N = function(a, b) {
        var c = b.charCodeAt(0);
        return "~E" + c + "E";
    };
}, "undefined" != typeof module && (module.exports = Showdown), "function" == typeof define && define.amd && define("showdown", function() {
    return Showdown;
}), function() {
    function a(a, b, c) {
        c = (c || 0) - 1;
        for (var d = a ? a.length : 0; ++c < d; ) if (a[c] === b) return c;
        return -1;
    }
    function b(b, c) {
        var d = typeof c;
        if (b = b.l, "boolean" == d || null == c) return b[c] ? 0 : -1;
        "number" != d && "string" != d && (d = "object");
        var e = "number" == d ? c : r + c;
        return b = (b = b[d]) && b[e], "object" == d ? b && -1 < a(b, c) ? 0 : -1 : b ? 0 : -1;
    }
    function c(a) {
        var b = this.l, c = typeof a;
        if ("boolean" == c || null == a) b[a] = !0; else {
            "number" != c && "string" != c && (c = "object");
            var d = "number" == c ? a : r + a, b = b[c] || (b[c] = {});
            "object" == c ? (b[d] || (b[d] = [])).push(a) : b[d] = !0;
        }
    }
    function d(a) {
        return a.charCodeAt(0);
    }
    function e(a, b) {
        for (var c = a.m, d = b.m, e = -1, f = c.length; ++e < f; ) {
            var g = c[e], h = d[e];
            if (g !== h) {
                if (g > h || "undefined" == typeof g) return 1;
                if (h > g || "undefined" == typeof h) return -1;
            }
        }
        return a.n - b.n;
    }
    function f(a) {
        var b = -1, d = a.length, e = a[0], f = a[d / 2 | 0], g = a[d - 1];
        if (e && "object" == typeof e && f && "object" == typeof f && g && "object" == typeof g) return !1;
        for (e = i(), e["false"] = e["null"] = e["true"] = e.undefined = !1, f = i(), f.k = a, 
        f.l = e, f.push = c; ++b < d; ) f.push(a[b]);
        return f;
    }
    function g(a) {
        return "\\" + U[a];
    }
    function h() {
        return o.pop() || [];
    }
    function i() {
        return p.pop() || {
            k: null,
            l: null,
            m: null,
            "false": !1,
            n: 0,
            "null": !1,
            number: null,
            object: null,
            push: null,
            string: null,
            "true": !1,
            undefined: !1,
            o: null
        };
    }
    function j(a) {
        a.length = 0, o.length < t && o.push(a);
    }
    function k(a) {
        var b = a.l;
        b && k(b), a.k = a.l = a.m = a.object = a.number = a.string = a.o = null, p.length < t && p.push(a);
    }
    function l(a, b, c) {
        b || (b = 0), "undefined" == typeof c && (c = a ? a.length : 0);
        var d = -1;
        c = c - b || 0;
        for (var e = Array(0 > c ? 0 : c); ++d < c; ) e[d] = a[b + d];
        return e;
    }
    function m(c) {
        function o(a, b, c) {
            if (!a || !T[typeof a]) return a;
            b = b && "undefined" == typeof c ? b : bb(b, c, 3);
            for (var d = -1, e = T[typeof a] && Kc(a), f = e ? e.length : 0; ++d < f && (c = e[d], 
            !1 !== b(a[c], c, a)); ) ;
            return a;
        }
        function p(a, b, c) {
            var d;
            if (!a || !T[typeof a]) return a;
            b = b && "undefined" == typeof c ? b : bb(b, c, 3);
            for (d in a) if (!1 === b(a[d], d, a)) break;
            return a;
        }
        function t(a, b, c) {
            var d, e = a, f = e;
            if (!e) return f;
            for (var g = arguments, h = 0, i = "number" == typeof c ? 2 : g.length; ++h < i; ) if ((e = g[h]) && T[typeof e]) for (var j = -1, k = T[typeof e] && Kc(e), l = k ? k.length : 0; ++j < l; ) d = k[j], 
            "undefined" == typeof f[d] && (f[d] = e[d]);
            return f;
        }
        function U(a, b, c) {
            var d, e = a, f = e;
            if (!e) return f;
            var g = arguments, h = 0, i = "number" == typeof c ? 2 : g.length;
            if (i > 3 && "function" == typeof g[i - 2]) var j = bb(g[--i - 1], g[i--], 2); else i > 2 && "function" == typeof g[i - 1] && (j = g[--i]);
            for (;++h < i; ) if ((e = g[h]) && T[typeof e]) for (var k = -1, l = T[typeof e] && Kc(e), m = l ? l.length : 0; ++k < m; ) d = l[k], 
            f[d] = j ? j(f[d], e[d]) : e[d];
            return f;
        }
        function W(a) {
            var b, c = [];
            if (!a || !T[typeof a]) return c;
            for (b in a) rc.call(a, b) && c.push(b);
            return c;
        }
        function X(a) {
            return a && "object" == typeof a && !Jc(a) && rc.call(a, "__wrapped__") ? a : new Y(a);
        }
        function Y(a, b) {
            this.__chain__ = !!b, this.__wrapped__ = a;
        }
        function Z(a) {
            function b() {
                if (d) {
                    var a = l(d);
                    sc.apply(a, arguments);
                }
                if (this instanceof b) {
                    var f = ab(c.prototype), a = c.apply(f, a || arguments);
                    return vb(a) ? a : f;
                }
                return c.apply(e, a || arguments);
            }
            var c = a[0], d = a[2], e = a[4];
            return Ic(b, a), b;
        }
        function _(a, b, c, d, e) {
            if (c) {
                var f = c(a);
                if ("undefined" != typeof f) return f;
            }
            if (!vb(a)) return a;
            var g = kc.call(a);
            if (!Q[g]) return a;
            var i = Gc[g];
            switch (g) {
              case J:
              case K:
                return new i(+a);

              case M:
              case P:
                return new i(a);

              case O:
                return f = i(a.source, z.exec(a)), f.lastIndex = a.lastIndex, f;
            }
            if (g = Jc(a), b) {
                var k = !d;
                d || (d = h()), e || (e = h());
                for (var m = d.length; m--; ) if (d[m] == a) return e[m];
                f = g ? i(a.length) : {};
            } else f = g ? l(a) : U({}, a);
            return g && (rc.call(a, "index") && (f.index = a.index), rc.call(a, "input") && (f.input = a.input)), 
            b ? (d.push(a), e.push(f), (g ? Db : o)(a, function(a, g) {
                f[g] = _(a, b, c, d, e);
            }), k && (j(d), j(e)), f) : f;
        }
        function ab(a) {
            return vb(a) ? xc(a) : {};
        }
        function bb(a, b, c) {
            if ("function" != typeof a) return Ub;
            if ("undefined" == typeof b || !("prototype" in a)) return a;
            var d = a.__bindData__;
            if ("undefined" == typeof d && (Hc.funcNames && (d = !a.name), d = d || !Hc.funcDecomp, 
            !d)) {
                var e = pc.call(a);
                Hc.funcNames || (d = !A.test(e)), d || (d = E.test(e), Ic(a, d));
            }
            if (!1 === d || !0 !== d && 1 & d[1]) return a;
            switch (c) {
              case 1:
                return function(c) {
                    return a.call(b, c);
                };

              case 2:
                return function(c, d) {
                    return a.call(b, c, d);
                };

              case 3:
                return function(c, d, e) {
                    return a.call(b, c, d, e);
                };

              case 4:
                return function(c, d, e, f) {
                    return a.call(b, c, d, e, f);
                };
            }
            return Sb(a, b);
        }
        function cb(a) {
            function b() {
                var a = i ? g : this;
                if (e) {
                    var o = l(e);
                    sc.apply(o, arguments);
                }
                return (f || k) && (o || (o = l(arguments)), f && sc.apply(o, f), k && o.length < h) ? (d |= 16, 
                cb([ c, m ? d : -4 & d, o, null, g, h ])) : (o || (o = arguments), j && (c = a[n]), 
                this instanceof b ? (a = ab(c.prototype), o = c.apply(a, o), vb(o) ? o : a) : c.apply(a, o));
            }
            var c = a[0], d = a[1], e = a[2], f = a[3], g = a[4], h = a[5], i = 1 & d, j = 2 & d, k = 4 & d, m = 8 & d, n = c;
            return Ic(b, a), b;
        }
        function db(c, d) {
            var e = -1, g = mb(), h = c ? c.length : 0, i = h >= s && g === a, j = [];
            if (i) {
                var l = f(d);
                l ? (g = b, d = l) : i = !1;
            }
            for (;++e < h; ) l = c[e], 0 > g(d, l) && j.push(l);
            return i && k(d), j;
        }
        function eb(a, b, c, d) {
            d = (d || 0) - 1;
            for (var e = a ? a.length : 0, f = []; ++d < e; ) {
                var g = a[d];
                if (g && "object" == typeof g && "number" == typeof g.length && (Jc(g) || qb(g))) {
                    b || (g = eb(g, b, c));
                    var h = -1, i = g.length, j = f.length;
                    for (f.length += i; ++h < i; ) f[j++] = g[h];
                } else c || f.push(g);
            }
            return f;
        }
        function fb(a, b, c, d, e, f) {
            if (c) {
                var g = c(a, b);
                if ("undefined" != typeof g) return !!g;
            }
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            if (a === a && !(a && T[typeof a] || b && T[typeof b])) return !1;
            if (null == a || null == b) return a === b;
            var i = kc.call(a), k = kc.call(b);
            if (i == H && (i = N), k == H && (k = N), i != k) return !1;
            switch (i) {
              case J:
              case K:
                return +a == +b;

              case M:
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

              case O:
              case P:
                return a == fc(b);
            }
            if (k = i == I, !k) {
                var l = rc.call(a, "__wrapped__"), m = rc.call(b, "__wrapped__");
                if (l || m) return fb(l ? a.__wrapped__ : a, m ? b.__wrapped__ : b, c, d, e, f);
                if (i != N) return !1;
                if (i = a.constructor, l = b.constructor, i != l && !(ub(i) && i instanceof i && ub(l) && l instanceof l) && "constructor" in a && "constructor" in b) return !1;
            }
            for (i = !e, e || (e = h()), f || (f = h()), l = e.length; l--; ) if (e[l] == a) return f[l] == b;
            var n = 0, g = !0;
            if (e.push(a), f.push(b), k) {
                if (l = a.length, n = b.length, (g = n == l) || d) for (;n--; ) if (k = l, m = b[n], 
                d) for (;k-- && !(g = fb(a[k], m, c, d, e, f)); ) ; else if (!(g = fb(a[n], m, c, d, e, f))) break;
            } else p(b, function(b, h, i) {
                return rc.call(i, h) ? (n++, g = rc.call(a, h) && fb(a[h], b, c, d, e, f)) : void 0;
            }), g && !d && p(a, function(a, b, c) {
                return rc.call(c, b) ? g = -1 < --n : void 0;
            });
            return e.pop(), f.pop(), i && (j(e), j(f)), g;
        }
        function gb(a, b, c, d, e) {
            (Jc(b) ? Db : o)(b, function(b, f) {
                var g, h, i = b, j = a[f];
                if (b && ((h = Jc(b)) || Pc(b))) {
                    for (i = d.length; i--; ) if (g = d[i] == b) {
                        j = e[i];
                        break;
                    }
                    if (!g) {
                        var k;
                        c && (i = c(j, b), k = "undefined" != typeof i) && (j = i), k || (j = h ? Jc(j) ? j : [] : Pc(j) ? j : {}), 
                        d.push(b), e.push(j), k || gb(j, b, c, d, e);
                    }
                } else c && (i = c(j, b), "undefined" == typeof i && (i = b)), "undefined" != typeof i && (j = i);
                a[f] = j;
            });
        }
        function hb(a, b) {
            return a + oc(Fc() * (b - a + 1));
        }
        function ib(c, d, e) {
            var g = -1, i = mb(), l = c ? c.length : 0, m = [], n = !d && l >= s && i === a, o = e || n ? h() : m;
            for (n && (o = f(o), i = b); ++g < l; ) {
                var p = c[g], q = e ? e(p, g, c) : p;
                (d ? !g || o[o.length - 1] !== q : 0 > i(o, q)) && ((e || n) && o.push(q), m.push(p));
            }
            return n ? (j(o.k), k(o)) : e && j(o), m;
        }
        function jb(a) {
            return function(b, c, d) {
                var e = {};
                c = X.createCallback(c, d, 3), d = -1;
                var f = b ? b.length : 0;
                if ("number" == typeof f) for (;++d < f; ) {
                    var g = b[d];
                    a(e, g, c(g, d, b), b);
                } else o(b, function(b, d, f) {
                    a(e, b, c(b, d, f), f);
                });
                return e;
            };
        }
        function kb(a, b, c, d, e, f) {
            var g = 1 & b, h = 4 & b, i = 16 & b, j = 32 & b;
            if (!(2 & b || ub(a))) throw new gc();
            i && !c.length && (b &= -17, i = c = !1), j && !d.length && (b &= -33, j = d = !1);
            var k = a && a.__bindData__;
            return k && !0 !== k ? (k = l(k), k[2] && (k[2] = l(k[2])), k[3] && (k[3] = l(k[3])), 
            !g || 1 & k[1] || (k[4] = e), !g && 1 & k[1] && (b |= 8), !h || 4 & k[1] || (k[5] = f), 
            i && sc.apply(k[2] || (k[2] = []), c), j && vc.apply(k[3] || (k[3] = []), d), k[1] |= b, 
            kb.apply(null, k)) : (1 == b || 17 === b ? Z : cb)([ a, b, c, d, e, f ]);
        }
        function lb(a) {
            return Lc[a];
        }
        function mb() {
            var b = (b = X.indexOf) === Mb ? a : b;
            return b;
        }
        function nb(a) {
            return "function" == typeof a && lc.test(a);
        }
        function ob(a) {
            var b, c;
            return a && kc.call(a) == N && (b = a.constructor, !ub(b) || b instanceof b) ? (p(a, function(a, b) {
                c = b;
            }), "undefined" == typeof c || rc.call(a, c)) : !1;
        }
        function pb(a) {
            return Mc[a];
        }
        function qb(a) {
            return a && "object" == typeof a && "number" == typeof a.length && kc.call(a) == H || !1;
        }
        function rb(a, b, c) {
            var d = Kc(a), e = d.length;
            for (b = bb(b, c, 3); e-- && (c = d[e], !1 !== b(a[c], c, a)); ) ;
            return a;
        }
        function sb(a) {
            var b = [];
            return p(a, function(a, c) {
                ub(a) && b.push(c);
            }), b.sort();
        }
        function tb(a) {
            for (var b = -1, c = Kc(a), d = c.length, e = {}; ++b < d; ) {
                var f = c[b];
                e[a[f]] = f;
            }
            return e;
        }
        function ub(a) {
            return "function" == typeof a;
        }
        function vb(a) {
            return !(!a || !T[typeof a]);
        }
        function wb(a) {
            return "number" == typeof a || a && "object" == typeof a && kc.call(a) == M || !1;
        }
        function xb(a) {
            return "string" == typeof a || a && "object" == typeof a && kc.call(a) == P || !1;
        }
        function yb(a) {
            for (var b = -1, c = Kc(a), d = c.length, e = Zb(d); ++b < d; ) e[b] = a[c[b]];
            return e;
        }
        function zb(a, b, c) {
            var d = -1, e = mb(), f = a ? a.length : 0, g = !1;
            return c = (0 > c ? Cc(0, f + c) : c) || 0, Jc(a) ? g = -1 < e(a, b, c) : "number" == typeof f ? g = -1 < (xb(a) ? a.indexOf(b, c) : e(a, b, c)) : o(a, function(a) {
                return ++d < c ? void 0 : !(g = a === b);
            }), g;
        }
        function Ab(a, b, c) {
            var d = !0;
            b = X.createCallback(b, c, 3), c = -1;
            var e = a ? a.length : 0;
            if ("number" == typeof e) for (;++c < e && (d = !!b(a[c], c, a)); ) ; else o(a, function(a, c, e) {
                return d = !!b(a, c, e);
            });
            return d;
        }
        function Bb(a, b, c) {
            var d = [];
            b = X.createCallback(b, c, 3), c = -1;
            var e = a ? a.length : 0;
            if ("number" == typeof e) for (;++c < e; ) {
                var f = a[c];
                b(f, c, a) && d.push(f);
            } else o(a, function(a, c, e) {
                b(a, c, e) && d.push(a);
            });
            return d;
        }
        function Cb(a, b, c) {
            b = X.createCallback(b, c, 3), c = -1;
            var d = a ? a.length : 0;
            if ("number" != typeof d) {
                var e;
                return o(a, function(a, c, d) {
                    return b(a, c, d) ? (e = a, !1) : void 0;
                }), e;
            }
            for (;++c < d; ) {
                var f = a[c];
                if (b(f, c, a)) return f;
            }
        }
        function Db(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            if (b = b && "undefined" == typeof c ? b : bb(b, c, 3), "number" == typeof e) for (;++d < e && !1 !== b(a[d], d, a); ) ; else o(a, b);
            return a;
        }
        function Eb(a, b, c) {
            var d = a ? a.length : 0;
            if (b = b && "undefined" == typeof c ? b : bb(b, c, 3), "number" == typeof d) for (;d-- && !1 !== b(a[d], d, a); ) ; else {
                var e = Kc(a), d = e.length;
                o(a, function(a, c, f) {
                    return c = e ? e[--d] : --d, b(f[c], c, f);
                });
            }
            return a;
        }
        function Fb(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            if (b = X.createCallback(b, c, 3), "number" == typeof e) for (var f = Zb(e); ++d < e; ) f[d] = b(a[d], d, a); else f = [], 
            o(a, function(a, c, e) {
                f[++d] = b(a, c, e);
            });
            return f;
        }
        function Gb(a, b, c) {
            var e = -1 / 0, f = e;
            if ("function" != typeof b && c && c[b] === a && (b = null), null == b && Jc(a)) {
                c = -1;
                for (var g = a.length; ++c < g; ) {
                    var h = a[c];
                    h > f && (f = h);
                }
            } else b = null == b && xb(a) ? d : X.createCallback(b, c, 3), Db(a, function(a, c, d) {
                c = b(a, c, d), c > e && (e = c, f = a);
            });
            return f;
        }
        function Hb(a, b, c, d) {
            if (!a) return c;
            var e = 3 > arguments.length;
            b = X.createCallback(b, d, 4);
            var f = -1, g = a.length;
            if ("number" == typeof g) for (e && (c = a[++f]); ++f < g; ) c = b(c, a[f], f, a); else o(a, function(a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f);
            });
            return c;
        }
        function Ib(a, b, c, d) {
            var e = 3 > arguments.length;
            return b = X.createCallback(b, d, 4), Eb(a, function(a, d, f) {
                c = e ? (e = !1, a) : b(c, a, d, f);
            }), c;
        }
        function Jb(a) {
            var b = -1, c = a ? a.length : 0, d = Zb("number" == typeof c ? c : 0);
            return Db(a, function(a) {
                var c = hb(0, ++b);
                d[b] = d[c], d[c] = a;
            }), d;
        }
        function Kb(a, b, c) {
            var d;
            b = X.createCallback(b, c, 3), c = -1;
            var e = a ? a.length : 0;
            if ("number" == typeof e) for (;++c < e && !(d = b(a[c], c, a)); ) ; else o(a, function(a, c, e) {
                return !(d = b(a, c, e));
            });
            return !!d;
        }
        function Lb(a, b, c) {
            var d = 0, e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = -1;
                for (b = X.createCallback(b, c, 3); ++f < e && b(a[f], f, a); ) d++;
            } else if (d = b, null == d || c) return a ? a[0] : n;
            return l(a, 0, Dc(Cc(0, d), e));
        }
        function Mb(b, c, d) {
            if ("number" == typeof d) {
                var e = b ? b.length : 0;
                d = 0 > d ? Cc(0, e + d) : d || 0;
            } else if (d) return d = Ob(b, c), b[d] === c ? d : -1;
            return a(b, c, d);
        }
        function Nb(a, b, c) {
            if ("number" != typeof b && null != b) {
                var d = 0, e = -1, f = a ? a.length : 0;
                for (b = X.createCallback(b, c, 3); ++e < f && b(a[e], e, a); ) d++;
            } else d = null == b || c ? 1 : Cc(0, b);
            return l(a, d);
        }
        function Ob(a, b, c, d) {
            var e = 0, f = a ? a.length : e;
            for (c = c ? X.createCallback(c, d, 1) : Ub, b = c(b); f > e; ) d = e + f >>> 1, 
            c(a[d]) < b ? e = d + 1 : f = d;
            return e;
        }
        function Pb(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null : b, 
            b = !1), null != c && (c = X.createCallback(c, d, 3)), ib(a, b, c);
        }
        function Qb() {
            for (var a = 1 < arguments.length ? arguments : arguments[0], b = -1, c = a ? Gb(Tc(a, "length")) : 0, d = Zb(0 > c ? 0 : c); ++b < c; ) d[b] = Tc(a, b);
            return d;
        }
        function Rb(a, b) {
            var c = -1, d = a ? a.length : 0, e = {};
            for (b || !d || Jc(a[0]) || (b = []); ++c < d; ) {
                var f = a[c];
                b ? e[f] = b[c] : f && (e[f[0]] = f[1]);
            }
            return e;
        }
        function Sb(a, b) {
            return 2 < arguments.length ? kb(a, 17, l(arguments, 2), null, b) : kb(a, 1, null, null, b);
        }
        function Tb(a, b, c) {
            function d() {
                k && nc(k), g = k = l = n, (p || o !== b) && (m = Uc(), h = a.apply(j, f), k || g || (f = j = null));
            }
            function e() {
                var c = b - (Uc() - i);
                c > 0 ? k = tc(e, c) : (g && nc(g), c = l, g = k = l = n, c && (m = Uc(), h = a.apply(j, f), 
                k || g || (f = j = null)));
            }
            var f, g, h, i, j, k, l, m = 0, o = !1, p = !0;
            if (!ub(a)) throw new gc();
            if (b = Cc(0, b) || 0, !0 === c) var q = !0, p = !1; else vb(c) && (q = c.leading, 
            o = "maxWait" in c && (Cc(b, c.maxWait) || 0), p = "trailing" in c ? c.trailing : p);
            return function() {
                if (f = arguments, i = Uc(), j = this, l = p && (k || !q), !1 === o) var c = q && !k; else {
                    g || q || (m = i);
                    var n = o - (i - m), r = 0 >= n;
                    r ? (g && (g = nc(g)), m = i, h = a.apply(j, f)) : g || (g = tc(d, n));
                }
                return r && k ? k = nc(k) : k || b === o || (k = tc(e, b)), c && (r = !0, h = a.apply(j, f)), 
                !r || k || g || (f = j = null), h;
            };
        }
        function Ub(a) {
            return a;
        }
        function Vb(a, b, c) {
            var d = !0, e = b && sb(b);
            b && (c || e.length) || (null == c && (c = b), f = Y, b = a, a = X, e = sb(b)), 
            !1 === c ? d = !1 : vb(c) && "chain" in c && (d = c.chain);
            var f = a, g = ub(f);
            Db(e, function(c) {
                var e = a[c] = b[c];
                g && (f.prototype[c] = function() {
                    var b = this.__chain__, c = this.__wrapped__, g = [ c ];
                    if (sc.apply(g, arguments), g = e.apply(a, g), d || b) {
                        if (c === g && vb(g)) return this;
                        g = new f(g), g.__chain__ = b;
                    }
                    return g;
                });
            });
        }
        function Wb() {}
        function Xb(a) {
            return function(b) {
                return b[a];
            };
        }
        function Yb() {
            return this.__wrapped__;
        }
        c = c ? $.defaults(V.Object(), c, $.pick(V, G)) : V;
        var Zb = c.Array, $b = c.Boolean, _b = c.Date, ac = c.Function, bc = c.Math, cc = c.Number, dc = c.Object, ec = c.RegExp, fc = c.String, gc = c.TypeError, hc = [], ic = dc.prototype, jc = c._, kc = ic.toString, lc = ec("^" + fc(kc).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"), mc = bc.ceil, nc = c.clearTimeout, oc = bc.floor, pc = ac.prototype.toString, qc = nb(qc = dc.getPrototypeOf) && qc, rc = ic.hasOwnProperty, sc = hc.push, tc = c.setTimeout, uc = hc.splice, vc = hc.unshift, wc = function() {
            try {
                var a = {}, b = nb(b = dc.defineProperty) && b, c = b(a, a, a) && b;
            } catch (d) {}
            return c;
        }(), xc = nb(xc = dc.create) && xc, yc = nb(yc = Zb.isArray) && yc, zc = c.isFinite, Ac = c.isNaN, Bc = nb(Bc = dc.keys) && Bc, Cc = bc.max, Dc = bc.min, Ec = c.parseInt, Fc = bc.random, Gc = {};
        Gc[I] = Zb, Gc[J] = $b, Gc[K] = _b, Gc[L] = ac, Gc[N] = dc, Gc[M] = cc, Gc[O] = ec, 
        Gc[P] = fc, Y.prototype = X.prototype;
        var Hc = X.support = {};
        Hc.funcDecomp = !nb(c.a) && E.test(m), Hc.funcNames = "string" == typeof ac.name, 
        X.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: B,
            variable: "",
            imports: {
                _: X
            }
        }, xc || (ab = function() {
            function a() {}
            return function(b) {
                if (vb(b)) {
                    a.prototype = b;
                    var d = new a();
                    a.prototype = null;
                }
                return d || c.Object();
            };
        }());
        var Ic = wc ? function(a, b) {
            S.value = b, wc(a, "__bindData__", S);
        } : Wb, Jc = yc || function(a) {
            return a && "object" == typeof a && "number" == typeof a.length && kc.call(a) == I || !1;
        }, Kc = Bc ? function(a) {
            return vb(a) ? Bc(a) : [];
        } : W, Lc = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }, Mc = tb(Lc), Nc = ec("(" + Kc(Mc).join("|") + ")", "g"), Oc = ec("[" + Kc(Lc).join("") + "]", "g"), Pc = qc ? function(a) {
            if (!a || kc.call(a) != N) return !1;
            var b = a.valueOf, c = nb(b) && (c = qc(b)) && qc(c);
            return c ? a == c || qc(a) == c : ob(a);
        } : ob, Qc = jb(function(a, b, c) {
            rc.call(a, c) ? a[c]++ : a[c] = 1;
        }), Rc = jb(function(a, b, c) {
            (rc.call(a, c) ? a[c] : a[c] = []).push(b);
        }), Sc = jb(function(a, b, c) {
            a[c] = b;
        }), Tc = Fb, Uc = nb(Uc = _b.now) && Uc || function() {
            return new _b().getTime();
        }, Vc = 8 == Ec(u + "08") ? Ec : function(a, b) {
            return Ec(xb(a) ? a.replace(C, "") : a, b || 0);
        };
        return X.after = function(a, b) {
            if (!ub(b)) throw new gc();
            return function() {
                return 1 > --a ? b.apply(this, arguments) : void 0;
            };
        }, X.assign = U, X.at = function(a) {
            for (var b = arguments, c = -1, d = eb(b, !0, !1, 1), b = b[2] && b[2][b[1]] === a ? 1 : d.length, e = Zb(b); ++c < b; ) e[c] = a[d[c]];
            return e;
        }, X.bind = Sb, X.bindAll = function(a) {
            for (var b = 1 < arguments.length ? eb(arguments, !0, !1, 1) : sb(a), c = -1, d = b.length; ++c < d; ) {
                var e = b[c];
                a[e] = kb(a[e], 1, null, null, a);
            }
            return a;
        }, X.bindKey = function(a, b) {
            return 2 < arguments.length ? kb(b, 19, l(arguments, 2), null, a) : kb(b, 3, null, null, a);
        }, X.chain = function(a) {
            return a = new Y(a), a.__chain__ = !0, a;
        }, X.compact = function(a) {
            for (var b = -1, c = a ? a.length : 0, d = []; ++b < c; ) {
                var e = a[b];
                e && d.push(e);
            }
            return d;
        }, X.compose = function() {
            for (var a = arguments, b = a.length; b--; ) if (!ub(a[b])) throw new gc();
            return function() {
                for (var b = arguments, c = a.length; c--; ) b = [ a[c].apply(this, b) ];
                return b[0];
            };
        }, X.constant = function(a) {
            return function() {
                return a;
            };
        }, X.countBy = Qc, X.create = function(a, b) {
            var c = ab(a);
            return b ? U(c, b) : c;
        }, X.createCallback = function(a, b, c) {
            var d = typeof a;
            if (null == a || "function" == d) return bb(a, b, c);
            if ("object" != d) return Xb(a);
            var e = Kc(a), f = e[0], g = a[f];
            return 1 != e.length || g !== g || vb(g) ? function(b) {
                for (var c = e.length, d = !1; c-- && (d = fb(b[e[c]], a[e[c]], null, !0)); ) ;
                return d;
            } : function(a) {
                return a = a[f], g === a && (0 !== g || 1 / g == 1 / a);
            };
        }, X.curry = function(a, b) {
            return b = "number" == typeof b ? b : +b || a.length, kb(a, 4, null, null, null, b);
        }, X.debounce = Tb, X.defaults = t, X.defer = function(a) {
            if (!ub(a)) throw new gc();
            var b = l(arguments, 1);
            return tc(function() {
                a.apply(n, b);
            }, 1);
        }, X.delay = function(a, b) {
            if (!ub(a)) throw new gc();
            var c = l(arguments, 2);
            return tc(function() {
                a.apply(n, c);
            }, b);
        }, X.difference = function(a) {
            return db(a, eb(arguments, !0, !0, 1));
        }, X.filter = Bb, X.flatten = function(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = "function" != typeof b && d && d[b] === a ? null : b, 
            b = !1), null != c && (a = Fb(a, c, d)), eb(a, b);
        }, X.forEach = Db, X.forEachRight = Eb, X.forIn = p, X.forInRight = function(a, b, c) {
            var d = [];
            p(a, function(a, b) {
                d.push(b, a);
            });
            var e = d.length;
            for (b = bb(b, c, 3); e-- && !1 !== b(d[e--], d[e], a); ) ;
            return a;
        }, X.forOwn = o, X.forOwnRight = rb, X.functions = sb, X.groupBy = Rc, X.indexBy = Sc, 
        X.initial = function(a, b, c) {
            var d = 0, e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = X.createCallback(b, c, 3); f-- && b(a[f], f, a); ) d++;
            } else d = null == b || c ? 1 : b || d;
            return l(a, 0, Dc(Cc(0, e - d), e));
        }, X.intersection = function() {
            for (var c = [], d = -1, e = arguments.length, g = h(), i = mb(), l = i === a, m = h(); ++d < e; ) {
                var n = arguments[d];
                (Jc(n) || qb(n)) && (c.push(n), g.push(l && n.length >= s && f(d ? c[d] : m)));
            }
            var l = c[0], o = -1, p = l ? l.length : 0, q = [];
            a: for (;++o < p; ) {
                var r = g[0], n = l[o];
                if (0 > (r ? b(r, n) : i(m, n))) {
                    for (d = e, (r || m).push(n); --d; ) if (r = g[d], 0 > (r ? b(r, n) : i(c[d], n))) continue a;
                    q.push(n);
                }
            }
            for (;e--; ) (r = g[e]) && k(r);
            return j(g), j(m), q;
        }, X.invert = tb, X.invoke = function(a, b) {
            var c = l(arguments, 2), d = -1, e = "function" == typeof b, f = a ? a.length : 0, g = Zb("number" == typeof f ? f : 0);
            return Db(a, function(a) {
                g[++d] = (e ? b : a[b]).apply(a, c);
            }), g;
        }, X.keys = Kc, X.map = Fb, X.mapValues = function(a, b, c) {
            var d = {};
            return b = X.createCallback(b, c, 3), o(a, function(a, c, e) {
                d[c] = b(a, c, e);
            }), d;
        }, X.max = Gb, X.memoize = function(a, b) {
            function c() {
                var d = c.cache, e = b ? b.apply(this, arguments) : r + arguments[0];
                return rc.call(d, e) ? d[e] : d[e] = a.apply(this, arguments);
            }
            if (!ub(a)) throw new gc();
            return c.cache = {}, c;
        }, X.merge = function(a) {
            var b = arguments, c = 2;
            if (!vb(a)) return a;
            if ("number" != typeof b[2] && (c = b.length), c > 3 && "function" == typeof b[c - 2]) var d = bb(b[--c - 1], b[c--], 2); else c > 2 && "function" == typeof b[c - 1] && (d = b[--c]);
            for (var b = l(arguments, 1, c), e = -1, f = h(), g = h(); ++e < c; ) gb(a, b[e], d, f, g);
            return j(f), j(g), a;
        }, X.min = function(a, b, c) {
            var e = 1 / 0, f = e;
            if ("function" != typeof b && c && c[b] === a && (b = null), null == b && Jc(a)) {
                c = -1;
                for (var g = a.length; ++c < g; ) {
                    var h = a[c];
                    f > h && (f = h);
                }
            } else b = null == b && xb(a) ? d : X.createCallback(b, c, 3), Db(a, function(a, c, d) {
                c = b(a, c, d), e > c && (e = c, f = a);
            });
            return f;
        }, X.omit = function(a, b, c) {
            var d = {};
            if ("function" != typeof b) {
                var e = [];
                p(a, function(a, b) {
                    e.push(b);
                });
                for (var e = db(e, eb(arguments, !0, !1, 1)), f = -1, g = e.length; ++f < g; ) {
                    var h = e[f];
                    d[h] = a[h];
                }
            } else b = X.createCallback(b, c, 3), p(a, function(a, c, e) {
                b(a, c, e) || (d[c] = a);
            });
            return d;
        }, X.once = function(a) {
            var b, c;
            if (!ub(a)) throw new gc();
            return function() {
                return b ? c : (b = !0, c = a.apply(this, arguments), a = null, c);
            };
        }, X.pairs = function(a) {
            for (var b = -1, c = Kc(a), d = c.length, e = Zb(d); ++b < d; ) {
                var f = c[b];
                e[b] = [ f, a[f] ];
            }
            return e;
        }, X.partial = function(a) {
            return kb(a, 16, l(arguments, 1));
        }, X.partialRight = function(a) {
            return kb(a, 32, null, l(arguments, 1));
        }, X.pick = function(a, b, c) {
            var d = {};
            if ("function" != typeof b) for (var e = -1, f = eb(arguments, !0, !1, 1), g = vb(a) ? f.length : 0; ++e < g; ) {
                var h = f[e];
                h in a && (d[h] = a[h]);
            } else b = X.createCallback(b, c, 3), p(a, function(a, c, e) {
                b(a, c, e) && (d[c] = a);
            });
            return d;
        }, X.pluck = Tc, X.property = Xb, X.pull = function(a) {
            for (var b = arguments, c = 0, d = b.length, e = a ? a.length : 0; ++c < d; ) for (var f = -1, g = b[c]; ++f < e; ) a[f] === g && (uc.call(a, f--, 1), 
            e--);
            return a;
        }, X.range = function(a, b, c) {
            a = +a || 0, c = "number" == typeof c ? c : +c || 1, null == b && (b = a, a = 0);
            var d = -1;
            b = Cc(0, mc((b - a) / (c || 1)));
            for (var e = Zb(b); ++d < b; ) e[d] = a, a += c;
            return e;
        }, X.reject = function(a, b, c) {
            return b = X.createCallback(b, c, 3), Bb(a, function(a, c, d) {
                return !b(a, c, d);
            });
        }, X.remove = function(a, b, c) {
            var d = -1, e = a ? a.length : 0, f = [];
            for (b = X.createCallback(b, c, 3); ++d < e; ) c = a[d], b(c, d, a) && (f.push(c), 
            uc.call(a, d--, 1), e--);
            return f;
        }, X.rest = Nb, X.shuffle = Jb, X.sortBy = function(a, b, c) {
            var d = -1, f = Jc(b), g = a ? a.length : 0, l = Zb("number" == typeof g ? g : 0);
            for (f || (b = X.createCallback(b, c, 3)), Db(a, function(a, c, e) {
                var g = l[++d] = i();
                f ? g.m = Fb(b, function(b) {
                    return a[b];
                }) : (g.m = h())[0] = b(a, c, e), g.n = d, g.o = a;
            }), g = l.length, l.sort(e); g--; ) a = l[g], l[g] = a.o, f || j(a.m), k(a);
            return l;
        }, X.tap = function(a, b) {
            return b(a), a;
        }, X.throttle = function(a, b, c) {
            var d = !0, e = !0;
            if (!ub(a)) throw new gc();
            return !1 === c ? d = !1 : vb(c) && (d = "leading" in c ? c.leading : d, e = "trailing" in c ? c.trailing : e), 
            R.leading = d, R.maxWait = b, R.trailing = e, Tb(a, b, R);
        }, X.times = function(a, b, c) {
            a = -1 < (a = +a) ? a : 0;
            var d = -1, e = Zb(a);
            for (b = bb(b, c, 1); ++d < a; ) e[d] = b(d);
            return e;
        }, X.toArray = function(a) {
            return a && "number" == typeof a.length ? l(a) : yb(a);
        }, X.transform = function(a, b, c, d) {
            var e = Jc(a);
            if (null == c) if (e) c = []; else {
                var f = a && a.constructor;
                c = ab(f && f.prototype);
            }
            return b && (b = X.createCallback(b, d, 4), (e ? Db : o)(a, function(a, d, e) {
                return b(c, a, d, e);
            })), c;
        }, X.union = function() {
            return ib(eb(arguments, !0, !0));
        }, X.uniq = Pb, X.values = yb, X.where = Bb, X.without = function(a) {
            return db(a, l(arguments, 1));
        }, X.wrap = function(a, b) {
            return kb(b, 16, [ a ]);
        }, X.xor = function() {
            for (var a = -1, b = arguments.length; ++a < b; ) {
                var c = arguments[a];
                if (Jc(c) || qb(c)) var d = d ? ib(db(d, c).concat(db(c, d))) : c;
            }
            return d || [];
        }, X.zip = Qb, X.zipObject = Rb, X.collect = Fb, X.drop = Nb, X.each = Db, X.eachRight = Eb, 
        X.extend = U, X.methods = sb, X.object = Rb, X.select = Bb, X.tail = Nb, X.unique = Pb, 
        X.unzip = Qb, Vb(X), X.clone = function(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c, c = b, b = !1), _(a, b, "function" == typeof c && bb(c, d, 1));
        }, X.cloneDeep = function(a, b, c) {
            return _(a, !0, "function" == typeof b && bb(b, c, 1));
        }, X.contains = zb, X.escape = function(a) {
            return null == a ? "" : fc(a).replace(Oc, lb);
        }, X.every = Ab, X.find = Cb, X.findIndex = function(a, b, c) {
            var d = -1, e = a ? a.length : 0;
            for (b = X.createCallback(b, c, 3); ++d < e; ) if (b(a[d], d, a)) return d;
            return -1;
        }, X.findKey = function(a, b, c) {
            var d;
            return b = X.createCallback(b, c, 3), o(a, function(a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0;
            }), d;
        }, X.findLast = function(a, b, c) {
            var d;
            return b = X.createCallback(b, c, 3), Eb(a, function(a, c, e) {
                return b(a, c, e) ? (d = a, !1) : void 0;
            }), d;
        }, X.findLastIndex = function(a, b, c) {
            var d = a ? a.length : 0;
            for (b = X.createCallback(b, c, 3); d--; ) if (b(a[d], d, a)) return d;
            return -1;
        }, X.findLastKey = function(a, b, c) {
            var d;
            return b = X.createCallback(b, c, 3), rb(a, function(a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0;
            }), d;
        }, X.has = function(a, b) {
            return a ? rc.call(a, b) : !1;
        }, X.identity = Ub, X.indexOf = Mb, X.isArguments = qb, X.isArray = Jc, X.isBoolean = function(a) {
            return !0 === a || !1 === a || a && "object" == typeof a && kc.call(a) == J || !1;
        }, X.isDate = function(a) {
            return a && "object" == typeof a && kc.call(a) == K || !1;
        }, X.isElement = function(a) {
            return a && 1 === a.nodeType || !1;
        }, X.isEmpty = function(a) {
            var b = !0;
            if (!a) return b;
            var c = kc.call(a), d = a.length;
            return c == I || c == P || c == H || c == N && "number" == typeof d && ub(a.splice) ? !d : (o(a, function() {
                return b = !1;
            }), b);
        }, X.isEqual = function(a, b, c, d) {
            return fb(a, b, "function" == typeof c && bb(c, d, 2));
        }, X.isFinite = function(a) {
            return zc(a) && !Ac(parseFloat(a));
        }, X.isFunction = ub, X.isNaN = function(a) {
            return wb(a) && a != +a;
        }, X.isNull = function(a) {
            return null === a;
        }, X.isNumber = wb, X.isObject = vb, X.isPlainObject = Pc, X.isRegExp = function(a) {
            return a && "object" == typeof a && kc.call(a) == O || !1;
        }, X.isString = xb, X.isUndefined = function(a) {
            return "undefined" == typeof a;
        }, X.lastIndexOf = function(a, b, c) {
            var d = a ? a.length : 0;
            for ("number" == typeof c && (d = (0 > c ? Cc(0, d + c) : Dc(c, d - 1)) + 1); d--; ) if (a[d] === b) return d;
            return -1;
        }, X.mixin = Vb, X.noConflict = function() {
            return c._ = jc, this;
        }, X.noop = Wb, X.now = Uc, X.parseInt = Vc, X.random = function(a, b, c) {
            var d = null == a, e = null == b;
            return null == c && ("boolean" == typeof a && e ? (c = a, a = 1) : e || "boolean" != typeof b || (c = b, 
            e = !0)), d && e && (b = 1), a = +a || 0, e ? (b = a, a = 0) : b = +b || 0, c || a % 1 || b % 1 ? (c = Fc(), 
            Dc(a + c * (b - a + parseFloat("1e-" + ((c + "").length - 1))), b)) : hb(a, b);
        }, X.reduce = Hb, X.reduceRight = Ib, X.result = function(a, b) {
            if (a) {
                var c = a[b];
                return ub(c) ? a[b]() : c;
            }
        }, X.runInContext = m, X.size = function(a) {
            var b = a ? a.length : 0;
            return "number" == typeof b ? b : Kc(a).length;
        }, X.some = Kb, X.sortedIndex = Ob, X.template = function(a, b, c) {
            var d = X.templateSettings;
            a = fc(a || ""), c = t({}, c, d);
            var e, f = t({}, c.imports, d.imports), d = Kc(f), f = yb(f), h = 0, i = c.interpolate || D, j = "__p+='", i = ec((c.escape || D).source + "|" + i.source + "|" + (i === B ? y : D).source + "|" + (c.evaluate || D).source + "|$", "g");
            a.replace(i, function(b, c, d, f, i, k) {
                return d || (d = f), j += a.slice(h, k).replace(F, g), c && (j += "'+__e(" + c + ")+'"), 
                i && (e = !0, j += "';" + i + ";\n__p+='"), d && (j += "'+((__t=(" + d + "))==null?'':__t)+'"), 
                h = k + b.length, b;
            }), j += "';", i = c = c.variable, i || (c = "obj", j = "with(" + c + "){" + j + "}"), 
            j = (e ? j.replace(v, "") : j).replace(w, "$1").replace(x, "$1;"), j = "function(" + c + "){" + (i ? "" : c + "||(" + c + "={});") + "var __t,__p='',__e=_.escape" + (e ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + j + "return __p}";
            try {
                var k = ac(d, "return " + j).apply(n, f);
            } catch (l) {
                throw l.source = j, l;
            }
            return b ? k(b) : (k.source = j, k);
        }, X.unescape = function(a) {
            return null == a ? "" : fc(a).replace(Nc, pb);
        }, X.uniqueId = function(a) {
            var b = ++q;
            return fc(null == a ? "" : a) + b;
        }, X.all = Ab, X.any = Kb, X.detect = Cb, X.findWhere = Cb, X.foldl = Hb, X.foldr = Ib, 
        X.include = zb, X.inject = Hb, Vb(function() {
            var a = {};
            return o(X, function(b, c) {
                X.prototype[c] || (a[c] = b);
            }), a;
        }(), !1), X.first = Lb, X.last = function(a, b, c) {
            var d = 0, e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = X.createCallback(b, c, 3); f-- && b(a[f], f, a); ) d++;
            } else if (d = b, null == d || c) return a ? a[e - 1] : n;
            return l(a, Cc(0, e - d));
        }, X.sample = function(a, b, c) {
            return a && "number" != typeof a.length && (a = yb(a)), null == b || c ? a ? a[hb(0, a.length - 1)] : n : (a = Jb(a), 
            a.length = Dc(Cc(0, b), a.length), a);
        }, X.take = Lb, X.head = Lb, o(X, function(a, b) {
            var c = "sample" !== b;
            X.prototype[b] || (X.prototype[b] = function(b, d) {
                var e = this.__chain__, f = a(this.__wrapped__, b, d);
                return e || null != b && (!d || c && "function" == typeof b) ? new Y(f, e) : f;
            });
        }), X.VERSION = "2.4.1", X.prototype.chain = function() {
            return this.__chain__ = !0, this;
        }, X.prototype.toString = function() {
            return fc(this.__wrapped__);
        }, X.prototype.value = Yb, X.prototype.valueOf = Yb, Db([ "join", "pop", "shift" ], function(a) {
            var b = hc[a];
            X.prototype[a] = function() {
                var a = this.__chain__, c = b.apply(this.__wrapped__, arguments);
                return a ? new Y(c, a) : c;
            };
        }), Db([ "push", "reverse", "sort", "unshift" ], function(a) {
            var b = hc[a];
            X.prototype[a] = function() {
                return b.apply(this.__wrapped__, arguments), this;
            };
        }), Db([ "concat", "slice", "splice" ], function(a) {
            var b = hc[a];
            X.prototype[a] = function() {
                return new Y(b.apply(this.__wrapped__, arguments), this.__chain__);
            };
        }), X;
    }
    var n, o = [], p = [], q = 0, r = +new Date() + "", s = 75, t = 40, u = " 	\f ﻿\n\r\u2028\u2029 ᠎             　", v = /\b__p\+='';/g, w = /\b(__p\+=)''\+/g, x = /(__e\(.*?\)|\b__t\))\+'';/g, y = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, z = /\w*$/, A = /^\s*function[ \n\r\t]+\w/, B = /<%=([\s\S]+?)%>/g, C = RegExp("^[" + u + "]*0+(?=.$)"), D = /($^)/, E = /\bthis\b/, F = /['\n\r\t\u2028\u2029\\]/g, G = "Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "), H = "[object Arguments]", I = "[object Array]", J = "[object Boolean]", K = "[object Date]", L = "[object Function]", M = "[object Number]", N = "[object Object]", O = "[object RegExp]", P = "[object String]", Q = {};
    Q[L] = !1, Q[H] = Q[I] = Q[J] = Q[K] = Q[M] = Q[N] = Q[O] = Q[P] = !0;
    var R = {
        leading: !1,
        maxWait: 0,
        trailing: !1
    }, S = {
        configurable: !1,
        enumerable: !1,
        value: null,
        writable: !1
    }, T = {
        "boolean": !1,
        "function": !0,
        object: !0,
        number: !1,
        string: !1,
        undefined: !1
    }, U = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "	": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, V = T[typeof window] && window || this, W = T[typeof exports] && exports && !exports.nodeType && exports, X = T[typeof module] && module && !module.nodeType && module, Y = X && X.exports === W && W, Z = T[typeof global] && global;
    !Z || Z.global !== Z && Z.window !== Z || (V = Z);
    var $ = m();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (V._ = $, 
    define(function() {
        return $;
    })) : W && X ? Y ? (X.exports = $)._ = $ : W._ = $ : V._ = $;
}.call(this), function(a) {
    a(jQuery);
}(function(a) {
    function b() {
        Metronic.init(), Layout.init(), toastr.options = {
            closeButton: !0,
            debug: !1,
            positionClass: "toast-top-center",
            showDuration: "1000",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }, a(".noclick").on("click", function(a) {
            a.preventDefault();
        }), a(".page-content.readme-page table").each(function() {
            var b = a(this);
            b.hasClass("table") || b.addClass("table table-bordered");
        });
    }
    a(function() {
        b();
    });
});