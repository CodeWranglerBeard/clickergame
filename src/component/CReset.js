var interfaces = interfaces || {}; 

/**
* @desc An interface to be given to entities to allow them to be reset to their level init Position. 
* @namespace
*/
interfaces.CReset = function() 
{
    Crafty.c("CReset", 
    {
        init: function() 
        {
            if (typeof this.resetPos === 'undefined') {
                /**
                * @desc Position to place the object at when it is reset. 
                * @memberof interfaces.CReset
                * @private
                */
                this.resetPos = { x: 0, y: 0 };
            }
        
            if (typeof this.reset === 'undefined') {
                /**
                * @desc Resets the entity. 
                * @memberof interfaces.CReset
                * @public
                */
                this.reset = function() {
                    this.x = this.resetPos.x;
                    this.y = this.resetPos.y;
                };
            }

            if (typeof this.setResetPos === 'undefined') {
                /**
                * @desc Overrides the current reset coordinates. 
                * @memberof interfaces.CReset
                * @public
                */
                this.setResetPos = function(xIn, yIn) {
                    this.resetPos.x = xIn;
                    this.resetPos.y = yIn;
                };
            }
        },
    });
}();