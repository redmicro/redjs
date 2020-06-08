/**
 * Created by seeker910 on 2014/9/2.
 */
Rsd.define('Rsd.control.HtmlBox', {
    extend: 'Rsd.control.Component',
    requires: [],
    xtype:'html-box',
    ctrlTagName: 'div',
    html:'',
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    onAfterInit:function onAfterInit()
    {
        this.callParent();
        this.ctrl.innerHTML = this.html;
    },
    /*
    * */
   setHtml:function(html){
       this.html = html;
       if(this.isRendered()) {
           this.ctrl.innerHTML = this.html;
       }
   }
});
