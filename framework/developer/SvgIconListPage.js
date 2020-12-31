/*
* 
* */
Rsd.define('Rsd.developer.SvgIconListPage', {
    extend: 'Rsd.container.Page',
    requires: ['Rsd.control.Svg'],
    xtype: 'list-svg-icon',
    header:{
        xtype:'container',
        height:100,
        width:'100%',
        layout:'hbox',
        margin:'20 0 20 0',
        "style":{"left":'20px',"float":'left',"lineHeight":'30px'},
        items:[
            {xtype:'link',text:'default',name:'default',width:80,handler:'load_group'},
            {xtype:'link',text:'home',name:'home',width:60,handler:'load_group'},
            {xtype:'link',text:'cart',name:'cart',width:60,handler:'load_group'},
            {xtype:'link',text:'contact',name:'contact',width:90,handler:'load_group'},
            {xtype:'link',text:'crown',name:'crown',width:75,handler:'load_group'},
            {xtype:'link',text:'member',name:'member',width:75,handler:'load_group'},
            {xtype:'link',text:'order',name:'order',width:75,handler:'load_group'},
            {xtype:'link',text:'goods',name:'goods',width:75,handler:'load_group'},
            {xtype:'link',text:'buy',name:'buy',width:45,handler:'load_group'},
            {xtype:'link',text:'find',name:'find',width:60,handler:'load_group'},
            {xtype:'link',text:'merchant',name:'merchant',width:90,handler:'load_group'},
            {xtype:'link',text:'message',name:'message',width:90,handler:'load_group'},
            {xtype:'link',text:'note',name:'note',width:60,handler:'load_group'},
            {xtype:'link',text:'sale',name:'sale',width:60,handler:'load_group'},
            {xtype:'link',text:'service',name:'service',width:90,handler:'load_group'},
            {xtype:'link',text:'bank',name:'bank',width:60,handler:'load_group'},
            {xtype:'link',text:'setting',name:'setting',width:90,handler:'load_group'},
            {xtype:'link',text:'print',name:'print',width:60,handler:'load_group'},
            {xtype:'link',text:'api',name:'api',width:45,handler:'load_group'},
            {xtype:'link',text:'model',name:'model',width:75,handler:'load_group'},
            {xtype:'link',text:'menu',name:'menu',width:60,handler:'load_group'},
            {xtype:'link',text:'not',name:'not',width:60,handler:'load_group'},
            {xtype:'link',text:'web',name:'web',width:60,handler:'load_group'},
            {xtype:'link',text:'sort',name:'sort',width:60,handler:'load_group'}
            ],
        visible:true
    },
    items:[],
    sytle:{color:'red'},
    /*
   * */
    constructor: function SvgIconListPage(config) {
        config = config || {};
        this.apply(config);

    },
    load_group:function load_group()
    {
        //console.log(arguments);
        this.load(arguments[0].name);
    },

    /*
    * */
    load:function load(group) {

        var me = this;
        Rsd.showWaiting(me.id);

        me.removeAll();

        var _group = group||"default";
        var _url = Rsd.getRedjsUrl('/resources/svg/' + _group + '.js') ;
        var _rs_svg = Rsd.create('Rsd.data.Svg',{});

        _rs_svg.load(_group,_url,function (data) {
            me.nameList=[];

            for(var i in data)
            {
                me.nameList.push(_group +'.'+i);
            }

            var _i = 0;
            for(var i in me.nameList)
            {
                setTimeout(function () {

                    var svg = {xtype:'svg',labelTagName:'a',label:{width:40,height:25,content:me.nameList[_i],position:'bottom'},width:100,margin:'10 20 10 10',height:100,tagName:me.nameList[_i]};

                    var _t = me.add( svg);
                    _t.label.element.setAttribute('tagName',me.nameList[_i]);
                    _t.label.element.setAttribute('href','javascript:void(0)');
                    //复制
                    _t.label.element.onclick = function()
                    {
                        var _data = _rs_svg.get.apply(_rs_svg,this.getAttribute('tagName').split('.'));

                        Rsd.copy(Rsd.toString(_data));
                    }
                    _i++;

                    if(_i==me.nameList.length||_i > me.nameList.length)
                    {
                        Rsd.closeWaiting(me.id);
                    }

                },10*i);


            }
        });


    }
});