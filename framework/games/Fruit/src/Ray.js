(function(){

var Ray = window.Ray = Hilo.Class.create({
    Extends: Hilo.View,
    constructor: function(properties){
        properties = properties || {};
        Ray.superclass.constructor.call(this, properties);

        var me = this;
        me.lastTime = +new Date(); //时间戳
        me.rays = []; //所有光线的坐标点
        me.radius = me.width; //光线的半径
        me.rayNum = 10; //光线的数量
        me.rayIndex = []; //光线的索引值，用于产生随机光线
        for(var i = 0; i < me.rayNum; i++){
            me.rayIndex[i] = i;
        }
        me.maskAlpha = 1; //遮罩的透明度
    },

    originX: 0, //光线的起始x轴坐标
    originY: 0, //光线的起始y轴坐标
    
    render: function(renderer){
        var context = renderer.context, me = this;
        var now = +new Date(), deltaTime = now - me.lastTime;

        var rays = me.rays, rayIndex = me.rayIndex, len = rayIndex.length;
        if(len > 0 && deltaTime > 100){
            //间隔创建光线
            me.lastTime = now;
            var randomIndex = Math.random() * len >> 0;
            var angle = rayIndex[randomIndex] * (360 / me.rayNum);
            rayIndex.splice(randomIndex, 1);
            var ray = me.createRay(me.originX, me.originY, me.radius, angle);
            rays.push(ray);
        }else if(deltaTime > 100){
            if(me.maskAlpha >= 1){
                //光线消失
                me.fire('rayover');
            }
            //渲染全屏白色遮罩
            context.globalAlpha = me.maskAlpha;
            context.fillStyle = '#fff';
            context.fillRect(me.x, me.y, me.width, me.height);
            me.maskAlpha -= 0.02;
            if(me.maskAlpha < 0){
                //整个动画效果结束
                me.maskAlpha = 0;
                me.removeFromParent();
                me.fire('complete');
            }
            return;
        }

        //渲染光线
        context.beginPath();
        for(var i = 0, len = rays.length; i < len; i++){
            var ray = rays[i];
            context.moveTo(me.originX, me.originY);
            context.lineTo(ray.p1.x, ray.p1.y);
            context.lineTo(ray.p2.x, ray.p2.y);
        }
        context.closePath();

        //填充白色
        context.fillStyle = '#fff';
        context.fill();
    },
    
    createRay: function(x, y, radius, angle){
        var DEG_TO_RADIAN = Math.PI / 180;
        var rayAngle = 8;

        var x1 = x + radius * Math.cos(DEG_TO_RADIAN * angle);
        var y1 = y + radius * Math.sin(DEG_TO_RADIAN * angle);

        var x2 = x + radius * Math.cos(DEG_TO_RADIAN * (angle + rayAngle));
        var y2 = y + radius * Math.sin(DEG_TO_RADIAN * (angle + rayAngle));

        return {
            p1: {x:x1, y:y1},
            p2: {x:x2, y:y2}
        }
    }

});

})();