maziajApp.controllers.controller('chainCtrl',
    ['$scope', '$routeParams', '$location', 'chainRepository',
        function ($scope, $routeParams, $location, chainRepository) {

            var doodles = $scope.doodles = [];

            $scope.loadDoodle = function (id) {
                chainRepository.getChainById(id).then(function (data) {
                    if (data.hasOwnProperty('image')) {
                        doodles.push({image: data.image, text: " "});
                    } else if (data.hasOwnProperty('text')) {
                        doodles.push({image: "http://placehold.it/500x300&text=" + data.text, text: ""});
                    }
                    $scope.nextDoodle = data.next;
                });
            };

            $scope.loadDoodle($routeParams.id);
        }]);
