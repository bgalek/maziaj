'use strict';

module.exports = /*@ngInject*/
    function chainRepositoryService($http, endpointsService) {
        return {
            getChains: function (page) {
                return $http.get(endpointsService.chainsList(page)).then(function (response) {
                    return response.data;
                });
            },
            getDoodleById: function (id) {
                return $http.get(endpointsService.doodleById(id)).then(function (response) {
                    return response.data;
                });
            },
            getNextFreeChain: function () {
                return $http.get(endpointsService.nextFreeChain()).then(function (response) {
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
                return $http.put(endpointsService.doodle(), data);
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
                return $http.put(endpointsService.doodle(), data);
            }
        };
    };
