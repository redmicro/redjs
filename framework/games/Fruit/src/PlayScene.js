(function(){

var PlayScene = window.PlayScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        properties = properties || {};
        PlayScene.superclass.constructor.call(this, properties);
        this.init();
    },

    assets: null,

    init: function(){
        var me = this, assets = me.assets;

        //当前分数
        var scoreIcon = me.scoreIcon = new Hilo.Bitmap({
            image: assets.getContent('score')
        }).addTo(me);
        scoreIcon.pivotX = scoreIcon.width >> 1;
        scoreIcon.pivotY = scoreIcon.height >> 1;
        scoreIcon.x = scoreIcon.pivotX + 8;
        scoreIcon.y = scoreIcon.pivotY + 8;

        var score = me.score = new Hilo.BitmapText({
            glyphs: assets.numberGlyphs,
            x: scoreIcon.x + scoreIcon.pivotX + 8,
            y: scoreIcon.y - scoreIcon.pivotY,
            letterSpacing: -4,
            text: 0
        }).addTo(me);

        //最好成绩
        var bestIcon = me.bestIcon = new Hilo.Bitmap({
            image: assets.getContent('best'),
            x: 5,
            y: 52
        }).addTo(me);

        var best = me.best = new Hilo.BitmapText({
            glyphs: assets.numberGlyphs,
            x: bestIcon.x + bestIcon.width + 5,
            y: bestIcon.y,
            scaleX: 0.6,
            scaleY: 0.6,
            letterSpacing: -4,
            text: 0
        }).addTo(me);

        //生命值图标
        var lifeIcon3 = me.lifeIcon3 = new LifeIcon({
            loseImage: assets.getContent('lose3'),
            remainImage: assets.getContent('remain3'),
            y: 5
        }).addTo(me);
        lifeIcon3.x = me.width - lifeIcon3.width - 5 >> 0;

        var lifeIcon2 = me.lifeIcon2 = new LifeIcon({
            loseImage: assets.getContent('lose2'),
            remainImage: assets.getContent('remain2'),
            y: 5
        }).addTo(me);
        lifeIcon2.x = lifeIcon3.x - lifeIcon2.width >> 0;

        var lifeIcon1 = me.lifeIcon1 = new LifeIcon({
            loseImage: assets.getContent('lose1'),
            remainImage: assets.getContent('remain1'),
            y: 5
        }).addTo(me);
        lifeIcon1.x = lifeIcon2.x - lifeIcon1.width >> 0;

        //gameover文字
        var gameover = me.gameover = new Hilo.Bitmap({
            image: assets.getContent('gameover'),
            visible: false
        }).addTo(me);
        gameover.pivotX = gameover.width >> 1;
        gameover.pivotY = gameover.height >> 1;
        gameover.x = me.width >> 1;
        gameover.y = me.height >> 1;
        
         //me.tweenIn();
    },
    /*
    * */
    updateScore: function(score, best){
        var me = this;

        if(score == 0 || me.score.text != score){
            //me.score.text = score;
            me.score.setText(score);
            me.scoreIcon.scaleX = me.scoreIcon.scaleY = 1;
            Hilo.Tween.to(me.scoreIcon, {scaleX:1.5, scaleY:1.5}, {time:100, reverse:true});
        }

        //me.best.text = best;
        me.best.setText(best) ;

    },

    updateLife: function(loseCount){
        if(loseCount <= 0) return;

        var me = this;
        var lifes = [me.lifeIcon1, me.lifeIcon2, me.lifeIcon3];
        loseCount = Math.min(loseCount, 3);
        while(--loseCount >= 0){
            lifes[loseCount].loseLife();
        }
    },

    showGameOver: function(){
        var me = this, gameover = me.gameover;

        if(!gameover.visible){
            gameover.visible = true;
            Hilo.Tween.from(gameover, {scaleX:0.2, scaleY:0.2}, {time:200, ease:QuadraticEaseOut});
        }
    },

    tweenIn: function(){
        var me = this;

        Hilo.Tween.from(me.scoreIcon, {x:-100}, {time:100, ease:QuadraticEaseOut});
        Hilo.Tween.from(me.score, {x:-100}, {time:100, ease:QuadraticEaseOut});
        Hilo.Tween.from(me.bestIcon, {x:-100}, {time:100, ease:QuadraticEaseOut});
        Hilo.Tween.from(me.best, {x:-100}, {time:100, ease:QuadraticEaseOut});

        Hilo.Tween.from(me.lifeIcon1, {x:me.width + 100}, {time:100, ease:QuadraticEaseOut});
        Hilo.Tween.from(me.lifeIcon2, {x:me.width + 100}, {time:100, ease:QuadraticEaseOut});
        Hilo.Tween.from(me.lifeIcon3, {x:me.width + 100}, {time:100, ease:QuadraticEaseOut});

        me.gameover.visible = false;
    },

    hide: function(){
        var me = this;

        me.visible = false;
        me.lifeIcon1.reset();
        me.lifeIcon2.reset();
        me.lifeIcon3.reset();
        me.score.text = 0;
        me.gameover.visible = false;
    }
});

function QuadraticEaseOut(k){
    return - k * (k - 2);
}

})();