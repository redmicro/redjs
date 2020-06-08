(function(){

var ObjectEmitter = window.ObjectEmitter = Hilo.Class.create({
    Mixes: Hilo.EventMixin,
    constructor: function(properties){
        properties = properties || {};

        this.stage = properties.stage;
        this.objects = [];
    },

    stage: null,
    objects: null,

    startTime: 0,
    canEmit: true,

    startEmit: function(){
        var me = this;

        me.startTime = +new Date();
        me.canEmit = true;
        me.doEmit();
    },

    stopEmit: function(){
        var me = this;
        me.canEmit = false;
    },

    doEmit: function(){
        var me = this, stage = me.stage, objects = me.objects;

        if(!me.canEmit) return;

        var now = +new Date() ,delta = now - me.startTime;
        //最多数: 每隔5秒增加1个(最少2个)
        var max = 2 + delta / 5000 >> 0;
        //最少数: 10s=2
        var min = delta > 1e4 ? 2 : 1;
        //产生数量(最多6个)
        var num = Math.min(6, Math.random() * (max - min + 1) + min >> 0);

        //每次最多只能一个炸弹
        var exception = [];

        for(var i = 0; i < num; i++){
            var obj = me.createRandomObject(exception).addTo(stage);

            if(obj.isBomb()){
                exception.push(obj.type);
            }
            objects.push(obj);
            me.emitObject(obj);
        }
    },

    emitObject: function(obj){
        var me = this, stage = me.stage, objects = me.objects;

        //计算往上抛的高度
        var halfHeight = stage.height >> 1;
        var maxSize = Math.max(obj.width, obj.height);
        var upDistance = halfHeight + Math.random() * (halfHeight - maxSize - 50) >> 0;

        //计算x轴偏移的步长
        var dirX = (Math.random() > 0.5 ? 1 : -1);
        var maxOffsetX = dirX > 0 ? (stage.width - obj.x - obj.width) : obj.x;
        var maxStepX = maxOffsetX / 50 >> 0;
        var stepX = Math.random() * maxStepX * dirX >> 0;

        //水果上抛
        obj.drop(upDistance, stepX);

        //水果旋转
        if(Math.random() > 0.2){
            var rotateTime = 2000 + Math.random() * 6000 >> 0;
            obj.startRotate(rotateTime, 360, true);
        }

        //水果落地
        obj.on('offscreen', function(e){
            this.removeFromParent();
            var index = objects.indexOf(this);
            objects.splice(index, 1);

            //继续发射
            if(objects.length == 0){
                setTimeout(me.doEmit.bind(me), 2000);
            }

            if(!this.isBomb() && !this.sliced){
                me.showDroppedIcon(this);
                me.fire('dropped', obj);
            }
        });
    },

    createRandomObject: function(exception){
        var me = this, obj;

        var type = me.getRandomType(exception);
        if(type.name === 'bomb'){
            obj = new Bomb({type:type, hasShadow:true});
        }else{
            obj = new Fruit({type:type, hasShadow:true});
        }

        //起始坐标
        obj.x = 50 + Math.floor(Math.random() * (me.stage.width - 100));
        obj.y = me.stage.height - obj.height;
        obj.floorY = me.stage.height;
        obj.gravityFactor = 0.1;

        return obj;
    },

    getRandomType: function(exception){
        var types = DropObject.types, len = types.length;
        var type = types[Math.floor(Math.random() * len)];

        if(exception && exception.indexOf(type) >= 0){
            type = this.getRandomType(exception);
        }

        return type;
    },

    sliceTest: function(point, blade){
        var me = this, objects = me.objects, i, obj;
        var result = {score:0, bomb:null};

        for(i = 0, len = objects.length; i < len; i++){
            obj = objects[i];
            if(obj.sliceTest(point)){
                if(obj.isBomb()){
                    result.bomb = obj;
                    return result;
                }else{
                    obj.slice(blade.getAngle(), 0, 2);
                    if(obj.type.juiceColor){
                        var juice = new Juice({
                            color: obj.type.juiceColor,
                            originX: obj.x,
                            originY: obj.y
                        }).addTo(me.stage, obj.depth - 1);
                    }
                    result.score++;
                }
            }
        }

        return result;
    },

    freezObjects: function(){
        var me = this, objects = me.objects;

        for(var i = 0, len = objects.length, obj;  i < len; i++){
            obj = objects[i];
            obj.dropping = false;
        }
    },

    clearObjects: function(){
        var me = this, objects = me.objects;

        for(var i = 0, len = objects.length, obj;  i < len; i++){
            obj = objects[i];
            obj.removeFromParent();
            obj.off();
        }

        objects.length = 0;
    },

    showDroppedIcon: function(obj){
        var me = this;
        
        var droppedIcon = new Hilo.Bitmap({
            image: game.assets.getContent('lose')
        });
        droppedIcon.pivotX = droppedIcon.width >> 1;
        droppedIcon.pivotY = droppedIcon.height >> 1;

        droppedIcon.x = Math.max(droppedIcon.pivotX, Math.min(me.stage.width - droppedIcon.pivotX, obj.x));
        droppedIcon.y = me.stage.height - droppedIcon.pivotY - 5;
        me.stage.addChild(droppedIcon);

        Hilo.Tween.from(droppedIcon, {scaleX:0.2, scaleY:0.2}, {time:100, onComplete:function(){
            setTimeout(function(){
                droppedIcon.removeFromParent();
            }, 1000);
        }});
    }

});

})();