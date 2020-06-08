(function(){

var game = window.game = {
    container: null,
    width: 0,
    height: 0,

    state: null,
    score: 0,
    best: 0,
    dropped: 0,

    init: function(config){
        var me = this;
        me.container = config.container;
        me.width = config.width;
        me.height = config.height;

        //加载素材
        me.assets = new Assets();
        me.assets.on('complete', function(){
            me.initStage();
        }.bind(me), true).load();
    },

    initStage: function(){
        var me = this;

        me.scale = me.width < 640 ? me.width / 640 : 1;

        //舞台
        var stage = me.stage = new Hilo.Stage({
            container: me.container,
            width: 640,
            height: Math.min(480, me.height / me.scale),
            scaleX: me.scale,
            scaleY: me.scale
        });
        
        stage.updateViewport();
        stage.onUpdate = me.onUpdate.bind(me);
        stage.on(Hilo.event.POINTER_END, me.onPointerEnd.bind(me));
        // stage.showDrawRect();

        //背景
        var bg = Hilo.createElement('div', {
            style: {
                position: 'absolute',
                background: 'url('+ me.assets.getContent('bg').src +') no-repeat',
                width: me.width + 'px',
                height: me.height + 'px',
                backgroundSize: me.width + 'px, ' + me.height + 'px'
            }
        });
        me.container.insertBefore(bg, stage.canvas);

        //刀光
        var blade = me.blade = new Blade({
            pointLife: 300,
            pointWidthStep: 0.5,
            endSharpRatio: 1,
            fillStyle: '#fff',
            borderWidth: 1,
            borderStyle: '#ff1c1e'
        }).addTo(stage).activate();

        var ticker = new Hilo.Ticker(60);
        ticker.addTick(stage);
        ticker.addTick(Hilo.Tween);
        ticker.start();
     
        me.showStartScene();
        // me.showPlayScene();
        
        var emitter = me.emitter = new ObjectEmitter({
            width: stage.width,
            height: stage.height,
            stage: stage
        }).on('dropped', me.onFruitDropped.bind(me));
    },

    showStartScene: function(){
        var me = this, stage = me.stage, startScene = me.startScene;
        me.state = 'start';
        if(!startScene){
            startScene = me.startScene = new StartScene({
                width: stage.width,
                height: stage.height,
                assets: me.assets
            }).addTo(stage, me.blade.depth - 1);
            startScene.on('play', me.showPlayScene.bind(me));
        }

        startScene.visible = true;
        startScene.tweenIn();
        me.score = 0;
        me.best = me.saveBestScore();
        me.dropped = 0;

        //console.log('start');
    },

    showPlayScene: function(){
        var me = this, stage = me.stage, playScene = me.playScene;
        me.state = 'play';
        if(!playScene){
            playScene = me.playScene = new PlayScene({
                width: stage.width,
                height: stage.height,
                assets: me.assets
            }).addTo(stage, me.blade.depth - 1);
        }

        me.startScene.hide();
        playScene.visible = true;
        playScene.tweenIn();
        me.blade.points.length = 0;
        me.updateScore(0,false);//console.log('play');
        setTimeout(me.emitter.startEmit.bind(me.emitter), 1000);
    },

    onUpdate: function(){
        var me = this;

        var points = me.blade.points;
        var lastPoint = points[points.length - 1];
        if(!lastPoint) return;

        if(me.state === 'start'){
            me.startScene.sliceTest(lastPoint, me.blade);
        }else if(me.state === 'play'){
            var result = me.emitter.sliceTest(lastPoint, me.blade);
            var bomb = result.bomb;
            if(bomb){
                //切到炸弹
                var ray = new Ray({
                    width: me.stage.width,
                    height: me.stage.height,
                    originX: bomb.x,
                    originY: bomb.y
                }).addTo(me.stage);
                ray.on('rayover', function(e){
                    bomb.removeFromParent();
                    me.emitter.clearObjects();
                }, true);
                ray.on('complete', me.gameOver.bind(me), true);
                me.emitter.stopEmit();
                me.emitter.freezObjects();
            }else if(result.score > 0){

                //切到水果，获得分数
                me.updateScore(result.score, true);
            }
        }
    },

    onFruitDropped: function(e){
        var me = this;

        game.playScene.updateLife(++me.dropped);

        if(me.dropped >= 3){
            me.gameOver();
        }
    },

    gameOver: function(){
        var me = this;

        me.state = 'over';
        me.emitter.stopEmit();
        setTimeout(game.playScene.showGameOver.bind(game.playScene), 500);
    },

    onPointerEnd: function(e){
        var me = this;
        if(me.state === 'over'){
            me.playScene.hide();
            me.showStartScene();
        }
    },

    updateScore: function(score, isAdd){
        var me = this;

        me.score = isAdd ? (me.score + score) : score;
        me.best = me.saveBestScore();
        me.playScene.updateScore(me.score, me.best);
    },

    saveBestScore: function(){
        var score = this.score, best = 0;
        var canStore = Hilo.browser.supportStorage;
        var key = 'hilo-fruit-ninja-best-score';

        if(canStore) best = parseInt(localStorage.getItem(key)) || 0;
        if(score > best){
            best = score;
            if(canStore) localStorage.setItem(key, score);
        }
        return best;
    }
}

})();