/**
 * Created by seeker910 on 2017/7/28.
 * 个人中心
 */
Rsd.define('Rsd.template.eBiz.wap.TPersonalWap', {
    extend: 'Rsd.template.eBiz.wap.TFrameWap',
    requires: [
        'Rsd.wap.CStoreHomeTopPart',
        'Rsd.wap.CHomeBottomPart'
    ],
    "top":'c-top-bar',
    "content":'',
    "bottom": 'c-home-bar',

    /*
    * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    /*
    * */
    load:function load() {
        this.callParent();

        //this.top.setTitle('Member');
        //this.float.setPosition({bottom:'11rem', right:'1rem'});

    }


});