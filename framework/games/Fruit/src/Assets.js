(function(){

var Assets = window.Assets = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    numberGlyphs: null,

    load: function(){
        var me = this;
        var resources = [
            {id:'bg', src:'images/background.jpg'},
            {id:'mask', src:'images/home-mask.png'},
            {id:'logo', src:'images/logo.png'},
            {id:'ninja', src:'images/ninja.png'},
            {id:'desc', src:'images/home-desc.png'},
            {id:'new', src:'images/new-game.png'},
            {id:'dojo', src:'images/dojo.png'},
            {id:'quit', src:'images/quit.png'},
            {id:'smoke', src:'images/smoke.png'},
            {id:'score', src:'images/score.png'},
            {id:'best', src:'images/best.png'},
            {id:'number', src:'images/number.png'},
            {id:'gameover', src:'images/game-over.png'},
            {id:'lose', src:'images/lose.png'},
            {id:'remain1', src:'images/x.png'},
            {id:'remain2', src:'images/xx.png'},
            {id:'remain3', src:'images/xxx.png'},
            {id:'lose1', src:'images/xf.png'},
            {id:'lose2', src:'images/xxf.png'},
            {id:'lose3', src:'images/xxxf.png'},
            {id:'shadow', src:'images/shadow.png'},
            {id:'sandia', src:'images/fruit/sandia.png'},
            {id:'sandia1', src:'images/fruit/sandia-1.png'},
            {id:'sandia2', src:'images/fruit/sandia-2.png'},
            {id:'peach', src:'images/fruit/peach.png'},
            {id:'peach1', src:'images/fruit/peach-1.png'},
            {id:'peach2', src:'images/fruit/peach-2.png'},
            {id:'apple', src:'images/fruit/apple.png'},
            {id:'apple1', src:'images/fruit/apple-1.png'},
            {id:'apple2', src:'images/fruit/apple-2.png'},
            {id:'banana', src:'images/fruit/banana.png'},
            {id:'banana1', src:'images/fruit/banana-1.png'},
            {id:'banana2', src:'images/fruit/banana-2.png'},
            {id:'basaha', src:'images/fruit/basaha.png'},
            {id:'basaha1', src:'images/fruit/basaha-1.png'},
            {id:'basaha2', src:'images/fruit/basaha-2.png'},
            {id:'bomb', src:'images/fruit/bomb.png'}
        ];

        var queue = me.queue = new Hilo.LoadQueue();
        queue.maxConnections = 4;
        queue.add(resources);
        queue.on('complete', me.onComplete.bind(me));
        queue.start();
    },

    onComplete: function(e){
        var me = this;

        var number = me.getContent('number');
        me.numberGlyphs = {
            0: {image:number, rect:[0, 280, 30, 35]}, 
            1: {image:number, rect:[0, 315, 18, 35]}, 
            2: {image:number, rect:[0, 245, 30, 35]}, 
            3: {image:number, rect:[0, 210, 30, 35]}, 
            4: {image:number, rect:[0, 175, 30, 35]}, 
            5: {image:number, rect:[0, 140, 30, 35]}, 
            6: {image:number, rect:[0, 105, 30, 35]}, 
            7: {image:number, rect:[0, 70, 30, 35]}, 
            8: {image:number, rect:[0, 35, 30, 35]}, 
            9: {image:number, rect:[0, 0, 30, 35]}
        };

        me.queue.off('complete');
        me.fire('complete');
    },

    getContent: function(id){
        return this.queue.getContent(id);
    }
});

})();