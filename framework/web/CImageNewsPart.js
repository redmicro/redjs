/**
 * Created by seeker910 on 2014/8/21.
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
            itemStyle:{overflow:'hidden',height:'45px',lineHeight:'45px',width:'100%'},
            cls:'t-list',
            itemClick:function(){window.open(this.url);},
            height:'100%',
            flex:3
        }
    ],
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
        this.items[1].loadData(data||this.dataSource);
        this.items[0].loadData (data||this.dataSource);
    }


});