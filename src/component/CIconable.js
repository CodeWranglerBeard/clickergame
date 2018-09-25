// Include namespaces. 
var interfaces = interfaces || {}; 

/**
* @namespace
* @desc A component to plug into any object to allow display of an icon on top of it. 
* The members provided by this component can be locally overridden by the implementing objects. 
*/
interfaces.CIconable = function() 
{
    Crafty.c("CIconable", 
    {
        init: function() {
            if (typeof this._icon === 'undefined') {
                /** 
                * @desc  If not null or empty, the sprite to display as an icon in the center of the button. 
                * @memberof interfaces.CBase
                * @public
                */
                this._icon = undefined;
            }

            if (typeof this.setIcon === 'undefined') {
                /**
                * Sets the current icon to display, based on the given Crafty sprite object. 
                * @param {Object} sprite - A Crafty sprite component name. If undefined, clears the current icon. 
                * @param {Object} iconSize - An object containing a .w and .h property, representing the 
                * width and height to assign the icon. 
                */
                this.setIcon = function(sprite, iconSize) {
                    var spriteRot = this.rotation;

                    if (typeof sprite === 'undefined'
                        || typeof this._icon !== 'undefined') {
                        this._icon.destroy();
                        this._icon = undefined;
                    }

                    this._icon = Crafty.e("CBase, Canvas, " + sprite);
                    this._icon.attr({ 
                        w: iconSize.w, 
                        h: iconSize.h 
                    });
                    this._icon.origin(iconSize.w / 2, iconSize.h / 2);
                    this._icon.rotation = -spriteRot;
                    this.rotation = 0;
                    this.setCenteredOnSelf(this._icon);
                    this.attach(this._icon);
                    this.rotation = spriteRot;
                };
            }
        },
    });
}();
