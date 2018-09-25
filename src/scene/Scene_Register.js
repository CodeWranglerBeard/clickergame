/**
* The login scene that handles player registration. 
*/
Crafty.defineScene("Scene_Register", function() 
{
<<<<<<< HEAD
    /**********
    * SCENE_VARS
    **********/

=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
    var z = 1;
    var y = 20;
    var margin = 15;
    var registrationSuccess = false; // Is true, if the registration succeeded at any point. 

<<<<<<< HEAD
    /**********
    * UI_ELEMENTS
    **********/

=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
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
<<<<<<< HEAD
    z = textTitle.setZ(z);
=======
    textTitle.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85

    // Username
    var textName = Crafty.e("GameText");
    textName.text("Benutzername");
    textName.setLocation(textTitle.x, textTitle.y + textTitle.h + margin + 30);
    textName.css("color", "#f4f4d4");
<<<<<<< HEAD
    z = textName.setZ(z);
    var textFieldName = Crafty.e("GameTextField");
    textFieldName.setLocation(textName.x, textName.y + textName.h + margin);
    textFieldName.textMax = 12;
    z = textFieldName.setZ(z);
=======
    textName.z = z++;
    var textFieldName = Crafty.e("GameTextField");
    textFieldName.setLocation(textName.x, textName.y + textName.h + margin);
    textFieldName.textMax = 12;
    textFieldName.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85

    // Password
    var textPass = Crafty.e("GameText");
    textPass.text("Passwort");
    textPass.setLocation(textFieldName.x, textFieldName.y + textFieldName.h + margin);
    textPass.css("color", "#f4f4d4");
<<<<<<< HEAD
    z = textPass.setZ(z);
=======
    textPass.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
    var textFieldPass = Crafty.e("GameTextField");
    textFieldPass.setLocation(textPass.x, textPass.y + textPass.h + margin);
    textFieldPass.passwordChar = "*";
    textFieldPass.textMax = 20;
<<<<<<< HEAD
    z = textFieldPass.setZ(z);
=======
    textFieldPass.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85

    // Password Confirm
    var textPassConfirm = Crafty.e("GameText");
    textPassConfirm.text("Passwort Bestätigen");
    textPassConfirm.setLocation(textFieldPass.x, textFieldPass.y + textFieldPass.h + margin);
    textPassConfirm.css("color", "#f4f4d4");
<<<<<<< HEAD
    z = textPassConfirm.setZ(z);
=======
    textPassConfirm.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
    var textFieldPassConfirm = Crafty.e("GameTextField");
    textFieldPassConfirm.setLocation(textPassConfirm.x, textPassConfirm.y + textPassConfirm.h + margin);
    textFieldPassConfirm.passwordChar = "*";
    textFieldPassConfirm.textMax = 20;
<<<<<<< HEAD
    z = textFieldPassConfirm.setZ(z);
=======
    textFieldPassConfirm.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85

    // Confirm
    var buttonConfirm = Crafty.e("GameButton");
    buttonConfirm.setSize(280, 50);
    buttonConfirm.setLocation(
        panel.x + panel.w - buttonConfirm.w - margin - 20, 
        panel.y + panel.h - buttonConfirm.h - margin - 10
    );
    buttonConfirm.text("Registrieren");
<<<<<<< HEAD
    z = buttonConfirm.setZ(z);
=======
    buttonConfirm.z = z++;
    buttonConfirm.sprite.z = z++;
    buttonConfirm.textComp.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85

    this.bind("ButtonPressed", function(e) {
        if (e != buttonConfirm) {
            return;
        }

        buttonConfirm.enabled(false);

        $.ajax({
<<<<<<< HEAD
            url: "localhost:80\\register.php",
=======
            url: "localhost:5000\\register.php",
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
            data: {
                Username: textFieldName.text(),
                Password: textFieldPass.text()
            },
            success: function(result) {
                registrationSuccess = true;
                buttonConfirm.enabled(false);
                console.info("Got authToken");
                Crafty.enterScene("Scene_Login");
            },
            complete: function(jqXHR, textStatus) {
                buttonConfirm.enabled(true);
            },
            fail: function() {
                console.error("Failed to register");
            }
        });
    });

    // Back to login
    var buttonBackToLogin = Crafty.e("GameButton");
<<<<<<< HEAD
    buttonBackToLogin.requires("CIconable");
=======
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85
    buttonBackToLogin.setSize(120, 50);
    buttonBackToLogin.setLocation(
        panel.x + panel.w - buttonBackToLogin.w, 
        panel.y
    );
    buttonBackToLogin.text("");
<<<<<<< HEAD
    buttonBackToLogin.setIcon("spr_arrow_back", { w: buttonBackToLogin.w * 0.45, h: buttonBackToLogin.h * 0.45 });
    z = buttonBackToLogin.setZ(z);
    buttonBackToLogin._icon.z = z++;
=======
    buttonBackToLogin.setIcon("spr_arrow_back");
    buttonBackToLogin.z = z++;
    buttonBackToLogin.sprite.z = z++;
    buttonBackToLogin._icon.z = z++;
    buttonBackToLogin.textComp.z = z++;
>>>>>>> 00255a83d40ab5adc15cfed03689a1f96a9bbe85

    this.bind("ButtonPressed", function(e) {
        if (e != buttonBackToLogin) {
            return;
        }
        Crafty.enterScene("Scene_Login");
    });
});