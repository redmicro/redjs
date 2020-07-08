/**
 * Created by seeker910 on 2014/8/20.
 */
Rsd.define('Rsd.web.CBottomPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Label',
        'Rsd.control.Link',
        'Rsd.control.ToolBar',
        'Rsd.control.ToolBarSeparator'
    ],
    xtype: 't-bottom',
    layout:{type:'vbox'} ,
    height:100,
    sizeUnit:'px',
    items:[
        {
          height:50
        },
        {
            xtype: 'toolBar',
            border: false,
            height: 50,
            layout: {type:'hbox',align:'center'},
            sizeUnit:'px',
            items: [
                {flex:1},
                {xtype: 'label',width: 290, style:{textAlign:'center'},text: '版权所有：扬中市房屋专项维修资金管理中心'},
                {xtype: 'tbSeparator',width: 20},
                {xtype: 'label',width:190,style:{textAlign:'center'},text: '备案号：苏ICP备1305877号'},
                {xtype: 'tbSeparator',width: 20},
                {xtype: 'label',width: 65,style:{textAlign:'center'},text: '关于我们'},
                {xtype: 'tbSeparator',width: 20},
                {xtype: 'label',width:65,style:{textAlign:'center'},text: '网站声明'},
                {flex:1}
            ]
        }
    ],
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    }
});