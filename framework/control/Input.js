/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:22
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.Input', {
    extend: 'Rsd.control.Component',
    xtype: 'input',
    height:30,
    width:300,
    margin:'3 0 2 0',
    ctrlTagName: 'input',
    inputType: 'text',
    //ctrl name 属性
    dataIndex:'',
    //value: null,
    readOnly: false,
    disabled:false,
    required:false,
    placeholder:'',
    accessKey:'',
    /*
    * onchange 事件
    * */
    textChanged:null,
    /*
    *
    * */
    constructor: function constructor (config) {
        config = config || {};
        this.apply(config);
    },
     /*
     * */
    onAfterInit: function onAfterInit() {
        this.callParent();
        var me = this;
        me.dom.style.textAlign = 'left';
        //me.ctrl.style.position = 'absolute';
        me.ctrl.type = me.inputType;
        me.ctrl.name = me.dataIndex;
        me.ctrl.readOnly = me.readOnly;
        me.ctrl.disabled = me.disabled;
        me.ctrl.required = me.required?'required':'';
        me.ctrl.placeholder = (me.placeholder||'') + (me.required?'(必填)':'' ) ;
        me.ctrl.autocomplete="OFF";
        me.ctrl.accessKey = me.accessKey;
        me.ctrl.onchange = function (evt) {

            me.funApplyByIOC(me.textChanged,[me,evt]);
        }

        if (me.__value != undefined) {
            //firefox 不支持 innerText
            me.ctrl.innerHTML = me.__value;
            me.ctrl.value = me.__value;
        }

    },
    /**
     * 
     * @param {*} disabled 
     */
    setDisabled: function setDisabled(disabled) {
        this.callParent(disabled);
        if( this.ctrl)
        {
            this.ctrl.disabled = this.disabled;
        }

    },
    /*
    * */
    setValue: function (value) {
        var me = this;
        if(me.inputType == 'number')
        { 
            me.__value = (value == null ||value==undefined || !Rsd.isNumber(value))?0:value;
        }else
        {
            me.__value = value;
        }
      
        if (me.ctrl) { 
            me.ctrl.value = me.__value;

            //模拟触发onchange
            //me.ctrl.focus();
            //me.ctrl.blur();

            if ("createEvent" in document) {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                me.ctrl.dispatchEvent(evt);
            }
            else
            {
                me.ctrl.fireEvent("onchange");
            }
        }
    },

    /*
    * */
    getValue: function () {
        var me = this;
        return  me.ctrl ? me.ctrl.value : me.__value;
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
        this.removeCls('ctrl','x-control-error');
        if(this.required)
        {
            if(this.ctrl.value == '' )
            {
                this.error = '【' + this.label.content + '】必填';
                this.addCls('ctrl','x-control-error');
                return false;
            }

        }
        return true;
    }

},function (type) {

    var _valueGetter = function () {
        return this.getValue();
    };

    var _valueSetter = function (value) {
        this.setValue(value);
    };
    this.defineProperty(type,"value", _valueGetter, _valueSetter,true);
});
