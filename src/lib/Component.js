// Loading all modules
const sketch = require('sketch');
const Artboard = sketch.Artboard;
const Rectangle = sketch.Rectangle;
const Shape = sketch.Shape;
const Style = sketch.Style;
const Text = sketch.Text;

class Component {
    
    constructor(context) {
        this.context = context;
        // We are passed a context variable when we're run. We use this to get hold of the native Sketch document and wrap it.
        this.document = sketch.fromNative(context.document)
    
        // Next we want to extract the selected page of the selected (front-most) document
        this.page = this.document.selectedPage;
        this.selectedCanva = this.page;
        
        // Check if there is an artboard selected
        var selection = context.selection;
        if (selection.count() != 0) {
            for(var i =0; i < selection.count(); i++) {
                if(this.isArtboard(selection[i])) {
                    this.selectedCanva = selection[i];
                }
            }
        }
    
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
            if(this.isArtboard(selectedLayers[i], classCheck)) {
                artboards.push(selectedLayers[i]);
            }
          }
          if(artboards) {
                sketch.export(artboards, {
                    scales: scalelist,
                    formats: formats,
                    output: '~/Documents/SketchExports/' + this.page.name
                });
          }  
            
        }
    } // end function
    
    /* Export all the artboards in a page
    * scalelist: takes a list of desired scaling in the form ('1,2, 3, etc') for x1, x2, x3 etc.
    * formats: provide a list of the desired formats in the form ('png, gif, so on')
    */
    exportPage(scalelist, formats) {

        var layers = this.page.layers;
        var artboards = [];
        if (layers.length != 0) {
            for (var i=0; i < layers.length; i++) {
                if (this.isArtboard(layers[i])) {
                    artboards.push(layers[i]);
                }
            }
            if (artboards) {
                const options = { scales: scalelist, formats: formats, output: '~/Documents/SketchExports/' + this.page.name};
                sketch.export(artboards, options);
            }
        }

    }
    
    // Check if layer is an artboard
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
}

module.exports = Component;