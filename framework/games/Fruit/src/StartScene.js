(function(){

var StartScene = window.StartScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        properties = properties || {};
        StartScene.superclass.constructor.call(this, properties);
        this.init();
    },

    assets: null,

    init: function(){
        var me = this, assets = me.assets;

        var bgMask = me.bgMask = new Hilo.Bitmap({
            image: assets.getContent('mask'),
            y: -200
        }).addTo(me);

        var logo = me.logo = new Hilo.Bitmap({
            image: assets.getContent('logo'),
            x: 20,
            y: -200
        }).addTo(me);

        var ninja = me.ninja = new Hilo.Bitmap({
            image: assets.getContent('ninja'),
            x: logo.x + logo.width + 20,
            y: -100
        }).addTo(me);

        var desc = me.desc = new Hilo.Bitmap({
            image: assets.getContent('desc'),
            x: -170,
            y: 125
        }).addTo(me);

        //新游戏
        var newGame = me.newGame = new Hilo.Bitmap({
            image: assets.getContent('new')
        }).addTo(me);
        newGame.pivotX = newGame.pivotY = newGame.width >> 1;
        newGame.x = me.width >> 1;
        newGame.y = me.height - newGame.pivotY - 10;

        var sandia = me.sandia = new Fruit({
            type: DropObject.types[0],
            floorY: me.height,
            x: newGame.x,
            y: newGame.y
        }).addTo(me).startRotate(6000, 360, true);
        sandia.on('offscreen', function(e){
            me.fire('play');
        });

        //DOJO
        var dojo = me.dojo = new Hilo.Bitmap({
            image: assets.getContent('dojo')
        }).addTo(me);
        dojo.pivotX = dojo.pivotY = dojo.width >> 1;
        dojo.x = dojo.pivotX + 10;
        dojo.y = newGame.y + (newGame.pivotY - dojo.pivotY >> 1);

        var peach = me.peach = new Fruit({
            type: DropObject.types[1],
            floorY: me.height,
            x: dojo.x,
            y: dojo.y
        }).addTo(me).startRotate(6000, 360, true);

        //退出
        var quit = me.quit = new Hilo.Bitmap({
            image: assets.getContent('quit')
        }).addTo(me);
        quit.pivotX = quit.pivotY = quit.width >> 1;
        quit.x = me.width - quit.pivotX - 20;
        quit.y = me.height - quit.pivotY - 10;

        var bomb = me.bomb = new Bomb({
            type: DropObject.types[5],
            floorY: me.height,
            x: quit.x,
            y: quit.y
        }).addTo(me);

        // me.tweenIn();
    },

    tweenIn: function(){
        var me = this;

        me.newGame.visible = true;
        me.dojo.visible = true;
        me.quit.visible = true;

        Hilo.Tween.to(me.newGame, {rotation:-360}, {time:20000, loop:true});
        Hilo.Tween.to(me.dojo, {rotation:360}, {time:20000, loop:true});
        Hilo.Tween.to(me.quit, {rotation:360}, {time:20000, loop:true});

        Hilo.Tween.to(me.bgMask, {y:0}, {time:200, ease:QuadraticEaseOut});
        Hilo.Tween.to(me.logo, {y:0}, {time:200, ease:QuadraticEaseOut});
        Hilo.Tween.to(me.ninja, {y:40}, {time:400, ease:BounceEaseOut, delay:200});
        Hilo.Tween.to(me.desc, {x:me.logo.x - 10}, {time:200, ease:QuadraticEaseOut, delay:600});

        me.peach.x = me.dojo.x;
        me.peach.y = me.dojo.y;
        me.peach.startRotate(6000, 360, true);
        me.sandia.x = me.newGame.x;
        me.sandia.y = me.newGame.y;
        me.sandia.startRotate(6000, 360, true);
        me.bomb.x = me.quit.x;
        me.bomb.y = me.quit.y;

        Hilo.Tween.from(me.dojo, {scaleX:0, scaleY:0}, {time:300, delay:800});
        Hilo.Tween.from(me.peach, {scaleX:0, scaleY:0}, {time:300, delay:800});
        Hilo.Tween.from(me.newGame, {scaleX:0, scaleY:0}, {time:300, delay:800});
        Hilo.Tween.from(me.sandia, {scaleX:0, scaleY:0}, {time:300, delay:800});
        Hilo.Tween.from(me.quit, {scaleX:0, scaleY:0}, {time:300, delay:800});
        Hilo.Tween.from(me.bomb, {scaleX:0, scaleY:0}, {time:300, delay:800});
    },

    hide: function(){
        var me = this;

        me.visible = false;
        me.peach.reset();
        me.sandia.reset();
        me.bomb.reset();
    },

    sliceTest: function(point, blade){
        var me = this;
        var sandia = me.sandia, peach = me.peach, bomb = me.bomb;

        if(sandia.sliceTest(point)){
            sandia.slice(blade.getAngle(), 0, 2);
            peach.drop(10 + Math.random() * 10 >> 0, -3);
            bomb.drop(10 + Math.random() * 10 >> 0, 1);
            me.newGame.visible = false;
            me.dojo.visible = false;
            me.quit.visible = false;

            Hilo.Tween.removeAll();
            Hilo.Tween.to(me.bgMask, {y:me.bgMask.y - 200}, {time:200});
            Hilo.Tween.to(me.logo, {y:me.logo.y - 200}, {time:200});
            Hilo.Tween.to(me.ninja, {y:me.ninja.y - 200}, {time:200});
            Hilo.Tween.to(me.desc, {x:me.desc.x - 170}, {time:200});

            return true;
        }

        return false;
    }

});

function QuadraticEaseOut(k){
    return - k * (k - 2);
}

function BounceEaseOut(k){
    if(( k /= 1) < 0.3636){
        return 7.5625 * k * k;
    }else if(k < 0.7273){
        return 7.5625 * (k -= 0.5455) * k + 0.75;
    }else if(k < 0.9091){
        return 7.5625 * (k -= 0.8182) * k + 0.9375;
    }else{
        return 7.5625 * (k -= 0.9545) * k + 0.984375;
    }
}

})();