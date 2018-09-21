/**
 * Author Nicolas Haase
 *
 * This code was written on the basis of Crafty, a game engine by Louis Stowasser.
 * The author of this file is not responsible for or involved in the development of the Crafty game engine.
 */

/**** GLOBAL_CONSTANTS ****/
var WINDOW_WIDTH = 1000;
var WINDOW_HEIGHT = 580;
    
// Global var for scaling the game world, use steps of .1. 
var WORLD_SCALE = 1.0;
// The world gravity. 
var WORLD_GRAVITY = 1200 * WORLD_SCALE;

/**
* @desc Global game object and namespace, handles initializing and starting the game. 
* @namespace
*/
Game = {

    // Authentification token to send along with requests to the back-end. 
    authToken: null,

    // Initialize and start game
    start: function() 
    {
        // Start crafty and set background color. 
        Crafty.init(WINDOW_WIDTH, WINDOW_HEIGHT);
        Crafty.background("#7c7c7c");

        // Enter loading scene. 
        Crafty.enterScene("Scene_Loading");
    },
    
    /**
    * Binds the camera viewport to the given object. The given object is expected to have 
    * a x and y coordinate fields. 
    * @param {Object} obj - The object to bind the viewport to. 
    * @returns True, if the camera viewport could be bound to the given object. 
    */
    bindViewport: function(obj) 
    {
        if (!obj.hasOwnProperty('x') || !obj.hasOwnProperty('y')) {
            return false;
        };

        Crafty.bind("EnterFrame", function(deltaTime) 
        {
            Crafty.viewport.y = WINDOW_HEIGHT/2 - (obj.y + obj.h/2);
            Crafty.viewport.x = WINDOW_WIDTH/2 - (obj.x + obj.w/2);
        });
        return true;
    },
};
$text_css = { "size": "24px", "family": "Arial", "color": "black", "text-align": "center" };