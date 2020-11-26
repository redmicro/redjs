/**
 * Created by seeker910 on 2014/8/28.
 * 分组展示 ：上部图片新闻 + 下部列表组合
 */
Rsd.define('Rsd.web.CListGroupPart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.web.CListViewPart'
    ],
    xtype: 't-list-group',
    layout:'hbox',
    height: 300,
    sizeUnit:'px',
    items:[
        {
            xtype:'t-list-view',
            flex:1,
            border:true,
            height:'100%',
            margin:'0 50 0 50',
            title:'要 闻'
        },
        {
            xtype:'t-list-view',
            flex:1,
            border:true,
            height:'100%',
            margin:'0 50 0 50',
            title:'热 点'
        },
        {
            flex:1,
            height:'100%',
            margin:'0 50 0 50',
            border:true,
            title:'新闻调查'
         },
         {
            flex:1,
            height:'100%',
             margin:'0 50 0 50',
             border:true,
             title:'投诉与意见'
         },
         {
            flex:1,
            height:'100%',
             margin:'0 50 0 50',
             border:true,
             title:'业主查询'
         }
    ],
    /*
     * */
    constructor: function CListGroupPart(config) {
        config = config || {};
        Rsd.apply(this, config);
    }
});
