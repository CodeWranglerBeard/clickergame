/**
 * Author Nicolas Haase
 * 
 *
 * This code was written on the basis of Crafty, a game engine by Louis Stowasser.
 * The author of this file is not responsible for or involved in the development of the Crafty game engine.
 */

/**
* @desc Interface that allows an object to have multiple animateable sprites. 
* @namespace
*/
Crafty.c("CReelManager", {
	init: function() {

		// A list of available reels. 
		this.animObjs = [];
		
		// The currently animating reel. 
		this.curReel = "empty";

		// Used to save a reel that can be restored at any later time, useful for "overriding" the current
		// reel, but intending to go back to it after the override, without having to worry about the details
		this.savedReel = "empty"; 

		this.bind("EnterFrame", function(frameData) {
			this.updateAnimObjs();
		});
	},

	/*
	*	Adds a given anim obj to this.animObjs
	*	Expected format:
	*	{ sprite: Sprite, reel: String, frames: int, z: int[, animTime: int, xOffset: int, yOffset: int] }
	*/
	addAnimObj: function(args) {
		// Optional params
		if (!args.animTime) {
			var animTime = 2000;
		} else {
			var animTime = args.animTime;
		}
		if (!args.xOffset) {
			var xOffset = 0;
		} else {
			var xOffset = args.xOffset;
		}
		if (!args.yOffset) {
			var yOffset = 0;
		} else {
			var yOffset = args.yOffset;
		}

		// Mandatory params
		var temp = Crafty.e("Actor, SpriteAnimation, " + args.sprite);
		temp.attr({ x: 0, y: 0, w: this.w, h: this.h, z: args.z });
		temp.reel(args.reel, animTime, xOffset, yOffset, args.frames);
		temp.reel("empty", 2000, args.frames+1, 0, 1);
		temp.animate("empty", -1);
		this.animObjs.push(temp);
	},

	/*
	*	Updates all animObjs and makes sure they have the correct dimensions and z layer and alpha value
	*/
	updateAnimObjs: function() {
		if (this.animObjs.length > 0) {
			for(var i = this.animObjs.length-1; i > -1; --i) {
				var curAnimObj = this.animObjs[i];

				curAnimObj.attr({ x: this.x, y: this.y, w: this.w, h: this.h, z: this.z });
				curAnimObj.alpha = this.alpha;
			}
		}
	},

	/*
	*	Scales the object this ReelManager belongs to, by the given multiplier
	*/
	setScale: function(multiplier) {
		this.attr({ w: this.w * multiplier, h: this.h * multiplier });
		this.offset = { x: this.offset.x * multiplier, y: this.offset.y * multiplier }
	},

	/*
	*	Switches the current animObj to the given animObj and plays it the given amount of times
	*	The reelIn must be a String, as defined by the addAnimObj() method
	*/
	switchAnim: function(reelIn, numTimes) {
		if (this.animObjs.length > 0) {
			this.switchAllToEmpty();

			for(var i = this.animObjs.length-1; i > -1; --i) {
				var curAnimObj = this.animObjs[i];

				if (curAnimObj.getReel(reelIn) != undefined) {
					curAnimObj.animate(reelIn, numTimes);
					this.curReel = reelIn;
				}
			}
		}
	},

	/*
	*	Switches all animObjs to "empty", basically rendering them invisible, effectively making the entire object this ReelManager
	*	belongs to also invisible
	*/
	switchAllToEmpty: function() {
		if (this.animObjs.length > 0) {
			for(var i = this.animObjs.length-1; i > -1; --i) {

				this.animObjs[i].animate("empty", -1);
				this.curReel = "empty";
			}
		}
	},

	/*
	*	Takes an array of strings and compares them against the current reel
	*	If the current reel is among those in the array, return true, else return false
	*/
	checkCurReel: function(args) {
		for(var i = args.length-1; i > -1; --i) {
			var curArgReel = args[i];

			if (curArgReel == this.getCurReel()) {
				return true;
			}
		}
		return false;
	},

	/*
	*	Restores the current reel to the saved reel, overriding whichever the current reel is
	*	Will loop this animation indefinitely
	*/
	restoreSavedReel: function() {
		this.switchAnim(this.savedReel, -1);
	},

	getCurReel: function() {
		return this.curReel;
	},

	setSavedReel: function(reelIn) {
		this.savedReel = reelIn;
	},

	getsavedReel: function() {
		return this.savedReel;
	},
});