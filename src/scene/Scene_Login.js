/**
* The login scene that handles player login. 
*/
Crafty.defineScene("Scene_Login", function() 
{
    /**********
    * SCENE_VARS
    **********/
    
    var z = 1;
    var y = 20;
    var margin = 15;

    /**********
    * UI_ELEMENTS
    **********/

    var panel = Crafty.e("2D, Canvas, spr_panel_plain");
    panel.attr({ 
        x: (WINDOW_WIDTH - 370) / 2, 
        y: (WINDOW_HEIGHT - 545) / 2, 
        w: 370, 
        h: 545,
        z: z++
    });

    var textTitle = Crafty.e("GameText");
    textTitle.text("LOGIN");
    textTitle.setLocation(panel.x + 30, panel.y + 30);
    textTitle.css("color", "#f4f4d4");
    z = textTitle.setZ(z);

    // Username
    var textName = Crafty.e("GameText");
    textName.text("Benutzername");
    textName.setLocation(textTitle.x, textTitle.y + textTitle.h + margin + 30);
    textName.css("color", "#f4f4d4");
    z = textName.setZ(z);
    var textFieldName = Crafty.e("GameTextField");
    textFieldName.setLocation(textName.x, textName.y + textName.h + margin);
    textFieldName.textMax = 12;
    z = textFieldName.setZ(z);

    // Password
    var textPass = Crafty.e("GameText");
    textPass.text("Passwort");
    textPass.setLocation(textFieldName.x, textFieldName.y + textFieldName.h + margin);
    textPass.css("color", "#f4f4d4");
    z = textPass.setZ(z);
    var textFieldPass = Crafty.e("GameTextField");
    textFieldPass.setLocation(textPass.x, textPass.y + textPass.h + margin);
    textFieldPass.passwordChar = "*";
    textFieldPass.textMax = 20;
    z = textFieldPass.setZ(z);

    // Confirm
    var buttonConfirm = Crafty.e("GameButton");
    buttonConfirm.setSize(280, 50);
    buttonConfirm.setLocation(
        panel.x + panel.w - buttonConfirm.w - margin - 20, 
        panel.y + panel.h - buttonConfirm.h - margin - 10
    );
    buttonConfirm.text("Login");
    z = buttonConfirm.setZ(z);

    this.bind("ButtonPressed", function(e) {
        if (e != buttonConfirm) {
            return;
        }

        buttonConfirm.enabled(false);

        $.ajax({
            url: "localhost:80\\login.php",
            data: {
                "Username": "\"" + textFieldName.text() + "\"",
                "Password": "\"" + textFieldPass.text() + "\""
            },
            success: function(result) {
                Game.authToken = result.authToken;
            },
            complete: function(jqXHR, textStatus) {
                buttonConfirm.enabled(true);
                Crafty.enterScene("Scene_Game");
            },
            fail: function() {
                console.error("Failed to get authToken");
            }
        });
    });

    // Register
    var buttonRegister = Crafty.e("GameButton");
    buttonRegister.setSize(280, 50);
    buttonRegister.setLocation(
        buttonConfirm.x, 
        buttonConfirm.y - buttonConfirm.h - margin
    );
    buttonRegister.text("Registrieren");
    z = buttonRegister.setZ(z);

    this.bind("ButtonPressed", function(e) {
        if (e != buttonRegister) {
            return;
        }
        Crafty.enterScene("Scene_Register");
    });
});