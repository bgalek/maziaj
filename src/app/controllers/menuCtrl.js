'use strict';

module.exports = /*@ngInject*/
    function menuCtrl($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === '/' + $location.path().split('/')[1];
        };
    };