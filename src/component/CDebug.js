var interfaces = interfaces || {}; 

/** 
* @desc A component that offers basic debug drawing capabilities. 
* @namespace 
* @public
*/
interfaces.CDebug = function() 
{
    Crafty.c("CDebug", 
    {
        init: function() {
            if (typeof this.lDebugDraw === 'undefined') {
                /** 
                * @desc Array for debug draw objects. 
                * @memberof interfaces.CDebug
                * @private
                */
                this.lDebugDraw = [];
            }
        
            if (typeof this.showDebugDraw === 'undefined') {
                /** 
                * @desc Draws in the bounds of this object. 
                * @memberof interfaces.CDebug
                * @public
                */
                this.showDebugDraw = function() 
                {
                    this.hideDebugDraw();
                    var lineWidth = 5 * worldScale; // Width of the lines. 

                    this.lDebugDraw.push(
                        Crafty.e("2D, Canvas, Color")
                        .attr({ x: this.x, y: this.y, w: this.w, h: lineWidth })
                        .color("blue")
                    );
                    this.lDebugDraw.push(
                        Crafty.e("2D, Canvas, Color")
                        .attr({ x: this.x, y: this.y + this.h - lineWidth, w: this.w, h: lineWidth })
                        .color("red")
                    );
                    this.lDebugDraw.push(
                        Crafty.e("2D, Canvas, Color")
                        .attr({ x: this.x, y: this.y, w: lineWidth, h: this.h })
                        .color("green")
                    );
                    this.lDebugDraw.push(
                        Crafty.e("2D, Canvas, Color")
                        .attr({ x: this.x + this.w - lineWidth, y: this.y, w: lineWidth, h: this.h })
                        .color("yellow")
                    );
                };
            }

            if (typeof this.hideDebugDraw === 'undefined') {
                /** 
                * @desc Hides the debug drawing. 
                * @memberof interfaces.CDebug
                * @public
                */
                this.hideDebugDraw = function()
                {
                    for (var i = this.lDebugDraw.length - 1; i >= 0; i--) {
                        this.lDebugDraw[i].destroy();
                    };
                };
            }
        },
    });
}();