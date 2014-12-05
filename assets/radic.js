
(function (factory) {

    factory(jQuery);

}(function ($) {



    var createEndpoints = function(owner, repo){
        var endpoints = {
            contents: "/repos/:owner/:repo/contents/"
        };


        $.each(endpoints, function (name, val) {
            endpoints[name] = val.replace(':owner', owner).replace(':repo', repo);
        });

        return endpoints;
    };

    var login = function(callback){
        var self = this;
        var promise = OAuth.popup('github', { cache: true });
        promise.done(function(result){
            self.refresh();
            if($.isFunction(callback)){
                callback(result);
            }
        })
    };

    var logout = function(){
        OAuth.clearCache('github');
        this.refresh();
    };

    var loggedin = function(){
        return OAuth.create('github') !== false;
    };




    var g = OAuth.create('github') || {};
    g.createEndpoints = createEndpoints;
    g.login = login;
    g.logout = logout;
    g.loggedin = loggedin;

    jQuery.extend($.github, g);

}));


OAuth.initialize(GHDATA.data.main.oauth_io);

jQuery(document).ready(function() {
    Metronic.init(); // init metronic core components
    Layout.init(); // init current layout
    //  Demo.init(); // init demo features
    $('.noclick').on('click', function(e){
        e.preventDefault();
    });
});
