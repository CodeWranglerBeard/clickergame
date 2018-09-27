/**
* The debug scene that sets up the game for testing. 
*/
Crafty.defineScene("Scene_Debug", function() 
{
    /**********
    * SCENE_VARS
    **********/

    /**********
    * SCENE_FUNCS
    **********/

    /**********
    * INITIALIZATION
    **********/

    Game.player = { 
        name: "Bernd", 
        gold: 0, 
        damage: 10, 
        companions: [] 
    };

    Game.advanceEnemy(function(data) {
        Crafty.enterScene("Scene_Game");
    });
});