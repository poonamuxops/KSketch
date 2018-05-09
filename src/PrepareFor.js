/* Command: Prepare For Documentation
*/


// let's get a hold on the Sketch API
const sketch = require('sketch');
const Component =  require('./lib/Component');

export default function(context) {

    var mysketch = new Component(context);
    
    var options = ['Prototype', 'Documentation'];
    var preparation =  sketch.UI.getSelectionFromUser('Are you preparing for Proto or Doc?', options);
    var ok = preparation[2];
    var value = options[preparation[1]];
    if (ok) {
        if (value == options[0]) {
            mysketch.prepareForPrototype();
        } else {
                mysketch.prepareForDocumentation();
        }
    }

}