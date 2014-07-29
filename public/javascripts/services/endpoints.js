maziajApp.factory('endpoints', function () {
    var apiEndpoint = 'http://api-maziaj.herokuapp.com/';
    return {
        chainsList: function (page) {
            return apiEndpoint + 'chain' + '?page=' + page;
        },
        chainById: function (id) {
            return apiEndpoint + 'chain/' + id;
        }
    };
});