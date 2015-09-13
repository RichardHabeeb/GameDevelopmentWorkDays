define(['jquery'], function ($) {
    return function (parent, sizeVector, scale) {
        var that = {};
        var domElement = document.createElement('canvas');
        var sprites = [];

        that.context = domElement.getContext('2d');
        that.tileMap = undefined;

        /* Setup scaled canvas styling and let the browser choose the acceptable method. */
        domElement.setAttribute('style',
            'image-rendering: optimizeSpeed;' +
            'image-rendering: -moz-crisp-edges;' +
            'image-rendering: -webkit-optimize-contrast;' +
            'image-rendering: optimize-contrast;' +
            'image-rendering: pixelated;' +
            '-ms-interpolation-mode: nearest-neighbor;'
            );

        /* setting base size */
        $(domElement).attr({
            'width': sizeVector.x,
            'height': sizeVector.y,
        });
        /* setting scaled size */
        $(domElement).css({
            'width': sizeVector.x * scale + 'px',
            'height': sizeVector.y * scale + 'px',
            'position': 'absolute',
        });
        parent.appendChild(domElement);

        that.attachSprite = function (sprite) {
            sprites.push(sprite);
        };

        that.draw = function (elapsedTimeSeconds) {
            /* if a TileMap is specified, the other sprites aren't drawn. */
            if(typeof that.tileMap !== "undefined") {
                that.tileMap.draw(that.context);
            }
            else {
                that.context.clearRect(0, 0, sizeVector.x, sizeVector.y);
                for(var i = 0; i < sprites.length; i++) {
                    if(sprites[i].visible(sizeVector)) {
                        sprites[i].draw(that.context, elapsedTimeSeconds);
                    }
                }
            }
        };

        that.fadeOut = function(duration) {
            $(domElement).fadeOut(duration, function(){
                parent.removeChild(domElement);
            });
        };

        return that;
    };
});
