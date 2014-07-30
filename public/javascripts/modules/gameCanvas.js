(function () {
    angular.module('maziaj.draw', ['ngStorage'])
        .directive("draw", ['$timeout', '$localStorage', function ($timeout, $localStorage) {
            return {
                scope: {
                    ngModel: '=',
                    strokeColor: '=?',
                    strokeWidth: '=?'
                },
                link: function (scope, element) {

                    var DEFAULT_STROKE_COLOR = "#000";
                    var DEFAULT_STROKE_WIDTH = 5;
                    var DEFAULT_STROKE_STYLE = "round";
                    var CANVAS_BACKGROUND_COLOR = "#eee";

                    scope.strokeWidth = scope.strokeWidth || DEFAULT_STROKE_WIDTH;
                    scope.strokeColor = scope.strokeColor || DEFAULT_STROKE_COLOR;

                    if (typeof $localStorage.restorePoints === 'undefined') {
                        $localStorage.restorePoints = [];
                    }
                    scope.restorePoints = $localStorage.restorePoints;

                    var drawing = false;
                    var canvas = element[0];
                    var context, clickX, clickY;

                    if (canvas.getContext) {
                        context = canvas.getContext('2d');
                        context.fillStyle = CANVAS_BACKGROUND_COLOR;
                        context.fillRect(0, 0, canvas.width, canvas.height);
                        context.strokeStyle = DEFAULT_STROKE_STYLE;
                        context.lineJoin = DEFAULT_STROKE_STYLE;
                        context.lineWidth = DEFAULT_STROKE_WIDTH;
                        if (scope.restorePoints.length > 0) {
                            loadCanvas(scope.restorePoints[scope.restorePoints.length - 1]);
                        } else {
                            scope.restorePoints.push(canvas.toDataURL("image/png"));
                        }
                    }


                    element.bind('mousedown', function (event) {
                        clickX = event.offsetX;
                        clickY = event.offsetY;
                        context.beginPath();
                        drawing = true;
                    });

                    element.bind('mouseup', function (event) {
                        drawing = false;
                        exportImage();
                    });

                    element.bind('mousemove', function (event) {
                        if (!drawing) {
                            return;
                        }
                        draw(clickX, clickY, event.offsetX, event.offsetY);
                        clickX = event.offsetX;
                        clickY = event.offsetY;
                    });

                    scope.$watch('ngModel', function (newVal) {
                        if (newVal == 'undo') {
                            undo();
                        }
                    });

                    function loadCanvas(restorePoint) {
                        var image = new Image();
                        image.src = scope.ngModel = restorePoint;
                        image.onload = function () {
                            context.drawImage(image, 0, 0, canvas.width, canvas.height);
                        };
                    }

                    function undo() {
                        if (scope.restorePoints.length > 0) {
                            loadCanvas(scope.restorePoints.pop());
                        }
                    }

                    function draw(lX, lY, cX, cY) {
                        context.moveTo(lX, lY);
                        context.lineTo(cX, cY);
                        context.lineCap = DEFAULT_STROKE_STYLE;
                        context.lineWidth = scope.strokeWidth;
                        context.strokeStyle = scope.strokeColor;
                        context.stroke();
                    }

                    function exportImage() {
                        $timeout(function () {
                            scope.ngModel = canvas.toDataURL();
                            if (scope.restorePoints.length >= 5) {
                                scope.restorePoints.shift();
                            }
                            scope.restorePoints.push(scope.ngModel);
                        });
                    }
                }
            };
        }]);

})();