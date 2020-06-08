
/**
 * Blade Effect for Hilo
 */
var Blade = (function(){

var start = Hilo.event.POINTER_START,
    move = Hilo.event.POINTER_MOVE,
    end = Hilo.event.POINTER_END;

return Hilo.Class.create({
    Extends: Hilo.View,
    constructor: function Blade(properties){
        Blade.superclass.constructor.call(this, properties);
        this.points = [];
    },

    pointLife: 300, //点的存在时间，单位为毫秒ms
    pointWidthStep: 0.5, //点的宽度增加步长
    endSharpRatio: 2, //端点的锐度
    fillStyle: '#fff', //填充样式
    borderWidth: 0, //边框宽度
    borderStyle: null, //边框样式

    activated: false, //是否被激活，只读。
    points: null, //组成刀光的点的集合，只读。

    /**
     * 激活刀光效果。注意：要加入到舞台stage后才能被激活。
     */
    activate: function(){
        var me = this, stage = me.getStage();
        
        if(stage && !me.activated){
            var onStart = me._onStart = function(e){
                me._start = true;
            };
            var onMove = me._onMove = function(e){
                if(me._start) me.pushPoint({x:e.stageX, y:e.stageY});
            };
            var onEnd = me._onEnd = function(e){
                me._start = false;
            };

            stage.enableDOMEvent([start, move, end], true);
            stage.on(start, onStart);
            stage.on(move, onMove);
            stage.on(end, onEnd);
            me.activated = true;
        }

        return me;
    },

    /**
     * 停止刀光效果。
     */
    inactivate: function(){
        var me = this, stage = me.getStage();
        
        if(stage && me.activated){
            stage.off(start, me._onStart);
            stage.off(move, me._onMove);
            stage.off(end, me._onEnd);
        }

        me.activated = false;
        me.points.length = 0;

        return me;
    },

    /**
     * 增加构成刀光路径的点。{x:$x, y:$y}。
     */
    pushPoint: function(point){
        var me = this, points = me.points, len = points.length;
        if(len > 0){
            point.normal = getNormal(points[len - 1], point);
        }
        point.ts = +new Date();
        points[len] = point;
    },

    /**
     * @private
     */
    render: function(renderder){
        var context = renderder.context,
            me = this, points = me.points,
            len = points.length;

        //remove dead points
        var now = +new Date();
        while(len && now - points[0].ts > me.pointLife){
            points.shift();
            len--;
        }
        if(len < 2) return;

        var step = me.pointWidthStep, sharp = me.endSharpRatio,
            p = points[0], normal, pw, flag = 1, i = 1;

        //draw path
        context.beginPath();
        context.moveTo(p.x, p.y);

        while(i){
            p = points[i];
            normal = p.normal;
            pw = i * step;

            context.lineTo(p.x + flag * normal.y * pw, p.y - flag * normal.x * pw);
            if(i == len - 1 && flag > 0){
                //draw end sharp point
                context.lineTo(p.x + normal.x * pw * sharp, p.y + normal.y * pw * sharp);
                flag = -1;
            }else{
                i += flag;
            }
        }

        context.closePath();

        //border style
        if(me.borderWidth){
            context.lineWidth = me.borderWidth;
            context.strokeStyle = me.borderStyle;
            context.stroke();
        }

        //fill style
        context.fillStyle = me.fillStyle;
        context.fill();
    },

    getAngle: function(){
        var me = this, points = me.points;
        var start = points[0], end = points[points.length - 1];
        if(start && end && start !== end){
            var dx = end.x - start.x, dy = end.y - start.y;
            var angle = Math.atan2(dy, dx) * 180 / Math.PI >> 0;
            if(angle < 0) angle = angle + 360;
            return angle;
        }
        return 0;
    }
});

function getNormal(p1, p2){
    var dx = p2.x - p1.x, dy = p2.y - p1.y;
    var length = Math.sqrt(dx * dx + dy * dy);
    return {x:dx / length, y:dy / length};
}

})();