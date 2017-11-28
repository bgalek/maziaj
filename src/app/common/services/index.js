'use strict';

module.exports =
    angular.module('maziaj.common.services', [])
        .factory('chainRepositoryService', require('./chainRepositoryService'))
        .factory('endpointsService', require('./endpointsService'));
