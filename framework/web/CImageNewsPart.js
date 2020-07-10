/**
 * Created by seeker910 on 2014/8/21.
 * 图片新闻：左侧图片轮播，右侧新闻列表
 */
Rsd.define('Rsd.web.CImageNewsPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.web.CImagePart',
        'Rsd.web.CListViewPart'
    ],
    xtype: 't-image-news',
    layout:'hbox',
    height:400,
    sizeUnit:'px',
    cls:'t-image-news',
    /*
    * [{src:'',formatString:'',text:''},{src:'',text:''}]
    * */
    dataSource:[],
    items:[
        {
            xtype:'c-image',
            height:'100%',
            flex:7
        },
        {
            xtype:'t-list-view',
            title:'要 闻',
            itemStyle:{overflow:'hidden',height:'45px',lineHeight:'45px',width:'100%',borderBottom: 'red 1px dotted'},
            cls:'t-list',
            itemClick:function(){window.open(this.url);},
            height:'100%',
            flex:3
        }
    ],
    /**
     * 
     * @param {*} config 
     */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
        var me = this;

    },
    /**
     * 
     * @param {*} data 
     */
    loadData:function loadData(data) {
         
        this.dataSource = data||this.dataSource;
        this.items[1].loadData(this.dataSource);
        this.items[0].loadData (this.dataSource);
    }


});