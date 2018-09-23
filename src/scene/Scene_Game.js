/**
* The game scene that handles all the active game logic. 
*/
Crafty.defineScene("Scene_Game", function() 
{
    // var showDebugDraw = false;
    var z = 1;
    var y = 20;
    var margin = 15;
    var registrationSuccess = false; // Is true, if the registration succeeded at any point. 

    // Panel for enemy, level, companions
    var panelEnemy = Crafty.e("2D, Canvas, spr_panel_plain");
    panelEnemy.attr({ 
        x: 0, 
        y: 0, 
        w: 370, 
        h: 400,
        z: z++
    });

    // Panel for attack and endless mode
    var panelEndless = Crafty.e("2D, Canvas, spr_panel_plain");
    panelEndless.attr({ 
        x: 0, 
        y: WINDOW_HEIGHT, 
        w: 145, 
        h: 370,
        z: z++
    });
    panelEndless.rotation = 270;

    // Logout
    var buttonBackToLogin = Crafty.e("GameButton");
    buttonBackToLogin.setSize(140, 50);
    buttonBackToLogin.setLocation(
        panelEnemy.x + panelEnemy.w - buttonBackToLogin.w, 
        panelEnemy.y
    );
    buttonBackToLogin.text("Logout");
    buttonBackToLogin.z = z++;
    buttonBackToLogin.sprite.z = z++;
    buttonBackToLogin.textComp.z = z++;

    this.bind("ButtonPressed", function(e) {
        if (e != buttonBackToLogin) {
            return;
        }
        Crafty.enterScene("Scene_Login");
    });

    // Upgrades panel
    var panelUpgrades = Crafty.e("GameInterpPanel");
    panelUpgrades.setLocation(WINDOW_WIDTH - 30, 0);
    panelUpgrades.setIcon("spr_sigil_chest");


    // this.bind("KeyDown", function(e) 
    // {
    //     if (e.key == Crafty.keys.T)
    //     {
    //         if (this.showDebugDraw) {
    //             Crafty("IDebug").each(function() {
    //                 this.hideDebugDraw();
    //             });
    //         } else {
    //             Crafty("IDebug").each(function() {
    //                 this.showDebugDraw();
    //             });
    //         }
    //     }
    // });
});