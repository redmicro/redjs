/**
 * Created by seeker910 on 2014/9/1.
 */
Rsd.define('Rsd.template.gov.web.TDetailPage', {
    extend: 'Rsd.template.TPage',
    requires: [
        'Rsd.web.CTopBarPart',
        'Rsd.web.CImageBarPart', 
        'Rsd.web.CBottomPart',
        'Rsd.web.CSitePathPart',
        'Rsd.web.CListViewPart' ,
        'Rsd.control.Link',
        'Rsd.web.CNewsTitlePart',
        'Rsd.web.CHtmlPart'
    ],
    xtype:'t-detail-page',
    layout:'border',
   
    height:'100%',
    sizeUnit:'px',
    items:[
        {
            xtype:'t-top-bar',
            region:'top',
            cls:'x-topBar'
        },
        {
            xtype:'t-image-bar',
            imageUrl:'./resources/images/topic.png',
            region:'top',
            cls:'x-topic'
        },
        {
            region:'top',
            xtype:'t-site-path'
        },
        {
            region:'top',
            xtype: 't-news-title',
            sizeUnit:'px',
            margin:'40 30 0 30'
        },
        {
            region:'top',
            xtype: 't-html',
            bodyCls:'x-detail-content',
            sizeUnit:'px',
            cls:'x-content', 
            margin:'20 30 0 30'
        },
        {
            xtype: 't-list-view',
            region:'bottom',
            label:'相关链接',
            cls:'x-links',
            headerCls:'x-links-header',
            itemStyle:{width:'100%'},
            sizeUnit:'px',
            height:300,
            margin:'20 30 0 30'
        },
        {
            xtype:'t-bottom',
            region:'bottom',
            cls:'x-bottom',
            sizeUnit:'px',
            height:150,
            margin:'40 0 0 0'
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
    /**
     * 
     * @param {*} config 
     */
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    },
    /**
     * 
     */
    load:function load()
    {
        this.items[3].setText('张德江出席十二届全国人大常委会第十次会议闭幕会并讲话');
        this.items[4].setHtml('<h1>hello word</h1><div class=\"a-con\"> <p>【环球时报-环球网报道 记者 李司坤】据路透社报道，澳大利亚总理莫里森周四宣布多项措施，以“帮助”香港居民移居澳洲，包括延长签证期限至五年。此外，莫里森还宣布，暂停与香港之间的引渡协议。在7月9日举行的外交部例行记者会上，发言人赵立坚就此事回应了路透社记者的提问。</p><p>赵立坚表示，澳方有关言论和所宣布的举措，严重违反国际法和国际关系基本准则，粗暴干涉中国内政。“中方不吃这一套，对此表示强烈谴责，并保留进一步作出反应的权利，由此造成的一切后果将完全由澳方承担。”</p><p>赵立坚指出，香港国安立法是确保“一国两制”行稳致远的重要举措。法律实施后，香港的法律体系将更加完备，社会秩序将更加稳定，营商环境将更加良好，有利于香港繁荣稳定。“我要强调，任何对华施压的图谋都绝不会得逞，中方敦促澳方立即改弦更张，停止以任何方式干涉香港事务和中国内政，以免对中澳关系造成进一步的损害。”</p><p><img alt="" src="https://m1-1253159997.image.myqcloud.com/imageDir/790fabe70eddb1f8e43d6f376182c9d2u5.jpg" data-upload-link="%7B%22cover%22%3A%22%22%2C%22desc%22%3A%22%E9%A6%99%E6%B8%AF.jpg%22%2C%22id%22%3A%22790fabe70eddb1f8e43d6f376182c9d2u5%22%2C%22size%22%3A636.85%2C%22width%22%3A1465%2C%22height%22%3A1080%2C%22url%22%3A%22https%3A%2F%2Fm1-1253159997.image.myqcloud.com%2FimageDir%2F790fabe70eddb1f8e43d6f376182c9d2u5.jpg%22%2C%22tags%22%3A%5B%5D%2C%22time%22%3A%222020-07-09%2016%3A04%3A21%22%2C%22mime%22%3A%22image%2Fjpeg%22%7D"></p></div>',
        );
       
        this.items[5].loadData([
            {xtype:'link',width:'100%',text:'十二届全国人大常委会第十次会议举行联组会议',href:'http://www.baidu.com'},
            {xtype:'link',width:'100%',text:'全国人大常委会执法检查组：建议适时研究设立未成年人专门保护机构',href:'http://www.baidu.com'},
            {xtype:'link',width:'100%',text:'十二届全国人大常委会第十次会议8月25日至31日举行',href:'http://www.baidu.com'},
            {xtype:'link',width:'100%',text:'全国人大常委会组成人员为食品安全“开药方”',href:'http://www.baidu.com'},
            {xtype:'link',width:'100%',text:'全国人大常委会在苏进行大气污染防治法执法检查',href:'http://www.baidu.com'}
        ]);

        this.items[6].loadData({companyName:'扬中市房屋专项维修资金管理中心',licenseNO:'苏ICP备1305877号'});
    }
});

