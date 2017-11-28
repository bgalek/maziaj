'use strict';

module.exports =
  angular.module('maziaj.common.filters', [])
  .filter('todayDeltaFilter', require('./todayDeltaFilter'));
