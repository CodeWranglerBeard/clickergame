<<<<<<< HEAD
/**
* Enum for interpolation locations. 
*/
=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
var EInterpLocations = {
    EInitial: 0,
    EHover: 1,
    EFull: 2
};

/**
* Represents a panel that interpolates between two positions, based on whether the cursor hovers over it. 
*/
Crafty.c("GameInterpPanel", 
{
    init: function()
    {
<<<<<<< HEAD
        this.requires("CBase, Mouse, CFocusable, Canvas, spr_panel_plain");
        this.attr({ w: 370, h: 545 });

        this.spriteSmallPanel = Crafty.e("CBase");
        this.spriteSmallPanel.requires("Canvas, Mouse, CIconable, spr_small_side_panel_plain");
        this.spriteSmallPanel.attr({ w: 72, h: 55 });
        this.spriteSmallPanel.x = this.x;
        this.spriteSmallPanel.y = this.y + this.spriteSmallPanel.w;
        this.spriteSmallPanel.rotation = 90;
        // this.spriteSmallPanel.reel("Idle", 1000, 0, 0, 1);
        // this.spriteSmallPanel.reel("Hover", 1000, 1, 0, 1);
        // this.spriteSmallPanel.reel("Down", 1000, 0, 1, 1);
        // this.spriteSmallPanel.animate("Idle");
        this.attach(this.spriteSmallPanel);

        // Sets what location to interpolate to. 
        this.interpTarget = EInterpLocations.EInitial;
=======
        this.textOffsetPercent = { w: 25, h: 20};

        this.requires("CBase, Mouse, spr_panel_plain");
        this.attr({ w: 370, h: 545 });

        this.spriteSmallPanel = Crafty.e("CBase");
        this.spriteSmallPanel.requires("Canvas, SpriteAnimation, spr_small_side_panel_plain");
        this.spriteSmallPanel.attr({ w: 144, h: 110 });
        this.spriteSmallPanel.rotation = 90;
        this.spriteSmallPanel.x = this.x - this.spriteSmallPanel.h;
        this.spriteSmallPanel.y = this.y - this.spriteSmallPanel.w;
        this.attach(this.spriteSmallPanel);

        // Sets what location to interpolate to. 
        this.targetLocation = EInterpLocations.EInitial;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        // The initial location to return to. 
        this.initialLocation = { x: 0, y: 0 };
        // The location to move to, when the panel is clicked. 
        this.fullLocation = { x: 0, y: 0 };
        // The location to move to, when the cursor hovers over this panel. 
        this.hoverLocation = { x: 0, y: 0 };

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
                }
            } else {
                return this._enabled;
            }
        };

<<<<<<< HEAD
=======
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
            this.spriteSmallPanel.setCenteredOnSelf(this._icon);
            this.attach(this._icon);
        };

>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        /**
        * Updates the location of this object. 
        */
        this.setLocation = function(x, y) {
            this.attr({ x: x, y: y });
<<<<<<< HEAD
            this.initialLocation = { x: x, y: y };
            this.fullLocation = { x: x, y: y };
            this.hoverLocation = { x: x, y: y };
=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        };

        /**
        * Updates the size of this object. 
        */
        this.setSize = function(w, h) {
            this.attr({ 
                w: (w * WORLD_SCALE), 
                h: (h * WORLD_SCALE) 
            });
        };

        /**
<<<<<<< HEAD
        * Sets the z index of this object and its child objects, based on the given z index. 
        * @returns The z index of the last set child object. 
        */
        this.setZ = function(z) {
            this.z = z++;
            this.spriteSmallPanel.z = z++;

            if (typeof this.spriteSmallPanel._icon !== 'undefined') {
                this.spriteSmallPanel._icon.z = z++;
            };

            return z;
        }

        /**
        * Sets the current icon to display, based on the given Crafty sprite object. 
        * @param {Object} sprite - A Crafty sprite component name. If undefined, clears the current icon. 
        */
        this.setIcon = function(sprite) {
            var marginMult = 0.3;
            var spriteScaled = {
                w: this.spriteSmallPanel.w * marginMult,
                h: this.spriteSmallPanel.h * marginMult
            };
            var iconSize = Math.min(
                Math.max(this.spriteSmallPanel.w - spriteScaled.w, spriteScaled.w), 
                Math.max(this.spriteSmallPanel.h - spriteScaled.h, spriteScaled.h)
            );
            this.spriteSmallPanel.setIcon(sprite, { w: iconSize, h: iconSize });
        };

        /**
=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        * Causes all button listeners to be notified that this button was pressed. 
        */
        this.press = function() {
            Crafty.trigger("ButtonPressed", this);

            this.fullMove = !this.fullMove;

            if (this.fullMove) {
<<<<<<< HEAD
                this.interpTarget = EInterpLocations.EFull;
            } else {
                this.interpTarget = EInterpLocations.EHover;
=======
                this.targetLocation = EInterpLocations.EFull;
            } else {
                this.targetLocation = EInterpLocations.EHover;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
            }
        };

        this.bind("MouseDown", function(e)
        {
            if (this._enabled) {
                this.getFocus();
            }
        });

