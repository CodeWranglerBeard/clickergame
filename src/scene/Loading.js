/**
* The loading scene that handles fetching all assets before the game starts. 
*/
Crafty.defineScene("Loading", function() 
{
    var loadText = Crafty.e("GameText");
    loadText.text("Loading...");
    loadText.attr({ x: 150, y: 120 });

    // Files to load
    Crafty.load([
        // "assets/Blockman_01.png",
        ], function() // Things to do after all files have been loaded
        {
    
        // -------- Define_Sprite_Maps -------- //
        // ---- Player_Character ---- //
        // Crafty.sprite(150, 200, "assets/Blockman_01_Parachute.png", {
        //     spr_PC_Parachute: [0, 0]
        // });

        Crafty.enterScene("Login");
    });
});