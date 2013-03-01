requirejs.config({
    baseUrl:'js/app',
    paths:{
        lib:'../lib'
    }
});

requirejs([
    'lib/jquery',
    'lib/ember',
    'lib/cordova',
    'app',
    'lib/jquery.mobile'
], function ($, ember, cordova, Travis) {
    var Travis = Ember.Application.create({
        ready:function () {
            console.log('Ember is ready');
        }
    });

    Travis.Router.map(function () {
        this.route('builds');
    });

    $(document).on('mobileinit', function () {
        console.log('in mobileinit event');
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;

        // Remove page from DOM when it's being replaced (if you use pages)
        $('div[data-role="page"]').on('pagehide', function (event, ui) {
            $(event.currentTarget).remove();
        });
    });


    $('#splash').on('pageinit', function () {
        var mainView = Travis.get('mainView');

        if (!mainView) {
            mainView = Travis.MainView.create({});
            Travis.set('mainView', mainView);
            mainView.append();
        }
    });

    return Travis;
});