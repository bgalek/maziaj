maziajApp.filters.filter('todayDelta', function price() {
    return function (input) {
        moment.locale('pl');
        return moment(input).fromNow();
    };
});