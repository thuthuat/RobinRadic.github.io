(function(){
    radic.template.registerHelper('branchName', function (event) {
        return event.payload.ref.replace('refs/heads/', '');
    });
    radic.template.registerHelper('pushName', function (event) {
        return event.payload.size > 1 ? 's' : ''
    });

    radic.template.registerHelper('pushName', function (event) {
        return event.payload.size > 1 ? 's' : ''
    });

    radic.template.registerHelper('repoName', function (repoName) {
        return repoName.replace(/RobinRadic\/(\w*)/, '$1');
    });

    radic.template.registerHelper('arrayIndex', function (context, ndx) {
        return context[ndx];
    });


}).call();

