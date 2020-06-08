/**
 * Created by seeker910 on 2017/4/7.
 */
Rsd.define('Rsd.control.Hidden', {
    extend: 'Rsd.control.Input',
    xtype: 'hidden',
    inputType: 'hidden',
    cls:'x-control-hidden',
    height:'0px',
    width:'0px',
    visible:false,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    }

});