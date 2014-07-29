maziajApp.controllers.controller('chainCtrl',
    ['$scope', '$routeParams', '$location', 'chainRepository',
        function ($scope, $routeParams, $location, chainRepository) {
            var doodles = $scope.doodles = [];
            $scope.loadDoodle = function (id) {
                if ($scope.busy) return;
                $scope.busy = true;
                chainRepository.getChainById(id).then(function (data) {
                    doodles.push(data);
                    $scope.nextDoodle = data.next;
                    $scope.busy = false;
                });
            };
            $scope.loadDoodle($routeParams.id);
        }]);
