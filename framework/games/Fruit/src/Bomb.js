(function(){

var Bomb = window.Bomb = Hilo.Class.create({
    Extends: DropObject,
    constructor: function(properties){
        properties = properties || {};
        Bomb.superclass.constructor.call(this, properties);
    },

    exploded: false,

    init: function(){
        Bomb.superclass.init.call(this);

        var me = this, assets = game.assets, body = me.body;

        var smoke = me.smoke = new Hilo.Bitmap({
            image: assets.getContent('smoke')
        }).addTo(me, body.depth - 1);
        smoke.pivotX = (smoke.width >> 1) + body.pivotX - 3;
        smoke.pivotY = (smoke.height >> 1) + body.pivotY - 3;

        var flame = me.flame = new Flame({
            pivotX: body.pivotX - 3,
            pivotY: body.pivotY - 3
        }).addTo(me);
    },

    reset: function(){
        var me = this;

        me.dropping = false;
        me.body.rotation = 0;
        return me;
    },

    onUpdate: function(){
        var me = this;

        if(me.dropping && !me.exploded){
            var y = me.calcCurrentPositionY();
            me.y = y;
            me.x += me.dropStepX;

            if(y >= me.floorY + me.height){
                me.dropping = false;
                me.fire('offscreen');
            }
        }

        var body = me.body;
        var x = body.x, y = body.y, rotation = body.rotation;
        me.smoke.x = me.flame.x = x;
        me.smoke.y = me.flame.y = y;
        me.smoke.rotation = me.flame.rotation = rotation;
    },

    sliceTest: function(point){
        var me = this;

        if(!me.exploded && me.y < me.floorY && me.body.hitTestPoint(point.x, point.y, true)){
            me.exploded = true;
            return true;
        }

        return false;
    }
});

})();