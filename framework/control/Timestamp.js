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
    /***
     *  重写setValue
     * 因为继承了Rsd.control.Date 所以 this.__value 的实际指类型必须是Date
     */
    setValue:function setValue(value)
    {
        if( this.__value == value)
        {
            return;
        }
        
        var _date = null;
        if(value == null)
        {
            _date = new Date(0);
        }
       
        if(value instanceof Date)
        {
            _date = value;
        }

        if(_date==null && !Rsd.isNumber(value))
        {
            Rsd.error('Timestamp值设置错误：【'+ value + '】不是有效的数字类型。');
            return;
        }

        if(_date == null)
        {
            var _value = parseInt(value);
            for(var i =0 ;i < 6-this.precision;i++)
            {
                _value = _value * 10;
            }
             _date = new Date(_value) ;
        }
      
         this.__value = _date;

        if (this.ctrl) {

            if( _date != null )
            {
                this.ctrl.value = _date.format(this.formatString||'yyyy-MM-dd hh:mm:ss');
            }
            else
            {
                this.ctrl.value = "";
            }
            this.___notShowPopupBox = true;
            this.ctrl.focus();
            this.ctrl.blur();
            this.___notShowPopupBox = false;
        }

    },
    /**
     * 重写getValue
     * 无效时间值，返回null.
     */
    getValue:function getValue() {

       
        var _value = Date.parse( this.callParent()) ;
       
        if(isNaN(_value))
        {
            return 0;
        }
        for(var i =0 ;i < 6-this.precision;i++)
        {
                _value = _value / 10;
        }
        return _value;
    }

});