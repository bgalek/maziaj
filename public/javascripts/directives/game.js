maziajApp.directives.directive('game', ['$timeout', '$localStorage', 'chainRepository', function ($timeout, $localStorage, chainRepository) {
    return {
        scope: {},
        caption: '=',
        strokeColor: '=?',
        strokeWidth: '=?',
        restrict: 'AE',
        replace: 'true',
        templateUrl: 'game',
        link: function (scope, element) {

            /* scope const */
            var DEFAULT_STROKE_COLOR = '#000',
                DEFAULT_STROKE_WIDTH = 5,
                DEFAULT_STROKE_STYLE = 'round',
                DEFAULT_MAX_UNDO = 5,
                DEFAULT_CANVAS_BACKGROUND_COLOR = '#eee',
                IMAGE = new Image();

            /* scope init */
            var canvas = element.find('canvas')[0];

            scope.disable = false;
            scope.chain = null;
            scope.action = null;

            if (typeof $localStorage.restorePoints === 'undefined') {
                $localStorage.restorePoints = [];
            }

            newGame();

            /* scope main */
            var drawing, context, clickX, clickY;

            if (canvas.getContext) {
                restoreCanvasIfPossible();

                /* scope bindings */
                angular.element(canvas).bind('mousedown', function (event) {
                    clickX = event.offsetX;
                    clickY = event.offsetY;
                    drawing = true;
                    context.beginPath();
                });

                angular.element(canvas).bind('mouseup', function () {
                    drawing = false;
                    exportImage();
                });

                angular.element(canvas).bind('mousemove', function (event) {
                    if (!drawing) {
                        return;
                    }
                    draw(clickX, clickY, event.offsetX, event.offsetY);
                    clickX = event.offsetX;
                    clickY = event.offsetY;
                });
            }

            /* scope functions */

            scope.clear = function () {
                scope.restorePoints = $localStorage.restorePoints = [];
                scope.restorePoints.push(canvas.toDataURL());
                scope.caption = '';
                scope.disable = false;
                newGame();
            };

            scope.undo = function () {
                if (scope.restorePoints.length >= 2) {
                    loadCanvas(scope.restorePoints[scope.restorePoints.length - 2]);
                    scope.restorePoints.pop();
                }
            };

            scope.save = function () {
                scope.disable = true;
                if (scope.action === 'draw') {
                    chainRepository.putImageDoodle((typeof scope.chain === 'undefined') ? null : scope.chain._id, 'author', canvas.toDataURL()).then(scope.clear);
                } else if (scope.action === 'describe') {
                    chainRepository.putCaptionDoodle((typeof scope.chain === 'undefined') ? null : scope.chain._id, 'author', scope.caption).then(scope.clear);
                }
            };

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

            function loadCanvas(restorePoint) {
                IMAGE.src = restorePoint;
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
                    if (scope.restorePoints.length >= DEFAULT_MAX_UNDO + 1) {
                        scope.restorePoints.shift();
                    }
                    scope.restorePoints.push(canvas.toDataURL());
                });
            }

            function newGame() {
                resetCanvas();

                scope.restorePoints = $localStorage.restorePoints;
                scope.strokeWidth = scope.strokeWidth || DEFAULT_STROKE_WIDTH;
                scope.strokeColor = scope.strokeColor || DEFAULT_STROKE_COLOR;

                chainRepository.getNextFreeChain().then(function (data, error) {
                    scope.chain = data;
                    if (scope.chain && scope.chain.hasOwnProperty('text')) {
                        scope.action = 'draw';
                    } else if (scope.chain && scope.chain.hasOwnProperty('image')) {
                        scope.action = 'describe';
                    } else {
                        scope.action = ['draw', 'describe'][Math.floor(Math.random() * 2)];
                    }
                });
            }
        }
    };
}])
;