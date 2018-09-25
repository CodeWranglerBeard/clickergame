// Include namespaces. 
var interfaces = interfaces || {}; 

/**
* @namespace
* @desc A component that offers some basic and common operations. 
* The members provided by this component can be locally overridden by the implementing objects. 
*/
interfaces.CBase = function() 
{
    Crafty.c("CBase", 
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
                * @memberof interfaces.CBase
                * @public
                */
                this.initOffset = { x: 0, y: 0 }; 
            }

            if (typeof this.setLocation === 'undefined') {
                /** 
                * @desc Sets the absolute position coordinates of this object. 
                * @memberof interfaces.CBase
                * @param {Number} x - X coordinate to position the object at. 
                * @param {Number} y - Y coordinate to position the object at. 
                * @public
                */
                this.setLocation = function(x, y) {
                    this.attr({ x: x, y: y });
                };
            }

            if (typeof this.setSize === 'undefined') {
                /** 
                * @desc Overrides the scaling of this object. 
                * Takes world scale into consideration. 
                * @memberof interfaces.CBase
                * @param {Number} w - Width to set for the object. 
                * @param {Number} h - Height to set for the object
                * @public
                */
                this.setSize = function(w, h) {
                    this.attr({ w: (w * WORLD_SCALE) + 1, h: (h * WORLD_SCALE) + 1 }); // plus 1 to stuff gaps between blocks. 
                };
            }

            if (typeof this.movePosition === 'undefined') {
                /** 
                * @desc Sets the position coordinates of this object, relative to its current 
                * position coordinates. 
                * @memberof interfaces.CBase
                * @param {Number} x - X coordinate to move the position of the object by. 
                * @param {Number} y - Y coordinate to move the position of the object by. 
                * @public
                */
                this.movePosition = function(x, y) {
                    this.attr({ x: this.x + x, y: this.y + y });
                };
            }

            if (typeof this.setInitOffset === 'undefined') {
                /** 
                * @desc Sets the initilization offset of this object. 
                * @memberof interfaces.CBase
                * @param {Number} x - X coordinate to set the initial position of the object to. 
                * @param {Number} y - Y coordinate to set the initial position of the object to. 
                * @public
                */
                this.setInitOffset = function(x, y) {
                    this.initOffset = { x: x, y: y };
                };
            }

            if (typeof this.setCenteredOnSelf === 'undefined') {
                /** 
                * @desc Centers the given object on this object. 
                * @memberof interfaces.CBase
                * @param {Object} obj - The object to center on this object. 
                * @public
                */
                this.setCenteredOnSelf = function(obj) {
                    obj.x = this.x + ((this.w - obj.w) / 2);
                    obj.y = this.y + ((this.h - obj.h) / 2);
                };
            }

            if (typeof this.setZ === 'undefined') {
                /**
                * @desc Sets the z index of this object. 
                * @memberof interfaces.CBase
                * @param {int} z - The index to set. 
                * @public
                * @returns The z index of the last object set. 
                */
                this.setZ = function(z) {
                    this.z = z++;

                    return z;
                };
            };
        },
    });
}();