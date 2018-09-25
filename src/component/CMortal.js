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
            if (typeof this.isImmortal === 'undefined') {
                /**
                * @desc If true, the entity can not die. 
                * @memberof interfaces.CMortal
                * @public
                */
                this.isImmortal = false;
            }

            if (typeof this.healthMax === 'undefined') {
                /**
                * @desc Maximum health the entity can have. 
                * @memberof interfaces.CMortal
                * @public 
                */
                this.healthMax = 1;
            }

            if (typeof this.health === 'undefined') {
                /**
                * @desc Amount of remaining health. 
                * @memberof interfaces.CMortal
                * @private
                */
                this.health = 1;
            }

            if (typeof this.isDead === 'undefined') {
                /**
                * @desc Becomes true upon death. 
                * @memberof interfaces.CMortal
                * @private
                */
                this.isDead = false;
            }

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
                    }
                };
            }

            if (typeof this.setHealth === 'undefined') {
                /**
                * @desc Overrides the entity's current health. Can not be more than the maximum. 
                * @memberof interfaces.CMortal
                * @param {Number} health - The health to set. 
                * @public
                */
                this.setHealth = function(health) {
                    if (health <= this.healthMax) {
                        this.health = health;
                    } else {
                        this.health = this.healthMax;
                    }
                };
            }

            if (typeof this.applyDamage === 'undefined') {
                /**
                * @desc Applies damage to an entity's health. 
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