/**
 * Created by seeker910 on 2017/4/19.
 * 动态获取外键表对应数据，且实现一定量到数据缓存。
 * 适合用于主外建约束数据，且外键数据处于动态增长中，数据量较大
 */
Rsd.define('Rsd.control.AutoComplete', {
    extend: 'Rsd.control.Input',
    xtype:'autocomplete',
    cls:'x-control-autocomplete',
    /**
    * @description 用于外键数据回显：在setValue时 获取ValueItem对象
    * @description searchHandler:function(value,callback)
    * @description callback:function(text)
    * */
    searchHandler:'',
    /**
    * @description 用于编辑时自动与服务端数据匹配
    * @description autoCompleteHandler:function(value,callback)
    * @description callback:function([{key:'1',text:'abc',data:{}},{key:'2',text:'def',data:{}},....])
    *
    * */
    autoCompleteHandler:'_default_handler',
    /**
    * @description  在表格中用户查看外键对象详细接口
    * viewHandler:function(value)
    * */
    viewHandler:'',
    /*
    *服务段返回记录条数限制
    * */
    limit:15,
    /*
    * 执行查找时间间隔周期
    * */
    millisec:300,
    /*
    * */
    listeners:{
        'blur':{
            element:'ctrl',
            fn:function (sender,event) {


                return true;
            }
        },
        'focus':{
            element:'ctrl',
            fn:function (sender,event) {

            }
        },
        'keyup':{
            element:'ctrl',
            fn:function (sender,event) {
                var me = this;
                me.autoComplete.call(me);
                if (event.code == 'Enter')
                {

                }
                if (event.code == 'Escape')
                {
                    this.___search.style.display='none';
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
    /*
    * */
    valueChanged:'',
    /*
     * */
    constructor: function AutoComplete (config) {
        this.apply(config||{});
    },
    /*
    *
    * */
    onAfterInit:function onAfterInit() {
        this.callParent();
        var _search = document.createElement('div');
        _search.className = 'x-box';
        _search.style.display="none";
        _search.style.minHeight = "200px";
        _search.onblur=function () {

            _search.style.display='none';
        };

        this.___search = _search;
        this.container.appendChild(_search)
    },
    /*
    *
    * */
    _default_handler:function _default_handler() {
        window.alert('未定义属性autoCompleteHandler=function(keyword,callback)。');
    },
    /*
    *
    * */
    autoComplete:function autoComplete()
    {

        this.___current_value = this.ctrl.value;
        if(this.___last_value == undefined
            || this.___last_value==null
            || this.___current_value != this.___last_value
        )
        {
            this.___last_value = this.___current_value;
            if(this.___current_value=='')
            {
                this.___search.style.display='none';
                this.valueItem=null;
                return;
            }

            var me = this;
            var _fn = function (list) {
                me.___search.style.width = me.ctrl.style.width;

                me.___search.style.marginLeft = ((me.label.width ? me.label.width:me.label.element.clientWidth)+10) + 'px';
                me.___search.style.marginTop = (me.height - 5)+'px';
                me.___search.style.display = me.___current_value==''?'none':'';

                me.___search.innerHTML='';
                for(var i in list)
                {
                    if(i< me.limit)
                    {
                        var li = document.createElement('li');
                        li.style.lineHeight='25px';

                        li.tag = list[i];
                        li.id = i;
                        li.onclick = function (evt) {

                            //debugger;
                            me.valueItem = this.tag;
                            me.ctrl.value = Rsd.isObject(me.valueItem)?me.valueItem.text:me.valueItem;
                            me.___search.style.display='none';

                            me.funApplyByIOC(me.valueChanged,[me,evt]);

                        }
                        li.appendChild(document.createTextNode(Rsd.isObject(list[i])?list[i].text:list[i]));
                        me.___search.appendChild(li);
                    }
                    else
                    {
                        break;
                    }
                }

            };

            var _handler =  this.autoCompleteHandler;

            this.funApplyByIOC(_handler,[this.___current_value,_fn])

        }

    },
    /*
    * */
    getValue:function getValue() {
        if(this.valueItem)
        {
            return this.valueItem.key;
        }
        //使用 this.__value  防止死循环
        if(this.__value == undefined && this.__value == null)
        {
            return this.ctrl.value;
        }
        return this.__value ;
    },
    /**
     * @description 获取valueItem的属性值
     * */
    getValueItem:function getValueItem(name) {
        if(this.valueItem&&name)
        {
            return this.valueItem[name];
        }
        return null;
    },
    /*
    * */
    getText:function getText() {
        if(this.valueItem)
        {
            return this.valueItem.text;
        }
        if(this.value == undefined && this.value == null)
        {
            return this.ctrl.value;
        }
        return this.value ;
    },
    /*
    * */
    setValue:function setValue(value) {
        this.value = value ;
        if(value == undefined || value == null || value=='')
        {

            this.ctrl.value = '';
            return;
        }

        this.ctrl.value = value;
        var me = this;
        var _fn = function (text) {
            me.ctrl.value = text;
        }
        if(me.searchHandler== undefined || me.searchHandler==null || me.searchHandler=='')
        {
            throw  new Error('Property [searchHandler] is null or empty in control '+ me.id +'(Rsd.control.AutoComplete).' );
        }
        me.funApplyByIOC(me.searchHandler,[value,_fn]);
    },
    /*
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