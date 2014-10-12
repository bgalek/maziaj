'use strict';

module.exports = angular.module('maziaj.common.directives', [])
    .directive('game', require('./gameDirective'))
    .directive('whenScrolled', require('./scrollDirective'));