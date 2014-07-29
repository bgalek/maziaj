maziajApp.services.factory('chainRepository', ['$http', 'endpoints', function ($http, endpoints) {
    return {
        getChains: function (page) {
            return $http.get(endpoints.chainsList(page)).then(function (response) {
                return response.data;
            });
        },
        getChain: function (id) {
            return $http.get(endpoints.chainById(id)).then(function (response) {
                return response.data;
            });
        }
    };
}]);