(function(){

var DropObject = window.DropObject = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        properties = properties || {};
        DropObject.superclass.constructor.call(this, properties);

        this.init();
    },

    type: null, //类型
    body: null, //主体图片
    floorY: 0, //地面的y轴坐标

    hasShadow: false, //是否有阴影
    shadow: null, //阴影

    dropping: false, //是否正在掉落
    dropStartTime: 0, //掉落起始时间
    dropStartY: 0, //掉落起始y坐标
    dropStepX: 0, //掉落中x轴的偏移步长
    gravity: 0, //重力加速度
    gravityFactor: 0.2, //重力加速度因子

    init: function(){
        var me = this, assets = game.assets;

        //主体
        var body = me.body = new Hilo.Bitmap({
            image: assets.getContent(me.type.name)
        }).addTo(me);
        body.pivotX = body.width >> 1;
        body.pivotY = body.height >> 1;

        me.width = body.width;
        me.height = body.height;

        //阴影
        if(me.hasShadow){
            var shadow = me.shadow = new Hilo.Bitmap({
                image: assets.getContent('shadow'),
                x: body.x,
                y: body.height + 20
            }).addTo(me);
            shadow.pivotX = shadow.width >> 1;
            shadow.pivotY = shadow.height >> 1;
        }
    },

    startRotate: function(time, angle, loop){
        var me = this;
        me.stopRotate();

        time = time || 6000;
        angle = angle || 360;
        me.body.rotation = 0;
        me.rotateTween = Hilo.Tween.to(me.body, {rotation:angle}, {time:time, loop:loop});
        return me;
    },

    stopRotate: function(){
        var me = this;
        if(me.rotateTween){
            me.rotateTween.stop();
            me.rotateTween = null;
        }
        return me;
    },

    drop: function(upDistance, stepX){
        var me = this;

        me.dropping = true;
        me.dropStartTime = +new Date();
        me.dropStartY = me.y;
        me.dropStepX = stepX || 0;
        
        me.initVelocity(upDistance);
    },

    reset: function(){
        var me = this;

        me.dropping = false;
        me.body.rotation = 0;
        return me;
    },

    initVelocity: function(upDistance){
        var me = this;
        upDistance = upDistance || 0;
        me.gravity = 10 / 1000 * me.gravityFactor;
        me.dropVelocity = Math.sqrt(2 * upDistance * me.gravity);
    },

    onUpdate: function(){
        var me = this;

        if(me.dropping){
            var y = me.calcCurrentPositionY();
            me.y = y;
            me.x += me.dropStepX;

            if(y >= me.floorY){
                me.dropping = false;
                me.fire('offscreen');
            }
        }
    },

    calcCurrentPositionY: function(){
        var me = this;
        //掉落时间
        var time = (+new Date()) - me.dropStartTime;
        //掉落距离
        var distance = me.dropVelocity * time - 0.5 * me.gravity * time * time;
        //y轴坐标
        var y = me.dropStartY - distance;

        return y;
    },

    sliceTest: function(point){
        return this.body.hitTestPoint(point.x, point.y, true);
    },

    isBomb: function(){
        return this.type.name === 'bomb';
    },
    
    Statics: {
        types: [
            {name:'sandia', sliceAngle:100, juiceColor:['#ff6c6c', '#c00']}, 
            {name:'peach', sliceAngle:-50, juiceColor:['#fdf2bd', '#e6c731']}, 
            {name:'apple', sliceAngle:-55, juiceColor:['#f6fdd4', '#c8e925']},
            {name:'banana', sliceAngle:90}, 
            {name:'basaha', sliceAngle:-135, juiceColor:['#ff6c6c', '#c00']}, 
            {name:'bomb', sliceAngle:0}
        ]
    }
});


})();