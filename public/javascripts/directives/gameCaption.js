maziajApp.directives.directive('describe', [function () {
    return {
        scope: {},
        caption: '=',
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'game/caption',
        link: function (scope) {
            scope.$parent.getCaption = function () {
                return scope.caption;
            };
            scope.$parent.clearCaption = function () {
                scope.caption = '';
            };
        }
    };
}]);