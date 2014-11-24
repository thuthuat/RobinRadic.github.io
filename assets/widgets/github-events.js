(function (factory) {

    factory(jQuery);

}(function ($) {


    $.widget('radic.githubEvents', {
        version: '0.0.1',

        options: {
            username: '',
            template: {
                title: 'Recent events'
            },
            templateDataSelector: 'script[data-template-id="github-events"]',
        },

        _create: function () {
            var self = this;
            this.$pBody = this.element.find('.portlet-body');
            this.element.spin();
            self._getData(function (data) {
                self.element.spin(false);
                console.log(data);
                var templateHTML = $('script[data-template-id="github-events"]').html();
                var template = jQuery.template(templateHTML);
                console.log('pre temp data', data);
                $.extend(data, self.options.template);
                var $widget = $(template(data));
                self.element.append($widget);

            });
        },

// _getData, _getDataTopLanguages, _getDataTopRepos, _combineData

        _getData: function (callback) {
            var self = this;
            var username = this.options.username;
            $.github.users.events(username, function (eventData) {
                console.log('fetched data ', eventData);
                var data = {};
                data.events = self._filterData(eventData);
                callback(data);
            });
        },


        _filterData: function (ed) {
            var data = [];
            for (var i = 0; i < ed.length; i++) {
                var event = this._eventToOutput(ed[i]);
                event.raw = ed[i];
                event.timeAgo = moment(ed[i].created_at).fromNow(true)
                data.push(event);
            }
            return data;
        },


        _eventToOutput: function(event){
            var events = {
                CommitCommentEvent: {
                    icon: 'fa fa-edit',
                    iconColor: 'default',
                    text: 'New comment on a commit',
                    link: false
                },
                CreateEvent: {
                    icon: 'fa fa-plus',
                    iconColor: 'success',
                    text: 'A new repository, branch or tag has been created',
                    link: false
                },
                DeleteEvent: {
                    icon: 'fa fa-trash',
                    iconColor: 'default',
                    text: 'A branch or tag has been deleted',
                    link: false
                },
                DeploymentEvent: {
                    icon: 'fa fa-',
                    iconColor: 'default',
                    text: '',
                    link: false
                },
                DeploymentStatusEvent: {
                    icon: 'fa fa-',
                    iconColor: 'default',
                    text: '',
                    link: false
                },
                DownloadEvent: {
                    icon: 'fa fa-cloud-download',
                    iconColor: 'default',
                    text: 'A new download has been created',
                    link: false
                },
                FollowEvent: {
                    icon: 'fa fa-bullhorn',
                    iconColor: 'default',
                    text: 'A user started following me',
                    link: false
                },
                ForkEvent: {
                    icon: 'fa fa-code-fork',
                    iconColor: 'default',
                    text: 'A repository was forked',
                    link: false
                },
                ForkApplyEvent: {
                    icon: 'fa fa-code-fork',
                    iconColor: 'default',
                    text: '',
                    link: false
                },
                GistEvent: {
                    icon: 'fa fa-git',
                    iconColor: 'default',
                    text: 'A gist has been created or updated',
                    link: false
                },
                GollumEvent: {
                    icon: 'fa fa-git',
                    iconColor: 'default',
                    text: 'A wiki page has been created or updated',
                    link: false
                },
                IssueCommentEvent: {
                    icon: 'fa fa-comment-o',
                    iconColor: 'default',
                    text: 'A comment has been issued',
                    link: false
                },
                IssuesEvent: {
                    icon: 'fa fa-exclamation-triangle',
                    iconColor: 'default',
                    text: 'An issue status has changed',
                    link: false
                },
                MemberEvent: {
                    icon: 'fa fa-sitemap',
                    iconColor: 'default',
                    text: 'A user is added as collaborator to a repository',
                    link: false
                },
                PageBuildEvent: {
                    icon: 'fa fa-file-o',
                    iconColor: 'default',
                    text: '',
                    link: false
                },
                PublicEvent: {
                    icon: 'fa fa-users',
                    iconColor: 'default',
                    text: '',
                    link: false
                },
                PullRequestEvent: {
                    icon: 'fa fa-sort-desc',
                    iconColor: 'default',
                    text: '',
                    link: false
                },
                PullRequestReviewCommentEvent: {
                    icon: 'fa fa-random',
                    iconColor: 'default',
                    text: '',
                    link: false
                },
                PushEvent: {
                    icon: 'fa fa-cloud-upload',
                    text: '<img src="' + event.actor.avatar_url + '"><a href="https://github.com/' + event.actor.login + '" target="_blank">' + event.actor.login + '</a> Pushed to <a href="'+ event.repo.name + '" target="_blank">' + event.repo.name.replace(event.actor.login + '/', '') + '</a>',
                    iconColor: 'info',
                    link: false
                },
                ReleaseEvent: {
                    icon: 'fa fa-chain-broken',
                    text: 'A new release has been published',
                    iconColor: 'default',
                    link: false
                },
                StatusEvent: {
                    icon: 'fa fa-info',
                    text: 'The status of a Git commit has changed',
                    iconColor: 'default',
                    link: false
                },
                TeamAddEvent: {
                    icon: 'fa fa-plus',
                    text: 'A user has been added to the team',
                    iconColor: 'default',
                    link: false
                },
                WatchEvent: {
                    icon: 'fa fa-staar',
                    text: 'The repository was starreed',
                    iconColor: 'default',
                    link: false
                }
            };
            return events[event.type];
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
