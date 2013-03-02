define([
    'ember',
    'app/IndexView'
], function (Ember, IndexView) {

    var Travis = Ember.Application.create({
        LOG_TRANSITIONS:true,
        ready:function () {
            console.log('Ember is ready');
        },
        IndexView: IndexView
    });

    return Travis;
});
