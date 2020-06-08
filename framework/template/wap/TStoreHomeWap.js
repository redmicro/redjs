/**
 * Created by seeker910 on 2017/7/28.
 */

Rsd.define('Rsd.template.wap.TStoreHomeWap', {
    extend: 'Rsd.template.wap.TFTCBWap',
    requires: [
        'Rsd.control.QRCode',
        'Rsd.wap.CStoreHomeTopPart',
        'Rsd.wap.CStoreHomeBottomPart',
        'Rsd.wap.CStoreHomeContentPart'
    ],
    "float":{
        "xtype":'qrCode',
        "margin":'0.3 0 0.2 0',
        "handler":function(){
            this.build();
        }},
    top:'c-top-bar',
    content:'c-shop-home',
    bottom:'c-store-bottom',
    dataSource: {
        "float":'http://avengers.dpxcn.com/ui/release.html',
        top:null,
        content: {
            banner: null,
            goods: [
                {
                    gImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533195471641&di=e2ad9562ee1cf8359a113e29635c5101&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F65%2F97%2F74t58PICJ54.jpg',
                    gName: '凤梨酥',
                    gAdv: ['新用户5折', '满减', '砍价'],
                    gPrice: 16.68
                },
                {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '凤梨酥', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '手工烧饼', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鱿鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68},
                {gName: '鲍鱼干', gAdv: ['新用户5折', '满减', '砍价'], gPrice: 16.68}
            ]
        },
        bottom:null

    },
    /*
     *
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    }

});