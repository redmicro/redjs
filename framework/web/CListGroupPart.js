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
            height:'100%',
            margin:'0 50 0 50',
            border:true,
            title:'电商'
         },
        {
            xtype:'t-list-view',
            flex:1,
            border:true,
            height:'100%',
            margin:'0 50 0 50',
            title:'公众号'
        },
        {
            xtype:'t-list-view',
            flex:1,
            border:true,
            height:'100%',
            margin:'0 50 0 50',
            title:'小程序'
        },
       
         {
            xtype:'t-list-view',
            flex:1,
            height:'100%',
            margin:'0 50 0 50',
            border:true,
            title:'网站'
 
         } 
 
    ],
    /*
     * */
    constructor: function CListGroupPart(config) {
        config = config || {};
        Rsd.apply(this, config);
    },
    /**
     * 
     */
    loadData:function loadData(data)
    {
        //console.log(data);
        if(data && !Rsd.isArray(data))
        {
            console.error('Rsd.web.CListGroupPart.loadData()方法的data参数必须是数组');
            return;
        }
        if(this.dataSource == data)
        {
            //return;
        }
       
        this.dataSource = data || this.dataSource;
 
        this.removeAll();

        for(var i in this.dataSource )
        {
            var item = this.dataSource [i]
            this.add(Rsd.apply({ 
                xtype:'t-list-view',
                flex:1,
                height:'100%',
                margin:'0 50 0 50',
                border:true,
                title:'电商'
            },item));
        }
       
    }
    
});
