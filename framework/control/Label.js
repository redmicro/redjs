/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:23
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.Label', {
    extend: 'Rsd.control.Component',
    xtype: 'label',
    /*
    * 文本信息
    * */
    //text:'',
    ctrlTagName: 'nobr',
    cls:'x-control-label',
    ctrlCls:'x-ctrl',
    dataIndex:'',
    /*
    * text 文本颜色
    * */
    color:null,
    height:30,
    mulitiLine:false,
    /*
    * */
    constructor: function Label(config) {
        config = config || {};
        this.apply(config);
    },
    /*
    * */
    onBeforeInit:function onBeforeInit() {
        if(this.mulitiLine)
        {
            this.ctrlTagName='span';
            this.height=null;
        }
        else
        {
            this.ctrlTagName='nobr';
        }
        this.callParent();
    },
    /*
     * */
    onAfterInit: function onAfterInit() {
        var me = this;

        this.setText (me.text||me.value);


        this.callParent();

    },
    onAfterLayout:function onAfterLayout()
    {
        if(Rsd.isNumber(this.height))
        {
            this.ctrl.style.lineHeight = this.height+ 'px';
            this.label.element.style.lineHeight = this.height+ 'px';
        }
        this.callParent();
    },
    /*
     * */
    getText: function () {
        return  Rsd.isNullOrUndefined(this.__text)?this.value:this.__text;
    },

    /*
     * */
    setText: function (text) {
        var me = this;
        me.__text = Rsd.isNullOrUndefined(text)? '':text;
        if (me.ctrl) {
            if( me.ctrl.removeChild)
            {
               while(me.ctrl.childNodes.length > 0)
               {
                  me.ctrl.removeChild(me.ctrl.childNodes[0]);
               }
            }

           me.ctrl.appendChild(document.createTextNode(me.text));
            if(me.color)
            {
                me.ctrl.style.color = me.color;
            }
        }
    },
    setValue:function setValue(value) {
        this.setText(value);
    },
    getValue:function getValue() {
        return this.getText();
    }


},function (type) {

    var _textGetter = function () {
        return this.getText();
    };

    var _textSetter = function (value) {
        this.setText(value);
    };
    this.defineProperty(type,"text", _textGetter, _textSetter,true);
});
