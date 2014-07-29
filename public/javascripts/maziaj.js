var maziajApp = angular.module('maziajApp', [
    'ngRoute',
    'maziajApp.filters',
    'maziajApp.services',
    'maziajApp.directives',
    'maziajApp.controllers'
]);

maziajApp.filters = angular.module('maziajApp.filters', []);
maziajApp.services = angular.module('maziajApp.services', []);
maziajApp.directives = angular.module('maziajApp.directives', []);
maziajApp.controllers = angular.module('maziajApp.controllers', []);

maziajApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        title: "Przeglądaj sznurki",
        controller: 'galleryCtrl',
        templateUrl: 'partials/gallery'
    });
    $routeProvider.otherwise({redirectTo: '/'});
}]);