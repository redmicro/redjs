/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:20
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.ToolBarSeparator', {
    extend: 'Rsd.control.Component',
    xtype: 'tbSeparator',
    cls: 'x-tool-bar',
    separatorText:'|',
    src:'',
    ctrlTagName:'nobr',
    items: [],
    layout: {
        type: 'hbox',
        align: 'center'
    },
    width: 30,
    height: 30,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
        var me = this;
        if(me.src && me.src.length > 0)
        {
            me.ctrlTagName = 'img';
        }
        me.on('afterrender',function(){
            if( me.ctrlTagName == 'img'){
                me.ctrl.src = me.src;
            }
             if( me.ctrlTagName == 'nobr')
             {
                 me.ctrl.appendChild(document.createTextNode(me.separatorText));
                 me.ctrl.style.textAlign = "center";
             }
        });
    }
});
