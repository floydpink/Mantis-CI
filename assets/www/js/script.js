var Travis = Ember.Application.create({
    ready:function () {
        console.log('Ember is ready');
    }
});

Travis.MainView = Ember.View.extend({
    attributeBindings:['data-role'],
    'data-role':'page',
    templateName:'main',
    id:'main-view',
    didInsertElement:function () {
        console.log('main inserted');
        console.log(this.$());
        $.mobile.changePage(this.$());
    }
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
    console.log('in pageinit event');
    var v = Travis.get('mainView');

    if (!v) {
        console.log('main not created');
        v = Travis.MainView.create({});
        Travis.set('mainView', v);
        v.append();
    }
});
