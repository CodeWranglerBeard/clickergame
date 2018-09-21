/**
* Represents a text field the user can click (focus) and enter text into. 
*/
Crafty.c("GameTextField", 
{
    init: function()
    {
        this.padding = 5;
        this.textOffsetPercent = { w: 17, h: 20};

        this.requires("CBase, Canvas, spr_textpanel, Mouse, CFocusable");
        this.attr({ w: 310, h: 50 });

        this.textComp = Crafty.e("CBase");
        this.textComp.requires("DOM, Text");
        this.textComp.textFont($text_css);
        this.textComp.setInitOffset();
        this.textComp.attr({ 
            w: this.w - (this.padding * 2), 
            h: this.h - (this.padding * 2)
        });

        // If true, will receive user input. 
        this.hasFocus = false;
        // Default text to show if no text has been entered yet. 
        this.textHint = "Hier Eingeben";
        // The actually displayed text. Initialize with default. 
        this.textComp.text(this.textHint);
        // The text the user entered. 
        this.textBehind = "";
        // Maximum text length the user can enter. A value of 0 or less means infinite. Default 255. 
        this.textMax = 255;
        // If not empty, this is the text to show instead of the actually entered text. 
        this.passwordChar = "";
        // Interval to toggle text mark, in milliseconds. 
        this.textMarkInterval = 800;
        // Elapsed time since last text mark toggle. 
        this.textMarkDelta = 0;
        // If true, the text mark is currently shown. 
        this.textMarkVisible = false;

        /**
        * Causes this ui element to lose focus. 
        */
        this.loseFocus = function() {
            if (this.hasFocus) {
                console.log("Lost focus:");
                console.log(this);
            }

            this.hasFocus = false;
            this.updateShownText();
        };

        /**
        * Causes this ui element to gain focus. 
        */
        this.getFocus = function() {
            Crafty("CFocusable").each(function() {
                this.loseFocus();
            });

            this.hasFocus = true;
            this.updateShownText();
            console.log("Gained focus:");
            console.log(this);
        };

        /**
        * Updates the actual text. 
        */
        this.updateShownText = function() {
            var textToShow = "";

            if (this.textBehind.length == 0) {
                if (this.hasFocus) {
                    textToShow = "";
                } else {
                    textToShow = this.textHint;
                }
            } else {
                if (this.passwordChar.length == 0) {
                    textToShow = this.textBehind;
                } else {
                    textToShow = this.textBehind.replace(/./g, this.passwordChar);
                }
            }
            if (this.hasFocus && this.textMarkVisible) {
                textToShow = textToShow + "|";
            }
            this.textComp.text(textToShow);
        };

        /**
        * Updates the location of this object. 
        */
        this.setLocation = function(x, y) {
            this.attr({ x: x, y: y });
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
                w: (w * worldScale), 
                h: (h * worldScale) 
            });
            this.textComp.setSize(
                (this.w / 100) * this.textOffsetPercent.w,
                (this.h / 100) * this.textOffsetPercent.h
            );
        };

        this.bind("KeyDown", function(e) 
        {
            if (this.hasFocus)
            {
                if (e.key == Crafty.keys.ESC) {
                    this.loseFocus();
                } else if (e.key == Crafty.keys.BACKSPACE) { 
                    // Remove last character. 
                    this.textBehind = this.textBehind.substring(0, this.textBehind.length - 1);
                    this.updateShownText();
                } else {
                    // Check if max length has been reached. 
                    if (this.textMax <= 0 || this.textBehind.length < this.textMax) {
                        var character = utility.Reflection.getPropertyName(Crafty.keys, e.key);

                        // Check if character is known. 
                        if (character != undefined) {
                            this.textBehind = this.textBehind + character;
                            this.updateShownText();
                        }
                    }
                }
            }
        });

        this.bind("EnterFrame", function(data)
        {
            this.textMarkDelta += data.dt;

            if (this.hasFocus) {
                if (this.textMarkDelta >= this.textMarkInterval) {
                    this.textMarkDelta = this.textMarkDelta % this.textMarkInterval;
                    this.textMarkVisible = !this.textMarkVisible;
                    this.updateShownText();
                }
            }
        });
    },
});