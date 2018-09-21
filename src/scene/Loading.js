/**
* The loading scene that handles fetching all assets before the game starts. 
*/
Crafty.defineScene("Loading", function() 
{
    var loadText = Crafty.e("GameText");
    loadText.text("Laden...");
    loadText.attr({ x: 150, y: 120 });

    // Files to load
    Crafty.load([
            "assets/card1.png",
            "assets/card2.png",
            "assets/card3.png",
            "assets/check.png",
            "assets/cross.png",
            "assets/numbox.png",
            "assets/lifebar.png",
            "assets/textpanel.png",
            "assets/panel_plain.png",
            "assets/panel_slot.png",
            "assets/panel_symbol.png",
            "assets/sigil_chest.png",
            "assets/sigil_tome.png",
            "assets/button_small_sheet.png",
            "assets/medium_dark_panel.png",
            "assets/window_bottom.png",
            "assets/window_middle.png",
        ], function() // Things to do after all files have been loaded
        {
    
        // -------- Define_Sprite_Maps -------- //
        // ---- button small ---- //
        Crafty.sprite(192, 70, "assets/button_small_sheet.png", {
            spr_button_small: [0, 0]
        });
        // ---- text panel ---- //
        Crafty.sprite(440, 80, "assets/textpanel.png", {
            spr_textpanel: [0, 0]
        });
        // ---- panel_plain ---- //
        Crafty.sprite(280, 545, "assets/panel_plain.png", {
            spr_panel_plain: [0, 0]
        });
        // ---- panel_slot ---- //
        Crafty.sprite(280, 545, "assets/panel_slot.png", {
            spr_panel_slot: [0, 0]
        });
        // ---- panel_symbol ---- //
        Crafty.sprite(280, 545, "assets/panel_symbol.png", {
            spr_panel_symbol: [0, 0]
        });
        // ---- check ---- //
        Crafty.sprite(80, 64, "assets/check.png", {
            spr_check: [0, 0]
        });
        // ---- cross ---- //
        Crafty.sprite(64, 64, "assets/cross.png", {
            spr_cross: [0, 0]
        });
        // ---- numbox ---- //
        Crafty.sprite(100, 50, "assets/numbox.png", {
            spr_numbox: [0, 0]
        });
        // ---- lifebar ---- //
        Crafty.sprite(125, 30, "assets/lifebar.png", {
            spr_lifebar: [0, 0]
        });
        // ---- sigil_chest ---- //
        Crafty.sprite(200, 200, "assets/sigil_chest.png", {
            spr_sigil_chest: [0, 0]
        });
        // ---- sigil_tome ---- //
        Crafty.sprite(200, 200, "assets/sigil_tome.png", {
            spr_sigil_tome: [0, 0]
        });
        // ---- medium_dark_panel ---- //
        Crafty.sprite(170, 110, "assets/medium_dark_panel.png", {
            spr_medium_dark_panel: [0, 0]
        });
        // ---- window_bottom ---- //
        Crafty.sprite(1000, 90, "assets/window_bottom.png", {
            spr_window_bottom: [0, 0]
        });
        // ---- window_middle ---- //
        Crafty.sprite(1000, 380, "assets/window_middle.png", {
            spr_window_middle: [0, 0]
        });

        Crafty.enterScene("Login");
    });
});