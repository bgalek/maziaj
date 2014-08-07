"use strict";
maziajApp.factory('endpoints', function () {
    var apiEndpoint = 'http://localhost:8080/';
    return {
        chainsList: function (page) {
            return apiEndpoint + 'chain' + '?page=' + page;
        },
        chainById: function (id) {
            return apiEndpoint + 'chain/' + id;
        }
    };
});
