maziajApp.controllers.controller('menuCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === "/" + $location.path().split("/")[1];
    };
}]);