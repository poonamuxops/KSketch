/* Command: Export selected artboards to images
*/


// let's get a hold on the Sketch API
const sketch = require('sketch');
const Component =  require('./lib/Component');

export default function(context) {

    var mysketch = new Component(context);

    var scales = sketch.UI.getStringFromUser('Enter image scales separated by comas', 'example: 1, 2, 3');
    var formats = sketch.UI.getStringFromUser('Enter image formats separated by comas', 'example: png, jpg, pdf, svg');
    mysketch.exportArtboards(scales, formats);

}