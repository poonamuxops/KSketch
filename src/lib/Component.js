// Loading all modules
const sketch = require('sketch');
const Artboard = sketch.Artboard;
const Rectangle = sketch.Rectangle;
const Shape = sketch.Shape;
const Style = sketch.Style;
const Text = sketch.Text;
const Group = sketch.Group;

class Component {
    
    constructor(context) {
        this.context = context;
        // We are passed a context variable when we're run. We use this to get hold of the native Sketch document and wrap it.
        this.document = sketch.fromNative(context.document)
    
        // Next we want to extract the selected page of the selected (front-most) document
        this.page = this.document.selectedPage;
        this.selectedCanva = this.page;
    
    }
    
    /* Add an artboard and select it upon creation
    * name: takes the name as an input
    * width and height: defined in px, default is 200px
    */
    
    addArtboard(name, width = 200, height = 200) {
        var artboard = new Artboard({
              parent: this.page,
              name: name,
              frame: new Rectangle(0,0, width, height)
              
        });
        this.selectedCanva = artboard;
        return artboard;
    }
    
    /* Add a text layer 
    * text: takes the text as an input
    */
    
     addText(text) {
      
        const layer = new sketch.Text({
          parent: this.selectedCanva,
          name: 'text',
          alignment: Text.Alignment.center,
          text: text,
        })       
        // ...resize it so that the text just fits...
        layer.adjustToFit();

        // Finally, lets center the view on our new layer
        // so that we can see where it is.
        this.document.centerOnLayer(layer);
    }
    
    /* Add a rectangle
    * name: name of the rectangle
    * x, y: where should the rectangle be positioned - position at 0, 0
    * width: desired width of the rectangle
    * height: desired height of the rectangle
    * color: desired fill color of the rectangle
    */
    
     addRectangle(name, x, y, width = 50, height = 50, color = '#ffffff') {
         const rectangle = new Shape({
            parent: this.selectedCanva,
            name: name,
            frame: new Rectangle(x, y, width, height),
            style: { fills: [{ color: color, fillType: Style.FillType.color}] }
         });
         this.document.centerOnLayer(rectangle);
    }
    
    /* Export artboards to images
    * scalelist: takes a list of desired scaling in the form ('1,2, 3, etc') for x1, x2, x3 etc.
    * formats: provide a list of the desired formats in the form ('png, gif, so on')
    */
    exportArtboards(scalelist, formats) {
        
        var artboards = this.getElement('Artboard');
        if(artboards) {
                sketch.export(artboards, {
                    scales: scalelist,
                    formats: formats,
                    output: '~/Documents/SketchExports/' + this.page.name
                });
          }  
    } // end function
    
    
    /* Resize Artboards
    * newWidth: takes the new desired width of the artboards
    * newHeight: the new desired height of the artboards
    * clearanceWidth: leaves horizontal margins from the left - defaulted to 100
    * clearanceHeight: vertical margins from the top - defaulted to 50
    * Returns: all artboards if no artboard is selected or the selected artboards
    */
    resizeArtboard(newWidth, newHeight, clearanceWidth = 100, clearanceHeight = 50) {
        var artboards = this.getElement('Artboard');

        for (var i= 0; i < artboards.length; i++) {
            if (artboards[i].frame.width != newWidth && artboards[i].frame.height != newHeight) {
                if (i == 0) { // for the first element don't adjust position
                    artboards[i].frame = { width: newWidth,
                                           height: newHeight 
                    };
                }  else { // move the artboards upon resize
                    artboards[i].frame = { x: (artboards[i].frame.y == artboards[i-1].frame.y || (artboards[i].frame.y != artboards[i-1].frame.y && artboards[i].frame.x != artboards[i-1].frame.x ))? artboards[i-1].frame.x + artboards[i-1].frame.width + 50: artboards[i].frame.x,
                                           y: (artboards[i].frame.x == artboards[i-1].frame.x || (artboards[i].frame.y != artboards[i-1].frame.y && artboards[i].frame.x != artboards[i-1].frame.x ))? artboards[i-1].frame.y + artboards[i-1].frame.height + 50: artboards[i].frame.y,
                                           width: newWidth,
                                           height: newHeight 
                    };                     

                }
                this.selectedCanva = artboards[i];
                for (var element in artboards[i].layers) { // add the necessary clearance for documentation
                    artboards[i].layers[element].parent = this.selectedCanva;
                    artboards[i].layers[element].frame = {x: artboards[i].layers[element].frame.x + clearanceWidth, 
                          y: artboards[i].layers[element].frame.y + clearanceHeight, 
                          width: artboards[i].layers[element].frame.width, 
                          height: artboards[i].layers[element].frame.height }
                }
                
            }
        }
    }
    
