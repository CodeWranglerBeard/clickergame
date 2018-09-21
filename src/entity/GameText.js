/**
* Represents a text to be drawn on the page. 
*/
Crafty.c("GameText", 
{
    init: function()
    {
        this.requires("CBase, DOM, Text");
        this.attr({ w: 800, h: 20 });
        this.textFont($text_css);
    },
});