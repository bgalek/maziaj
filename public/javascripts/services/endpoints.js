maziajApp.factory('endpoints', function () {
    var apiEndpoint = 'http://localhost:3000/';
    return {
        chainsList: function (page, offset) {
            return apiEndpoint + 'chains';
        },
        chainById: function (id) {
            return apiEndpoint + 'chains/' + id;
        }
    };
});