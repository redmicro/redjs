/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-11-8
 * Time: 上午1:38
 * To change this template use File | Settings | File Templates.
 */
Rsd.define('Rsd.control.Number', {
    extend: 'Rsd.control.Input',
    xtype: 'number',
//    height: 30,
//    widht: 80,
    text: '',
    inputType: 'number',
    ctrlCls: 'x-control-number',
    handler: null,
    precision:0,
    /**
     * 
     */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    /**
     * 
     * @param {*} value 
     */
    setValue:function setValue(value) {
        var _v = parseFloat(value).toFixed(this.precision||0);
         this.callParent(_v);
    }

});

