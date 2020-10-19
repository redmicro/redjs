Rsd.define('Rsd.control.QRCode', {
    extend: 'Rsd.control.Component',
    xtype: 'qrCode',
    height:30,
    width:300,
    margin:'3 0 2 0',
    ctrlTagName: 'div',
    //ctrl name 属性
    dataIndex:'',
    //value: null,
    accessKey:'',
    /*
    * canvas|table
    * */
    renderType:'canvas',
    foreGround:'#000',
    backGround:'#fff',
    "static":function __init()
    {
        setTimeout(function () {
            Rsd.loadPlugin('https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js', function () {});
        },0);
    },
    constructor: function constructor (config) {
        config = config || {};
        this.apply(config);
    },

    /**
     * 
     */ 
    setValue: function (value) {
        this.__value = value;
    },

    /*
    * */
    getValue: function () {
        return  this.__value;
    },
    /*
    * */
    build:function build(width,height) {

        if($)
        {
            $(this.ctrl).empty();
            $(this.ctrl).qrcode({
                render: this.renderType||"canvas",
                width: width||50,
                height: height||50,
                foreground: this.foreGround,
                background: this.backGround,
                text: encodeURI(this.value)
            });
        }

    },


},function (type) {

    var _valueGetter = function () {
        return this.getValue();
    };

    var _valueSetter = function (value) {
        this.setValue(value);
    };
    this.defineProperty(type,"value", _valueGetter, _valueSetter,true);
});
