/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-11-8
 * Time: 上午1:36
 * To change this template use File | Settings | File Templates.
 */
Rsd.define('Rsd.control.Text', {
    extend: 'Rsd.control.Input',
    xtype: 'text',
    margin:'2 0 2 0',
//    height: 25,
//    width: 80,
    inputType: 'text',
    ctrlCls: 'x-control-text',
    handler: null,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    }

});

