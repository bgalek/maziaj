'use strict';

module.exports = /*@ngInject*/
    function galleryCtrl($scope, $routeParams, $location, chainRepositoryService) {
        var chains = $scope.chains = {};
        chains.currentPage = ($routeParams.page > 0) ? $routeParams.page : 1;
        chains.updateList = function (page) {
            chainRepositoryService.getChains(page).then(function (data) {
                chains.list = data.list;
                chains.totalItems = data.totalItems;
            });
        };
        chains.updateList(chains.currentPage);
        chains.pageChanged = function () {
            $location.search('page', chains.currentPage);
            this.updateList(chains.currentPage);
        };
    };
