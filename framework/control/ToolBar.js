/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:20
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.ToolBar', {
    extend: 'Rsd.container.Component',
    xtype: 'toolBar',
    cls: 'x-tool-bar',
//    items: [],
    layout: {
        type: 'hbox',
        align: 'left'
    },
    height: 30,
    /*
    * */
    constructor: function ToolBar(config) {
        this.header.visible = false;
        config = config || {};
        this.apply(config);
    }
});

