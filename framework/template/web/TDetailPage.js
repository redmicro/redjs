/**
 * Created by seeker910 on 2014/9/1.
 */
Rsd.define('Rsd.template.web.TDetailPage', {
    extend: 'Rsd.template.web.TPage',
    requires: [
        'Rsd.web.CTopBarPart',
        'Rsd.web.CSubTopicPart',
        'Rsd.web.CDetailPart',
        'Rsd.web.CBottomPart',
        'Rsd.web.CSitePathPart'
    ],
    xtype:'t-detail-page',
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
            xtype:'t-sub-topic',
            region:'top',
            cls:'x-topic'
        },
        {
            region:'top',
            xtype:'t-site-path'
        },
        {
            xtype: 't-detail-content',
            region:'center',
            cls:'x-content'
        },
        {
            xtype:'t-bottom',
            region:'bottom',
            cls:'x-bottom',
            sizeUnit:'px',
            height:150,
            margin:'40 0 0 0'
        }
    ],
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    },
});

