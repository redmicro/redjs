/**
 * Created by seeker910 on 2014/8/31.
 * 站点路径
 */
Rsd.define('Rsd.web.CSitePathPart', {
    extend: 'Rsd.control.Label',
    requires: [
        ''
    ],
    xtype: 't-site-path',
    layout: 'hbox',
    height: 50,
    sizeUnit:'px',
    style:{lineHeight:50},
    width:100,
    text:'首页>新闻',
    /*
    * */
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    }
});
