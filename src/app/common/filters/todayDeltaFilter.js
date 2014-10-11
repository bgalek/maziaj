'use strict';

module.exports = /*@ngInject*/
    function todayDeltaFilter() {
        return function (input) {
            var moment = require('moment')(input);
            moment.locale('pl');
            return moment.fromNow();
        };
    };