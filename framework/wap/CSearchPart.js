Rsd.define('Rsd.wap.CSearchPart', {
    extend: 'Rsd.control.Text',
    xtype: 'c-search',
    requires: [],
    width:'100%',
    height:8,
    margin:'2 0 2 0',
    label:{
        position:'right',
        content:'搜索'
    },
    /*
    * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    }
});