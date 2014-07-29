maziajApp.controllers.controller('galleryCtrl',
    ['$scope', '$routeParams', '$location', 'chainRepository',
        function ($scope, $routeParams, $location, chainRepository) {
            var chains = $scope.chains = {};
            chains.currentPage = ($routeParams.page > 0) ? $routeParams.page : 1;
            chains.updateList = function (page) {
                chainRepository.getChains(page, 1).then(function (data) {
                    chains.list = data;
                    chains.totalItems = data.length * 10; //temp
                });
            };
            chains.updateList(chains.currentPage);
            chains.pageChanged = function () {
                $location.search('page', chains.currentPage);
            };
        }]);
