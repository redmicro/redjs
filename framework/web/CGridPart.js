/**
 * Created by seeker910 on 2014/8/26.
 * 表格
 */
Rsd.define('Rsd.web.CGridPart', {
    extend: 'Rsd.control.Grid',
    requires: [''],
    xtype: 't-grid',
    dataType:{
        //type:Array, 
    },
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    }
     
});