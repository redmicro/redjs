(function(){

var Juice = window.Juice = Hilo.Class.create({
    Extends: Hilo.View,
    constructor: function(properties){
        properties = properties || {};
        Juice.superclass.constructor.call(this, properties);

        this._juices = [];
        this.createJuices();
    },

    originX: 0, //起始x轴坐标
    originY: 0, //起始y轴坐标
    maxNum: 20, //最大数量
    minNum: 10, //最小数量
    maxSize: 10, //最大尺寸
    minSize: 5, //最小尺寸
    color: null, //果汁颜色数组，2

    _juices: null, //果汁集合

    render: function(renderer){
        var context = renderer.context, me = this;
        var now = +new Date();

        var juices = me._juices, len = juices.length, juice, count = 0;
        for(var i = 0; i < len; i++){
            juice = juices[i];
            if(juice.dropStartTime == 0) juice.dropStartTime = now;
            
            //计算果汁飞溅的距离
            var time = now - juice.dropStartTime;
            var spatterDistance = juice.spatterRange * ExponentialEaseOut(time / 2e3);

            //计算果汁下落的距离
            var dropDistance = 0.5 * juice.gravity * time * time;
            var x = me.originX + juice.cos * spatterDistance;
            var y = me.originY + juice.sin * spatterDistance + dropDistance;

            //绘制果汁圆形
            var radius = juice.radius;
            context.beginPath();
            context.arc(x + radius, y + radius, radius, 0, Math.PI * 2, 0);
            context.closePath();

            //透明度降低
            juice.alpha -= 0.005;
            if(juice.alpha < 0){
                juice.alpha = 0;
                count++;
            }

            //填充颜色
            var gradient = context.createRadialGradient(x + radius + 1, y + radius + 1, 1, x + radius, y + radius, radius);
            gradient.addColorStop(0, me.color[0]);
            gradient.addColorStop(1, me.color[1]);
            context.globalAlpha = juice.alpha;
            context.fillStyle = gradient;
            context.fill();
        }

        //清除果汁对象
        if(count >= len){
            juices.length = 0;
            me.removeFromParent();
        }
    },

    createJuices: function(){
        var me = this;
        var num = me.minNum + Math.random() * (me.maxNum - me.minNum + 1) >> 0;
        var DEG_TO_RADIAN = Math.PI / 180;

        for(var i = 0; i < num; i++){
            var angle = Math.random() * 360 >> 0;
            var juice = {
                radius: me.minSize + Math.random() * (me.maxSize - me.minSize + 1) >> 0,
                cos: Math.cos(angle * DEG_TO_RADIAN),
                sin: Math.sin(angle * DEG_TO_RADIAN),
                alpha: 0.4 + ((Math.random() * 6 >> 0) * 0.1),
                spatterRange: 100 + Math.random() * 200 >> 0,
                dropStartTime: 0,
                gravity: 10 / 1000 * ((Math.random() * 10 >> 0) * 0.001)
            }
            me._juices[i] = juice;
        }
    }
});

function ExponentialEaseOut(k){
    return k == 1 ? 1 : -Math.pow(2, -10 * k) + 1;
}

})();