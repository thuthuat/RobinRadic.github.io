
(function (factory) {

    factory(jQuery);

}(function ($) {

    var radic = {
        options: {
            owner: 'RobinRadic',
            repo: 'ghpages-radic-theme'
        },
        endpoints: {
            content: "/repos/:owner/:repo/contents/"
        },
        loggedin: false,
        init: function(){
            var self = this;

            $.each(this.endpoints, function (name, val) {
                self.endpoints[name] = val.replace(':owner', self.options.owner).replace(':repo', self.options.repo);
            });

            this.refresh();
        },
        refresh: function(){
            this.api = OAuth.create('github');
            if(this.api !== false){
                this.loggedin = true;
                $('.gitauth').show();
            } else {
                $('.gitauth').hide();
            }
        },
        login: function(callback){
            var self = this;
            var promise = OAuth.popup('github', { cache: true });
            promise.done(function(result){
                self.refresh();
                if($.isFunction(callback)){
                    callback(result);
                }
            })
        },
        logout: function(){
            OAuth.clearCache('github');
            this.refresh();
        },

    };

    radic.init();

    $.radic = radic;

    var createEndpoints = function(owner, repo){
        var endpoints = {
            contents: "/repos/:owner/:repo/contents/"
        };


        $.each(endpoints, function (name, val) {
            endpoints[name] = val.replace(':owner', owner).replace(':repo', repo);
        });

        return endpoints;
    };

    var g = OAuth.create('github');
    g.createEndpoints = createEndpoints;
    if(g !== false) {
        jQuery.extend($.github, g);
    }
}));