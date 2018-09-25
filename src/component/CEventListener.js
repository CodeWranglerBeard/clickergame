var interfaces = interfaces || {}; 

/*
* A component to be given to entities to allow them to maintain a list of listeners that 
* can have given events broadcast to them. 
*/
interfaces.CEventListener = function() 
{
    Crafty.c("CEventListener", {
        init: function() {
            if (typeof this.triggerListeners === 'undefined') {
            	/**
                * @desc A list of listeners to notify of events. 
                */
                this.listeners = [];
            }

            if (typeof this.triggerListeners === 'undefined') {
                /*
                * Triggers the given event on all listeners
                * Events will be given as strings which the listeners will check for
                * @param {string} eventIn - The name of an event to notify listeners of. 
                */
                this.triggerListeners = function(eventIn) {
                    for(var i = this.listeners.length-1; i > -1; --i) {
                        var curListener = this.listeners[i];

                        curListener.listener.triggerEvent(eventIn, curListener.userData);
                    }
                };
            }

            if (typeof this.addListener === 'undefined') {
                /*
                * Adds the given listener, if it isn't already contained. 
                * @param {Object} obj - A listener to add. Expected format: { listener: obj, userData: <anything> }
                * @returns True, if the given listener could be added. 
                */
                this.addListener = function(obj) {
                    for(var i = this.listeners.length-1; i > -1; --i) {
                        if (this.listeners[i] == obj.listener) {
                            return false;
                        }
                    }
                    this.listeners.push(obj);

                    return true;
                };
            }

            if (typeof this.removeListener === 'undefined') {
                /*
                * Removes the given listener, if possible. 
                * @param {Object} - The listener to remove. 
                * @returns True, if the given listener could be removed. 
                */
                this.removeListener = function(obj) {
                    for(var i = this.listeners.length-1; i > -1; --i) {
                        if (this.listeners[i].listener == obj) {
                            this.listeners.splice(i, 1);

                            return true;
                        }
                    }
                    return false;
                };
            }
        },
    });
}