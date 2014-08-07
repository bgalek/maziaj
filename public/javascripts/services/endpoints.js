"use strict";
maziajApp.factory('endpoints', function () {
    var apiEndpoint = 'http://api-maziaj.herokuapp.com/';
    return {
        chainsList: function (page) {
            return apiEndpoint + 'chain' + '?page=' + page;
        },
        doodleById: function (id) {
            return apiEndpoint + 'doodle/' + id;
        },
        nextFreeChain: function () {
            return apiEndpoint + 'play';
        },
        doodle: function () {
            return apiEndpoint + 'doodle';
        }
    };
});
