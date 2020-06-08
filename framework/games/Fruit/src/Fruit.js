(function(){

var Fruit = window.Fruit = Hilo.Class.create({
    Extends: DropObject,
    constructor: function(properties){
        properties = properties || {};
        Fruit.superclass.constructor.call(this, properties);
    },

    sliced: false, //是否已切开
    slicePartA: null, //水果切片A
    slicePartB: null, //水果切片B

    init: function(){
        Fruit.superclass.init.call(this);

        var me = this, assets = game.assets, body = me.body;

        me.slicePartA = new Hilo.Bitmap({
            image: assets.getContent(me.type.name + 1),
            x: body.x,
            y: body.y,
            pivotX: body.pivotX,
            pivotY: body.pivotY,
            visible: false
        }).addTo(me);

        me.slicePartB = new Hilo.Bitmap({
            image: assets.getContent(me.type.name + 2),
            x: body.x,
            y: body.y,
            pivotX: body.pivotX,
            pivotY: body.pivotY,
            visible: false
        }).addTo(me);
    },

    reset: function(){
        var me = this;

        me.sliced = false;
        me.dropping = false;
        me.body.visible = true;
        me.body.rotation = 0;
        me.slicePartA.x = me.body.x;
        me.slicePartA.visible = false;
        me.slicePartB.x = me.body.x;
        me.slicePartB.visible = false;

        return me;
    },

    slice: function(angle, upDistance, stepX){
        var me = this;
        if(me.sliced) return;
        
        me.body.visible = false;
        me.slicePartA.visible = true;
        me.slicePartB.visible = true;
        me.sliced = true;

        me.dropping = true;
        me.dropStartTime = +new Date();
        me.dropStartY = me.y;
        me.dropStepX = stepX || 0;
        me.dropAngle = (angle + me.type.sliceAngle) % 360;
        
        me.initVelocity(upDistance);
        me.stopRotate();
    },

    onUpdate: function(){
        var me = this;

        if(me.dropping){
            var y = me.calcCurrentPositionY();
            if(me.sliced){
                var rotation = me.dropAngle;
                var sign = rotation <= 90 || rotation >= 270;
                var left = sign ? me.slicePartA : me.slicePartB;
                var right = !sign ? me.slicePartA : me.slicePartB;

                left.rotation = right.rotation = rotation;
                left.x -= me.dropStepX;
                right.x += me.dropStepX;
                me.y = y;
            }else{
                me.y = y;
                me.x += me.dropStepX;
            }

            if(y >= me.floorY + me.height){
                me.dropping = false;
                me.fire('offscreen');
            }
        }
    },

    sliceTest: function(point){
        var me = this;

        if(!me.sliced && me.y < me.floorY && me.body.hitTestPoint(point.x, point.y, true)){
            return true;
        }

        return false;
    }
});


})();