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
            return $http.put(endpoints.doodle(),
                {
                    'prev': prev,
                    'author': author,
                    'image': drawing
                }
            );
        },
        putCaptionDoodle: function (prev, author, caption) {
            return $http.put(endpoints.doodle(),
                {
                    'prev': prev,
                    'author': author,
                    'text': caption
                }
            );
        },
        postImageDoodle: function (author, drawing) {
            return $http.post(endpoints.doodle(),
                {
                    'author': author,
                    'image': drawing
                }
            );
        },
        postCaptionDoodle: function (author, caption) {
            return $http.post(endpoints.doodle(),
                {
                    'author': author,
                    'text': caption
                }
            );
        }
    };
}]);