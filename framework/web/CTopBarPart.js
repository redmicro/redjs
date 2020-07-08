/**
 * Created by seeker910 on 2014/8/20.
 */
Rsd.define('Rsd.web.CTopBarPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Text',
        'Rsd.control.Label',
        'Rsd.control.Link',
        'Rsd.control.ToolBar',
        'Rsd.control.ToolBarSeparator'
    ],
    xtype: 't-top-bar',
    layout: 'fit',
    height:30,
    sizeUnit:'px',
    items: [
        {
            xtype: 'toolBar',
            border: false,
            height: 30,
            layout: 'hbox',
            margin: '5 0 0 0',
            items: [
                {xtype: 'link',width: 50,text: '简 体'},
                {xtype: 'tbSeparator',width: 20},
                {xtype: 'link',width: 50,text: '繁 體'},
                {xtype: 'tbSeparator',width: 20},
                {xtype: 'link',width: 60,text: 'English'},
                {xtype: 'tbSeparator',width: 20},
                {xtype: 'label',width:120,text: '2014年8月19日'},
                {xtype: 'label',width:100,text: '星期三'},
                {xtype: 'link',width:100, align: 'right',text: '领导信箱'}
            ]
        }
    ],
    /*
    * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
        var _now = new Date();
        this.items[0].items[6].text = _now.format('yyyy年MM月dd日');
        this.items[0].items[7].text = _now.getWeek();
    }
});
