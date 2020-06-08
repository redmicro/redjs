/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:21
 * To change this template use File | Settings | File Templates.
 */
/*
不提供selectedIndex属性，但提供selectedItem属性
 * */
Rsd.define('Rsd.control.ComboBox', {
    extend: 'Rsd.control.Component',
    requires: ['Rsd.control.Table'],
    xtype: 'combobox',
    textMember: 'text',
    valueMember: 'value',
    colorMember: 'color',
    margin:'2 0 2 0',
    height:30,
    width:300,
    ctrlCls: 'x-control-combobox',
    selectedIndex:-1,
    selectedItem: null,
    /*
    * 仅在手动选择数据时，会被触发。textChanged 别名
     * */
    selectedItemChanged:null,
    /*
    * 仅在手动选择数据时，会被触发。
    * onchange事件
    * */
    textChanged:null,
    //dataSource: null,
    readOnly: false,
    disabled:false,
    required:null,
    /*
    * nullText == null 时不显示
    * */
    nullText: '--请选择--',
    ctrlTagName: 'select',
    /*
     * */
    constructor: function ComboBox (config) {
        this.apply(config||{});
    },
    /*
     * */
    initComponentEx: function initComponentEx() {
        var me = this;
        me.callParent();

        if(this.nullText)
        {
            me.ctrl.options.add(new Option(this.nullText,''));
        }

        for(var i in me.dataSource)
        {
            var item = me.dataSource[i];

            var op = document.createElement("option");

            op.style.color = Rsd.isObject(item)?item[this.colorMember]:null;
            op.setAttribute("value",Rsd.isObject(item)?item[this.valueMember]:item);

            op.appendChild(document.createTextNode(Rsd.isObject(item)?item[this.textMember]:item));

            me.ctrl.appendChild(op);

        }
        me.ctrl.name = me.dataIndex;
        //me.ctrl.readOnly = me.readOnly;
        me.ctrl.disabled = me.disabled;
        me.ctrl.required = me.required?'required':'';
        me.ctrl.placeholder = me.placeholder;
        me.ctrl.autocomplete="OFF";

        if(me.readOnly){
            me.container.style.pointerEvents = 'none';
        }
        me.ctrl.onchange = function (evt) {

            me.funApplyByIOC(me.selectedItemChanged,[me.getSelectedItem(),evt]);
            me.funApplyByIOC(me.textChanged,[me,evt]);
        }

        return;

    },


    /*
    *
    * */
    setDataSource:function setDataSource(dataSource)
    {
        //debugger;
        this.__dataSource  = dataSource||[];
        if(this.ctrl)
        {
            this.ctrl.options.length = 0;
        }

        if(this.ctrl && this.nullText)
        {
            this.ctrl.options.add(new Option(this.nullText,''));
        }
        for(var i in this.dataSource)
        {
            var item = this.dataSource[i];

            if(this.ctrl)
            {

                var op = document.createElement("option");
                op.style.color = Rsd.isObject(item)?item[this.colorMember]:null;
                op.setAttribute("value",Rsd.isObject(item)?item[this.valueMember]:item);

                op.appendChild(document.createTextNode(Rsd.isObject(item)?item[this.textMember]:item));

                this.ctrl.options.add(op);
            }
        }

        if(this.ctrl && this.value!= undefined && this.value != '')
        {
            this.ctrl.value = this.value;
            return;
        }

        if(this.selectedIndex != undefined
            && this.selectedIndex !=null
            && !(this.selectedIndex < 0)
        )
        {
            this.select(this.selectedIndex);
            return;
        }


    },
    /*
    * */
    onAfterInit: function onAfterInit() {
        this.callParent();
        var me = this;
        me.dom.style.textAlign = 'left';

        if (me.value != undefined) {
            me.setValue( me.value);
            return;
        }
        if(me.selectedIndex < 0)
        {
            me.setValue(null);
        }
        else
        {
            me.select(me.selectedIndex);
        }
    },

    /*
     * 设置值时，不会触发 selectedItemChanged
     * */
    select: function (index) {

        if(this.ctrl == null)
        {
            return;
        }

        if (index < this.ctrl.options.length ) {

            this.ctrl.selectedIndex = index;

        }
        else
        {
            this.selectedIndex = index;
           //Rsd.error('set selected index is overflow.');
        }

    },

    /*
     *
     * */
    getSelectedItem: function getSelectedItem() {

        var i = 0;
        if(this.ctrl)
        {
            i = this.ctrl.selectedIndex;
        }

        if(this.nullText)
        {
            i=i-1;
        }
        if(i<0)
        {
            return null;
        }

        var item = this.dataSource[i];

        return item;
    },

    /*
     * 设置值时，不会触发 selectedItemChanged
     * */
    setValue: function (value) {

        if (arguments.length == 0) {
            return;
        }

        this.value = value;
        if(this.ctrl)
        {
            this.ctrl.value = value;

        }

        return;

    },
    /*
    * */
    getValue:function getValue()
    {

        if(this.ctrl)
        {
            return this.ctrl.value || this.value;
        }

        return this.value;
    },
    /*
     * defaultValue 是控件初次加载时设置的值，可用于判断控件值是否改变。
     * */
    getDefaultValue: function getDefaultValue() {
        var me = this;
        return me.ctrl ? me.ctrl.defaultValue : me.value
    },
    /*
    *
    * */
    checkValue:function checkValue() {
        //debugger;
        this.error='';
        if(this.required)
        {

            if(this.ctrl.selectedIndex< 0 || Rsd.isEmpty(this.ctrl.value))
            {
                this.error = '【' + this.label.content + '】必填';
                return false;
            }

        }
        return true;
    },
    /*
    * */
    makeControl:function makeControl(config,row)
    {           //debugger;
        var _config = config ||{};
        var _editable = _config.editable;
        var _value = row[_config.dataIndex||_config.name];
        var _valueMember = _config.valueMember || 'value';
        var _textMember = _config.textMember || 'text';
        var _colorMember = _config.colorMember || 'color';
        var _dataSource = _config.dataSource||[];

        if(!Rsd.isArray(_dataSource))
        {
            throw new Error('config [dataSource] is null or empty.');
        }
        if(Rsd.isNullOrUndefined(_valueMember))
        {
            throw new Error('config [valueMember] is null or empty.');
        }
        if(Rsd.isNullOrUndefined(_textMember))
        {
            throw new Error('config [textMember] is null or empty.');
        }
        if(!_config.__mapping)
        {
            _config.__mapping = {};
            var _item = null;
            for(var i=0;i < _dataSource.length ;i++)
            {
                _item = _dataSource[i];
                _config.__mapping[_item[_valueMember]] = _item;
            }
        }
        var _ctrl = null;
        if(_editable)
        {
            _ctrl = document.createElement('select');
            _ctrl.onchange=function(){
                //debugger;
                var _v= _ctrl.options[_ctrl.selectedIndex].value;
                row[_config.dataIndex||_config.name] = Rsd.isEmpty(_v)?'':_v;
            };
            _ctrl.style.width = '80%';
            var _ds = _config.dataSource;
            //console.log(_ds);
            var _op = new Option();
            _op.text = '--请选择--';
            _op.value = null;
            _ctrl.options.add(_op);
            if(_ds)
            {
                for(var i = 0 ;i< _ds.length ;i++)
                {
                    _op = new Option();
                    _op.text = _ds[i].text;
                    _op.value = _ds[i].value;
                    _op.selected = _value == _ds[i].value;
                    _ctrl.options.add(_op);
                }
            }

        }
        else
        {
            _ctrl = document.createElement('label');
            _ctrl.style.position = 'relative';
            _ctrl.style.width = '100%';
            _ctrl.style.height = '100%';

            var _timer = 0;
            if(_config.__mapping.hasOwnProperty(_value))
            {
                _timer = 10;
            }
            else
            {
                _timer = 500;
            }
            setTimeout(function () {
                var _item = _config.__mapping[_value];
                var _txt = _value;
                if(_item)
                {
                    _txt = _item[_textMember];
                    if(_colorMember && _item.hasOwnProperty(_colorMember))
                    {
                        _ctrl.style.color = _item[_colorMember];
                    }
                }

                _ctrl.appendChild(document.createTextNode(_txt));


            },_timer);
        }
        return [_ctrl];
    }
},function (type) {

    //
    var _dataSourceGetter = function () {

        if (!this.hasOwnProperty('__dataSource')) {
            this.__dataSource = [];
        }
        return this.__dataSource;
    };

    var _dataSourceSetter = function (value) {

        this.setDataSource(value) ;

    };
    this.defineProperty(type,"dataSource", _dataSourceGetter, _dataSourceSetter,true);
});

