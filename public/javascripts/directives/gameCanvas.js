"use strict";
maziajApp.directives.directive("draw", ['$timeout', '$localStorage', function ($timeout, $localStorage) {
    return {
        scope: {},
        ngModel: '=',
        strokeColor: '=?',
        strokeWidth: '=?',
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'partials/canvas',
        link: function (scope, element) {

            /* scope const */
            var DEFAULT_STROKE_COLOR = "#000";
            var DEFAULT_STROKE_WIDTH = 5;
            var DEFAULT_STROKE_STYLE = "round";
            var DEFAULT_MAX_UNDO = 5;
            var DEFAULT_CANVAS_BACKGROUND_COLOR = "#eee";
            var IMAGE = new Image();

            /* scope init */
            element = element.find("canvas");

            if (typeof $localStorage.restorePoints === 'undefined') {
                $localStorage.restorePoints = [];
            }
            scope.restorePoints = $localStorage.restorePoints;
            scope.strokeWidth = scope.strokeWidth || DEFAULT_STROKE_WIDTH;
            scope.strokeColor = scope.strokeColor || DEFAULT_STROKE_COLOR;

            /* scope main */
            var canvas = element[0];
            var drawing, context, clickX, clickY;

            if (canvas.getContext) {
                resetCanvas();
                restoreCanvasIfPossible();
            }

            /* scope bindings */
            element.bind('mousedown', function (event) {
                clickX = event.offsetX;
                clickY = event.offsetY;
                context.beginPath();
                drawing = true;
            });

            element.bind('mouseup', function () {
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

            /* scope functions */

            scope.undo = function () {
                if (scope.restorePoints.length >= 2) {
                    loadCanvas(scope.restorePoints[scope.restorePoints.length - 2]);
                    scope.restorePoints.pop();
                }
            };

            scope.clear = clear;

            /* private functions */

            function restoreCanvasIfPossible() {
                if (scope.restorePoints.length > 0) {
                    loadCanvas(scope.restorePoints[scope.restorePoints.length - 1]);
                } else {
                    scope.restorePoints.push(canvas.toDataURL());
                }
            }

            function resetCanvas() {
                context = canvas.getContext('2d');
                context.fillStyle = DEFAULT_CANVAS_BACKGROUND_COLOR;
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.strokeStyle = DEFAULT_STROKE_STYLE;
                context.lineJoin = DEFAULT_STROKE_STYLE;
                context.lineWidth = DEFAULT_STROKE_WIDTH;
            }

            function clear() {
                resetCanvas();
                scope.restorePoints = $localStorage.restorePoints = [];
                restoreCanvasIfPossible();

            }

            function loadCanvas(restorePoint) {
                IMAGE.src = scope.drawing = restorePoint;
                IMAGE.onload = function () {
                    context.drawImage(IMAGE, 0, 0, canvas.width, canvas.height);
                };
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
                    scope.drawing = canvas.toDataURL();
                    if (scope.restorePoints.length >= DEFAULT_MAX_UNDO + 1) {
                        scope.restorePoints.shift();
                    }
                    scope.restorePoints.push(scope.drawing);
                });
            }
        }
    };
}]);