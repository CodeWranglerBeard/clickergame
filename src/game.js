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
    * Object in the format { health: {Number}, value: {Number}, type: {EEnemyType}, sprite: {String}, name: {String} }
    */ 
    currentEnemy: undefined,

    /**
    * The information about the next enemy, after the current is defeated. . 
    * Object in the format { health: {Number}, value: {Number}, type: {EEnemyType}, sprite: {String}, name: {String} }
    */ 
    nextEnemy: undefined,

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
    * Increments the current level. 
    * Also increments the addon number, if necessary. 
    */
    advanceLevel: function()
    {
        currentLevel += 1;

        if (currentLevel > addons[currentAddon - 1]) { // Advance addon. 
            currentAddon += 1;
            currentLevel = 1;
        }

        if (currentAddon > addons.length) { // Begin endless mode. 
            isEndless = true;
        }
    },

    /**
    * Gets a new current and next enemy. 
    * Getting the next enemy is asynchronous. 
    */
    advanceEnemy: function()
    {
        if (typeof this.nextEnemy === 'undefined') {
            this.getNewEnemy();
        }

        if (typeof this.currentEnemy !== 'undefined') {
            this.currentEnemy = undefined;
        }
        this.currentEnemy = this.nextEnemy;
        this.getNewEnemy();
        if (DEBUG) { 
            console.log("currentEnemy"); 
            console.log(this.currentEnemy); 
            console.log("nextEnemy"); 
            console.log(this.nextEnemy); 
        }
    },

    /**
    * Gets a new enemy by sending a request to the back end. 
    * Overrides the nextEnemy. 
    */
    getNewEnemy: function(callback)
    {
        var enemyType = EEnemyTypes.Normal;
        var enemyHealthMult = 0.05;
        var enemyValueMult = 0.1;

        if (this.currentLevel % 10 == 0) { // Mini boss level. 
            enemyType = EEnemyTypes.MiniBoss;
        } else if (this.currentLevel >= this.addons[this.currentAddon - 1]) { // Final level of addon. 
            enemyType = EEnemyTypes.FinalBoss;
        }

        if (enemyType == EEnemyTypes.MiniBoss) {
            enemyHealthMult = 1.25;
            enemyValueMult = 0.3;
        } else if (enemyType == EEnemyTypes.FinalBoss) {
            enemyHealthMult = 2;
            enemyValueMult = 0.8;
        }

        // $.ajax({
        //     url: "..\\clicker\\register.php",
        //     type: "POST",
        //     contentType : "application/json",
        //     data: JSON.stringify({
        //         Username: name,
        //         Password: pass
        //     }),
        //     success: function(result) {
                var enemyHealth = 100; // TODO: Request from backend. 
                var enemyValue = 10; // TODO: Request from backend. 
                var sprite = "spr_enemy"; // TODO: Request from backend. 
                var name = "Bob"; // TODO: Request from backend. 

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
            // }
        // });        
    },

    /**
    * Retrieves the game data, using the given authToken. 
    * @param {String} authToken - An authentication token to 
    * use for backend requests. 
    * @param {Function} callback - Optional: A callback for when the 
    * operation completes. 
    */
    loadGame: function(authToken, callback)
    {
        // TODO
        if (typeof callback !== 'undefined') {
            callback({ status: "success" });
        }
    },

    /**
    * Sends the given game data to the backend for saving. 
    * @param {Object} data - A json object representing 
    * the game data to save. 
    * @param {String} authToken - An authentication token to 
    * use for backend requests. 
    * @param {Function} callback - Optional: A callback for when the 
    * operation completes. 
    */
    saveGame: function(data, authToken, callback)
    {
        // TODO
        if (typeof callback !== 'undefined') {
            callback({ status: "success" })
        }
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
            complete: function(jqXHR, textStatus) {
                console.log("completed");
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
            complete: function(jqXHR, textStatus) {
                console.log("completed");
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