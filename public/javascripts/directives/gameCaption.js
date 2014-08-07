"use strict";
maziajApp.directives.directive("describe", ['$localStorage', function ($localStorage) {
    return {
        scope: {},
        caption: '=',
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'game/caption',
        link: function (scope, element) {

            scope.$parent.getCaption = function () {
                return scope.caption;
            };
            scope.$parent.clearCaption = function () {
                scope.caption = '';
            }
        }
    }
}]);