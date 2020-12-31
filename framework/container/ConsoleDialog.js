/**
 * 插件控制台：用于独立插件管理
 */
Rsd.define('Rsd.container.ConsoleDialog', {
    extend: 'Rsd.container.Dialog',
    requires: [
        'Rsd.control.Svg',
        'Rsd.control.ListMenu',
        'Rsd.control.Link',
        'Rsd.view.Header',
        'Rsd.container.PageContainer',
        'Rsd.view.WelcomePage'
    ],
    xtype: 'console-page',
    height:'95%',
    width:'95%',
    layout: 'border',
    autoLoad:false,
    /**
     * 插件
     */
    pulgin:null,
    header:{height:50,style:{backgroundColor:'#383956d9',color:'#fff'}},
    items:[
        //left 左侧一级菜单
        {
            xtype: 'list-menu',
            margin:'0 2 0 2',
            labelTagName:'img',
            label:{
                content:'',
                position:'top',
                visible:true,
                width:'100%',
                height:'auto',
                space:5,
                style:{minHeight :'50',top:'20px',left:'20px',verticalAlign:'middle'}
                },
            region: 'left',
            width: 100,
            itemHover:true,
            itemStyle:{height:'45px',lineHeight:'45px',"margin":'0px 2px 1px 0px'},
            itemClick:'left_menu_lick',
            itemSelectedCls:'x-selected',
            layout:'vbox',
            dataSource:[],
            border: false
        },
        //top 顶部一级菜单
        {
            id:"content-list-menu",
            xtype: 'list-menu',
            region: 'top',
            width:'auto',
            cls:'x-list-menu-h',
            itemSelectedCls:'x-selected',
            itemHover:true,
            margin:'0 0 5 10',
            style:{backgroundColor:'rgba(128, 128, 128, 0.05)',borderRadius:'6px'},
            "itemStyle":{"height":'50px',"width":'150px',"float":'left',"textAlign":'center',"marginRight":'2px'},
            itemClick:'second_menu_click',
            height:50,
            layout:'hbox',
            border: false
        },
        //content 内容显示区
        {
            xtype: 'pageContainer',
            region: 'center',
            muliti:false,
            margin:'6 0 0 6',
            style:{backgroundColor:'rgba(128, 128, 128, 0.05)',borderRadius:'6px',marginTop:'2px'},
            border: true
        },
    ],
    /**
     * 
     * @param {*} config 
     */
    constructor:function ConsolePage(config)
    {
        config = config || {};
        this.apply(config);

        this.left.label.content = this.logo;
    },
    /**
     * 
     */
    load:function load()
    {
        
        if(!Rsd.isEmpty(this.plugin))
        {
              //加载菜单  
            this.left.loadData(this.plugin.menu);
           //console.log(this.left.label);  
        } 

          
    },
    /**
     * 
     * @param {*} item 
     */
    left_menu_lick:function left_menu_lick(item)
    {
        var menu = item.content.menu;
        this.selectMenu(menu);
    },
    /**
     * @description 一级菜单被选中
     * @public
     * */
    selectMenu:function selectMenu(menu) {
        var me = this;
        if (menu instanceof Rsd.data.Menu)
        {
            this.block(function () {

                //layout second menu in top
                me.items[1].removeAll();
                me.items[1].loadData(menu); 

                //show first page in content
                if (!Rsd.isEmpty(menu.viewType)) {
                    me.showPage( me.createPage(menu));
                    return;
                }
                if (menu.children.length > 0) {
                    me.items[1].select(0);
                    return;
                }
                console.log(menu);
                Rsd.showMessage('未设置Menu.viewType，无法打开页面（'+ menu.text +'）。');

            }, 1000,'left_menu_click');
        }else
        {
            throw new  Error(' argument menu type is not Rsd.data.Menu.')
        }

    },
    /**
    *@private
    * */
    second_menu_click:function second_menu_click(item) {
        var me = this;

        this.block(function () {
            var _svg = item.content;

            var _p = me.createPage(_svg.menu);
            if(_p)
            {
                me.showPage(_p );
            }

        }, 1000,'second_menu_click');
    },
    /*
  * */
    createPage:function(menu)
    {

        var _menu = menu;
        var page = null;
        var _viewType = _menu.viewType;
        var _msg = '';
        if(Rsd.isEmpty(_viewType) && _menu.children && _menu.children.length > 0)
        {
            _viewType = _menu.children[0].viewType;
        }
        if(_viewType)
        {

            try
            {
                 page = Rsd.create(_viewType, Rsd.apply({menu: _menu,tabTitle:_menu.text},_menu.args||{}));

            }
            catch (ex)
            {
                _msg = ex.toString();
                Rsd.error('Failed to open page:'+ _viewType);
                Rsd.error(ex);
            }
            if(page)
            {
                var _path = _menu.text;
                if(_menu.parent)
                {
                    _path =  _menu.parent.text + '->' + _menu.text;
                }
                page.path = _path;
            }

        } else{
            _msg = '未设置Menu.viewType，无法打开页面（'+_menu.text +'）。';
            Rsd.showMessage(_msg);
        };
        if(page == null)
        {
            page = Rsd.create('Rsd.view.SysNotFoundPage', {menu: _menu,tabTitle:_menu.text,selected:true, text:_msg});
        }
        return page;
    },
    /*

     * */
    showPage: function showPage(page,speed) {
        var _page = page;
        if(Rsd.isEmpty(page))
        {
            _page = Rsd.create('Rsd.view.SysNotFoundPage', {tabTitle:'错误',selected:true,text:"argumens page is null when call function showPage."});

        }
        if(_page instanceof Rsd.container.Page)
        {

        }else
        {
            console.error(page);
            _page = Rsd.create('Rsd.view.SysNotFoundPage', {tabTitle:'错误',selected:true,text:"argumens page  is not instance of class 'Rsd.container.Page'.Please view console."});

        }

        _page.selected = true;
        this.items[2].add(_page,speed||0);
    },
    /*
    * */
    show:function show(animate,speed) {

        this.items[2].removeAll();
        
        if(arguments.length >1)
        {
            this.callParent(animate,speed);
            return this;
        }
        if(arguments.length >0)
        {
            this.callParent(arguments[0]);
            return this;
        }
        this.callParent();
        return this;
    },
    /*
    * */
    hideLeft:function hideLeft() {

        this.items[1].panelContainers[0].style.display = 'none';
        var _sep = this.items[1].separatorContainers[0];
        _sep.title = '单击展开';

    },
    /*
    * */
    showLeft:function showLeft() {
        this.items[1].panelContainers[0].style.display = '';
        var _sep = this.items[1].separatorContainers[0];
        _sep.title = '单击隐藏';
    }

},function(type){
    var _leftGetter = function () {
        return this.items[0];
    };

    var _leftSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[0].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[0],value,3);
            return;
        }
    }

    this.defineProperty(type,"left", _leftGetter, _leftSetter,true);

    var _topGetter = function () {
        return this.items[1];
    };

    var _topSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[1].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[1],value,3);
            return;
        }
    }

    this.defineProperty(type,"top", _topGetter, _topSetter,true);

    var _contentGetter = function () {

        return this.items[2];
    };

    var _contentSetter = function (value) {
        if(Rsd.isEmpty(value))
        {
            return;
        }
        if(Rsd.isString(value))
        {
            this.items[2].xtype = value;
            return;
        }
        if(Rsd.isObject(value))
        {
            Rsd.apply(this.items[2],value,3);
            return;
        }
    }

    this.defineProperty(type,"content", _contentGetter, _contentSetter,true);

})