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
        'Rsd.web.CListGroupPart',
        'Rsd.web.CSlideImagePart',
        'Rsd.web.CHNavigationPart', 
        'Rsd.web.CLinkAndCopyrightPart',
        'Rsd.control.HtmlBox'
    ],
    xtype: 't-home-page',
    layout:'auto',
    style:{backgroundColor:'#fff',display:'contents'},//lightslategrey
    header:{
        xtype: 't-h-navigation', 
        height:100,
        style:{backgroundColor:'rgba(46,46,46,0.84)',fontSize:'100%',color:'#000',position:'fixed',top:0,zIndex:9999},
        config:{
            height:'100%',
            itemStyle:{height:'100%',width:150,fontSize:'140%',color:'#fff'},
        }
         
    },
    items:[
        //0
        {
             
            float:true,
            height:0,
            layout:'auto',
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
        //1
        {
            xtype: 't-slide-image',
            height:550,
            width:'100%',
            dataSource:[]
        },
         //2
         {
            xtype:'t-list-group',
            style:{backgroundColor:'rgba(47, 57, 80, 1)'},
            width:'100%',
            border:false,
            height:150
        },
        //3
        {
            xtype:'t-list-group',
            header:{
                xtype:'html-box',
                position:'top', 
                height:150,
                style:{backgroundColor:'transparent'},
                config:{
                    height:'100%',width:'100%',
                    html:'<div style="widht:100%;height:100%;"><div style="widht:100%;height:50px;font-size:120%;text-align:center;">服务项目</div><span>始于电商，不止于电商，是我们服务的宗旨；业务管理，产品营销，产品推广，形象宣传为客户提供一站式解决方案</span></div>'
                }
            },
            width:'100%',
            height:450,
            margin:'0 10% 0 10%',
            border:false
           
        },
        //4
        {
            width:'100%',
            height:50
        },
       
        //5
        {
            xtype:'t-link-copyright',
            cls:'x-bottom',
            width:'100%',
            lineColor:'black',
            height:150,
            margin:'40 0 0 0'
        }
    ],
    /**
     * 
     * @param {*} config 
     */
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
        
         var menus = [
            {flex:1},
            {xtype:'image',src:'../../resources/images/LOGO.PNG',position:'left',width:120,height:100,margin:'20 0',isMenu:false},
            {text:'首页',style:{lineHeight:100}},
            {xtype:'label',text:'产品与服务',style:{lineHeight:100}},
            {text:'案例展示',style:{lineHeight:100}},
            {text:'新闻中心',style:{lineHeight:100}},
            {text:'联系我们',style:{lineHeight:100}},
            {flex:1},
            {xtype:'button',text:'商户登录',handler:'btn_login',width:120,isMenu:false,style:{bottom:20,fontSize:'90%',backgroundColor:'tansparent'}},
            {xtype:'button',text:'商户注册',handler:'btn_register',width:120,isMenu:false,style:{bottom:20,fontSize:'90%',backgroundColor:'tansparent'}}
        ];

         var bottomData = {companyName:'南京红微信息科技有限公司',licenseNO:'苏ICP备18047990号-1'};
         var banner = [ 
             {
                src:'https://img.alicdn.com/tfs/TB1Q7YOdMHqK1RjSZFgXXa7JXXa-2868-912.png',
                html:'<H2 style="position: absolute;color: white;left: 10%;top: 100px;"> Learn more ...</H2>'
             },
             {
                 src:'https://aipage.bce.baidu.com/resources/images/1513ea148c6c1587448221615.png',
                 html:'<H2 style="position: absolute;color: white;left: 10%;top: 100px;"> 相信科技，改变未来</H2>'
            },
             {
                 src:'https://aipage.bce.baidu.com/resources/images/1513ea148c6c1587448813664.png',
                 html:'<H2 style="position: absolute;color: white;left: 10%;top: 100px;">以智慧突破科技</H2>',
                 link:'https:www.baidu.com'
            }, 
             {src:'./resources/images/banner1.jpg',html:'<a href="https:www.baidu.com"> click me </a>'}
            ];
         
            //console.log(this.header.content);
            this.header.content.loadData(menus);

            this.items[1].loadData(banner);
            this.items[2].loadData([{title:'专注'},{title:'原创'},{title:'专业'}]);
            this.items[3].loadData([{title:'电商'},{title:'公众号'},{title:'小程序'},{title:'网站'}]);
            this.items[5].loadData(bottomData);
            //this.callParent();
    },
    btn_register:function btn_register()
    {
         window.location.href = window.location.protocol + '//' + window.location.hostname +'/'+  window.location.pathname + '?theme=biz&tpl=Register'
    }
});
