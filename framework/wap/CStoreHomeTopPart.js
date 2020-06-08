/**
 * Created by seeker910 on 2017/7/1.
 */

Rsd.define('Rsd.wap.CStoreHomeTopPart', {
    extend: 'Rsd.template.Component',
    requires: [
        'Rsd.control.Label',
        'Rsd.control.Link',
        'Rsd.control.ToolBar',
        'Rsd.control.Image'
    ],
    xtype: 'c-top-bar',
    layout:{type:'border'} ,
    height:'6rem',
    "style":{"textAlign":'center',"lineHeight":'6rem'},
    overflow:'visible',
    items:[

        {
            xtype: 'image',
            region:'left',
            width:'7rem',
            view:false,
            margin:'0.1rem 0.1rem 0.1rem 0.1rem',
            cls:'x-me',
            border:false,
            style:{textAlign:'center'},
            src:'./resources/images/touxiang.png',
            handler:'btn_me'
        },
        {
            xtype: 'link',
            region:'center',
            height:'100%',
            margin:null,
            style:{textAlign:'center'},
            text: 'Zero 鞋业'},

        {
            xtype: 'image',
            region:'right',
            margin:'0.2 0.5 0.2 0.5',
            cls:'x-logo',
            width:'7rem',
            view:false,
            border:false,
            style:{textAlign:'center'},
            src:'./resources/images/LOGO.PNG',
            handler:'btn_home'
        }
    ],
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    btn_me:function btn_me() {
        Rsd.redirect('./release.html?c=MemberHome',{});

    },
    btn_home:function btn_home() {

        Rsd.redirect('./release.html?c=Home',{});
    },
    setTitle:function setTitle(title) {
        this.items[1].setText (title);
    }
});