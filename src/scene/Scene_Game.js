/**
* The game scene that handles all the active game logic. 
*/
Crafty.defineScene("Scene_Game", function() 
{
    /**********
    * SCENE_VARS
    **********/

    // var showDebugDraw = false;
    var z = 1;
    var y = 20;
    var margin = 15;
    var registrationSuccess = false;    // Is true, if the registration succeeded at any point. 
    var storePanelMargin = 15;          // x axis offset for interpolating store panel. 

    /**********
    * UI_ELEMENTS
    **********/

    // Panel for enemy, level, companions
    var panelEnemy = Crafty.e("2D, Canvas, spr_panel_plain");
    panelEnemy.attr({ 
        x: 0, 
        y: 0, 
        w: WINDOW_WIDTH - storePanelMargin, 
        h: 400,
        z: z++
    });

    // Panel for attack and endless mode
    var panelEndless = Crafty.e("2D, Canvas, spr_panel_plain");
    panelEndless.attr({ 
        x: 0, 
        y: WINDOW_HEIGHT, 
        w: 145, 
        h: WINDOW_WIDTH - storePanelMargin,
        z: z++
    });
    panelEndless.rotation = 270;

    // Logout
    var buttonBackToLogin = Crafty.e("GameButtonMini");
    buttonBackToLogin.setSize(36, 28);
    buttonBackToLogin.setLocation(
        panelEnemy.x + panelEnemy.w - buttonBackToLogin.w, 
        panelEnemy.y
    );
    // buttonBackToLogin.text("Logout");
    z = buttonBackToLogin.setZ(z);

    this.bind("ButtonPressed", function(e) {
        if (e != buttonBackToLogin) {
            return;
        }
        Crafty.enterScene("Scene_Login");
    });

    // Store panel
    var panelStore = Crafty.e("GameInterpPanel");
    panelStore.setLocation(WINDOW_WIDTH - storePanelMargin, 0);
    panelStore.setIcon("spr_sigil_chest");
    z = panelStore.setZ(z);
    panelStore.fullLocation = { 
        x: WINDOW_WIDTH - panelStore.w, 
        y: panelStore.initialLocation.y 
    };
    panelStore.hoverLocation = { 
        x: panelStore.initialLocation.x - 40, 
        y: panelStore.initialLocation.y 
    };


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