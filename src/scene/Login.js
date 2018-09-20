/**
* The login scene that handles player login. 
*/
Crafty.defineScene("Login", function() 
{
    var w = 300;
    var h = 20;
    var margin = 15;
    var x = (WINDOW_WIDTH - w) / 2;
    var y = 120;

    var textTitle = Crafty.e("GameText");
    textTitle.text("LOGIN");
    textTitle.attr({ x: x, y: y });
    y += h * 3;

    // Username
    var textName = Crafty.e("GameText");
    textName.text("Benutzername");
    textName.attr({ x: x, y: y });
    y += h + margin;
    var textFieldName = Crafty.e("GameTextField");
    textFieldName.attr({ x: x, y: y });
    y += h + margin;

    y += h * 2;
    // Password
    var textPass = Crafty.e("GameText");
    textPass.text("Passwort");
    textPass.attr({ x: x, y: y });
    y += h + margin;
    var textPassName = Crafty.e("GameTextField");
    textPassName.attr({ x: x, y: y });
    textPassName.passwordChar = "*";
    y += h + margin;
});