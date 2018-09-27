/**** GLOBAL_CONSTANTS ****/
var WINDOW_WIDTH = 450;
var WINDOW_HEIGHT = 545;
    
// Global var for scaling the game world, use steps of .1. 
var WORLD_SCALE = 1.0;
// The world gravity. 
var WORLD_GRAVITY = 1200 * WORLD_SCALE;

var DEBUG = true;

/**
* @desc Global game object and namespace, handles initializing and starting the game. 
* @namespace
*/
Game = {

    // Constants
    ENEMY_HEALTH_MULTIPLIER: 0.05,
    ENEMY_VALUE_MULTIPLIER: 0.1,
    ENEMY_HEALTH_MULTIPLIER_MINIBOSS: 0.75,
    ENEMY_VALUE_MULTIPLIER_MINIBOSS: 0.3,
    ENEMY_HEALTH_MULTIPLIER_FINALBOSS: 1.15,
    ENEMY_VALUE_MULTIPLIER_FINALBOSS: 0.8,
    ADDON_HEALTH_MULTIPLIER: 0.45,
    ADDON_VALUE_MULTIPLIER: 0.35,

    // Authentification token to send along with requests to the back-end. 
    authToken: null,

    /**
    * The current level of the current addon. 
    * Every 10 levels a mini boss is supposed to appear.
    */ 
    currentLevel: 1,

    /**
    * The current addon number. 
    * At the end of an addon, a final boss appears. Defeating 
    * the final boss advances the addon number. 
    */
    currentAddon: 1,

    // The levels per addon. 
    addons: [
        60, // Addon 1
        10, // Addon 2
        10, // Addon 3
        5,  // Addon 4
        5,  // Addon 5
        10, // Addon 6
        10, // Addon 7
        10  // Addon 8
    ],

    // List of currently active companions. 
    companions: [],

    // List of currently active companion upgrades. 
    companionUpgrades: [],

    // List of purchasable companions. 
    companionsInStore: [],

    // List of currently active upgrades. 
    upgrades: [],

    // List of purchasable upgrades. 
    upgradesInStore: [],

    // If true, endless mode is active. 
    isEndless: false,

    /**
    * The information about the current enemy. 
    * Object in the format { health: {Number}, value: {Number}, type: {EEnemyType}, sprite: {String}, name: {String} }.
    */ 
    currentEnemy: undefined,

    /**
    * The information about the next enemy, after the current is defeated. . 
    * Object in the format { health: {Number}, value: {Number}, type: {EEnemyType}, sprite: {String}, name: {String} }.
    */ 
    nextEnemy: undefined,

    /**
    * The current player. 
    * Object in the format { name: {String}, gold: {Number}, damage: {Number} }.
    */
    player: undefined,

    /**
    * Initializes and starts the game. 
    */
    start: function() 
    {
        // Start crafty and set background color. 
        Crafty.init(WINDOW_WIDTH, WINDOW_HEIGHT);
        Crafty.background("#7c7c7c");

        Crafty.enterScene("Scene_Loading");
    },

    /**
    * Returns a list of the names of the active companions. 
    */
    getCompanions: function() 
    {
        var names = [];

        for (var i = 0; i < Game.companions.length; i++) {
            names.push(Game.companions[i].name);
        };

        return names;
    },

    /**
    * Returns a list of active upgrades. 
    */
    getUpgrades: function() 
    {
        var upgrades = [];

        for (var i = 0; i < Game.upgrades.length; i++) {
            upgrades.push({
                Name: Game.upgrades[i].name,
                Cost: Game.upgrades[i].cost,
                BonusGold: Game.upgrades[i].bonusGold,
                BonusDamage: Game.upgrades[i].bonusDamage
            });
        };

        return upgrades;
    },

    /**
    * Returns an object representing the current game state. 
    */
    getGameState: function()
    {
        return {
            Player: Game.player.name,
            Level: Game.currentLevel,
            Addon: Game.currentAddon,
            Companions: Game.getCompanions(),
            Upgrades: Game.getUpgrades(),
            Enemy: Game.currentEnemy,
            EnemyNext: Game.nextEnemy
        };
    },

    /**
    * Applies the given game state representing object. 
    * @param {Object} data - The game state representing object. 
    */
    setGameState: function(data)
    {
        // Clear existing data. 
        Game.companions = [];
        Game.upgrades = [];

        // Apply new data. 
        Game.player = { 
            name: data.player.name, 
            gold: data.player.gold, 
            damage: data.player.damage 
        };
        Game.currentLevel = data.level;
        Game.currentAddon = data.addon;
        Game.currentEnemy = data.enemy;
        Game.nextEnemy = data.nextEnemy;

        for (var i = 0; i < data.companions.length; i++) {
            Game.companions.push(data.companions[i]);
        };

        for (var i = 0; i < data.upgrades.length; i++) {
            Game.upgrades.push(data.upgrades[i]);
        };

        for (var i = 0; i < data.companionUpgrades.length; i++) {
            Game.companionUpgrades.push(data.companionUpgrades[i]);
        };
    },

    /**
    * Increments the current level. 
    * Also increments the addon number, if necessary. 
    */
    advanceLevel: function()
    {
        this.currentLevel += 1;

        if (this.currentLevel > this.addons[this.currentAddon - 1]) { // Advance addon. 
            this.currentAddon += 1;
            this.currentLevel = 1;
        }

        if (this.currentAddon > this.addons.length) { // Begin endless mode. 
            this.isEndless = true;
        }

        Game.saveGame();
    },

    /**
    * Gets a new current and next enemy. 
    * Getting the next enemy is asynchronous. 
    */
    advanceEnemy: function(callback)
    {
        if (typeof Game.nextEnemy === 'undefined') {
            Game.getNewEnemy(function(data) {
                if (data.status == "success") {
                    Game.currentEnemy = Game.nextEnemy;
                    Game.getNewEnemy(callback);
                    if (DEBUG) { 
                        console.log("currentEnemy"); 
                        console.log(Game.currentEnemy); 
                        console.log("nextEnemy"); 
                        console.log(Game.nextEnemy); 
                    }
                }
            });
        } else {
            Game.currentEnemy = Game.nextEnemy;
            Game.getNewEnemy(callback);
            if (DEBUG) { 
                console.log("currentEnemy"); 
                console.log(Game.currentEnemy); 
                console.log("nextEnemy"); 
                console.log(Game.nextEnemy); 
            }
        }
    },

    /**
    * Gets a new enemy by sending a request to the back end. 
    * Overrides the nextEnemy. 
    */
    getNewEnemy: function(callback)
    {
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

        $.ajax({
            url: "..\\clicker\\getNewEnemy.php",
            type: "POST",
            contentType : "application/json",
            data: JSON.stringify({
                AuthToken: Game.authToken,
                Type: enemyType,
                Addon: Game.currentAddon,
                Level: Game.currentLevel
            }),
            success: function(result) {
                var enemyHealth = 100; // TODO: Request from backend. 
                var enemyValue = 10; // TODO: Request from backend. 
                var sprite = "spr_enemy"; // TODO: Request from backend. 
                var name = "Bob"; // TODO: Request from backend. 

                enemyHealth = (enemyHealth * (1 + (enemyHealthMult * this.currentLevel) + (Game.ADDON_HEALTH_MULTIPLIER * (addon - 1))));
                enemyValue = enemyValue * (1 + (enemyValueMult * this.currentLevel) + (Game.ADDON_VALUE_MULTIPLIER * (addon - 1)));
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
            },
            fail: function() {
                console.error("getNewEnemy: Request failed!");
            }
        });
    },

    /**
    * Retrieves the game data from the server. 
    * @param {Function} callback - Optional: A callback for when the 
    * operation completes. 
    */
    loadGame: function(callback)
    {
        $.ajax({
            url: "..\\clicker\\loadGame.php",
            type: "POST",
            contentType : "application/json",
            data: JSON.stringify({
                AuthToken: Game.authToken,
                Username: Game.player.name
            }),
            success: function(result) {
                Game.setGameState(result);

                if (typeof callback !== 'undefined') {
                    callback({ status: "success" });
                }
            },
            fail: function() {
                console.error("loadGame: Request failed!");
                if (typeof callback !== 'undefined') {
                    callback({ status: "fail" });
                }
            }
        }); 
    },

    /**
    * Sends the given game data to the server for saving. 
    * @param {Function} callback - Optional: A callback for when the 
    * operation completes. 
    */
    saveGame: function(callback)
    {
        $.ajax({
            url: "..\\clicker\\saveGame.php",
            type: "POST",
            contentType : "application/json",
            data: JSON.stringify({
                AuthToken: Game.authToken,
                GameState: Game.getGameState()
            }),
            success: function(result) {
                if (typeof callback !== 'undefined') {
                    callback({ status: "success" });
                }
            },
            fail: function() {
                console.error("saveGame: Request failed!");
                if (typeof callback !== 'undefined') {
                    callback({ status: "fail" });
                }
            }
        }); 
    },

    /**
    * Sends the given user information to the backend to 
    * register a new user. 
    * @param {String} name - The user name. 
    * @param {String} pass - The user password. 
    * @param {Function} callback - Optional: A callback for when the 
    * operation completes. 
    */
    register: function(name, pass, callback)
    {
        $.ajax({
            url: "..\\clicker\\register.php",
            type: "POST",
            contentType : "application/json",
            data: JSON.stringify({
                Username: name,
                Password: pass
            }),
            success: function(result) {
                if (typeof callback !== 'undefined') {
                    callback({ status: "success" });
                }
            },
            fail: function() {
                if (typeof callback !== 'undefined') {
                    callback({ status: "fail" });
                }
            }
        });
    },

    /**
    * Sends the given user information to the backend to 
    * login the user. 
    * @param {String} name - The user name. 
    * @param {String} pass - The user password. 
    * @param {Function} callback - Optional: A callback for when the 
    * operation completes. 
    */
    login: function(name, pass, callback)
    {
        $.ajax({
            url: "..\\clicker\\login.php",
            type: "POST",
            contentType : "application/json",
            data: JSON.stringify({
                Username: name,
                Password: pass
            }),
            success: function(result) {
                Game.authToken = result.authToken;
                if (typeof callback !== 'undefined') {
                    callback({ status: "success" });
                }
            },
            fail: function() {
                if (typeof callback !== 'undefined') {
                    callback({ status: "fail" });
                }
            }
        });
    },
};
$text_css = { "size": "24px", "family": "Arial", "color": "black", "text-align": "center" };