maziajApp.controllers.controller('playCtrl', ['$scope', 'chainRepository',
    function ($scope, chainRepository) {

        $scope.chain = {};
        $scope.action = '';

        newGame();

        function newGame() {
            $scope.chain = chainRepository.getNextFreeChain().then(function (data) {
                $scope.disable = false;
                $scope.chain = data;
                if ($scope.chain.length === 0) {
                    $scope.action = 'draw';
                } else {
                    if ($scope.chain.hasOwnProperty('text')) {
                        $scope.action = 'draw';
                    } else if ($scope.chain.hasOwnProperty('image')) {
                        $scope.action = 'describe';
                    }
                }
            });
        }

        function clear() {
            $scope.clearCanvas();
            $scope.clearCaption();
            newGame();
        }

        $scope.save = function () {
            $scope.disable = true;
            if ($scope.action === 'draw') {
                if ($scope.getCanvas() === null) {
                    $scope.disable = false;
                    return;
                }
                if ($scope.chain.length === 0) {
                    chainRepository.postImageDoodle('author', $scope.getCanvas()).then(clear);
                } else {
                    chainRepository.putImageDoodle($scope.chain._id, 'author', $scope.getCanvas()).then(clear);
                }

            } else if ($scope.action === 'describe') {
                if ($scope.getCaption() === null) {
                    $scope.disable = false;
                    return;
                }
                if ($scope.chain.length === 0) {
                    chainRepository.postCaptionDoodle('author', $scope.getCaption()).then(clear);
                } else {
                    chainRepository.putCaptionDoodle($scope.chain._id, 'author', $scope.getCaption()).then(clear);
                }
            }
        };
    }
]);