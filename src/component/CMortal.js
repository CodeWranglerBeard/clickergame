// Include namespaces. 
var interfaces = interfaces || {}; 

/**
* @desc An interface for all entities that have health and can die. 
* @namespace
*/
interfaces.CMortal = function() 
{
    Crafty.c("CMortal", 
    {
        init: function() 
        {
            /**
            * @desc If true, the entity can not die. 
            * @memberof interfaces.CMortal
            * @public
            */
            this.isImmortal = false;
            /**
            * @desc Maximum health the entity can have. 
            * @memberof interfaces.CMortal
            * @public 
            */
            this.healthMax = 1;
            /**
            * @desc Amount of remaining health. 
            * @memberof interfaces.CMortal
            * @private
            */
            this.health = 1;
            /**
            * @desc Becomes true upon death. 
            * @memberof interfaces.CMortal
            * @private
            */
            this.isDead = false;

            if (typeof this.die === 'undefined') {
                /**
                * @desc Makes the entity expire. 
                * @memberof interfaces.CMortal
                * @public
                */
                this.die = function() {
                    if (this.isImmortal == false) {
                        this.destroy();
                        this.isDead = true;
                        Crafty.trigger("OnDeath", this);
                    }
                };
            }

            if (typeof this.setHealth === 'undefined') {
                /**
                * @desc Overrides the entity's current health. 
                * Clamps to a range from 1 to maxHealth. 
                * @memberof interfaces.CMortal
                * @param {Number} health - The health to set. 
                * @public
                */
                this.setHealth = function(health) {
                    if (health < 1) {
                        this.health = 1;
                    } else if (health <= this.healthMax) {
                        this.health = health;
                    } else {
                        this.health = this.healthMax;
                    }
                };
            }

            if (typeof this.setHealthMax === 'undefined') {
                /**
                * @desc Overrides the entity's maximum and current health. 
                * Clamps to 1, if the given value is less than 1. 
                * @memberof interfaces.CMortal
                * @param {Number} health - The health to set. 
                * @public
                */
                this.setHealthMax = function(health) {
                    if (health < 1) {
                        this.healthMax = 1;
                    } else {
                        this.healthMax = health;
                    }
                    this.health = this.healthMax;
                };
            }

            if (typeof this.applyDamage === 'undefined') {
                /**
                * @desc Applies damage to an entity's health. 
                * Negative numbers can heal. 
                * @memberof interfaces.CMortal
                * @param {Number} damage - The amount of damage to apply. 
                * @public
                */
                this.applyDamage = function(damage) {
                    this.health -= damage;

                    if (this.health <= 0) {
                        this.die();
                    }
                };
            }
        },
    });
}();