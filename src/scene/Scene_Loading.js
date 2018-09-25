/**
* The loading scene that handles fetching all assets before the game starts. 
*/
Crafty.defineScene("Scene_Loading", function() 
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
            "assets/window_full.png",
            "assets/arrow_back.png",
            "assets/small_side_panel_plain.png",
            "assets/small_side_panel_sheet.png",
            "assets/button_mini_sheet.png",
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
        // ---- window_full ---- //
        Crafty.sprite(370, 400, "assets/window_full.png", {
            spr_window_full: [0, 0]
        });
        // ---- arrow_back ---- //
        Crafty.sprite(40, 22, "assets/arrow_back.png", {
            spr_arrow_back: [0, 0]
        });
        // ---- small_side_panel_plain ---- //
        Crafty.sprite(144, 110, "assets/small_side_panel_plain.png", {
            spr_small_side_panel_plain: [0, 0]
        });
        // ---- small_side_panel_sheet ---- //
<<<<<<< HEAD:src/scene/Scene_Loading.js
        Crafty.sprite(144, 110, "assets/small_side_panel_sheet.png", {
            spr_small_side_panel_sheet: [0, 0]
        });
        // ---- button_mini_sheet ---- //
        Crafty.sprite(36, 28, "assets/button_mini_sheet.png", {
=======
        Crafty.sprite(36, 28, "assets/small_side_panel_sheet.png", {
            spr_small_side_panel_sheet: [0, 0]
        });
        // ---- button_mini_sheet ---- //
        Crafty.sprite(144, 110, "assets/button_mini_sheet.png", {
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85:src/scene/Scene_Loading.js
            spr_button_mini_sheet: [0, 0]
        });

        Crafty.enterScene("Scene_Login");
    });
});