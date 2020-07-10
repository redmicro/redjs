/**
 * Created by seeker910 on 2014/8/28.
 */
Rsd.define('Rsd.template.gov.web.TSecondaryPage', {
    extend: 'Rsd.template.TPage',
    requires: [
        'Rsd.web.CTopBarPart',
        'Rsd.web.CImageBarPart',
        'Rsd.web.CGroupPart',
        'Rsd.web.CBottomPart',
        'Rsd.web.CSitePathPart'
    ],
    xtype:'t-secondary-page',
    layout:'border',
    height:'100%',
    sizeUnit:'px',
    items:[
        {
            xtype:'t-top-bar',
            region:'top',
            cls:'x-topBar'
        },
        {
            xtype:'t-image-bar',
            imageUrl:'./resources/images/topic.png',
            region:'top',
            cls:'x-topic'
        },
        {
            xtype:'t-site-path',
            region:'top'
        },
        {
            xtype: 't-group',
            region:'center',
            cls:'x-content'
        },
        {
            xtype:'t-bottom',
            region:'bottom',
            cls:'x-bottom',
            height:150,
            margin:'40 0 0 0'
        }
    ],
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    },
    load:function load() {
        this.callParent();
        Rsd.create('Rsd.web.CFloatingBoxPart',{ title:'微信',fixed:true,position:{top:150,right:5}}).show();
        Rsd.create('Rsd.web.CFloatingBoxPart',{ title:'广告',fixed:true,position:{top:350,right:5}}).show();
    }
});
