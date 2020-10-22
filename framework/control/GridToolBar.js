/**
 * Created by seeker910 on 2017/7/11.
 *
 * @description
 */
Rsd.define('Rsd.control.GridToolBar', {
    extend: 'Rsd.container.Component',
    requires:[
        'Rsd.control.Button',
        'Rsd.control.Text',
        'Rsd.control.ComboBox'
    ],
    xtype:'grid-tool-bar',
    layout:{type:'hbox'},
    margin: '10 5 10 0',
    height: 60,
    header:{visible:false},
    /**
     * @description 设置查询条件时 查询按钮文本
     * */
    findText:'筛 选',
    /**
     * @description 未设置查询条件时，查询按钮文本
     * */
    loadText:'加 载',
    items:[
        { xtype:'container', layout:{type:'hbox',align:'left'},margin: '5 0 5 0',width:'auto', border:false,items:[]},
        { xtype:'button', text: '加 载' ,height:50,margin: '7 5 15 10', width: 100, handler:'btn____search'},

    ],
    /**
    * 查询方法
    * */
    searchHandler:null,
    /**
    * */
    constructor: function GridToolBar(config) {
        this.header.visible = false;
        config = config || {};
        this.apply(config);
    },
    /**
     *@description 设置查询字段
     * */
    setSearchColumns:function () {

        var me = this;
        var columns = me.searchColumns||[];
        if(Rsd.isArray(columns))
        {
            setTimeout(function () {
                me.body.style.visibility = 'hidden';
                for(var i in columns)
                {
                    var _c = columns[i];
                    _c.xtype = _c.xtype ||'text';
                    _c.label = {content:_c.label || _c.text,height:30};
                    _c.dataIndex = _c.dataIndex||_c.name;
                    _c.name = _c.name || _c.dataIndex ;
                    _c.margin = _c.margin || "0 0 0 20";
                    if(me.items[0] instanceof Rsd.container.Component )
                    {
                        me.items[0].add(_c);
                    }
                    else
                    {
                        me.items[0].items.push(_c);
                    }

                }
                setTimeout(function () {
                    me.body.style.visibility = 'visible';
                },50);

            },0);


            var _txt = me.findText || '筛 选';
            if(columns.length == 0 )
            {
                _txt = me.loadText || '加 载';
            }

            if(me.items[1] instanceof Rsd.control.Component )
            {
                me.items[1].setValue(_txt) ;
            }
            else
            {
                me.items[1].value = _txt;
            }

            return;
        }

        if(columns==null || columns==undefined || columns == false)
        {
            if(me.items[1] instanceof Rsd.container.Component )
            {
                me.items[1].hide();
            }
            else
            {
                me.items[1].hidden = true;
            }
            return;
        }
    },

    /**
     * @description 设置添加到按钮
     * */
    setNewButtons:function () {

        var me = this;
        var _buttons = this.newButtons||[];
        for (var i in _buttons) {
            var _btn = _buttons[i];
            var _item = {
                xtype: 'button',
                text:  '---',
                align: 'left',
                style: {display: _btn.hasOwnProperty('visible')?(_btn.visible ? 'display' : 'none'):'display'},
                margin:'0 10 0 10',
                width: 120,
                index: i,
                handler: function () {
                    me.funApplyByIOC(_buttons[this.index].handler, null);
                }
            };
            if(this.items[0] instanceof Rsd.container.Component )
            {
                this.items[0].add(Rsd.apply(_item,_btn));
            }
            else
            {
                this.items[0].items.push(Rsd.apply(_item,_btn));
            }

        }
    },
    /**
    * */
    getWhere:function getWhere(){

        //debugger;
        var _c =[];
        var _default = this.items[0];
        for(var i in this.searchColumns)
        {
            var _item = this.searchColumns[i];
            var _value = _default.getItemByName(_item.name).getValue();
            if(_value == null || _value == '')
            {
                continue;
            }
            if(_value instanceof Array)
            {
                var _list = [];
                for(var i in _value)
                {
                    if(Rsd.isObject(_value[i]))
                    {
                        _list.push(_value[i].value);
                    }
                    else
                    {
                        _list.push(_value[i]);
                    }
                   
                }
                _value = _list;
                _c.push({name:_item.dataIndex||_item.name||_item.key,value:_value,op:_item.op || 'in'});
                
                continue;
            }
            if(_item.op==undefined || _item.op==null || _item.op =='' || _item.op == 'like')
            {
                _value = '%25' + _value + '%25';
            }
            _c.push({name:_item.dataIndex||_item.name||_item.key,value:_value + '',op:_item.op || 'like'});

        }
        return _c;
    },
    /**
    *
     * */
    btn____search:function btn____search() {

        if(Rsd.isEmpty(this.searchHandler))
        {
            Rsd.alert('searchHandler未实现。');
            return;
        }
        this.funApplyByIOC(this.searchHandler,[this.getWhere()]);
    }

},function (type) {

    var _newButtonsGetter = function () {

        return this.__newButtons;
    };

    var _newButtonsSetter = function (value) {
        this.__newButtons = value;
        this.setNewButtons();

    }

    this.defineProperty(type,"newButtons", _newButtonsGetter, _newButtonsSetter,true);


    var _searchColumnsGetter = function () {

        return this.__searchColumns;
    };

    var _searchColumnsSetter = function (value) {
        this.__searchColumns = value;
        this.setSearchColumns();

    }

    this.defineProperty(type,"searchColumns", _searchColumnsGetter, _searchColumnsSetter,true);

});