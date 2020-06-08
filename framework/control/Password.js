/**
 * Created by seeker910 on 14-1-1.
 */
Rsd.define('Rsd.control.Password', {
    extend: 'Rsd.control.Input',
    xtype: 'password',
//    height: 30,
//    widht: 80,
    inputType: 'Password',
    ctrlCls: 'x-control-password',
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    }

});
