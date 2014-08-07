"use strict";
maziajApp.controllers.controller('playCtrl', ['$scope', 'chainRepository',
    function ($scope, chainRepository) {

        $scope.chain = {};
        $scope.action = '';

        newGame();

        function newGame() {
            $scope.chain = chainRepository.getNextFreeChain().then(function (data) {
                $scope.disable = false;
                $scope.chain = data;
                if ($scope.chain.length == 0) {
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

        $scope.save = function () {
            $scope.disable = true;
            if ($scope.chain.length == 0) {
                if ($scope.action === 'draw') {
                    chainRepository.postImageDoodle('author', $scope.getCanvas()).then(function (data) {
                        $scope.clearCanvas();
                        newGame();
                    });
                } else if ($scope.action === 'describe') {
                    chainRepository.postCaptionDoodle('author', $scope.getCaption()).then(function (data) {
                        $scope.clearCaption();
                        newGame();
                    });
                }
            } else {
                if ($scope.action === 'draw') {
                    chainRepository.putImageDoodle($scope.chain._id, 'author', $scope.getCanvas()).then(function (data) {
                        $scope.clearCanvas();
                        newGame();
                    });
                } else if ($scope.action === 'describe') {
                    chainRepository.putCaptionDoodle($scope.chain._id, 'author', $scope.getCaption()).then(function (data) {
                        $scope.clearCaption();
                        newGame();
                    });
                }
            }
        }
    }
]);