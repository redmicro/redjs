/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.view.Header', {
    extend: 'Rsd.container.Component',
    xtype: 'v-header',
    height: 80,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    }
});
