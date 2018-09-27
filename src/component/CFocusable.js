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
                        Crafty.trigger("OnLostFocus", this);
                        if (DEBUG) { console.log("lost focus"); }
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
                    var _this = this;
                    Crafty("CFocusable").each(function(_this) {
                        if (this == _this) {
                            return;
                        }
                        this.loseFocus();
                    });

                    this.hasFocus = true;
                    if (DEBUG) { console.log("got focus"); }
                    Crafty.trigger("OnGotFocus", this);
                };
            }
        },
    });
}();