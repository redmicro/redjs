/**
 * Created by seeker910 on 2014/8/20.
 * 
 * 图片横幅
 * 
 */
Rsd.define('Rsd.web.CHomeTopicPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Image',
        'Rsd.control.Text',
        'Rsd.control.Button'],
    xtype: 't-home-topic',
    layout:'border',
    height:150,
    sizeUnit:'px',
    items:[
        {
            region:'top',
            height:25
        },
        {
            xtype:'image',
            region:'center',
            margin:'10 400 5 50',
            //src:'../debug/topic.png'
        },
        {
            region:'bottom',
            height:42,
            layout:'hbox',
            margin:'0 0 7 0',
            border:false,
            items:[
                {xtype:'button',text:'搜索',align:'right',width:70} ,
                {xtype:'text',margin:'0 5 0 0',align:'right',style:{fontSize:'120%'},width:200}
            ]
        }
    ],
    /**
     * 
     * @param {*} config 
     */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    }
});
