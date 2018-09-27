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
        var enemyType = EEnemyTypes.Normal;
        var enemyHealthMult = 0.05;
        var enemyValueMult = 0.1;

        if ((this.currentLevel + 1) % 10 == 0) { // Mini boss level. 
            enemyType = EEnemyTypes.MiniBoss;
        } else if ((this.currentLevel + 1) >= this.addons[this.currentAddon - 1]) { // Final level of addon. 
            enemyType = EEnemyTypes.FinalBoss;
        }

        if (enemyType == EEnemyTypes.MiniBoss) {
            enemyHealthMult = 0.75;
            enemyValueMult = 0.3;
        } else if (enemyType == EEnemyTypes.FinalBoss) {
            enemyHealthMult = 1.15;
            enemyValueMult = 0.8;
        }

        var enemyHealth = 100;
        var enemyValue = 10;
        var sprite = "spr_enemy";
        var name = "Bob";

        enemyHealth = (enemyHealth * (1 + (enemyHealthMult * this.currentLevel) + ((0.45 + enemyHealthMult) * (this.currentAddon - 1))));
        enemyValue = enemyValue * (1 + (enemyValueMult * this.currentLevel) * ((0.35 + enemyValueMult) * (this.currentAddon - 1)));
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
            player: { name: "Bernd", gold: 100, damage: 10 },
            level: 3,
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