/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:21
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.ProgressBar', {
    extend: 'Rsd.control.Component',
    xtype: 'progress-bar',
    margin:'3 0 2 0',
    border: 0,
    value: 0,
    barCls: '',
    valueCls: '',
    cls: 'x-progress-bar',
    items: [],
    layout: {
        type: 'hbox',
        align: 'center'
    },
    widht: '100%',
    height: 30,
    value: 0,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },

    initComponentEx: function () {
        var me = this;

        me.ctrl = document.createElement("DIV");
        var _text = document.createElement("LABEL");
        me.msg = document.createElement("LABEL");
        me.bar = document.createElement("DIV");
        me.valueBar = document.createElement("DIV");

        me.ctrl.style.display = 'inline';
        me.ctrl.style.position = 'absolute';
        me.ctrl.style.top = '0px';
        me.ctrl.style.right = '0px';
        me.ctrl.style.bottom = '0px';
        me.ctrl.style.left = '0px';

        me.bar.style.position = 'absolute',
        me.bar.style.top = '0px';
        me.bar.style.right = '50px';
        me.bar.style.bottom = '0px';
        me.bar.style.left = '0px';
        me.bar.style.display = 'inline';
        me.bar.style.border = '1px solid gray';
        me.bar.style.backgroundColor = 'inherit';
        me.bar.style.marginLeft = '5px';
        me.bar.style.marginRight = '5px';
        if (me.barCls) {
            me.bar.classList.add(me.barCls);
        }

        me.valueBar.style.height = '100%';
        me.valueBar.style.width = '0%';

        if (me.valueCls) {
            me.valueBar.classList.add(me.valueCls);
        }
        else {
            me.valueBar.style.backgroundColor = 'green';
        }
        me.msg.style.width = '40px';
        me.msg.style.display = 'inline';
        me.msg.style.float = 'right';
        me.msg.style.textAlign = 'left';

        //me.ctrl.appendChild(_text);
        me.ctrl.appendChild(me.bar);
        me.ctrl.appendChild(me.msg);

        me.bar.appendChild(me.valueBar);

        me.setValue(me.value);
        me.callParent();
    },
    /*
    *
    * */
    setValue: function (value) {
        var me = this;

        me.value = value == null ? 0 : parseInt(value);
//        me.value = me.value > 100 ? 100 : me.value;
//        me.value = me.value < 0 ? 0 : me.value;
        if (me.ctrl) {
            me.valueBar.style.width = (me.value > 100 ? 100 : me.value) + '%';
            me.msg.innerHTML = me.value + '%';
        }

    }
});
