/**
 * Created by seeker910 on 2014/8/18.
 *
 * TTCB top topic content bottom
 */
Rsd.define('Rsd.template.web.THomePage', {
    extend: 'Rsd.template.web.TPage',
    requires: [
        'Rsd.web.CTopBarPart',
        'Rsd.web.CHomeTopicPart',
        'Rsd.web.CHNavigationPart',
        'Rsd.web.CHomeContentPart',
        'Rsd.web.CBottomPart'
    ],
    xtype: 't-home-page',
    layout:'border',
    height:2800,
    sizeUnit:'px',
    items:[
        {
            xtype:'t-top-bar',
            region:'top',
            cls:'x-topBar'
        },
        {
            xtype:'t-home-topic',
            region:'top',
            cls:'x-topic'
        },
        {
            xtype:'t-h-navigation',
            region:'top'
        },
        {
            xtype: 't-home-content',
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
        this.apply(config);
    }
});
