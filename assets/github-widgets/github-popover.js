/*
Github Tooltip jquery widget
http://robinradic.github.io/github-jquery-widgets

Copyright © 2014 Robin Radic - MIT License (http://radic.mit-license.org)
*/
(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['github.popover.commits'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "            <li class=\""
    + escapeExpression(((helpers.evenOdd || (depth0 && depth0.evenOdd) || helperMissing).call(depth0, (data && data.index), "in", "out", {"name":"evenOdd","hash":{},"data":data})))
    + "\">\n                <img class=\"avatar\" src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.avatar_url : stack1), depth0))
    + "\" alt=\"Avatar\" />\n                <div class=\"commit-message\">\n                    <span class=\"arrow\"></span>\n                    <a href=\"#\" class=\"commit-author\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.commit : depth0)) != null ? stack1.author : stack1)) != null ? stack1.name : stack1), depth0))
    + "</a>\n                    <span class=\"pull-right\">\n                    <span class=\"label label-success\">+"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.additions : stack1), depth0))
    + "</span>\n                    <span class=\"label label-danger\">-"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.stats : depth0)) != null ? stack1.deletions : stack1), depth0))
    + "</span>\n                        </span>\n                    <br>\n                    <span class=\"commit-body\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.commit : depth0)) != null ? stack1.message : stack1), depth0))
    + "</span>\n                </div>\n            </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<script type=\"text/x-handlebars-template\">\n    <div class=\"github-events-commits-popover\">\n        <div>\n            <h4>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.actor : stack1)) != null ? stack1.login : stack1), depth0))
    + "</h4>\n            <span class=\"commit-desc\"> Pushed "
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.payload : stack1)) != null ? stack1.size : stack1), depth0))
    + " commits. </span>\n            <div class=\"commit-info\">\n                <i class=\"fa fa-github\"></i>\n                <span>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.repo : stack1)) != null ? stack1.name : stack1), depth0))
    + "</span>\n            </div>\n            <div class=\"commit-info\">\n                <i class=\"fa fa-code-fork\"></i>\n                <span>"
    + escapeExpression(((helpers.branchName || (depth0 && depth0.branchName) || helperMissing).call(depth0, (depth0 != null ? depth0.event : depth0), {"name":"branchName","hash":{},"data":data})))
    + "</span>\n            </div>\n        </div>\n\n        <ul class=\"commit-commits\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.commits : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "        </ul>\n    </div>\n</script>\n";
},"useData":true});
templates['github.popover'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "            <div class=\"profile\">\n                <img src=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.avatar_url : stack1), depth0))
    + "\" class=\"avatar\">\n                <a href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.html_url : stack1), depth0))
    + "\" class=\"name\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a>\n\n                <div class=\"followMe\">\n                    <a href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.html_url : stack1), depth0))
    + "\" class=\"follow-button\">Follow @"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.login : stack1), depth0))
    + "</a>\n                    <span class=\"followers\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.followers : stack1), depth0))
    + "</span>\n                </div>\n            </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, buffer = "            <div class=\"languages\">\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.languagesHeaderText : stack1), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n                <table class=\"languages-list\">\n                    <thead>\n                    <tr>\n                        <th>Language</th>\n                        <th>Lines of code</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.languages : depth0), {"name":"each","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "                    </tbody>\n                </table>\n            </div>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<span class=\"header\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.languagesHeaderText : stack1), depth0))
    + "</span>";
},"6":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                        <tr>\n                            <td>"
    + escapeExpression(((helpers.arrayIndex || (depth0 && depth0.arrayIndex) || helperMissing).call(depth0, depth0, 0, {"name":"arrayIndex","hash":{},"data":data})))
    + "</td>\n                            <td>\n                                <small>"
    + escapeExpression(((helpers.arrayIndex || (depth0 && depth0.arrayIndex) || helperMissing).call(depth0, depth0, 1, {"name":"arrayIndex","hash":{},"data":data})))
    + "</small>\n                            </td>\n                        </tr>\n";
},"8":function(depth0,helpers,partials,data) {
  var stack1, buffer = "            <div class=\"repos\">\n                ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.repositoriesHeaderText : stack1), {"name":"if","hash":{},"fn":this.program(9, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.repositories : depth0), {"name":"each","hash":{},"fn":this.program(11, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\n";
},"9":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "<span class=\"header\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.repositoriesHeaderText : stack1), depth0))
    + "</span>";
},"11":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "                    <a href=\""
    + escapeExpression(((helper = (helper = helpers.html_url || (depth0 != null ? depth0.html_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"html_url","hash":{},"data":data}) : helper)))
    + "\" class=\"repo-link\" data-repository=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\" title=\""
    + escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"description","hash":{},"data":data}) : helper)))
    + "\">\n                        <span class=\"repo-name\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</span><span class=\"updated\">Updated: "
    + escapeExpression(((helper = (helper = helpers.updated_at_formatted || (depth0 != null ? depth0.updated_at_formatted : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"updated_at_formatted","hash":{},"data":data}) : helper)))
    + "</span><span class=\"star\">"
    + escapeExpression(((helper = (helper = helpers.stargazers_count || (depth0 != null ? depth0.stargazers_count : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"stargazers_count","hash":{},"data":data}) : helper)))
    + "</span>\n                    </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<script type=\"text/x-handlebars-template\">\n    <div data-username=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.login : stack1), depth0))
    + "\" class=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.className : stack1), depth0))
    + "\">\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.showProfile : stack1), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.showLanguages : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.options : depth0)) != null ? stack1.showRepositories : stack1), {"name":"if","hash":{},"fn":this.program(8, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</script>\n";
},"useData":true});
templates['github.popover.user'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"profile-usertitle-job\">"
    + escapeExpression(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"company","hash":{},"data":data}) : helper)))
    + "</div>";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"profile-usertitle-job\">"
    + escapeExpression(((helper = (helper = helpers.loctation || (depth0 != null ? depth0.loctation : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"loctation","hash":{},"data":data}) : helper)))
    + "</div>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<script type=\"text/x-handlebars-template\">\n    <div class=\"github-popover-user\">\n        <div class=\"profile-userpic\">\n            <img src=\""
    + escapeExpression(((helper = (helper = helpers.avatar_url || (depth0 != null ? depth0.avatar_url : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"avatar_url","hash":{},"data":data}) : helper)))
    + "\" class=\"img-responsive\" alt=\"\">\n        </div>\n        <div class=\"profile-usertitle\">\n            <div class=\"profile-usertitle-name\">\n                "
    + escapeExpression(((helpers['default'] || (depth0 && depth0['default']) || helperMissing).call(depth0, (depth0 != null ? depth0.name : depth0), (depth0 != null ? depth0.login : depth0), {"name":"default","hash":{},"data":data})))
    + "\n            </div>\n\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.company : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n\n            ";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.location : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n\n        </div>\n        <div class=\"profile-userbuttons\">\n            <span class=\"label label-info\"> Click for dropdown menu </span>\n        </div>\n    </div>\n</script>\n\n";
},"useData":true});
})();
;
/** @fileoverview githubPopover - A jQuery plugin
 * Highly customizable options. Multiple ways to build and include into your project.
 *
 *
 * @author Robin Radic
 * @copyright Robin Radic 2014
 * @license MIT License
 * @link https://github.com/robinradic/github-jquery-widgets
 * @link http://radic.mit-license.org
 * @version 0.0.1
 * @summary A jQuery plugin
 */
