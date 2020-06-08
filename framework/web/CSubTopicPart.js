/**
 * Created by seeker910 on 2014/8/28.
 */
Rsd.define('Rsd.web.CSubTopicPart', {
    extend: 'Rsd.template.Component',
    requires: [
        'Rsd.web.CHNavigationPart',
        'Rsd.control.Image',
        'Rsd.control.Text',
        'Rsd.control.Button'],
    xtype: 't-sub-topic',
    layout:'border',
    height:150,
    sizeUnit:'px',
    items:[
        {
            layout:'hbox',
            region:'center',
            margin:'20 0 5 20',
            items:[
                {
                    xtype:'image',
                    flex:7,
                    margin:'0 0 5 0',
                    //src:'../debug/topic.png'
                },
                {
                    region:'top',
                    flex:3,
                    height:42,
                    layout:'hbox',
                    margin:'20 0 20 0',
                    items:[
                        {xtype:'button',text:'搜索',align:'right',width:70} ,
                        {xtype:'text',margin:'0 5 0 0',align:'right',style:{fontSize:'120%'},width:200}
                    ]
                },
            ]
        } ,
        {
            xtype:'t-h-navigation',
            region:'bottom',
            selectedIndex:0
        }

    ],
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);

    },
    loadData:function loadData(topic) {
        this.items[0].items[0].setSrc(topic);
    }
});
