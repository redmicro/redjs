/**
 * Created by seeker910 on 2017/7/27.
 */
Rsd.define('Rsd.wap.CStoreHomeContentPart', {
    extend: 'Rsd.container.Component',
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
            dataSource:[ ]
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
            itemStyle:{width:'100%',height:'10rem'},
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
     *  {banner:[],goods:[]}
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