/**
* A bar that represents a mortal entity's health. 
*/
Crafty.c("LifeBar", 
{
    init: function()
    {
        this.requires("CBase, CMortal");
        this.attr({ w: 125, h: 30 });

        this.sprite = Crafty.e("CBase");
        this.sprite.requires("Canvas, spr_lifebar");
        this.sprite.attr({ w: this.w, h: this.h });
        this.attach(this.sprite);

        // Multipliers for x and y offset of the fill bar of the life bar. 
        // Also affects the width and height of the fill bar. 
        this.marginMult = { x: 0.05, y: 0 };

        /**
        * Returns the margin to for the fill bar. 
        */
        this.getFillMargin = function() {
            return { 
                x: this.w * this.marginMult.x, 
                y: this.h * this.marginMult.y
            };
        };

        this.fill = Crafty.e("CBase");
        this.fill.requires("Canvas, Color");
        this.fill.color("#4afc44");
        var fillDelta = this.getFillMargin();
        this.fill.attr({ 
            x: fillDelta.x,
            y: fillDelta.y,
            w: this.w - fillDelta.x * 2, 
            h: this.h - fillDelta.y * 2
        });
        this.attach(this.fill);


        // The minimum value of the life bar. 
        this._min = 0;
        /**
        * Gets or sets the minimum value of the lifebar. 
        * Clamps to maximum. 
        * @param {Number} min - Optional: The value to set. 
        */
        this.min = function(min) {
            if (typeof min !== 'undefined') {
                this._min = min;

                if (min >= this._max) {
                    min = this._max - 1;
                }
            } else {
                return this._min;
            }
        };

        // The maximum value of the life bar. 
        this._max = 100;
        /**
        * Gets or sets the maximum value of the lifebar. 
        * Clamps to minimum. 
        * @param {Number} max - Optional: The value to set. 
        */
        this.max = function(max) {
            if (typeof max !== 'undefined') {

                if (max <= this._min) {
                    max = this._min + 1;
                }
                this._max = max;
            } else {
                return this._max;
            }
        };

        // The current value the life bar is at. 
        this._value = 0;
        
        /**
        * Gets or sets the fill value. 
        * @param {Number} value - Optional: The value to set. 
        */
        this.value = function(value) {
            if (typeof value !== 'undefined') {
                this._value = value;

                if (this._value > 0) {
                    var range = this._max - this._min;

                    if (range == 0) { return; }

                    var mult = this._value / range;
                    this.fill.attr({ w: (this.w - (this.getFillMargin().x * 2)) * mult });
                } else {
                    this.fill.attr({ w: 0 });
                }
            } else {
                return this._value;
            }
        };

        /**
        * Sets the z index of this object and its child objects, based on the given z index. 
        * @returns The z index of the last set child object. 
        */
        this.setZ = function(z) {
            this.z = z++;
            this.fill.z = z++;
            this.sprite.z = z++;

            return z;
        };
    },
});