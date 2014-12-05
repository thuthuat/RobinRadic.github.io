/**
 * Copyright 2014 Robin Radic - All rights reserved.
 */
(function (factory) {
    factory(jQuery);
}(function ($) {


    function createActorLink(actor, options) {
        options = _.merge({
            avatar: false,
            icon: true,
            popover: true,
            modal: true
        }, options);
        var str = '';
        if (options.avatar === true) str += '<img src="' + actor.avatar_url + '">';
        str += '<a href="https://github.com/' + actor.login + '" target="_blank" class="btn btn-xs btn-primary"';
        if (options.popover === true) str += ' data-github-user="' + actor.login + '"';
        str += '>';
        if (options.icon === true) str += '<i class="fa fa-user"></i> ';
        str += actor.login + '</a> ';
        return str;
    }

    function createUserLink(user, options) {
        options = _.merge({
            avatar: false,
            icon: true,
            popover: true,
            modal: true
        }, options);
        return createActorLink(user, options);
    }

    function createIssuesLink(issue, options) {
        options = _.merge({
            avatar: true,
            popover: true,
            createUserLink: true
        }, options);
        var str = '';
        str += ' <a href="https://github.com/' + issue.html_url + '" title="' + issue.title + '" data-github-issue="' + issue.id + '" target="_blank" class="btn btn-xs yellow">';
        str += 'Issue ' + issue.number;
        str += '</a>';
        if(options.createUserLink) str += '<span class="label label-success">@</span>' + createUserLink(issue.user);
        return str;
    }

    function createRepoLink(repo, options) {
        options = _.merge({
            avatar: true,
            popover: true
        }, options);

        return '<a href="https://github.com/' + repo.name + '" target="_blank">' + repo.name + '</a>';
    }

    $.widget('radic.githubEvents', {
        version: '0.0.1',

        options: {
            username: '',
            useSpinner: true,
            max: 60,
            template: {
                title: 'Recent events'
            },
            selectors: {
                template: 'script[data-template-id="github-events"]',
                modalContainer: '#github-events-modal',
                modalTemplate: 'script[data-template-id="github-events-modal"]',
                user: '*[data-github-user]'
            },
            output: {
                template: {
                    title: 'Recent events',
                    height: 300
                },
                events: {
                    default: {
                        icon: 'fa fa-info',
                        text: 'A github event has been triggered',
                        iconColor: 'default',
                        link: false
                    },
                    CommitCommentEvent: {
                        icon: 'fa fa-edit',
                        text: 'New comment on a commit'
                    },
                    CreateEvent: {
                        icon: 'fa fa-plus',
                        iconColor: 'success',
                        text: 'A new repository, branch or tag has been created'
                    },
                    DeleteEvent: {
                        icon: 'fa fa-trash',
                        iconColor: 'default',
                        text: 'A branch or tag has been deleted'
                    },
                    DeploymentEvent: {
                        icon: 'fa fa-',
                        iconColor: 'default',
                        text: ''
                    },
                    DeploymentStatusEvent: {
                        icon: 'fa fa-',
                        iconColor: 'default',
                        text: ''
                    },
                    DownloadEvent: {
                        icon: 'fa fa-cloud-download',
                        iconColor: 'default',
                        text: 'A new download has been created'
                    },
                    FollowEvent: {
                        icon: 'fa fa-bullhorn',
                        iconColor: 'default',
                        text: 'A user started following me'
                    },
                    ForkEvent: {
                        icon: 'fa fa-code-fork',
                        iconColor: 'default',
                        text: 'A repository was forked'
                    },
                    ForkApplyEvent: {
                        icon: 'fa fa-code-fork',
                        iconColor: 'default',
                        text: ''
                    },
                    GistEvent: {
                        icon: 'fa fa-git',
                        iconColor: 'default',
                        text: 'A gist has been created or updated'
                    },
                    GollumEvent: {
                        icon: 'fa fa-git',
                        iconColor: 'default',
                        text: 'A wiki page has been created or updated'
                    },
                    IssueCommentEvent: {
                        icon: 'fa fa-comment-o',
                        iconColor: 'info',
                        text: 'An issue received a new comment'
                    },
                    IssuesEvent: {
                        icon: 'fa fa-exclamation-triangle',
                        iconColor: 'warning',
                        text: function (event) {
                            var action = event.payload.action;
                            action = action === 'started' ? 'starred' : action;
                            return createActorLink(event.actor) + ' ' + action + ' ' + createIssuesLink(event.payload.issue);
                        }
                    },
                    MemberEvent: {
                        icon: 'fa fa-sitemap',
                        iconColor: 'default',
                        text: 'A user is added as collaborator to a repository'
                    },
                    PageBuildEvent: {
                        icon: 'fa fa-file-o',
                        iconColor: 'default',
                        text: ''
                    },
                    PublicEvent: {
                        icon: 'fa fa-users',
                        iconColor: 'default',
                        text: ''
                    },
                    PullRequestEvent: {
                        icon: 'fa fa-sort-desc',
                        iconColor: 'default',
                        text: ''
                    },
                    PullRequestReviewCommentEvent: {
                        icon: 'fa fa-random',
                        iconColor: 'default',
                        text: ''
                    },
                    PushEvent: {
                        icon: 'fa fa-cloud-upload',
                        text: function (event) {
                            return createActorLink(event.actor) + ' Pushed to ' + createRepoLink(event.repo);
                        },
                        iconColor: 'info'
                    },
                    ReleaseEvent: {
                        icon: 'fa fa-chain-broken',
                        text: 'A new release has been published',
                        iconColor: 'default'
                    },
                    StatusEvent: {
                        icon: 'fa fa-info',
                        text: 'The status of a Git commit has changed',
                        iconColor: 'default'
                    },
                    TeamAddEvent: {
                        icon: 'fa fa-plus',
                        text: 'A user has been added to the team',
                        iconColor: 'default'
                    },
                    WatchEvent: {
                        icon: 'fa fa-star',
                        text: function (event) {
                            var action = event.payload.action;
                            action = action === 'started' ? 'starred' : action;
                            return createActorLink(event.actor) + ' ' + action + ' ' + createRepoLink(event.repo);
                        },
                        iconColor: 'warning'
                    }
                }
            }
        },

        _create: function () {
            var self = this;
            self.__cache = {
                users: {},
                repos: {},
                events: {}
            };

            this.$widget = null;
            if (this.options.useSpinner === true) {
                this.element.spin();
            }

            // Create a seperate copy of all event triggers and merge the defaults
            self.__events = {};
            $.each(this.options.output.events, function (type, event) {
                if (type === 'default') return;
                console.log(event, type);
                self.__events[type] = _.merge(_.cloneDeep(self.options.output.events.default), event);
            });

            self._fetchEventData(function (data) {
                if (self.options.useSpinner === true) {
                    self.element.spin(false);
                }

                console.log(data);
                var templateHTML = $(self.options.selectors.template).html();
                var template = jQuery.template(templateHTML);
                $.extend(data, self.options.output.template);
                console.log('data after extend', data, self.options.output.template);
                var $widget = $(template(data));
                self.element.append($widget);
                self._bindAll();
            });
        },

        _bindAll: function () {
            var self = this;
            var sel = this.options.selectors;

            this.element.find(sel.user).popover({
                html: true,
                trigger: 'manual',
                container: 'body',
                content: function () {
                    return self._popoverUser($(this).data('github-user'));
                }
            }).hover(function (e) {
                e.preventDefault();
                $(this).popover('toggle');
            });

            this.element.find('*[data-github-issue]').tooltip({ container: 'body' });
        },

        _fetchEventData: function (callback) {
            var self = this;
            $.github.users.events(this.options.username, 0, this.options.max, function (events) {
                var eventData = [];
                for (var i = 0; i < events.length; i++) {
                    var event = self._getProcessedEvent(events[i]);
                    eventData.push(event);
                    self.__cache.events[eventData.id] = event;
                }
                callback({
                    events: eventData
                });
            });
        },

        _getProcessedEvent: function (eventData) {
            var self = this;
            var event = self.__events[eventData.type];
            if (_.isFunction(event.text)) {
                event.text = event.text(eventData);
            }
            event.id = eventData.id;
            event.raw = eventData;
            event.timeAgo = moment(eventData.created_at).fromNow(true);
            return event;
        },

        _popoverUser: function (username) {
            var self = this;

            if (_.isUndefined(self.__cache.users[username])) {
                self.__cache.users[username] = JSON.parse($.github.syncRequest('/users/' + username));
            }

            var user = self.__cache.users[username];

            return self._getTemplate('github-events-user-popover', {
                user: user, isset: function (val) {
                    if (_.isUndefined(val)) {
                        return false;
                    }
                    if (_.isString(val)) {
                        return val.length > 0
                    }
                    return true;
                }
            });
        },

        _getTemplate: function (templateId, data) {
            var templateHTML = $('script[data-template-id="' + templateId + '"]').html();
            var template = jQuery.template(templateHTML);
            console.log('get template: data:', data);
            return template(data);
        },


        _createModal: function () {

        },

        _showModal: function (modalType, event) {
            switch (modalType) {
                case "user":

                    break;

                case "repository":

                    break;
            }
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
