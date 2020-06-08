/**
 * Created by seeker910 on 2018/1/17.
 *
 * @description  比 Rsd.control.GridToolBar  少一个searchColumns属性 和 Button(刷行)按钮
 * @description 仅有一个 控件容器，通过newButtons属性设置
 */
Rsd.define('Rsd.control.GridToolBarSimple', {
    extend: 'Rsd.container.Component',
    requires:[
        'Rsd.control.Button',
        'Rsd.control.Text',
        'Rsd.control.ComboBox'
    ],
    xtype:'grid-tool-bar-simple',
    layout:{type:'hbox'},
    margin: '5 5 5 0',
    height: 50,
    header:{visible:false},
    items:[
        { xtype:'container', layout:{type:'hbox',align:'left'},margin: '5 0 0 0',width:'auto', border:false,items:[]}

    ],
    /*
     * */
    constructor: function GridViewToolBar(config) {
        this.header.visible = false;
        config = config || {};
        this.apply(config);
    },

    /*
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
                style: {display: _btn.visible==false ? 'none' : 'display'},
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

});