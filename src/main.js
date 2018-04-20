// Hello World, by Sam Deane — Source code available at [GitHub](https://github.com/BohemianCoding/SketchAPI/tree/develop/examples/hello-world)
//
// This is an extremely simple plugin example, which illustrates how to add a menu command to the Plugins menu
// and execute some code when it is selected.

// let's get a hold on the Sketch API
const sketch = require('sketch');
const Component =  require('./lib/Component');

export default function(context) {

    var mysketch = new Component(context);
    
    // Create an artboard
    var userInput = sketch.UI.getStringFromUser('Enter a name for the artboard', 'type here...');
    var artboard = mysketch.addArtboard(userInput);
    
    // Create a text layer
    var userInput = sketch.UI.getStringFromUser('Enter a text to display in the artboart', 'type here...');
    mysketch.addText(userInput);
    
    // Create a rectangle
    var userInput = sketch.UI.getStringFromUser('Enter name for rectangle', 'type here...');
    mysketch.addRectangle(userInput, 0, 0, 100, 100, '#555555'); 

}