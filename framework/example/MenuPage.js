Rsd.define('Rsd.example.MenuPage', {
    extend: 'Rsd.container.Page',
    requires: [
        'Rsd.control.ListView',
        'Rsd.control.Image',
        'Rsd.control.Button',
        'Rsd.control.ImageList',
        'Rsd.control.ListMenu'
    ],
    xtype: 'ctrl-menu-page',
    border: false,
    tabTitle: 'menu',
    layout: 'vbox',
    selected:true,
    items:[
        {
            height:60,
            layout:'hbox',
            width:'100%',
            items:[
                {
                    flex:2,
                    border:false
                },
                {
                    xtype: 'list-view',
                    margin:'10 20 10 10',
                    width:1200,
                    cls:'x-navigation',
                    style:{backgroundColor:'blue'},
                    height:60,
                    itemStyle:{height:40,width:120,textAlign:'center',lineHeight:40,color:'white'},
                    dataSource:['首页','案例展示','新闻中心','最新文章','联系我们','',{xtype:'button',text:'登录',handler:'btn_login'},{xtype:'button',text:'免费注册',handler:'btn_register'}],
                    label:{xtype:'image',src:'../resources/images/LOGO.PNG',position:'left',width:120,height:40}
                },
                {
                    flex:2,
                    border:false
                }
            ]

        },
        {width:'100%',height:20},
        {
            height:60,
            layout:'hbox',
            width:'100%',
            items:[
                {
                    flex:2,
                    border:false
                },
                {
                    xtype: 'list-view',
                    margin:'10 20 10 10',
                    width:1200,
                    //cls:'x-navigation',
                    style:{backgroundColor:'green'},
                    height:60,
                    itemStyle:{height:40,width:120,textAlign:'center',lineHeight:40,color:'white'},
                    dataSource:['首页','案例展示','新闻中心','最新文章','联系我们','',{xtype:'button',text:'登录',handler:'btn_login'},{xtype:'button',text:'免费注册',handler:'btn_register'}],
                    label:{xtype:'image',src:'../resources/images/LOGO.PNG',position:'left',width:120,height:40}
                },
                {
                    flex:2,
                    border:false
                }
            ]

        },
        {
            xtype: 'list-menu',
            height:160,
            layout:'vbox',
            width:150,
            menu:[{text:'菜单1'},{text:'菜单2'},{text:'菜单3'}]
        },
        {
            xtype: 'list-menu',
            height:50,
            layout:'hbox',
            width:'100%',
            menu:[{text:'菜单1',width:120},{text:'菜单2',width:120},{text:'菜单3',width:100}]
        },
        {width:'100%',height:20},
        {
            xtype: 'image-list',
            dataSource:[

                {src:'https://img.alicdn.com/tfs/TB1Q7YOdMHqK1RjSZFgXXa7JXXa-2868-912.png',html:'<H2 style="position: absolute;color: white;left: 50px;top: 100px;"> Learn more ...</H2>'},
                {src:'https://www.zjhejiang.com/uploads/banner/banner-(1)20181009050727.png'},
                {src:'https://www.zjhejiang.com/uploads/banner/banner120180811015831.png',link:'https:www.baidu.com'},

                {src:'../../resources/images/redmicro/023.jpeg',html:'<a href="https:www.baidu.com"> click me </a>'}
            ]
        },
        {width:'100%',height:20},
        {
            height:200,
            items:[
                {
                    xtype: 'list-view',
                    width:300,
                    margin:'0 20 0 10',
                    height:200,
                    itemStyle:{textAlign:'center',width:'100%'},
                    dataSource:['高效的内容创作工具','聚集全网最新鲜的创意，直击用户需求','海量优质素材，快速锁定优质商品、图片、视频','发布前内容质量诊断，内容编辑更高效'],
                    label:
                        {
                            xtype:'image',
                            position:'top',
                            height:50,
                            width:'100%',
                            src:'data:image/png;base64,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'
                    }
                }
            ]
        }

    ],
    /*
    * */
    constructor: function MenuPage(config) {
        config = config || {};
        this.apply(config);
    },
    load:function () {
        this.items[0].items[1].loadData();
        this.items[2].items[1].loadData();
        this.items[3].loadData();
        this.items[4].loadData();
        this.items[6].loadData();
        this.items[8].items[0].loadData();
    },
    btn_login:function btn_login( ) {
        alert('login');
    },
    btn_register:function btn_register() {
        alert('register');
    }


},function(type){


});