    /* Arrange Artboards 
    * Returns: Arranges the artboards in order of creation
    */
    arrangeArtboards() {
        var artboards = this.getElement('Artboard');
        var maxHeight = 0;
        var x = 0;
        var y = 0;
        var col = 0;
        artboards.forEach((artboard, index) => {
           col++;
           if (index == 0) {
               maxHeight = artboards[index].frame.height;
               x = (artboards[index].index == 1)? 0: artboards[index].x;
               x = (artboards[index].index == 1)? 0: artboards[index].y;
           }
           else  {
               if (artboards[index].frame.height > maxHeight) { maxHeight = artboards[index].frame.height };
               x = (col%7 != 0)? artboards[index-1].frame.x + artboards[index-1].frame.width + 100: 0;
               y = (col%7 != 0)? artboards[index-1].frame.y: maxHeight + 100;
           }
           artboards[index].frame = {x: x,
                                    y: y};
        });
    }
    
    prepareForDocumentation() {
        this.resizeArtboard(1200, 700);
        //this.showAnnotations();
        this.arrangeArtboards();
    }
    
    prepareForPrototype() {
        //this.hideAnnotations();
        this.ArtboardToFit();
        this.arrangeArtboards();
    }
    
    /* ----------------- Accessors ------------------ */
    
    /* Hide Annotations 
    * Hides all annotations from all artboards or from selected artboards only
    */
    hideAnnotations() {
        /*var annotations = this.getAnnotations();
        for (annotation in annotations) {
            if (annotations[annotation].frame.width > 1 && annotations[annotation].frame.height > 1) {
                annotations[annotation].frame = {width: annotations[annotation].frame.width/1000000, height: annotations[annotation].frame.height/1000000};
            }
        }*/
        this.page.layers.forEach(layer => {
            if (layer.layers) {
                layer.layers.forEach(element=> {
                    //if (element.name.includes("Annotation")) {
                    if(!element.hidden) { log('hello');} else {log('what');}
                    //}
                })
            }
  
        });
    }
    
    
    /* Show Annotations
    * Shows all annotations from all artboards or from selected artboards only
    */
    showAnnotations() {
        var annotations = this.getAnnotations();
        for (annotation in annotations) {
            if (annotations[annotation].frame.width < 1 && annotations[annotation].frame.height < 1) {
                annotations[annotation].frame = {width: annotations[annotation].frame.width*1000000, height: annotations[annotation].frame.height*1000000};
            }
        }
    }
    
    
    
    /* Adjust Artboard to fit the content of its children
    * Returns: all artboards fit to the content of their children
    */
    ArtboardToFit() {
        var artboards = this.getElement('Artboard');
        for (element in artboards) {
            this.selectedCanva = artboards[element];
            this.selectedCanva.adjustToFit();    
        }
    }
    
    
    /* Gets annotations in a selection or the whole document
    * Returns: annotations in a selection or all the annotations in a document
    */
    getAnnotations() {
        var artboards = this.getElement('Artboard');
        var annotations = [];
        for (element in artboards) {
            this.selectedCanva = artboards[element];
            for (symbol in artboards[element].layers) {
                if(artboards[element].layers[symbol].name.includes("Annotation")) {
                    annotations.push(artboards[element].layers[symbol]);
                }
            } 
        }
        return annotations;
       
    }
    
    /* Get Selected Element
    * type: Artboard or other component
    * Returns: all artboards if no artboard is selected or the selected artboards
    */
    getElement(type) {
        var artboards = [];
        var artboardsAll = [];
        this.page.layers.forEach(layer=> {
            if (layer.type == type) {
                artboardsAll.push(layer);
                if (layer.selected) {
                    artboards.push(layer);
                }
            }
        });
        if (artboards.length != 0) { return artboards; } else { return artboardsAll; }
    }
    
    
    /* Create Group
    * name: desired name of the group
    * layers: layers that need to be grouped
    * Returns: returns the group to be used
    */
    createGroup(name, layers) {
        var group = new Group({
           parent: this.selectedCanva,
           name: name,
           layers: layers
        });
        return group;
    }
    
    /* Checks if layer is an artboard
    * layer: layer object
    * classCheck: if true checks if it is an MSArtboardGroup class, if false checks if it's an "Artboard" type. Depending on the object, it might need one or the other
    * Returns: true if it's an artboard
    */
    isArtboard(layer, classCheck = true) {
        var type = '';
        if (classCheck) { type = layer.class(); } else { type = layer.type; }
        if (type == "MSArtboardGroup" || type == "Artboard") {
            return true;
        }
        else {
            return false;
        }
    }
        
        
} // end class

module.exports = Component;