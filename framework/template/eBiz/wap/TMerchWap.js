/**
 * Created by seeker910 on 2017/7/28.
 * 商户首页
 */

Rsd.define('Rsd.template.eBiz.wap.TMerchWap', {
    extend: 'Rsd.template.eBiz.wap.TFrameWap',
    requires: [
        'Rsd.control.QRCode',
        'Rsd.wap.CStoreHomeTopPart',
        'Rsd.wap.CStoreHomeBottomPart',
        'Rsd.wap.CStoreHomeContentPart'
    ],
    "float":{
        "xtype":'qrCode',
         border:0,
        "margin":'0.3 0 0.2 0'
    },
    top:'c-top-bar',
    content:'c-shop-home',
    bottom:'c-store-bottom',
    dataSource: {
        "float":'http://js.redmicro.cn/demo/wap/release.html',
        banner:[
             {src:'./resources/images/banner1.jpg',formatString:'',text:'',url:'./release.html?c=ActivateHome'},
            {src:'./resources/images/banner2.png',text:'',url:'./release.html?c=ActivateHome'},
            {src:'./resources/images/banner3.jpg',text:'',url:'./release.html?c=ActivateHome'}
        ],
        goods: [
            {
                gImage: './resources/images/LOGO.PNG',
                gName: '凤梨酥',
                gAdv: ['新用户5折', '满减', '砍价'],
                gPrice: 16.68
            },
            {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
            {gName: '鲍鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68}
        ]

    },
    /*
     *
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    }, 
    /**
     * 加载数据 页面
     */
    load:function load() {
       
        var me = this;
        //设置浮动二维码
        this.float.value = this.dataSource.float;
        setTimeout(function(){
            me.float.build();
        },1000);
        //加载内容数据
        this.content.loadData({banner:this.dataSource.banner,goods:this.dataSource.goods});
        
        //主动调用控件loadData 后，不需要再次调用 callParent
        //this.callParent();
    }


});