/**
 * Created by seeker910 on 2014/8/20.
 * 水平 布局 导航条 
 */
Rsd.define('Rsd.web.CHNavigationPart', {
    extend: 'Rsd.control.ListView',
    requires: [ 'Rsd.control.Label'],
    xtype: 't-h-navigation',
    layout:'hbox',
    height:50,
    width:'100%',
    sizeUnit:'px', 
    itemStyle:{height:'100%',width:150,fontSize:'120%'},
    cls:'x-navigation-h',
    selectedIndex:null,
    items:[
        {
            xtype:'label',
            text:'新闻中心',
            cls:'x-menu',
            margin:'0 25 0 25',
            style:{ textAlign:'center',lineHeight:50},
            flex:100
        },
        {
            xtype:'label',
            text:'信息公开',
            cls:'x-menu',
            margin:'0 25 0 25',
            style:{ textAlign:'center',lineHeight:50},
            flex:100
        },
        {
            xtype:'label',
            text:'政务公开',
            cls:'x-menu',
            margin:'0 25 0 25',
            style:{ textAlign:'center',lineHeight:50},
            flex:100
        },
        {
            xtype:'label',
            text:'法律法规',
            cls:'x-menu',
            margin:'0 25 0 25',
            style:{ textAlign:'center',lineHeight:50},
            flex:100
        },
        {
            xtype:'label',
            text:'业务办理',
            cls:'x-menu',
            margin:'0 25 0 25',
            style:{  textAlign:'center',lineHeight:50},
            flex:100
        },
        {
            xtype:'label',
            text:'业主查询',
            cls:'x-menu',
            margin:'0 25 0 25',
            style:{ textAlign:'center',lineHeight:50},
            flex:100
        },
        {
            xtype:'label',
            text:'互动交流',
            cls:'x-menu',
            margin:'0 25 0 25',
            style:{ textAlign:'center',lineHeight:50},
            flex:100
        },
        {
            xtype:'label',
            text:'资料中心',
            cls:'x-menu',
            margin:'0 25 0 25',
            style:{textAlign:'center',lineHeight:50},
            flex:100
        }

    ],
    constructor: function CHNavigationPart(config) {
        config = config || {};
        this.apply(config);
    },
    /**
     * 
     */
    afterRender:function () {
        if(this.selectedIndex != null
            && this.selectedIndex > -1
            && this.selectedIndex < this.items.length)
        {
            this.items[this.selectedIndex].addCls('ctrl','x-selected');
        }
    },
    /**
     * 
     */
    loadData:function loadData(data)
    {
        if(data && !Rsd.isArray(data))
        {
            console.error('Rsd.web.CHNavigationPart.loadData()方法的data参数必须是数组');
            return;
        }
         
        var _list = [];
        this.removeAll();
        
        for(var i in data)
        {
            var item = data[i];
            if(item.isMenu==false)
            {
                _list.push(Rsd.apply({ 
                    xtype:'label',
                    text:'',
                    style:{textAlign:'center'},
                    width:150
                },item));
            }
            else
            {
                _list.push(Rsd.apply({ 
                    xtype:'label',
                    width:'100%',
                    height:'100%',
                    text:'',
                    cls:'x-menu',
                    style:{textAlign:'center'},
                    flex:10
                },item));
            }
            
        }
       
        this.callParent(_list);
        
    }
});
