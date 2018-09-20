// Include namespaces. 
var utility = utility || {};

/** 
* @namespace
* @desc Static global object that provides access to common mathematical operations. 
*/
utility.Reflection = {

    /**
    * Returns the name of a property of the given object which has the given value. 
    * Will not work if there are multiple properties with the same value. 
    * @param prop - The object whose property name to return. 
    * @param value - The value of the property to return. 
    */
    getPropertyName: function(prop, value) {
       var res = '';
        for (var i in prop) {
            if (typeof prop[i] == 'object') {
                if (propName(prop[i], value)) {
                    return res;
                }
            } else {
                if (prop[i] == value) {
                    res = i;
                    return res;
                }
            }
        }
        return undefined;
    },
};