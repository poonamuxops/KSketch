/* Command: Arrange Artboards
*/


// let's get a hold on the Sketch API
const sketch = require('sketch');
const Component =  require('./lib/Component');

export default function(context) {

    var mysketch = new Component(context);
    mysketch.arrangeArtboards();

}