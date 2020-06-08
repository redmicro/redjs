/*
 * redmicro all Copyright (c)
 */

/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-13
 * Time: 上午6:40
 * To change this template use File | Settings | File Templates.
 */
Rsd.define('Rsd.view.WelcomePage', {
    extend: 'Rsd.container.Page',
    requires:['Rsd.control.Image'],
    xtype: 'p_welcome',
    layout: {type:'border',align:'center'},
    title: 'welcome',
    selected:true,
    backgroundImage:null,
    items: [
        {
            region:'top',
            height:300,
        },
        {
            xtype: 'image',
            region:'center',
            width: 460,
            height:200,
            zoom:'20%',
            position:{top:'25%'},
            //hidden:true,
            //src: './redjs/resources/images/LOGO.PNG',
            border: false
        },
        {
            region:'bottom',
            height:300,
        }
    ],
    /*
    * */
    constructor: function WelcomePage(config) {
        config = config || {};
        this.apply(config);
        this.items[1].src = this.backgroundImage||Rsd.emptyImage();
    }
});