'use strict';

module.exports = /*@ngInject*/
    function todayDeltaFilter() {
        return function (input) {
            var moment = require('moment')(input);
            moment.locale('en');
            return moment.fromNow();
        };
    };