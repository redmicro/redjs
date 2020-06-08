/**
 * Created by seeker910 on 2014/9/2.
 */
Rsd.define('Rsd.control.HtmlBox', {
    extend: 'Rsd.control.Component',
    requires: [],
    xtype:'iframe',
    ctrlTagName: 'iframe',
    src:null,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    /*
    * */
    onAfterInit:function onAfterInit()
    {
        this.callParent();
        this.ctrl.src = this.src;
    },
    /*
    * */
    setSrc:function(src){
        this.src = src;
        if(this.isRendered()) {
            this.ctrl.src = this.src;
        }
    }
});