/**
 * Created by seeker910 on 2014/8/26.
 */
Rsd.define('Rsd.web.CGridPart', {
    extend: 'Rsd.control.Grid',
    requires: [''],
    xtype: 't-grid',
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    /*
    *
    * */
    afterRender:function() {
        this.loadData();

    }
});