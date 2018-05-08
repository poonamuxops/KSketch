/* Main.js 
Contains the run-time scripts for testing purposes mainly but not for publishing
*/

// let's get a hold on the Sketch API
const sketch = require('sketch');
const Component =  require('./lib/Component');

export default function(context) {

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
    
    //mysketch.resizeArtboard(1200, 700);
    //mysketch.getAnnotations();
    //mysketch.showAnnotations();
    mysketch.hideAnnotations();
   // mysketch.showAnnotations();
    //mysketch.getElement('Artboard');
    //mysketch.arrangeArtboards();
    
}