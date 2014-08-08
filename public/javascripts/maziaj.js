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
        controller: 'galleryCtrl',
        templateUrl: 'partials/gallery',
        reloadOnSearch: false
    }, true);
    $routeProvider.when('/chain/:id', {
        controller: 'chainCtrl',
        templateUrl: 'partials/chain'
    }, true);
    $routeProvider.when('/play', {
        controller: 'playCtrl',
        templateUrl: 'partials/play'
    }, true);
    $routeProvider.when('/profile', {
        controller: 'profileCtrl',
        templateUrl: 'partials/profile'
    }, true);
    $routeProvider.otherwise({redirectTo: '/'});
}]);