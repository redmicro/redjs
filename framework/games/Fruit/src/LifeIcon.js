(function(){

var LifeIcon = window.LifeIcon = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        properties = properties || {};
        LifeIcon.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        var me = this;

        var remain = me.remain = new Hilo.Bitmap({
            image: properties.remainImage
        }).addTo(me);

        var lose = me.lose = new Hilo.Bitmap({
            image: properties.loseImage,
            visible: false
        }).addTo(me);
        lose.x = lose.pivotX = lose.width >> 1;
        lose.y = lose.pivotY = lose.height >> 1;

        me.width = remain.width;
        me.height = remain.height;
    },

    loseLife: function(){
        var me = this;
        
        if(!me.lose.visible){
            me.remain.visible = false;
            me.lose.visible = true;
            Hilo.Tween.from(me.lose, {scaleX:0.2, scaleY:0.2}, {time:100});
        }
    },

    reset: function(){
        this.remain.visible = true;
        this.lose.visible = false;
    }
});

})();