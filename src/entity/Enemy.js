/**
* An enum of possible enemy types. 
*/
var EEnemyTypes = {
    Normal: 0,
    MiniBoss: 1,
    FinalBoss: 2
}

/**
* Represents an enemy. 
*/
Crafty.c("Enemy", 
{
    init: function()
    {
        this.requires("CBase, CMortal");

        this.sprite = undefined;

        // How much gold to award the player when they beat this enemy. 
        this.goldValue = 0;

        // The type of this enemy. 
        this.type = EEnemyTypes.Normal;

        // Name to display to the player. 
        this.name = "DER NAMENLOSE";

        /**
        * Sets the z index of this object and its child objects, based on the given z index. 
        * @returns The z index of the last set child object. 
        */
        this.setZ = function(z) {
            this.z = z++;

            if (typeof this.sprite !== 'undefined') {
                this.sprite.z = z++;
            }

            return z;
        }

        /**
        * Sets the currently displayed sprite. 
        */
        this.setSprite = function(sprite) {
            if (typeof this.sprite !== 'undefined') {
                this.sprite.destroy();
            }

            this.sprite = Crafty.e("CBase");
            this.sprite.requires("Canvas, " + sprite);
            this.sprite.attr({ w: this.w, h: this.h });
            this.attach(this.sprite);
        }
    },
});