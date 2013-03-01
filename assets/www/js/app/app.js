define(['ember'], function(Ember){
    Travis.IndexRoute = Ember.Route.extend({
        setupController:function(controller, model){
            debugger;
        }
    });

    //Controllers

    Travis.MainController = Ember.ObjectController.extend({
        mainProperty: "some invalid string"
    });

    //Views
    Travis.PageView = Ember.View.extend({
        attributeBindings:['data-role'],
        'data-role':'page',
        layoutName:'layout'
    });

    Travis.MainView = Travis.PageView.extend({
        templateName:'main',
        id:'main-view',
        didInsertElement:function () {
            console.log('main inserted');
            console.log(this.$());
            $.mobile.changePage(this.$());
        }
    });

});
