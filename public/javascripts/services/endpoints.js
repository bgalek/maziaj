maziajApp.factory('endpoints', function () {
    var apiEndpoint = 'http://localhost:3000/';
    return {
        chainsList: function (page) {
            return apiEndpoint + 'chains' + '?page=' + page;
        },
        chainById: function (id) {
            return apiEndpoint + 'chains/' + id;
        }
    };
});