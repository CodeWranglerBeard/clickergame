/**
* @desc Parses namespace strings and automatically generates nested namespaces. 
* @param {Object} ns - The namespace to extend. 
* @param {String} nsString - A string based on which to generate the nested namespaces. 
* @return {Object} - The parent namespace. 
* @author Stoyan Stefanov
* @see http://www.amazon.com/JavaScript-Patterns-Stoyan-Stefanov/dp/0596806752
*/
function extendNs(ns, nsString) {
    var parts = nsString.split('.');
    var parent = ns;
    var pl;
    var i;

    if (parts[0] == "myApp") {
        parts = parts.slice(1);
    }

    pl = parts.length;
    for (i = 0; i < pl; i++) {
        // Create property if it doesn't exist. 
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
};