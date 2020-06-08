Rsd.define('Rsd.control.ListMenu', {
    extend: 'Rsd.control.ListView',
    xtype: 'list-menu',
    requires: ['Rsd.data.Menu',
        'Rsd.control.Svg',
        'Rsd.control.Link',
        'Rsd.control.ComboBox',
        'Rsd.control.Button'],
    margin: '0 0 0 0',
    width: 120,
    itemClick:'menuclick',
    itemSelectedCls:'x-selected',
    itemHover:true,

    //菜单根节点
    //menu:null,
    //logo图片
    //logo
    /**
     *
     * */
    constructor: function ListMenu(config) {

       var _layout =config.layout||this.layout;
        if(_layout == 'vbox')
        {
            this.itemStyle={"height":'50px',"width":'100%',"lineHeight": '30px'};
        }
        if(_layout == 'hbox')
        {
            this.itemStyle={"height":'100%',"lineHeight": '30px',"float":'left'};
        }

        this.apply(config);

        if(this.logo)
        {
            this.label.content = this.logo;
            this.label.visible = false;
        }

    },
    /*
    *
    * */
    loadData:function loadData(menu)
    {
        var me = this;
        var _menu = menu||me.menu;
        if(Rsd.isArray(_menu))
        {
            _menu = Rsd.create('Rsd.data.Menu',{children:_menu});
        }
        if(_menu)
        {
            if(!(_menu instanceof Rsd.data.Menu)) {
                console.error(_menu);
                throw new Error('argumeng data is not Rsd.data.Menu object when it call Rsd.control.ListMenu loadData.');
            }

            me.menu = _menu;
            var _nodeList=[];
            var _list = _menu.children||[];
            for(var i in _list) {
                var m = _list[i];
                var _w = m.width  ;// 内部控件宽度
                var _h = m.height ;// 内部控件高度
                if(me.layout=='hbox') {
                    _h = _h || '100%';
                    _w = _w || 150;
                }
                if(me.layout=='vbox') {
                    _h = _h || 50;
                    _w = _w || '100%';
                }
                var _label_width = _w - _h;

                _nodeList.push({
                    xtype: 'svg',
                    id:m.id,
                    label: {width: _label_width, height: 25, align:'left',content: m.text, position: 'right'},
                    width: _w,
                    margin: '10 10 10 10',
                    height: _h,
                    click:m.click||me.itemClick,
                    menu: m,
                    tagName: m.icon
                });
            }

            me.callParent(_nodeList);
        }

        return this;
    },

    /*
    *
    * */
    menuclick:function menuclick() {
        alert('未设置ListMenu.itemClick属性。')
    }


},function(type) {

    var _menuGetter = function () {
        return this.__menu;

    };

    var _menuSetter = function (value) {

        this.__menu = value;
    };


    this.defineProperty(type, "menu", _menuGetter, _menuSetter, true);
});
