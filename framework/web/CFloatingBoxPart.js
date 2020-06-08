/**
 * Created by seeker910 on 2014/8/31.
 */
Rsd.define('Rsd.web.CFloatingBoxPart', {
    extend: 'Rsd.template.Component',
    requires: [],
    xtype: 't-floating-box',
    layout: 'fit',
    height: 180,
    width:150,
    sizeUnit:'px',
    floating:true,
    border:true,
    style:{lineHeight:50},
    items: [],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    }
});
