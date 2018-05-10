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
    mysketch.arrangeArtboards();
};

/* Command: Arrange Artboards
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
var Group = sketch.Group;

var Component = function () {
    function Component(context) {
        _classCallCheck(this, Component);

        this.context = context;
        // We are passed a context variable when we're run. We use this to get hold of the native Sketch document and wrap it.
        this.document = sketch.fromNative(context.document);

        // Next we want to extract the selected page of the selected (front-most) document
        this.page = this.document.selectedPage;
        this.selectedCanva = this.page;
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

                var artboards = this.getElement('Artboard');
                if (artboards) {
                    sketch['export'](artboards, {
                        scales: scalelist,
                        formats: formats,
                        output: '~/Documents/SketchExports/' + this.page.name
                    });
                }
            }

            return exportArtboards;
        }() // end function


        /* Resize Artboards
        * newWidth: takes the new desired width of the artboards
        * newHeight: the new desired height of the artboards
        * clearanceWidth: leaves horizontal margins from the left - defaulted to 100
        * clearanceHeight: vertical margins from the top - defaulted to 50
        * Returns: all artboards if no artboard is selected or the selected artboards
        */

    }, {
        key: 'resizeArtboard',
        value: function () {
            function resizeArtboard(newWidth, newHeight) {
                var clearanceWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
                var clearanceHeight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;

                var artboards = this.getElement('Artboard');

                for (var i = 0; i < artboards.length; i++) {
                    if (artboards[i].frame.width != newWidth && artboards[i].frame.height != newHeight) {
                        if (i == 0) {
                            // for the first element don't adjust position
                            artboards[i].frame = { width: newWidth,
                                height: newHeight
                            };
                        } else {
                            // move the artboards upon resize
                            artboards[i].frame = { x: artboards[i].frame.y == artboards[i - 1].frame.y || artboards[i].frame.y != artboards[i - 1].frame.y && artboards[i].frame.x != artboards[i - 1].frame.x ? artboards[i - 1].frame.x + artboards[i - 1].frame.width + 50 : artboards[i].frame.x,
                                y: artboards[i].frame.x == artboards[i - 1].frame.x || artboards[i].frame.y != artboards[i - 1].frame.y && artboards[i].frame.x != artboards[i - 1].frame.x ? artboards[i - 1].frame.y + artboards[i - 1].frame.height + 50 : artboards[i].frame.y,
                                width: newWidth,
                                height: newHeight
                            };
                        }
                        this.selectedCanva = artboards[i];
                        for (var element in artboards[i].layers) {
                            // add the necessary clearance for documentation
                            artboards[i].layers[element].parent = this.selectedCanva;
                            artboards[i].layers[element].frame = { x: artboards[i].layers[element].frame.x + clearanceWidth,
                                y: artboards[i].layers[element].frame.y + clearanceHeight,
                                width: artboards[i].layers[element].frame.width,
                                height: artboards[i].layers[element].frame.height };
                        }
                    }
                }
            }

            return resizeArtboard;
        }()

        /* Arrange Artboards 
        * Returns: Arranges the artboards in order of creation
        */

    }, {
        key: 'arrangeArtboards',
        value: function () {
            function arrangeArtboards() {
                var artboards = this.getElement('Artboard', false);
                var maxHeight = 0;
                var x = 0;
                var y = 0;
                var col = 0;
                artboards.forEach(function (artboard, index) {
                    col++;
                    if (index == 0) {
                        maxHeight = artboards[index].frame.height;
                    } else {
                        if (artboards[index].frame.height > maxHeight) {
                            maxHeight = artboards[index].frame.height;
                        };
                        x = col % 7 != 0 ? artboards[index - 1].frame.x + artboards[index - 1].frame.width + 100 : 0;
                        y = col % 7 != 0 ? artboards[index - 1].frame.y : maxHeight + 100;
                    }
                    artboards[index].frame = { x: x,
                        y: y };
                });
            }

            return arrangeArtboards;
        }()

        /* Prepare For Documentation
        * Prepares the selected artboards or all the artboards in the Sketch document for the Confluence documentation
        */

    }, {
        key: 'prepareForDocumentation',
        value: function () {
            function prepareForDocumentation() {
                this.resizeArtboard(1200, 700);
                this.arrangeArtboards();
                this.manageAnnotations();
            }

            return prepareForDocumentation;
        }()

        /* Prepare For Prototype
        * Prepares the selected artboards or all the artboards in the Sketch document for prototyping
        */

    }, {
        key: 'prepareForPrototype',
        value: function () {
            function prepareForPrototype() {
                this.manageAnnotations(true);
                this.ArtboardToFit();
                this.arrangeArtboards();
            }

            return prepareForPrototype;
        }()

        /* ----------------- Accessors ------------------ */

        /* Show Annotations
        * Shows all annotations from all artboards or from selected artboards only
        */

    }, {
        key: 'manageAnnotations',
        value: function () {
            function manageAnnotations() {
                var hidden = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                var ungroupedAnnotations = this.getAnnotations();
                var groupedAnnotations = this.findElement('Annotations');
                var annotations = ungroupedAnnotations.concat(groupedAnnotations);
                annotations.forEach(function (annotation) {
                    annotation.hidden = hidden;
                    if (!hidden) {
                        annotation.moveToFront();
                    };
                });
            }

            return manageAnnotations;
        }()

        /* Adjust Artboard to fit the content of its children
        * Returns: all artboards fit to the content of their children
        */

    }, {
        key: 'ArtboardToFit',
        value: function () {
            function ArtboardToFit() {
                var artboards = this.getElement('Artboard');
                for (element in artboards) {
                    this.selectedCanva = artboards[element];
                    this.selectedCanva.adjustToFit();
                }
            }

            return ArtboardToFit;
        }()

        /* Gets annotations in a selection or the whole document
        * Returns: annotations in a selection or all the annotations in a document
        */

    }, {
        key: 'getAnnotations',
        value: function () {
            function getAnnotations() {
                var artboards = this.getElement('Artboard');
                var annotations = [];
                for (element in artboards) {
                    this.selectedCanva = artboards[element];
                    for (symbol in artboards[element].layers) {
                        if (artboards[element].layers[symbol].name.includes("Annotation")) {
                            annotations.push(artboards[element].layers[symbol]);
                        }
                    }
                }
                return annotations;
            }

            return getAnnotations;
        }()

        /* Finds a layer by name
        * Returns: array of results
        */

    }, {
        key: 'findElement',
        value: function () {
            function findElement(name) {
                var results = [];
                results = this.document.getLayersNamed(name);
                return results;
            }

            return findElement;
        }()

        /* Get Selected Element
        * type: Artboard or other component
        * Returns: all artboards if no artboard is selected or the selected artboards
        */

    }, {
        key: 'getElement',
        value: function () {
            function getElement(type) {
                var selectedOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
                var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.page;

                var selectedElements = [];
                var allElements = [];
                list.layers.forEach(function (layer) {
                    if (layer.type == type) {
                        allElements.push(layer);
                        if (layer.selected && selectedOnly) {
                            selectedElements.push(layer);
                        }
                    }
                });
                if (selectedElements.length != 0 && selectedOnly) {
                    return selectedElements;
                } else {
                    return allElements;
                }
            }

            return getElement;
        }()

        /* Create Group
        * name: desired name of the group
        * layers: layers that need to be grouped
        * Returns: returns the group to be used
        */

    }, {
        key: 'createGroup',
        value: function () {
            function createGroup(name, layers) {
                var group = new Group({
                    parent: this.selectedCanva,
                    name: name,
                    layers: layers
                });
                return group;
            }

            return createGroup;
        }()

        /* Checks if layer is an artboard
        * layer: layer object
        * classCheck: if true checks if it is an MSArtboardGroup class, if false checks if it's an "Artboard" type. Depending on the object, it might need one or the other
        * Returns: true if it's an artboard
        */

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
}(); // end class

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
