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

    Game.getNewEnemy = function(callback)
    {
        console.log("Debug getNewEnemy");
        var level = this.currentLevel + 1;                      // Get next enemy for next level. 
        var addon = this.currentAddon;                          // Current addon number. 
        var levelsAddon = this.addons[this.currentAddon - 1];   // Number of levels for current addon. 

        var enemyType = EEnemyTypes.Normal;
        var enemyHealthMult = Game.ENEMY_HEALTH_MULTIPLIER;
        var enemyValueMult = Game.ENEMY_VALUE_MULTIPLIER;

        if (level > levelsAddon) {
            addon++;
            level = 1;
        } else if (level == levelsAddon) { // Final level of addon. 
            enemyType = EEnemyTypes.FinalBoss;
        } else if (level % 10 == 0) { // Mini boss level. 
            enemyType = EEnemyTypes.MiniBoss;
        }

        if (enemyType == EEnemyTypes.MiniBoss) {
            enemyHealthMult = Game.ENEMY_HEALTH_MULTIPLIER_MINIBOSS;
            enemyValueMult = Game.ENEMY_VALUE_MULTIPLIER_MINIBOSS;
        } else if (enemyType == EEnemyTypes.FinalBoss) {
            enemyHealthMult = Game.ENEMY_HEALTH_MULTIPLIER_FINALBOSS;
            enemyValueMult = Game.ENEMY_VALUE_MULTIPLIER_FINALBOSS;
        }

        var enemyHealth = 100; // TODO: Request from backend. 
        var enemyValue = 10; // TODO: Request from backend. 
        var sprite = "spr_enemy"; // TODO: Request from backend. 
        var name = "Bob"; // TODO: Request from backend. 

        enemyHealth = (enemyHealth * (1 + (enemyHealthMult * level) + (Game.ADDON_HEALTH_MULTIPLIER * (addon - 1))));
        enemyValue = enemyValue * (1 + (enemyValueMult * level) * (Game.ADDON_VALUE_MULTIPLIER * (addon - 1)));
        enemyHealth = Math.round(enemyHealth);
        enemyValue = Math.round(enemyValue);
        this.nextEnemy = { 
            health: enemyHealth, 
            value: enemyValue, 
            type: enemyType, 
            sprite: sprite, 
            name: name 
        };
        if (typeof callback !== 'undefined') {
            callback({ status: "success" });
        }
    };

    Game.register = function(name, pass, callback)
    {
        if (name == "A") {
            callback({ status: "success" });
        } else {
            callback({ status: "error" });
        }
    };

    Game.login = function(name, pass, callback)
    {
        if (name == "A" && pass == "A") {
            callback({ status: "success" });
        } else {
            callback({ status: "error" });
        }
    };

    Game.saveGame = function(data, authToken, callback)
    {
        if (typeof callback !== 'undefined') {
            callback({ status: "success" });
        }
    };

    Game.loadGame = function(authToken, callback) {
        var gameState = {
            player: { name: "Bernd", gold: 100, damage: 50 },
            level: 8,
            addon: 2,
            companions: [
                { name: "Gottfried", damage: 10, speed: 1, addon: 1 }
            ],
            upgrades: [
                { name: "Schaden + 1", cost: 100, bonusGold: 0, bonusDamage: 10 },
                { name: "Gold + 1", cost: 150, bonusGold: 10, bonusDamage: 0 }
            ],
            companionUpgrades: [
                { name: "Begleiter Schaden + 1", cost: 100, bonusGold: 0, bonusDamage: 10 },
                { name: "Begleiter Gold + 1", cost: 150, bonusGold: 10, bonusDamage: 0 }
            ],
            enemy: { 
                health: 120, 
                value: 12, 
                type: EEnemyTypes.Normal, 
                sprite: "spr_enemy", 
                name: "Bob der Böse"
            },
            nextEnemy: { 
                health: 130, 
                value: 15, 
                type: EEnemyTypes.Normal, 
                sprite: "spr_enemy", 
                name: "Gemeiner Schurke"
            }
        };
        Game.setGameState(gameState);


        if (typeof callback !== 'undefined') {
            callback({ status: "success" });
        }
    };

    Game.loadGame("abababababab", function(data) {
        Crafty.enterScene("Scene_Login");
    });
});