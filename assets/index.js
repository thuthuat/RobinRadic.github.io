(function (factory) {

    factory(jQuery, radic);

}(function ($, R) {
    $(function () {
        $('#ghevents').githubEvents({
            username: 'RobinRadic',
            height: 300,

            // Add jQuery slimscroll, cause it looks neat
            repainted: function (e, options) {
                var self = this;
                console.log('repainted', this, e, options);
                var $wrapper = $(document.createElement('div'));
                var $container = $(e.target.firstElementChild).wrapInner($wrapper);

                console.log('he', parseInt($container.css('padding').replace('px')));
                $($container[0].firstElementChild).slimScroll({
                    height: options.height - (parseInt($container.css('padding').replace('px')) * 2),
                    alwaysVisible: true
                });


                $(e.target).find('a.commits').popover({
                    html: true,
                    trigger: 'focus',
                    container: 'body',
                    placement: 'right',
                    template: '<div class="popover popover-commits" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
                    content: function () {
                        var eventId = $(this).data('github-event');
                        var $widget = $(self).githubEvents('instance');
                        var event = $widget.getEvent(eventId).raw;
                        var commits = [];
                        var repoSplit = function (repoName, give) {
                            return repoName.replace(/([\w-]*)\/([\w-]*)/, give === 'owner' ? '$1' : '$2');
                        };
                        R.github.async(false);

                        $.each(event.payload.commits, function (i, commit) {
                            if (i > 5) return;
                            commits.push(R.github.repos.commitsSha(repoSplit(event.repo.name, 'owner'), repoSplit(event.repo.name), commit.sha).data);
                        });

                        console.log('commits popover', commits);
                        return $widget._compile('github.events.commits.popover', {event: event, commits: commits});
                    }
                });
            }
        })
    })

}));
