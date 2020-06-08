/**
 * Created by seeker910 on 2017/7/10.
 */
Rsd.define('Rsd.control.Email', {
    extend: 'Rsd.control.Input',
    xtype: 'email',
    inputType:'email',
    constructor: function Email(config) {
        config = config || {};
        this.apply(config);

    }
});