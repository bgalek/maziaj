'use strict';

module.exports = /*@ngInject*/
    function scrollDirective($window) {
        return {
            scope: true,
            link: function (scope, elm, attr) {
                var window = angular.element($window);
                var raw = elm[0];
                angular.element($window).bind('scroll', function () {
                    var HEADER_HEIGHT = 500;
                    if (window.scrollTop() >= raw.offsetHeight - HEADER_HEIGHT) {
                        scope.$apply(attr.whenScrolled);
                    }
                });
                scope.$on('$destroy', function () {
                    angular.element($window).unbind('scroll');
                });
            }
        };
    };