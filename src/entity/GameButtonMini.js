/**
* Represents a button the user can click. 
* Can not display text. 
*/
Crafty.c("GameButtonMini", 
{
    init: function()
    {
        this.requires("CBase, Mouse, CFocusable");
        this.attr({ w: 36, h: 28 });

        this.sprite = Crafty.e("CBase");
        this.sprite.requires("Canvas, SpriteAnimation, spr_button_mini_sheet");
        this.sprite.attr({ w: this.w, h: this.h });
        this.sprite.reel("Idle", 1000, 0, 0, 1);
        this.sprite.reel("Hover", 1000, 1, 0, 1);
        this.sprite.reel("Down", 1000, 0, 1, 1);
        this.sprite.animate("Idle");
        this.attach(this.sprite);

        // If false, will not accept user input. 
        this._enabled = true;
        /**
        * Gets or sets whether to accept user input. 
        * @param {Bool} enabled - Whether to accept user input. 
        */
        this.enabled = function(enabled) {
            if (typeof enabled !== 'undefined') {
                this._enabled = enabled;

                if (!this._enabled) {
                    this.loseFocus();
                    this.sprite.animate("Idle", 1);
                }
            } else {
                return this._enabled;
            }
        };

        /**
        * Updates the location of this object. 
        */
        this.setLocation = function(x, y) {
            this.attr({ x: x, y: y });
            this.sprite.attr({ x: this.x, y: this.y });
        };

        /**
        * Updates the size of this object. 
        */
        this.setSize = function(w, h) {
            this.attr({ 
                w: (w * WORLD_SCALE), 
                h: (h * WORLD_SCALE) 
            });
            this.sprite.attr({ w: this.w, h: this.h });
        };

        /**
        * Sets the z index of this object and its child objects, based on the given z index. 
        * @returns The z index of the last set child object. 
        */
        this.setZ = function(z) {
            this.z = z++;
            this.sprite.z = z++;

            return z;
        }

        /**
        * Causes all button listeners to be notified that this button was pressed. 
        */
        this.press = function() {
            Crafty.trigger("ButtonPressed", this);
        };

        this.bind("MouseDown", function(e)
        {
            if (this._enabled) {
                this.getFocus();
                this.sprite.animate("Down");
            }
        });

        this.bind("MouseUp", function(e)
        {
            if (this._enabled) {
                this.getFocus();
                this.sprite.animate("Hover");
                this.press();
            }
        });

        this.bind("MouseOver", function(e)
        {
            if (this._enabled) {
                this.sprite.animate("Hover");
            }
        });

        this.bind("MouseOut", function(e)
        {
            if (this._enabled) {
                this.sprite.animate("Idle");
            }
        });

        this.bind("KeyDown", function(e) 
        {
            if (this._enabled && this.hasFocus)
            {
                if (e.key == Crafty.keys.ENTER) {
                    this.press();
                }
            }
        });
    },
});