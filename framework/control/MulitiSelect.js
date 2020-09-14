/**
 * Created by seeker910 on 2017/8/23.
 */
Rsd.define('Rsd.control.MulitiSelect', {
    extend: 'Rsd.control.Input',
    xtype:'mulitiselect',
    cls:'x-control-mulitiselect',
    textMember:'text',
    readOnly:true,
    listeners:{
        'blur':{
            element:'ctrl',
            fn:function (sender,event) {

                return true;
            }
        },
        'click':{
            element:'ctrl',
            fn:function (sender,event) {
                var me = this;
                var _style = {};
                var _left = ((me.label.width ? me.label.width : me.label.element.clientWidth) + 10);
                _style.marginLeft =  _left + 'px';
                _style.marginTop = (me.height - parseInt(me.container.style.marginBottom)) + 'px';
                _style.tabIndex = me.tabIndex; 
                _style.width = (me.width - _left - parseInt(me.container.style.marginLeft)  - parseInt(me.container.style.marginRight)) + 'px'; 
                me.showPopupBox(null,_style);
                event.isCancel = true;
                return false;
            }
        },
        'focus':{
            element:'ctrl',
            fn:function (sender,event) {
                var me = this;
                var _style = {};
                var _left = ((me.label.width ? me.label.width : me.label.element.clientWidth) + 10);
                _style.marginLeft =  _left + 'px';
                _style.marginTop = (me.height - parseInt(me.container.style.marginBottom)) + 'px';  
                _style.tabIndex = me.tabIndex;
                _style.width = (me.width - _left -parseInt(me.container.style.marginLeft) - parseInt(me.container.style.marginRight)) + 'px'; 
                me.showPopupBox(null,_style);
                return false;
            }
        },
        'keyup':{
            element:'ctrl',
            fn:function (sender,event) {
                var me = this;

                if (event.code == 'Enter')
                {
                    me.closePopupBox();
                }
                if (event.code == 'Escape')
                {
                    me.closePopupBox();
                }
                if (event.code == 'ArrowUp')
                {

                }
                if (event.code == 'ArrowDown')
                {

                }

            }
        }
    },
    /**
    数据源
    */
    dataSource:null,
    /**
     * */
    constructor: function MulitiSelect (config) {
        this.apply(config||{});
    },
    /**
    *
    * */
    onAfterInit:function onAfterInit() {

        var me = this;

        this.callParent();
         
        this.initPopupBox(
            {
            minWidth:'100px',
            minHeight:'50px',
            maxHeight:'300px',
            overflowY:'auto'},'x-box','');

        setTimeout(function () {
            me.loadData(me.dataSource);
        },10);

    },

    /**  
     *可通过 重写该方法，定制多选框
     *
     * */
    loadData:function loadData(data) {

        var me = this;
        me.dataSource = data ||[];
        var list = me.dataSource;
        Rsd.empty(me.popupBox);

        for (var i in list) {
            var li = document.createElement('li');
            li.style.lineHeight = '25px';

            li.tag = list[i];
            li.id = i;

            li.onclick = function () {

                this.childNodes[0].checked = !this.childNodes[0].checked ;
                this.tag['IsChecked'] = this.childNodes[0].checked;

                me.ctrl.value = me.getText();
                me.ctrl.focus();
                me.ctrl.blur();

                return false;

            }
            var chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.style.pointerEvents = 'none';
            li.appendChild(chk);

            li.appendChild(document.createTextNode(list[i][me.textMember]));
           
            me.popupBox.appendChild(li);
        }

    },

    /**
     * */
    getValue:function getValue() {

        var _temp = [];
        var list = $(this.popupBox).find('li');
        for(var i in list)
        {
            if(list[i].tag && list[i].tag['IsChecked'])
            {
                _temp.push(list[i].tag)
            }
        }

        this.__value = _temp;

        return this.__value ;
    },

    /**
     * 
     * */
    getText:function getText() {
       var _list = this.getValue();
        var _temp = '';
        for(var i in _list)
        {
            _temp += (_list[i][this.textMember] + ',');
        }
        return _temp;
    },
    /**
     *
     * */
    setValue:function setValue(value) {

        this.__value = value ;

    },
    /**
     *
     * */
    makeControl:function makeContrl(config,row) {
        //debugger;
        var me = this;

        var _config = config ||{};
        var _editable = _config.editable;
        var _value = row[_config.dataIndex || _config.dataindex || _config.name];
        var _valueMember = _config.valueMember || 'value';
        var _textMember = _config.textMember || 'text';
        var _colorMember = _config.colorMember || 'color';


        var _ctrl = null;
        if(_editable)
        {
            _ctrl = document.createElement('label');
            _ctrl.appendChild(document.createTextNode("Error:ComboBoxEx编辑模式未实现"));
        }
        else
        {
            _ctrl = document.createElement('a');
            _ctrl.setAttribute("value", _value);
            _ctrl.href="javascript:void(0);";
            _ctrl.onclick = function () {
                me.funApplyByIOC(config.viewHandler,[_value]);
            }

            _ctrl.style.position = 'relative';
            _ctrl.style.width = '100%';
            _ctrl.style.height = '100%';
            var _fn = function (text) {
                _ctrl.appendChild(document.createTextNode(text));
            }
            me.funApplyByIOC(config.searchHandler,[_value,_fn]);
        }

        return [_ctrl];
    }

},function (type) {
    var _valueItemGetter = function () {

        if (!this.hasOwnProperty('__valueItem')) {
            this.__valueItem = null;
        }
        return this.__valueItem;
    };
    var _valueItemSetter = function (value) {

        this.__valueItem = value;

    };
    this.defineProperty(type,"valueItem", _valueItemGetter, _valueItemSetter,true);
});