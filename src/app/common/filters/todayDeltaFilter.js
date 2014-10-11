'use strict';

module.exports = /*@ngInject*/
    function todayDeltaFilter() {
        return function (input) {
//            moment().locale('pl');
            return input + "dawno temu";
//            return moment(input).fromNow();
        };
    };