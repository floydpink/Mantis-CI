// amd is causing issues with loading jqm, so disable it
define.amd = null;

//requirejs config
require.config({
    paths:{
        'jquery':'lib/jquery-1.9.0',
        'handlebars':'lib/handlebars-1.0.0-rc.3',
        'hbs':'lib/hbs',
        'ember':'lib/ember-1.0.0-rc.1',
        'jqm':'lib/jquery.mobile-1.3.0',
        'templates':'../templates'
    },
    shim:{
        jquery:{
            exports:'jQuery'
        },
        handlebars:{
            exports:'Handlebars'
        },
        ember:{
            deps:['jquery', 'handlebars'],
            exports:'Ember'
        },
        jqm:{
            deps:['jquery'],
            exports:'jQuery.mobile'
        }
    },
    hbs:{
        templateExtension:'hbs',
        baseDir:'templates'
    }
});

// start our app
require([
    'app/app'
], function (app) {
    app.start();
});