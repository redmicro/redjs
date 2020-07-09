/**
 * Created by seeker910 on 2014/8/18.
 *
 * TTCB top topic content bottom
 */
Rsd.define('Rsd.template.biz.web.THomePage', {
    extend: 'Rsd.template.TPage',
    requires: [
        'Rsd.control.ListView',
        'Rsd.control.Button',
        'Rsd.web.CTopBarPart',
        'Rsd.web.CHomeTopicPart',
        'Rsd.web.CHNavigationPart',
        'Rsd.web.CHomeContentPart',
        'Rsd.web.CBottomPart'
    ],
    xtype: 't-home-page',
    layout:'border',
    height:'1200px',
    sizeUnit:'px',
    header:{
        height:60,
        xtype: 'list-view', 
        cls:'x-navigation',
        style:{backgroundColor:'rgba(255, 24, 0, 0.62)',color:'#000'},
        config:{ 
            label:{xtype:'image',src:'../../resources/images/LOGO.PNG',position:'left',width:120,height:40},
            margin:'10 20 10 10',
            width:'100%', 
            height:60,
            itemStyle:{height:40,width:120,textAlign:'center',lineHeight:40,color:'white'},
            dataSource:[]
            
        }
    },
    items:[
        {
            region:'top',
            float:true,
            height:60,
            layout:'hbox',
            width:'100%',
            items:[
                {
                    flex:2,
                    border:false
                },
                {
                },
                {
                    flex:2,
                    border:false
                }
            ]

        },
         
        {
            region:'center',
            xtype: 'image-list',
            dataSource:[]
        },
       
        {
            xtype:'t-bottom',
            region:'bottom',
            cls:'x-bottom',
            height:150,
            margin:'40 0 0 0'
        }
    ],
    constructor: function constructor(config) {

        config = config || {};
        this.apply(config);
    },
    /**
     * 
     */
    load:function load()
    {
        //首页数据 
         var menus = ['首页','案例展示','新闻中心','最新文章','联系我们','','',
         {xtype:'button',text:'登录',handler:'btn_login'},
         {xtype:'button',text:'免费注册',handler:'btn_register'}];
         var bottomData = {companyName:'南京红微信息科技有限公司',licenseNO:'苏ICP备1234567号'};
         var banner = [ 
             {src:'https://img.alicdn.com/tfs/TB1Q7YOdMHqK1RjSZFgXXa7JXXa-2868-912.png',html:'<H2 style="position: absolute;color: white;left: 50px;top: 100px;"> Learn more ...</H2>'},
             {src:'https://www.zjhejiang.com/uploads/banner/banner-(1)20181009050727.png'},
             {src:'https://www.zjhejiang.com/uploads/banner/banner120180811015831.png',link:'https:www.baidu.com'}, 
             {src:'./resources/images/banner1.jpg',html:'<a href="https:www.baidu.com"> click me </a>'}];
         
         this.header.content.loadData(menus);
         this.items[1].loadData(banner);
         this.items[2].loadData(bottomData);
         //this.callParent();
    },
    btn_register:function btn_register()
    {
         window.location.href = window.location.protocol + '//' + window.location.hostname +'/'+  window.location.pathname + '?theme=biz&tpl=Register'
    }
});
