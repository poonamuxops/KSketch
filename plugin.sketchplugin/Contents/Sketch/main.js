var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports['default'] = function (context) {

    var mysketch = new Component(context);

    // Create an artboard
    /*var userInput = sketch.UI.getStringFromUser('Enter a name for the artboard', 'type here...');
    var artboard = mysketch.addArtboard(userInput);
    
    // Create a text layer
    var userInput = sketch.UI.getStringFromUser('Enter a text to display in the artboart', 'type here...');
    mysketch.addText(userInput);
    
    // Create a rectangle
    var userInput = sketch.UI.getStringFromUser('Enter name for rectangle', 'type here...');
    mysketch.addRectangle(userInput, 0, 0, 100, 100, '#555555'); */

    //mysketch.exportArtboards('png');
    //mysketch.exportPage('2, 3, 4', 'png');
};

/* Main.js 
Contains the run-time scripts for testing purposes mainly but not for publishing
*/

// let's get a hold on the Sketch API
var sketch = __webpack_require__(0);
var Component = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Loading all modules
var sketch = __webpack_require__(0);
var Artboard = sketch.Artboard;
var Rectangle = sketch.Rectangle;
var Shape = sketch.Shape;
var Style = sketch.Style;
var Text = sketch.Text;

var Component = function () {
    function Component(context) {
        _classCallCheck(this, Component);

        this.context = context;
        // We are passed a context variable when we're run. We use this to get hold of the native Sketch document and wrap it.
        this.document = sketch.fromNative(context.document);

        // Next we want to extract the selected page of the selected (front-most) document
        this.page = this.document.selectedPage;
        this.selectedCanva = this.page;

        // Check if there is an artboard selected
        var selection = context.selection;
        if (selection.count() != 0) {
            for (var i = 0; i < selection.count(); i++) {
                if (this.isArtboard(selection[i])) {
                    this.selectedCanva = selection[i];
                }
            }
        }
    }

    /* Add an artboard and select it upon creation
    * name: takes the name as an input
    * width and height: defined in px, default is 200px
    */

    _createClass(Component, [{
        key: 'addArtboard',
        value: function () {
            function addArtboard(name) {
                var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
                var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

                var artboard = new Artboard({
                    parent: this.page,
                    name: name,
                    frame: new Rectangle(0, 0, width, height)

                });
                this.selectedCanva = artboard;
                return artboard;
            }

            return addArtboard;
        }()

        /* Add a text layer 
        * text: takes the text as an input
        */

    }, {
        key: 'addText',
        value: function () {
            function addText(text) {

                var layer = new sketch.Text({
                    parent: this.selectedCanva,
                    name: 'text',
                    alignment: Text.Alignment.center,
                    text: text
                });
                // ...resize it so that the text just fits...
                layer.adjustToFit();

                // Finally, lets center the view on our new layer
                // so that we can see where it is.
                this.document.centerOnLayer(layer);
            }

            return addText;
        }()

        /* Add a rectangle
        * name: name of the rectangle
        * x, y: where should the rectangle be positioned - position at 0, 0
        * width: desired width of the rectangle
        * height: desired height of the rectangle
        * color: desired fill color of the rectangle
        */

    }, {
        key: 'addRectangle',
        value: function () {
            function addRectangle(name, x, y) {
                var width = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
                var height = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;
                var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '#ffffff';

                var rectangle = new Shape({
                    parent: this.selectedCanva,
                    name: name,
                    frame: new Rectangle(x, y, width, height),
                    style: { fills: [{ color: color, fillType: Style.FillType.color }] }
                });
                this.document.centerOnLayer(rectangle);
            }

            return addRectangle;
        }()

        /* Export artboards to images
        * scalelist: takes a list of desired scaling in the form ('1,2, 3, etc') for x1, x2, x3 etc.
        * formats: provide a list of the desired formats in the form ('png, gif, so on')
        */

    }, {
        key: 'exportArtboards',
        value: function () {
            function exportArtboards(scalelist, formats) {
                var selectedLayers = this.context.selection;
                var selectedCount = selectedLayers.count();
                var artboards = [];
                var classCheck = true;

                if (selectedCount == 0) {
                    selectedLayers = this.page.layers;
                    selectedCount = selectedLayers.length;
                    classCheck = false;
                }
                if (selectedCount != 0) {

                    for (var i = 0; i < selectedCount; i++) {
                        if (this.isArtboard(selectedLayers[i], classCheck)) {
                            artboards.push(selectedLayers[i]);
                        }
                    }
                    if (artboards) {
                        sketch['export'](artboards, {
                            scales: scalelist,
                            formats: formats,
                            output: '~/Documents/SketchExports/' + this.page.name
                        });
                    }
                }
            }

            return exportArtboards;
        }() // end function

        /* Export all the artboards in a page
        * scalelist: takes a list of desired scaling in the form ('1,2, 3, etc') for x1, x2, x3 etc.
        * formats: provide a list of the desired formats in the form ('png, gif, so on')
        */

    }, {
        key: 'exportPage',
        value: function () {
            function exportPage(scalelist, formats) {

                var layers = this.page.layers;
                var artboards = [];
                if (layers.length != 0) {
                    for (var i = 0; i < layers.length; i++) {
                        if (this.isArtboard(layers[i])) {
                            artboards.push(layers[i]);
                        }
                    }
                    if (artboards) {
                        var options = { scales: scalelist, formats: formats, output: '~/Documents/SketchExports/' + this.page.name };
                        sketch['export'](artboards, options);
                    }
                }
            }

            return exportPage;
        }()

        // Check if layer is an artboard

    }, {
        key: 'isArtboard',
        value: function () {
            function isArtboard(layer) {
                var classCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                var type = '';
                if (classCheck) {
                    type = layer['class']();
                } else {
                    type = layer.type;
                }
                if (type == "MSArtboardGroup" || type == "Artboard") {
                    return true;
                } else {
                    return false;
                }
            }

            return isArtboard;
        }()
    }]);

    return Component;
}();

module.exports = Component;

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
