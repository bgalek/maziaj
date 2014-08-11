maziajApp.services.factory('chainRepository', ['$http', 'endpoints', function ($http, endpoints) {
    return {
        getChains: function (page) {
            return $http.get(endpoints.chainsList(page)).then(function (response) {
                return response.data;
            });
        },
        getDoodleById: function (id) {
            return $http.get(endpoints.doodleById(id)).then(function (response) {
                return response.data;
            });
        },
        getNextFreeChain: function () {
            return $http.get(endpoints.nextFreeChain()).then(function (response) {
                    return response.data;
                }
            );
        },
        putImageDoodle: function (prev, author, drawing) {
            var data = {
                'prev': prev,
                'author': author,
                'image': drawing
            };
            if (prev === null) {
                delete data.prev;
            }
            return $http.put(endpoints.doodle(), data);
        },
        putCaptionDoodle: function (prev, author, caption) {
            var data = {
                'prev': prev,
                'author': author,
                'text': caption
            };
            if (prev === null) {
                delete data.prev;
            }
            return $http.put(endpoints.doodle(), data);
        }
    };
}]);