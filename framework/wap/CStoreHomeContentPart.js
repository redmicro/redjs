/**
 * Created by seeker910 on 2017/7/27.
 */
Rsd.define('Rsd.wap.CStoreHomeContentPart', {
    extend: 'Rsd.template.Component',
    xtype:'c-shop-home',
    requires: [
        'Rsd.wap.CBannerPart',
        'Rsd.control.ListView',
        'Rsd.wap.CGoodsListItemPart'
    ],
    layout:{type:'vbox'} ,
    width:'100%',
    /*
    * {banner:[],goods:[]}
    * */
    dataSource:{},
    items:[
       {
            xtype:'c-banner',
            text:'店铺banner',
            src:null,
            height:'16rem',
            name:'banner',
            dataSource:[
               {src:'./resources/images/banner1.jpg',formatString:'',text:'',url:'./release.html?c=ActivateHome'},
               {src:'./resources/images/banner2.png',text:'',url:'./release.html?c=ActivateHome'},
               {src:'./resources/images/banner3.jpg',text:'',url:'./release.html?c=ActivateHome'}
               ]
        },
        {
            xtype: 'list-view',
            name:'goods',
            label:{
                content:'商品列表',
                align:'left',
                position:'top',
                height:'5rem',
                width:'100%',
                style:{lineHeight:'5rem'},
                space:'1px'
            },
            itemStyle:{},
            itemXtype: 'goods-list-item',
            cls:'x-goods-list',
            dataSource:[],
            flex:100
        }
    ],
    /**/
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    /**
     * @description 页面打开后自动执行 根据子控件的name属性自动递归加载数据
     * */
    loadData:function loadData(data) {

        var _data =  data||this.dataSource ||{};
        for(var i in this.items)
        {
            if(this.items[i].loadData)
            {
                var _key = this.items[i].name||'';
                if(Rsd.isEmpty(_key))
                {
                    this.items[i].loadData();
                }
                else {
                    this.items[i].loadData(_data[_key]);
                }
            }
        }
        return this;
    }


});