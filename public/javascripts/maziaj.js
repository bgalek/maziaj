var maziajApp = angular.module('maziajApp', [
    'ngRoute',
    'maziajApp.filters',
    'maziajApp.services',
    'maziajApp.directives',
    'maziajApp.controllers',
    'ui.bootstrap',
    'infinite-scroll',
    'ngStorage'
]);

maziajApp.filters = angular.module('maziajApp.filters', []);
maziajApp.services = angular.module('maziajApp.services', []);
maziajApp.directives = angular.module('maziajApp.directives', []);
maziajApp.controllers = angular.module('maziajApp.controllers', []);

maziajApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        title: 'Przeglądaj sznurki',
        controller: 'galleryCtrl',
        templateUrl: 'partials/gallery',
        reloadOnSearch: false
    }, true);
    $routeProvider.when('/chain/:id', {
        title: 'Sznurek',
        controller: 'chainCtrl',
        templateUrl: 'partials/chain'
    }, true);
    $routeProvider.when('/play', {
        title: 'Play',
        controller: 'playCtrl',
        templateUrl: 'partials/play'
    }, true);
    $routeProvider.otherwise({redirectTo: '/'});
}]);