(function(){

var Flame = window.Flame = Hilo.Class.create({
    Extends: Hilo.View,
    constructor: function(properties){
        properties = properties || {};
        Flame.superclass.constructor.call(this, properties);

        this.lastTime = +new Date();
        this._flames = [];
    },

    lastTime: 0,
    _flames: null,

    render: function(renderer){
        var context = renderer.context, me = this;
        var now = +new Date(), deltaTime = now - me.lastTime;

        //间断的创建火苗
        if(deltaTime > 40){
            me.lastTime = now;
            var angle = 360 * Math.random() >> 0;
            var duration = 200 + 500 * Math.random() >> 0;  
            me._flames.push(createFlame(15, angle, duration, 60));
        }

        //绘制所有火苗
        var flames = me._flames, flame;
        for(var i = 0, len = flames.length; i < len; i++){
            flame = flames[i];
            var time = now - flame.birthTime;
            if(time >= flame.duration){
                flames.splice(i, 1);
                i--;
                len--;
            }else{
                flame.scale = 1 - (time / flame.duration);
                drawFlame(context, flame);
            }
        }
    }
    
});

function createFlame(radius, angle, duration, moveStep){
    return {
        radius: radius, //半径大小
        angle: angle, //旋转角度
        duration: duration, //持续时长
        birthTime: +new Date(), //产生时间
        moveStep: moveStep, //移动步长
        scale: 1 //缩放比例
    };
}

function drawFlame(context, flame){
    var ratio = 0.3, sincos = calcAngle(flame.angle);
    
    //起始偏移位置
    var x = sincos.cos * flame.moveStep * (1 - flame.scale);
    var y = sincos.sin * flame.moveStep * (1 - flame.scale);

    //火苗顶点
    var dx1 = sincos.cos * flame.radius * flame.scale, dy1 = sincos.sin * flame.radius * flame.scale;
    
    //火苗二次曲线quadraticCurveTo的左侧控制点
    sincos = calcAngle(flame.angle + 90);
    var dx2 =  sincos.cos * flame.radius * flame.scale * ratio, dy2 = sincos.sin * flame.radius * flame.scale * ratio;

    //火苗二次曲线quadraticCurveTo的右侧控制点
    sincos = calcAngle(flame.angle - 90);
    var dx3 =  sincos.cos * flame.radius * flame.scale * ratio, dy3 = sincos.sin * flame.radius * flame.scale * ratio;

    var p1 = {x:x + dx1, y:y + dy1};
    var p2 = {x:x - dx1, y:y - dy1};
    var p3 = {x:x - dx2, y:y - dy2};
    var p4 = {x:x - dx3, y:y - dy3};

    //绘制火苗形状
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.quadraticCurveTo(p3.x, p3.y, p2.x, p2.y);
    context.quadraticCurveTo(p4.x, p4.y, p1.x, p1.y);
    context.closePath();

    //设定火苗填充渐变
    context.fillStyle = getFillStyle(context, p1, p2);
    context.fill();
}

function calcAngle(angle){
    var radian = angle * Math.PI / 180;
    return {
        sin: Math.sin(radian),
        cos: Math.cos(radian)
    }
}

function getFillStyle(context, p1, p2){
    var gradient = context.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    gradient.addColorStop(0, '#f0ef9c');
    gradient.addColorStop(1, '#fafad9');
    return gradient;
}

})();