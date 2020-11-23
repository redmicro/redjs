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
        'Rsd.web.CImagePart',
        'Rsd.web.CHNavigationPart', 
        'Rsd.web.CBottomPart'
    ],
    xtype: 't-home-page',
    layout:'auto',
    style:{backgroundColor:'#fff',display:'contents'},//lightslategrey
    header:{
        height:100,
        xtype: 'list-view', 
        cls:'x-navigation',
        style:{backgroundColor:'rgba(46,46,46,0.84)',color:'#000',position:'fixed',top:0,zIndex:9999},
        config:{ 
            label:{xtype:'image',src:'../../resources/images/LOGO.PNG',position:'left',width:120,height:100,margin:'20 0'},
            //margin:'10 20 10 10',
            width:'100%', 
           // style:{backgroundColor:'rgba(46,46,46,1)'},
            height:100,
            itemStyle:{height:100,width:120,textAlign:'center',lineHeight:100,color:'white'},
            dataSource:[]
            
        }
    },
    items:[
        //0
        {
             
            float:true,
            height:60,
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
            xtype: 't-image',
            height:450,
            dataSource:[]
        },
        //2
        {
            width:'100%',
            border:false,
            style:{backgroundColor:'rgba(47, 57, 80, 1)'},
            height:136
        },
        //3
        {
            xtype:'list',
            width:'100%',
            border:true,
            height:534
        },
        //4
        {
            xtype:'t-bottom',
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
         var menus = ['','','','首页','产品与服务','案例展示','新闻中心','联系我们','','',
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
         this.items[4].loadData(bottomData);
         //this.callParent();
    },
    btn_register:function btn_register()
    {
         window.location.href = window.location.protocol + '//' + window.location.hostname +'/'+  window.location.pathname + '?theme=biz&tpl=Register'
    }
});
