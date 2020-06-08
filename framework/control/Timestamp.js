/**
 * Created by seeker910 on 2017/6/11.
 * 输入值为 int型
 * 返回 类型与输入值类型一致，为 int型。
 * 该控件用于 对timestamp值 使用用int 类型存储对数据
 */
Rsd.define('Rsd.control.Timestamp', {
    extend: 'Rsd.control.Date',
    xtype: 'timestamp',
    formatString:'yyyy-MM-dd hh:mm:ss',
    precision:3,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    setValue:function setValue(value)
    {
        if(value == null)
        {
            this.value = null;
            return;
        }
        var _value = parseInt(value);
        if(isNaN(_value)==false)
        {
            this.value = new Date(value);

        }
        if(  this.value == null)
        {
            Rsd.error('Timestamp值设置错误：【'+ value + '】不是有效的数字类型。');
            return;
        }
        if(Rsd.isNumber(_value))
        {
            for(var i =0 ;i < 6-this.precision;i++)
            {
                _value = _value * 10;
            }
            if(_value > 0)
            {
                this.value = new Date(_value);
            }
            else
            {
                this.value = '';
            }

        }


        if (this.ctrl) {

            if( this.value instanceof Date )
            {
                this.ctrl.value = this.value.format(this.formatString||'yyyy-MM-dd hh:mm:ss');
            }
            else
            {
                this.ctrl.value = this.value;
            }
            this.___notShowPopupBox = true;
            this.ctrl.focus();
            this.ctrl.blur();
            this.___notShowPopupBox = false;
        }

    },
    /*
    * 无效时间值，返回null.
    * */
    getValue:function getValue() {

        var _value = Date.parse( this.callParent()) ;
        if(isNaN(_value))
        {
            return null;
        }
        return _value;
    }

});