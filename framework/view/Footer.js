/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:16
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.view.Footer', {
    extend: 'Rsd.container.Component',
    xtype: 'v-footer',
    height: 25,
    layout: 'hbox',
    cls:'x-footer',
    constructor: function constructor (config) {
        config = config || {};
        this.apply(config);

    }
});
