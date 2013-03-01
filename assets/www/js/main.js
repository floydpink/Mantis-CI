requirejs.config({
    baseUrl:'js/lib',
    paths:{
        app:'../app',
        template:'../../template'
    },
    shim:{
        'jquery':{
            exports:'jQuery'
        },
        'handlebars':{
            exports:'Handlebars'
        },
        'ember':{
            deps:['jquery', 'handlebars'],
            exports:'Ember'
        }
    },
    hbs:{
        templateExtension:'hbs',
        baseDir:'template'
    }
});

var Travis = requirejs([
    'jquery',
    'app/app',
    'jquery.mobile'
], function ($, Travis) {

    $(document).ready(function () {
        console.log('$ document ready');
    });

    $(document).on('mobileinit', function () {
        console.log('mobileinit event');
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;

        // Remove page from DOM when it's being replaced (if you use pages)
        $('div[data-role="page"]').on('pagehide', function (event, ui) {
            $(event.currentTarget).remove();
        });
    });

    $(document).on('pageinit', function () {
        console.log('pageinit event');
    });

    return Travis;
});