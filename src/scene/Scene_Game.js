/**
* The game scene that handles all the active game logic. 
*/
Crafty.defineScene("Scene_Game", function() 
{
<<<<<<< HEAD
    /**********
    * SCENE_VARS
    **********/

=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
    // var showDebugDraw = false;
    var z = 1;
    var y = 20;
    var margin = 15;
<<<<<<< HEAD
    var registrationSuccess = false;    // Is true, if the registration succeeded at any point. 
    var storePanelMargin = 15;          // x axis offset for interpolating store panel. 

    /**********
    * UI_ELEMENTS
    **********/
=======
    var registrationSuccess = false; // Is true, if the registration succeeded at any point. 
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85

    // Panel for enemy, level, companions
    var panelEnemy = Crafty.e("2D, Canvas, spr_panel_plain");
    panelEnemy.attr({ 
        x: 0, 
        y: 0, 
<<<<<<< HEAD
        w: WINDOW_WIDTH - storePanelMargin, 
=======
        w: 370, 
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        h: 400,
        z: z++
    });

    // Panel for attack and endless mode
    var panelEndless = Crafty.e("2D, Canvas, spr_panel_plain");
    panelEndless.attr({ 
        x: 0, 
        y: WINDOW_HEIGHT, 
        w: 145, 
<<<<<<< HEAD
        h: WINDOW_WIDTH - storePanelMargin,
=======
        h: 370,
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
        z: z++
    });
    panelEndless.rotation = 270;

    // Logout
<<<<<<< HEAD
    var buttonBackToLogin = Crafty.e("GameButtonMini");
    buttonBackToLogin.setSize(36, 28);
=======
    var buttonBackToLogin = Crafty.e("GameButton");
    buttonBackToLogin.setSize(140, 50);
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
    buttonBackToLogin.setLocation(
        panelEnemy.x + panelEnemy.w - buttonBackToLogin.w, 
        panelEnemy.y
    );
<<<<<<< HEAD
    // buttonBackToLogin.text("Logout");
    z = buttonBackToLogin.setZ(z);
=======
    buttonBackToLogin.text("Logout");
    buttonBackToLogin.z = z++;
    buttonBackToLogin.sprite.z = z++;
    buttonBackToLogin.textComp.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85

    this.bind("ButtonPressed", function(e) {
        if (e != buttonBackToLogin) {
            return;
        }
        Crafty.enterScene("Scene_Login");
    });

<<<<<<< HEAD
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
=======
    // Upgrades panel
    var panelUpgrades = Crafty.e("GameInterpPanel");
    panelUpgrades.setLocation(WINDOW_WIDTH - 30, 0);
    panelUpgrades.setIcon("spr_sigil_chest");
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85


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