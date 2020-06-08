/*
 * redmicro all Copyright (c)
 */

/**
 * Created by seeker910 on 2015/5/28.
 */
Rsd.define('Rsd.control.TextArea', {
    extend: 'Rsd.control.Component',
    xtype: 'textarea',
    height: 25,
    widht: 80,
    ctrlTagName: 'textarea',
    ctrlCls: 'x-control-textarea',
    dataIndex:'',
    handler: null,
    constructor: function constructor(config) {
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
        me.ctrl.name = me.dataIndex;
        me.ctrl.readOnly = me.readOnly;
        me.ctrl.disabled = me.disabled;
        me.ctrl.required = me.required?'required':'';
        me.ctrl.placeholder = (me.placeholder||'') + (me.required?'(必填)':'' );
        me.ctrl.rows = me.rows||1;

        if (me.value != undefined) {
            //firefox 不支持 innerText
            me.ctrl.innerHTML = me.value;
            me.ctrl.value = me.value;
        }

    },
    /*
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

    },
    /*
     * */
    getValue:function getValue()
    {
        return this.ctrl.value||this.value;
    }

});