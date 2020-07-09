/**
 * Created by seeker910 on 2014/8/28.
 * 分组展示 
 */
Rsd.define('Rsd.web.CGroupPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.web.CImageNewsPart',
        'Rsd.web.CListViewPart'
    ],
    xtype: 't-group',
    layout: 'vbox',
    height: 1900,
    sizeUnit:'px',
    items: [
        {
            xtype:'t-image-news'

        },
        {
            layout:'hbox',
            margin:'40 0 0 0',
            flex:1,
            items:[
                {
                    flex:70,
                    layout:'vbox',
                    margin:'0 40 0 0',
                    items:[
                        {
                            xtype:'t-list-view',
                            border:true,
                            height:500,
                            margin:'0 0 20 0',
                            title:'要 闻'
                        },
                        {
                            xtype:'t-list-view',
                            border:true,
                            height:500,
                            margin:'20 0 0 0',
                            title:'热 点'
                        }
                    ]
                },
                {
                    flex:30 ,
                    layout:'vbox',
                    items:[
                        {

                           height:300,
                           margin:'0 0 20 0',
                           border:true,
                           title:'新闻调查'
                        },
                        {

                            height:300,
                            margin:'20 0 20 0',
                            border:true,
                            title:'投诉与意见'
                        },
                        {

                            height:400,
                            margin:'20 0 0 0',
                            border:true,
                            title:'业主查询'
                        }
                    ]
                }
            ]
        }

    ],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    }
});
