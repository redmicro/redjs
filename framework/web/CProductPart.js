/**
 * Created by seeker910 on 2014/9/1.
 * 产品展示模板
 */
Rsd.define('Rsd.web.CProductPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Link',
        'Rsd.web.CNewsTitlePart',
        'Rsd.web.CHtmlPart'
    ],
    xtype: 't-detail',
    layout: 'vbox',
    height: 1900,
    sizeUnit:'px',
   
    dataSource:null,
    items: [
       
    ],
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    },
    /**
     * 
     */ 
    loadData:function loadData(data){
        this.dataSource = data;
        if(this.isRendered()){
          

        }
    }
});