/**
 * Created by seeker910 on 2017/6/30.
 */

Rsd.define('Rsd.wap.CStoreHomeBottomPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Label',
        'Rsd.control.Link',
        'Rsd.control.ToolBarSeparator'
    ],
    xtype: 'c-store-bottom',
    height:'6rem',
    border:true,
    layout: {type:'hbox',align:'center'},
    "style":{"textAlign":'center',"lineHeight":'6rem'},
    //margin:'1.5rem 5 1.5rem 5',
    items:[
        {xtype: 'link', margin:null, height:'100%',flex: 16,text: '关于我们',handler:'btn_about'},
        {xtype: 'tbSeparator', height:'100%',width: 2},
        {xtype: 'link', margin:null, height:'100%',flex:16,text: '立即购买',handler:'btn_buy'},

    ],
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    btn_buy:function btn_buy() {
        //console.log(this.parent);
        Rsd.showMessage('hellooo');
    },
    btn_about:function btn_about() {
        Rsd.showMessage('about me');
    }
});