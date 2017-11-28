'use strict';

module.exports =
  angular.module('maziaj.common', [
    require('./directives').name,
    require('./filters').name,
    require('./services').name
  ]);
