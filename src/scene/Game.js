/**
* The game scene that handles all the active game logic. 
*/
Crafty.defineScene("Game", function() 
{
    this.showDebugDraw = false;

    this.bind("KeyDown", function(e) 
    {
        if (e.key == Crafty.keys.T)
        {
            if (this.showDebugDraw) {
                Crafty("IDebug").each(function() {
                    this.hideDebugDraw();
                });
            } else {
                Crafty("IDebug").each(function() {
                    this.showDebugDraw();
                });
            }
        }
    });
});