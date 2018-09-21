/**
* Represents a button the user can click. 
*/
Crafty.c("GameButton", 
{
    init: function()
    {
        this.textOffsetPercent = { w: 27, h: 26};

        this.requires("CBase, Mouse, CFocusable");
        this.attr({ w: 260, h: 70 });

        this.sprite = Crafty.e("CBase");
        this.sprite.requires("Canvas, SpriteAnimation, spr_button_small");
        this.sprite.attr({ w: this.w, h: this.h });
        this.sprite.reel("Idle", 1000, 0, 1, 1);
        this.sprite.reel("Hover", 1000, 1, 0, 1);
        this.sprite.reel("Down", 1000, 0, 0, 1);
        this.sprite.animate("Idle");

        this.textComp = Crafty.e("CBase");
        this.textComp.requires("DOM, Text");
        this.textComp.textFont($text_css);
        this.textComp.attr({w: this.w, h: this.h});

        /**
        * Gets or sets the text to display on the button. 
        * @param {String} newText - Optional: The text to display on the button. 
        */
        this.text = function(text) {
            if (typeof text !== 'undefined') {
                this.textComp.text(text);
            } else {
                return this.textComp.text;
            }
        }
        this.text("Klick' Mich");

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

        // If not null or empty, the sprite to display as an icon in the center of the button. 
        this._icon = undefined;
        /**
        * Sets the current icon to display, based on the given Crafty sprite object. 
        * @param {Object} sprite - A Crafty sprite component name. If undefined, clears the current icon. 
        */
        this.setIcon = function(sprite) {
            if (typeof sprite === 'undefined') {
                this._icon.destroy();
                this._icon = undefined;
            }
            if (typeof this._icon !== 'undefined') {
                this._icon.destroy();
                this._icon = undefined;
            }

            this._icon = Crafty.e("CBase, Canvas, " + sprite);
            this.setCenteredOnSelf(this._icon);
        };

        /**
        * Updates the location of this object. 
        */
        this.setLocation = function(x, y) {
            this.attr({ x: x, y: y });
            this.sprite.attr({ x: this.x, y: this.y });
            this.textComp.setLocation(
                this.x + ((this.w / 100) * this.textOffsetPercent.w),
                this.y + ((this.h / 100) * this.textOffsetPercent.h)
            );
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
            this.textComp.setSize(
                (this.w / 100) * this.textOffsetPercent.w,
                (this.h / 100) * this.textOffsetPercent.h
            );
        };

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