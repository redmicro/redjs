/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:22
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.Button', {
    extend: 'Rsd.control.Input',
    xtype: 'button',
    height: 30,
    margin:'1 3 1 3',
    width: 80,
    inputType: 'button',
    ctrlCls: 'x-control-button',
    /*
    * 延时执行的时间，毫秒
    * */
    delayMS:0,
    /*
    * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    /*
    *
    * */
    beforeClick:function beforeClick(args) {

        var me = this;

        var _timer = me.delayMS;

        if(_timer > 0)
        {
            var _ctrl = this.ctrl;
            var __old_value = _ctrl.value;

            _ctrl.value = __old_value + '('+_timer/1000+')';
            me.setDisabled(true);

            var _id = setInterval(function () {
                _timer-= 1000;
                if(_timer > 0)
                {
                    _ctrl.value = __old_value + '('+_timer/1000+')';

                }else
                {
                    _ctrl.value = __old_value;
                    me.setDisabled(false);
                    clearInterval(_id);
                    return ;
                }


            },1000);
        }


        return true;
    },
    /*
    *
    * */
    makeControl:function makeControl(config,row)
    {           //debugger;
        var _config = config ||{};
        var _editable = _config.editable;
        var _value = row[config.dataIndex||config.name] || config.text;

        var _ctrl = null;
        if(_editable)
        {
            _ctrl = document.createElement('input');
            _ctrl.type= 'button';
            _ctrl.style.width = '80%';
            _ctrl.value = _value || 'Click';
            _ctrl.onclick = function _onClick()
            {

                if(Rsd.isFunction(config.handler))
                {
                    config.handler.call(_ctrl,row);

                }else
                {
                    Rsd.log('handler value is not function.');
                }
            }
        }
        else
        {
            if(_value== null || _value == undefined || _value == '')
            {
                return _ctrl;
            }
            _ctrl = document.createElement('label');
            _ctrl.appendChild(document.createTextNode(_value));
            _ctrl.style.position = 'relative';
            _ctrl.style.width = '100%';
            _ctrl.style.height = '100%';
        }
        return _ctrl;
    }

},function (type) {

    var _textGetter = function () {
        return this.getValue();
    };

    var _textSetter = function (value) {
        this.setValue(value);
    };
    this.defineProperty(type,"text", _textGetter, _textSetter,true);
});

