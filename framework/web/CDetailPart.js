/**
 * Created by seeker910 on 2014/9/1.
 */
Rsd.define('Rsd.web.CDetailPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Link',
        'Rsd.web.CTitlePart',
        'Rsd.web.CHtmlPart',
        'Rsd.web.CListViewPart'
    ],
    xtype: 't-detail-content',
    layout: 'vbox',
    height: 1900,
    sizeUnit:'px',
    bodyCls:'x-detail-content',
    dataSource:null,
    items: [
        {
            xtype: 't-title',
            sizeUnit:'px',
            margin:'40 30 0 30'
        },
        {
            xtype: 't-html-content',
            sizeUnit:'px',
            height:1400,
            cls:'x-content',
            margin:'20 30 0 30'
        },
        {
            xtype: 't-list-view',
            label:'相关链接',
            cls:'x-links',
            headerCls:'x-links-header',
            sizeUnit:'px',
            height:300,
            margin:'20 30 0 30'

        },
        {
            xtype:'template',
            sizeUnit:'px',
            height:300,
            width:100,
            position:{top:300,right:10},
            floating:true,
            fixed:true,
            border:true,
            title:'投 票',
            listeners:{
                mouseover:    {
                    element:'dom',
                    fn:function(){
                        this.width =300;
                    }
                },
                mouseout:    {
                    element:'dom',
                    fn:function(){
                        this.width =150;
                    }
                }

            }
        }
    ],
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    },
    /**
     * 
     */
    afterRender:function()
    {
        this.setContent({
            title:'张德江出席十二届全国人大常委会第十次会议闭幕会并讲话',
            content:'<h1>hello word</h1>',
            linkList:[
                {xtype:'link',width:'100%',text:'十二届全国人大常委会第十次会议举行联组会议',href:'http://www.baidu.com'},
                {xtype:'link',width:'100%',text:'全国人大常委会执法检查组：建议适时研究设立未成年人专门保护机构',href:'http://www.baidu.com'},
                {xtype:'link',width:'100%',text:'十二届全国人大常委会第十次会议8月25日至31日举行',href:'http://www.baidu.com'},
                {xtype:'link',width:'100%',text:'全国人大常委会组成人员为食品安全“开药方”',href:'http://www.baidu.com'},
                {xtype:'link',width:'100%',text:'全国人大常委会在苏进行大气污染防治法执法检查',href:'http://www.baidu.com'}]
        });
    },
    /*
    * */
    setContent:function setContent(data){
        this.dataSource = data;
        if(this.isRendered()){
            this.items[0].setText(data.title);
            this.items[1].setHtml(data.content);
            this.items[2].loadData(data.linkList);

        }
    }
});