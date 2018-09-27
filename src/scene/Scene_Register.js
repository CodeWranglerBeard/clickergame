/**
* The login scene that handles player registration. 
*/
Crafty.defineScene("Scene_Register", function() 
{
    /**********
    * SCENE_VARS
    **********/

    var z = 1;
    var y = 20;
    var margin = 15;

    /**********
    * SCENE_FUNCS
    **********/

    /**********
    * INITIALIZATION
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
    textTitle.text("REGISTRIERUNG");
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

    // Password Confirm
    var textPassConfirm = Crafty.e("GameText");
    textPassConfirm.text("Passwort Bestätigen");
    textPassConfirm.setLocation(textFieldPass.x, textFieldPass.y + textFieldPass.h + margin);
    textPassConfirm.css("color", "#f4f4d4");
    z = textPassConfirm.setZ(z);
    var textFieldPassConfirm = Crafty.e("GameTextField");
    textFieldPassConfirm.setLocation(textPassConfirm.x, textPassConfirm.y + textPassConfirm.h + margin);
    textFieldPassConfirm.passwordChar = "*";
    textFieldPassConfirm.textMax = 20;
    z = textFieldPassConfirm.setZ(z);

    textFieldPassConfirm.bind("KeyDown", function(e) 
    {
        if (textFieldPass.text() == textFieldPassConfirm.text()) {
            buttonConfirm.enabled(true);
        } else {
            buttonConfirm.enabled(false);
        }
    });

    // Confirm
    var buttonConfirm = Crafty.e("GameButton");
    buttonConfirm.setSize(280, 50);
    buttonConfirm.setLocation(
        panel.x + panel.w - buttonConfirm.w - margin - 20, 
        panel.y + panel.h - buttonConfirm.h - margin - 10
    );
    buttonConfirm.text("Registrieren");
    z = buttonConfirm.setZ(z);
    buttonConfirm.enabled(false);

    this.bind("ButtonPressed", function(e) {
        if (e != buttonConfirm) {
            return;
        }

        buttonConfirm.enabled(false);
        Game.register(
            textFieldName.text(),
            textFieldPass.text(),
            function(data) {
                if (data.status == "success") {
                    window.alert("Erfolgreich registriert");
                    Crafty.enterScene("Scene_Login");
                } else {
                    textFieldName.text("");
                    textFieldPass.text("");
                    textFieldPassConfirm.text("");
                    buttonConfirm.enabled(true);
                    window.alert("Benutzername bereits vergeben. Wählen Sie einen anderen Namen.");
                }
            }
        );
    });

    // Back to login
    var buttonBackToLogin = Crafty.e("GameButton");
    buttonBackToLogin.requires("CIconable");
    buttonBackToLogin.setSize(120, 50);
    buttonBackToLogin.setLocation(
        panel.x + panel.w - buttonBackToLogin.w, 
        panel.y
    );
    buttonBackToLogin.text("");
    buttonBackToLogin.setIcon("spr_arrow_back", { w: buttonBackToLogin.w * 0.45, h: buttonBackToLogin.h * 0.45 });
    z = buttonBackToLogin.setZ(z);
    buttonBackToLogin._icon.z = z++;

    this.bind("ButtonPressed", function(e) {
        if (e != buttonBackToLogin) {
            return;
        }
        Crafty.enterScene("Scene_Login");
    });
});