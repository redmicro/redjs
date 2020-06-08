/**
 * Created by seeker910 on 2017/7/1.
 */

Rsd.define('Rsd.wap.CHomeBottomPart', {
    extend: 'Rsd.template.Component',
    requires: [],
    xtype: 'c-home-bar',
    layout:{type:'hbox'} ,
    cls:'x-home-bar',
    height:'10rem',
    items:[
        {
            width:'25%',
            margin:'10 5 10 5',
            cls:'x-home-button',
            style:{textAlign:'center'},
            handler:'btn_home'
        },

        {
            //xtype: 'image',
            width:'25%',
            margin:'10 5 10 5',
            cls:'x-list-button',
            style:{textAlign:'center'},
            handler:'btn_list'
        },

        {
            xtype: 'image',
            width:'25%',
            margin:'10 5 10 5',
            cls:'x-notice-button',
            style:{textAlign:'center'},
            src:'./resources/images/icons.jpg',
            handler:'btn_notice'
        },

        {
            xtype: 'image',
            width:'25%',
            margin:'10 5 10 5',
            cls:'x-my-button',
            style:{textAlign:'center'},
            handler:'btn_me'
        }
    ],
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    btn_home:function btn_home() {
        Rsd.alertLog(Rsd.getUserAgent());
    },
    btn_list:function btn_list() {
        Rsd.alertLog(Rsd.detectNavigator());
    },
    btn_notice:function btn_notice() {
        Rsd.alertLog(Rsd.detectOS());
    },
    btn_me:function btn_buy() {

        Rsd.alertLog(window.screen);

        //console.log(Rsd.getDPI());
    }
});