<<<<<<< HEAD
        this.spriteSmallPanel.bind("MouseDown", function(e)
        {
            if (this.parent._enabled) {
                this.parent.getFocus();
            }
        });

=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        this.bind("MouseUp", function(e)
        {
            if (this._enabled) {
                this.getFocus();
                this.press();
            }
        });

<<<<<<< HEAD
        this.spriteSmallPanel.bind("MouseUp", function(e)
        {
            if (this.parent._enabled) {
                this.parent.getFocus();
                this.parent.press();
            }
        });

        this.bind("MouseOver", function(e)
        {
            if (this._enabled) {
                if (this.interpTarget != EInterpLocations.EFull) {
                    this.interpTarget = EInterpLocations.EHover;
                }
            }
        });

        this.spriteSmallPanel.bind("MouseOver", function(e)
        {
            if (this.parent._enabled) {
                if (this.parent.interpTarget != EInterpLocations.EFull) {
                    this.parent.interpTarget = EInterpLocations.EHover;
=======
        this.bind("MouseOver", function(e)
        {
            if (this._enabled) {
                if (this.targetLocation != EInterpLocations.EFull) {
                    this.targetLocation = EInterpLocations.EHover;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
                }
            }
        });

        this.bind("MouseOut", function(e)
        {
            if (this._enabled) {
<<<<<<< HEAD
                if (this.interpTarget != EInterpLocations.EFull) {
                    this.interpTarget = EInterpLocations.EInitial;
                }
            }
        });

        this.spriteSmallPanel.bind("MouseOut", function(e)
        {
            if (this.parent._enabled) {
                if (this.parent.interpTarget != EInterpLocations.EFull) {
                    this.parent.interpTarget = EInterpLocations.EInitial;
=======
                if (this.targetLocation != EInterpLocations.EFull) {
                    this.targetLocation = EInterpLocations.EInitial;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
                }
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

<<<<<<< HEAD
        this.spriteSmallPanel.bind("KeyDown", function(e) 
        {
            if (this.parent._enabled && this.parent.hasFocus)
            {
                if (e.key == Crafty.keys.ENTER) {
                    this.parent.press();
                }
            }
        });

=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        this.bind("EnterFrame", function(data) {
            var distDelta = {x: 0, y: 0};
            var goalLocation = {x: 0, y: 0};

<<<<<<< HEAD
            if (this.interpTarget == EInterpLocations.EInitial) {
                goalLocation = this.initialLocation;
            } else if (this.interpTarget == EInterpLocations.EHover) {
                goalLocation = this.hoverLocation;
            } else if (this.interpTarget == EInterpLocations.EFull) {
=======
            if (this.targetLocation == EInterpLocations.EInitial) {
                goalLocation = this.initialLocation;
            } else if (this.targetLocation == EInterpLocations.EHover) {
                goalLocation = this.hoverLocation;
            } else if (this.targetLocation == EInterpLocations.EFull) {
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
                goalLocation = this.fullLocation;
            } 
            distDelta.x = goalLocation.x - this.x;
            distDelta.y = goalLocation.y - this.y;
<<<<<<< HEAD

            this.x += distDelta.x / Math.pow(2, 2);
            this.y += distDelta.y / Math.pow(2, 2);
=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        });
    },
});