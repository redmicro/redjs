/**
 * Created by seeker910 on 2014/8/28.
 * 页面底部 版权 控件
 */
Rsd.define('Rsd.web.CBottomPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.web.CCopyrightPart',
        'Rsd.control.Image',
        'Rsd.control.Text',
        'Rsd.control.Button'],
    xtype: 't-bottom',
    layout:'border',
    height:250, 
    sizeUnit:'px',
    items:[
        {
            xtype:'container',
            style:{backgroundColor:'#0000ff'},
            region:'top', 
            height:1, 
        },
        {
            xtype:'container',
            region:'center',
            margin:'0 0 5 0', 
        },
        {
            xtype:'t-copyright',
            region:'bottom', 
            height:50, 
        },
    ],
    /**
     * 
     * @param {*} config 
     */
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
        this.items[0].style.backgroundColor = this.lineColor;
    },
    /**
     * 
     * @param {*} topic 
     */
    loadData:function loadData(data) {
        this.dataSource = data||this.dataSource;
       
        this.items[2].loadData( this.dataSource);
    },
    /**
     * 
     */
    btn_search:function()
    {
         console.log('service is :' + this.searchService);
    }
});
