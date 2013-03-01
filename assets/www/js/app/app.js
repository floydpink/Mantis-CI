define([
    'ember'
], function (Ember) {
    var Travis = Ember.Application.create({
        ready:function () {
            console.log('Ember is ready');
        }
    });

    Travis.RootState = Ember.State.extend({
        index : Ember.State.extend({
            route : '/'
        }),
        main: Ember.State.extend({
            route : '/main',
            index : Ember.State.extend({
                route : '/'
            })
        })
    });

    Travis.Router = Ember.Router.extend({
        location:'hash',
        enableLogging:true,
        root: Travis.RootState,
        map:function(){
            this.route('about');
        }
    });

    //Routes
    Travis.IndexRoute = Ember.Route.extend({
        setupController:function (controller, model) {
            debugger;
        }
    });

    //Controllers
    Travis.MainController = Ember.ObjectController.extend({
        mainProperty:"some invalid string"
    });

    Travis.AboutController = Ember.ObjectController.extend({
        aboutVersionString:"0.0.0.1"
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

    Travis.AboutView = Travis.PageView.extend({
        templateName:'about',
        id:'about-view'
    });

    //inject Main view
    var mainView = Travis.get('mainView');

    if (!mainView) {
        console.log('mainview is not created');
        mainView = Travis.MainView.create({});
        console.log(mainView);
        Travis.set('mainView', mainView);
        mainView.append();
    }

    return Travis;
});
