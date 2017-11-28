'use strict';

module.exports = /*@ngInject*/
    function chainCtrl($scope, $routeParams, $location, chainRepositoryService) {
        var doodles = $scope.doodles = [];
        $scope.loadDoodle = function (id) {
            if ($scope.busy) return;
            $scope.busy = true;
            chainRepositoryService.getDoodleById(id).then(function (data) {
                doodles.push(data);
                if (data.next) {
                    $scope.nextDoodle = data.next;
                    $scope.busy = false;
                }
            });
        };
        $scope.loadDoodle($routeParams.id);
    };
