maziajApp.directives.directive('describe', [function () {
    return {
        scope: {},
        caption: '=',
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'game/caption',
        link: function (scope) {
            scope.$parent.getCaption = function () {
                if(typeof scope.caption == 'undefined' || scope.caption.length < 1) {
                    return null;
                }
                return scope.caption;
            };
            scope.$parent.clearCaption = function () {
                scope.caption = '';
            };
        }
    };
}]);