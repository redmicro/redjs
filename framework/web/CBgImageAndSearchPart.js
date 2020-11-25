/**
 * Created by seeker910 on 2014/8/20.
 * 
 * 页面顶部 横幅 （ 背景图片+搜索）
 * 
 */
Rsd.define('Rsd.web.CBgImageAndSearchPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Image',
        'Rsd.control.Text',
        'Rsd.control.Button'],
    xtype: 't-image-bar',
    layout:'border',
    height:150,
    sizeUnit:'px',
    items:[
        {
            region:'top',
            height:25
        },
        {
            xtype:'image',
            region:'center',
            margin:'10 400 5 50', 
        },
        {
            region:'right',
            height:42,
            layout:'hbox',
            margin:'0 0 7 0',
            border:false,
            items:[
                {xtype:'button',text:'搜索',handler:'btn_search',align:'right',style:{overflow:'visible',color:'grey'},width:70} ,
                {xtype:'text',margin:'0 5 0 0',align:'right',style:{overflow:'visible',fontSize:'120%'},width:200}
            ]
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
    loadData:function loadData()
    {
        this.items[1].setSrc(this.imageUrl);
    },
    btn_search:function()
    {
         console.log('service is :' + (this.searchService||'none'));
    }
});
