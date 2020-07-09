/**
 * Created by seeker910 on 2014/8/20.
 * 
 * 底部版权 
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
                {xtype: 'label',width: 290, style:{textAlign:'center'},label:'版权所有：',text: ''},
                {xtype: 'tbSeparator',width: 20},
                {xtype: 'label',width:190,style:{textAlign:'center'},label:'备案号：',text: ''},
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
       
    },
    /**
     * {companyName:'',licenseNO:''}
     */
    loadData:function loadData(data)
    {
        var dataSource = data||this.dataSource ||{}; 
        this.dataSource = dataSource;
        this.items[1].items[1].setValue(dataSource.companyName);
        this.items[1].items[3].setValue(dataSource.licenseNO);
    }
});