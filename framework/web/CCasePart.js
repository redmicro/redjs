/**
 * Created by seeker910 on 2014/8/20.
 * 客户案例 模块
 */
Rsd.define('Rsd.web.CCasePart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Text',
        'Rsd.web.CImageNewsPart',
        'Rsd.web.CListViewPart',
        'Rsd.web.CTabPart',
        'Rsd.web.CGridPart'
    ],
    xtype: 't-home-content',
    layout:'vbox',
    height:1900,
    sizeUnit:'px',
    items:[ 
    ],
    /** */ 
    constructor: function CCasePart(config) {
        config = config || {};
        Rsd.apply(this, config);

    },
    /**
     * 
     */
    afterInit:function(){

    },
    /**
     * {news:[],notic:[],files:[],laws:[],biz:[]}
     */
    loadData:function loadData()
    {
         
    }

});