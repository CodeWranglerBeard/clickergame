// Include namespaces. 
var interfaces = interfaces || {}; 

/**
* @namespace
* @desc A component that offers some basic and common operations for ui elements. 
* The members provided by this component can be locally overridden by the implementing objects. 
*/
interfaces.CFocusable = function() 
{
    Crafty.c("CFocusable", 
    {
        init: function() {
            /**
            * @desc Crafty component includes. 
            * @private 
            */
            this.requires("2D");

            if (typeof this.initOffset === 'undefined') {
                /** 
                * @desc Initial position of the object, in coordinates. 
                * @memberof interfaces.CFocusable
                * @public
                */
                this.initOffset = { x: 0, y: 0 }; 
            }

            if (typeof this.hasFocus === 'undefined') {
                /**
                * @desdc If true, will receive user input. 
                * @memberof interfaces.CFocusable
                * @public
                */
                this.hasFocus = false;
            }

            if (typeof this.loseFocus === 'undefined') {
                /**
                * Causes this ui element to lose focus. 
                * @memberof interfaces.CFocusable
                * @public
                */
                this.loseFocus = function() {
                    if (this.hasFocus) {
                        console.log("Lost focus:");
                        console.log(this);
                    }

                    this.hasFocus = false;
                };
            }

            if (typeof this.getFocus === 'undefined') {
                /**
                * Causes this ui element to gain focus. 
                * @memberof interfaces.CFocusable
                * @public
                */
                this.getFocus = function() {
                    Crafty("CFocusable").each(function() {
                        this.loseFocus();
                    });

                    this.hasFocus = true;
                    console.log("Gained focus:");
                    console.log(this);
                };
            }
        },
    });
}();