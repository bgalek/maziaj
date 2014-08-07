"use strict";
maziajApp.controllers.controller('galleryCtrl',
    ['$scope', '$routeParams', '$location', 'chainRepository',
        function ($scope, $routeParams, $location, chainRepository) {
            var chains = $scope.chains = {};
            chains.currentPage = ($routeParams.page > 0) ? $routeParams.page : 1;
            chains.updateList = function (page) {
                chainRepository.getChains(page).then(function (data) {
                    chains.list = data.list;
                    chains.totalItems = data.totalItems;
                });
            };
            chains.updateList(chains.currentPage);
            chains.pageChanged = function () {
                $location.search('page', chains.currentPage);
                this.updateList(chains.currentPage);
            };
        }]);
