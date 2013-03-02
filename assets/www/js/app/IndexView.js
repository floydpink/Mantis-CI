define([
    'app/PageView',
    'hbs!index'
],
    function (PageView) {
        var IndexView = PageView.extend({
            templateName:'index',
            id:'index'
        });
        return IndexView;
    });