(function (factory) {

    factory(jQuery, radic);

}(function ($, R) {
    /**
     * @namespace radic
     * @namespace radic.githubPopover
     */
    $.widget('radic.githubPopover', $.github.widget, /** @lends radic.githubPopover */ {
        version: '0.0.1',

        options: {
            type: null,
            bindPopover: function ($el, options) {
                return $el.popover(options);
            },
            popover: {
                html: true,
                trigger: 'focus',
                container: 'body',
                placement: 'right',
                template: '<div class="popover popover-github" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            },
            event: {},
            user: {},
            repo: {}
        },

        _data: {},
        _types: ['event', 'repo', 'user'],

        refresh: function () {
            var self = this;
            self.data = {};
            self._trigger('refresh');
            self.element.html('');
            self._spin();

            self._getData(function () {
                self._spin(false);
                self.repaint();
                self._trigger('refreshed');
                R.github.async(true);
            });
        },

        repaint: function () {
            var self = this;
            self._trigger('repaint');
            self.element.html('');
            var $template = self._compile(self.options.template, $.extend({options: self.options}, self._data));
            self.element.html($template);
            self._trigger('repainted');
        },

        _create: function () {
             if (!R.isString(this.options.type) || this._types.indexOf(this.options.type) === -1) {
                console.error('githubPopover requires a valid type (' + this._types.join(', ') + '). "');
                return;
            }
            var fn = this['_popover_' + this.options.type]()
        },

        _bindPopover: function ($el, options) {
            options = _.extend(options, this.options.popover, {
                content: function () {
                    /*var eventId = $(this).data('github-event');
                     var $widget = $(self).githubEvents('instance');
                     var event = $widget.getEvent(eventId).raw;
                     var commits = [];
                     var repoSplit = function(repoName, give){
                     return repoName.replace(/([\w-]*)\/([\w-]*)/, give === 'owner' ? '$1' : '$2');
                     };

                     R.github.async(false);
                     $.each(event.payload.commits, function(i, commit){
                     if(i > 5) return;
                     commits.push(R.github.repos.commitsSha(repoSplit(event.repo.name, 'owner'), repoSplit(event.repo.name), commit.sha).data);
                     });
                     R.github.async(true);

                     console.log('commits popover', commits);
                     return $widget._compile('github.events.commits.popover', {event: event, commits: commits });*/
                }
            });
            return $el.popover(options);
        },

        _popover_user: function () {
            var self = this;

            this.options.bindPopover(this.element, {

                html: true,
                content: function(){
                    R.github.async(false);
                    var login = self.element.data('github-user');
                    var user = R.github.users(login);
                    console.log('user', user.data);
                    R.github.async(true);
                    var compiled = self._compile('github.popover.user', user.data);
                    console.log('compiled', compiled[0].outerHTML)
                    return compiled[0].outerHTML;
                }
            })

        },

        _destroy: function () {
            this.element.html('');
            this._trigger('destroyed', null);
        }
    });


    $.radic.githubPopover.redo = function(){
        $('*[data-github-popover]').each(function () {
            var $this = $(this);
            var type = $this.data('github-popover');
            console.log('popoveah');
            $this.githubPopover({
                type: type
            });
        });
    };

    $(function() {
        $.radic.githubPopover.redo();
    });

}));
