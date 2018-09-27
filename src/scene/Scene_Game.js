/**
* The game scene that handles all the active game logic. 
*/
Crafty.defineScene("Scene_Game", function() 
{
    /**********
    * SCENE_VARS
    **********/

    var z = 1;
    var registrationSuccess = false;    // Is true, if the registration succeeded at any point. 
    var storePanelMargin = 15;          // x axis offset for interpolating store panel. 
    var currentEnemy = undefined;       // Current enemy as a Crafty object. 
    var panelsCompanions = [];          // List of panels containing the companion portraits. 
    var _scene = this;                  // Self-referencing variable for use in nested callbacks. 

    /**********
    * SCENE_FUNCS
    **********/

    /**
    * Performs an attack on the current enemy. 
    */
    var attack = function() {
        currentEnemy.applyDamage(Game.player.damage);
        lifebarEnemy.value(currentEnemy.health);
    };

    /**
    * Updates the shown gold text. 
    */
    var updateGoldDisplayed = function() {
        textGold.text("Gold: " + Game.player.gold);
    };

    /**
    * Updates the shown addon and level text. 
    */
    var updateAddonLevelDisplayed = function() {
        if (Game.isEndless) {
            textAddonLevel.text("(Endlosmodus) Level: " + Game.currentLevel);
        } else {
            textAddonLevel.text("Addon: " + Game.currentAddon + " Level: " + Game.currentLevel);
        }
    };

    /**
    * Updates the shown player name. 
    */
    var updatePlayerDisplayed = function() {
        var name = Game.player.name;
        var text = name;

        if (name.endsWith("s")) {
            text += "' ";
        } else {
            text += "'s "
        }
        text += "Abenteuer";
        textPlayerName.text(text);
    };

    /**
    * Updates the shown enemy name. 
    */
    var updateEnemyName = function() {
        var textToShow = currentEnemy.name;

        if (currentEnemy.type == EEnemyTypes.MiniBoss) {
            textToShow += " (Mini-Boss)";
        } else if (currentEnemy.type == EEnemyTypes.FinalBoss) {
            textToShow += " (End-Boss)";
        }

        textEnemyName.text(textToShow);
    };

    /**
    * Displays an enemy, based on the given object. 
    * @param {Object} enemy - An enemy object. 
    */
    var showEnemy = function(enemy) {
        if (typeof currentEnemy !== 'undefined') {
            currentEnemy.destroy();
        }

        // Create new enemy. 
        currentEnemy = Crafty.e("Enemy");
        currentEnemy.setHealthMax(enemy.health);
        currentEnemy.goldValue = enemy.value;
        currentEnemy.setSprite(enemy.sprite);
        currentEnemy.type = enemy.type;
        currentEnemy.name = enemy.name;
        currentEnemy.attr({ 
            w: panelEnemy.w * 0.60, 
            h: panelEnemy.h * 0.9
        });
        panelEnemy.setCenteredOnSelf(currentEnemy);
        currentEnemy.setZ(500);

        // Set name. 
        updateEnemyName();

        // Reset life bar. 
        lifebarEnemy.min(0);
        lifebarEnemy.max(currentEnemy.healthMax);
        lifebarEnemy.value(currentEnemy.healthMax);

        _scene.one("OnDeath", function(e) {
            _scene.unbind("OnDeath");
            if (DEBUG) { console.log("Defeated " + e.name); }

            // Award score (gold). 
            Game.player.gold += e.goldValue;
            updateGoldDisplayed();

            // Advance level. 
            Game.advanceLevel();
            updateAddonLevelDisplayed();

            console.log("level: " + Game.currentLevel);

            // Get new enemy. 
            Game.advanceEnemy(function(data) {
                showEnemy(Game.currentEnemy);
            });
        });
    };

    /**********
    * INITIALIZATION
    **********/

    // Panel for enemy, level, companions
    var panelEnemy = Crafty.e("CBase, Canvas, spr_panel_plain");
    panelEnemy.attr({ 
        x: 0, 
        y: 0, 
        w: WINDOW_WIDTH - storePanelMargin, 
        h: 400,
        z: z++
    });

    // Panel for info text
    var panelInfo = Crafty.e("CBase, Canvas, spr_panel_plain");
    panelInfo.attr({ 
        x: 0, 
        y: WINDOW_HEIGHT, 
        w: 145, 
        h: WINDOW_WIDTH - storePanelMargin,
        z: z++
    });
    panelInfo.rotation = 270;

    // Logout
    var buttonBackToLogin = Crafty.e("GameButtonMini");
    buttonBackToLogin.setSize(36, 28);
    buttonBackToLogin.setLocation(
        panelEnemy.x + panelEnemy.w - buttonBackToLogin.w, 
        panelEnemy.y
    );
    z = buttonBackToLogin.setZ(z);

    this.bind("ButtonPressed", function(e) {
        if (e != buttonBackToLogin) {
            return;
        }
        Crafty.enterScene("Scene_Login");
    });

    // Enemy name
    var textEnemyName = Crafty.e("GameText");
    textEnemyName.text("NAMENLOS");
    textEnemyName.attr({ w: panelInfo.h });
    textEnemyName.css("text-align", "center");
    textEnemyName.setLocation(
        0, 
        10
    );
    textEnemyName.css("color", "#f4f4d4");
    textEnemyName.setZ(750);

    // Health bar
    var lifebarEnemy = Crafty.e("LifeBar");
    lifebarEnemy.w = 150;
    lifebarEnemy.setLocation(
        (panelEnemy.w - lifebarEnemy.w) / 2, 
        textEnemyName.y + textEnemyName.h + 10
    );
    lifebarEnemy.setZ(750);

    // Player name
    var textPlayerName = Crafty.e("GameText");
    textPlayerName.text("NAMENLOS");
    textPlayerName.attr({ w: panelInfo.h });
    textPlayerName.css("text-align", "center");
    textPlayerName.setLocation(
        0, 
        WINDOW_HEIGHT - panelInfo.w
    );
    textPlayerName.css("color", "#f4f4d4");
    z = textPlayerName.setZ(z);

    // Addon, level
    var textAddonLevel = Crafty.e("GameText");
    textAddonLevel.text("Addon: {Number} Level: {Number}");
    textAddonLevel.attr({ w: panelInfo.h, h: 25 });
    textAddonLevel.css("text-align", "left");
    textAddonLevel.setLocation(
        30, 
        WINDOW_HEIGHT - textAddonLevel.h - 30
    );
    textAddonLevel.css("color", "#f4f4d4");
    z = textAddonLevel.setZ(z);

    // Score (Gold)
    var textGold = Crafty.e("GameText");
    textGold.text("Gold: {Number}");
    textGold.attr({ w: panelInfo.h, h: 25 });
    textGold.css("text-align", "left");
    textGold.setLocation(
        30, 
        textAddonLevel.y - textGold.h - 10
    );
    textGold.css("color", "#f4f4d4");
    z = textGold.setZ(z);

    // Companions
    var tempCompanions = {
        x: 0,
        y: 0,
        w: 100,
        h: 80,
        z: 700
    };
    for (var i = 0; i < 4; i++) {

        var newPanel = Crafty.e("CBase");
        newPanel.requires("Canvas, CIconable, spr_small_side_panel_plain");
        newPanel.attr({ w: tempCompanions.w, h: tempCompanions.h });
        newPanel.rotation = -90;
        tempCompanions.y += newPanel.w;
        newPanel.y = tempCompanions.y;

        tempCompanions.z = newPanel.setZ(tempCompanions.z);
        panelsCompanions[i] = newPanel;
    };

    // Invisible button for attacking
    var buttonAttack = Crafty.e("CBase");
    buttonAttack.requires("Mouse");
    buttonAttack.attr({ 
        w: panelEnemy.w * 0.60, 
        h: panelEnemy.h * 0.9
    });
    panelEnemy.setCenteredOnSelf(buttonAttack);
    z = buttonAttack.setZ(z);
    buttonAttack.bind("MouseDown", function(e) {
        attack();
    });

    // Store panel
    var panelStore = Crafty.e("GameInterpPanel");
    panelStore.setLocation(WINDOW_WIDTH - storePanelMargin, 0);
    panelStore.setIcon("spr_sigil_chest");
    panelStore.setZ(1000);
    panelStore.fullLocation = { 
        x: WINDOW_WIDTH - panelStore.w, 
        y: panelStore.initialLocation.y 
    };
    panelStore.hoverLocation = { 
        x: panelStore.initialLocation.x - 40, 
        y: panelStore.initialLocation.y 
    };
    this.bind("OnPanelMoveFull", function(e) {
        if (e != panelStore) {
            return;
        }

        textGold.visible = false;
        textAddonLevel.visible = false;
        textEnemyName.visible = false;
        textPlayerName.visible = false;
    });
    this.bind("OnPanelMoveHover", function(e) {
        if (e != panelStore) {
            return;
        }

        textGold.visible = true;
        textAddonLevel.visible = true;
        textEnemyName.visible = true;
        textPlayerName.visible = true;
    });

    showEnemy(Game.currentEnemy);
    updateGoldDisplayed();
    updateAddonLevelDisplayed();
    updatePlayerDisplayed();
});