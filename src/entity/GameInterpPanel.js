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

        /**
        * Updates the location of this object. 
        */
        this.setLocation = function(x, y) {
            this.attr({ x: x, y: y });
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
        * Causes all button listeners to be notified that this button was pressed. 
        */
        this.press = function() {
            Crafty.trigger("ButtonPressed", this);

            this.fullMove = !this.fullMove;

            if (this.fullMove) {
                this.targetLocation = EInterpLocations.EFull;
            } else {
                this.targetLocation = EInterpLocations.EHover;
            }
        };

        this.bind("MouseDown", function(e)
        {
            if (this._enabled) {
                this.getFocus();
            }
        });

        this.bind("MouseUp", function(e)
        {
            if (this._enabled) {
                this.getFocus();
                this.press();
            }
        });

        this.bind("MouseOver", function(e)
        {
            if (this._enabled) {
                if (this.targetLocation != EInterpLocations.EFull) {
                    this.targetLocation = EInterpLocations.EHover;
                }
            }
        });

        this.bind("MouseOut", function(e)
        {
            if (this._enabled) {
                if (this.targetLocation != EInterpLocations.EFull) {
                    this.targetLocation = EInterpLocations.EInitial;
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

        this.bind("EnterFrame", function(data) {
            var distDelta = {x: 0, y: 0};
            var goalLocation = {x: 0, y: 0};

            if (this.targetLocation == EInterpLocations.EInitial) {
                goalLocation = this.initialLocation;
            } else if (this.targetLocation == EInterpLocations.EHover) {
                goalLocation = this.hoverLocation;
            } else if (this.targetLocation == EInterpLocations.EFull) {
                goalLocation = this.fullLocation;
            } 
            distDelta.x = goalLocation.x - this.x;
            distDelta.y = goalLocation.y - this.y;
        });
    },
});