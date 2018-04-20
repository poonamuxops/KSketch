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
    
    // Add an artboard and select it upon creation
    addArtboard(name, width = 200, height = 200) {
        var artboard = new Artboard({
              parent: this.page,
              name: name,
              frame: new Rectangle(0,0, width, height)
              
        });
        this.selectedCanva = artboard;
        return artboard;
    }
    
    // Add a text layer
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
    
    // Add a rectangle
     addRectangle(name, x, y, width = 50, height = 50, color = '#ffffff') {
         const rectangle = new Shape({
            parent: this.selectedCanva,
            name: name,
            frame: new Rectangle(x, y, width, height),
            style: { fills: [{ color: color, fillType: Style.FillType.color}] }
         });
         this.document.centerOnLayer(rectangle);
    }
    
    // Check if layer is an artboard
    isArtboart(layer) {
        if (layer.class() == "MSArtboardGroup") {
            return true;
        }
        else {
            return false;
        }
    }
}

module.exports = Component;