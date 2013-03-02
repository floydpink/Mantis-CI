define([
    'ember',
    'hbs!page'
],
    function (Ember) {
        var PageView = Ember.View.extend({
            attributeBindings:['data-role'],
            'data-role':'page',
            layoutName:'page'
        });
        return PageView;
    });