/**
 * Created by seeker910 on 14-1-1.
 * label:{width:'auto'}
 */
Rsd.define('Rsd.control.CheckBox', {
    extend: 'Rsd.control.Input',
    xtype: 'checkbox',
    height: 25,
    widht: 80,
    margin: '4 0 4 0',
    inputType: 'CheckBox',
    ctrlCls: 'x-control-checkbox',
    checked:false,
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },

    /*
    * */
    onAfterInit: function onAfterInit() {
        this.callParent();
        this.ctrl.checked =  this.checked;
    },
    /*
    * */
    onAfterRender:function onAfterRender()
    {
        this.callParent();
        var _label = document.createElement('label');
        _label.setAttribute('for',this.ctrl.id);
        _label.style.display='inline';
        _label.style.position = 'absolute';

        this.__self_label = _label;
        this.container.appendChild(_label);
    },
    onAfterLayout:function onAfterLayout() {
        this.callParent();
        var _label = this.__self_label;
        _label.style.lineHeight = _label.clientWidth + 'px';
        switch (this.label.position) {
            case 'top':
            case 'bottom':{

                _label.style.top = this.ctrl.style.top;
                _label.style.bottom = this.ctrl.style.bottom;
            }
            case 'right': {
                _label.style.left = '0px';
                _label.style.top = (this.container.clientHeight - _label.clientHeight)/2 + 'px';
                this.label.element.style.right = '0px';
                this.label.element.style.left = (_label.clientWidth + this.label.space ) + 'px';
                break;
            }

            case 'left':
            default: {
                _label.style.top = (this.container.clientHeight - _label.clientHeight)/2 + 'px';
                _label.style.left = this.ctrl.style.left;
                break;
            }
        }

    },
    /*
    * */
    isChecked:function isChecked()
    {
        return this.ctrl ? this.ctrl.checked : this.checked;
    },

    /*
    *
    * */
    check:function check(check)
    {
        this.checked = check;
        return this.ctrl.checked = check;
    },
    /*
     * 返回 对象或数组
     * */
    makeControl:function makeControl(config,row)
    {
        var _config = config ||{};
        var _editable = _config.editable;
        var _dataIndex = _config.dataIndex|| _config.dataindex || _config.name;
        //var _value = row[_dataIndex];
        _config.__index__= _config.__index__||0;
        var _chk = document.createElement('input');

        _chk.classList.add('x-control-checkbox');
        _chk.style.visibility = 'hidden';
        _chk.type = 'checkbox';
        _chk.name = _dataIndex;
        _chk.setAttribute('id','__chk__' + _dataIndex + '__' +_config.__index__++);

        var _label = document.createElement('label');
        _label.style.lineHeight = (_chk.clientHeight||20) + 'px';
        _label.setAttribute('for',_chk.getAttribute('id'));

        if(_editable)
        {

        }
        else
        {
            _label.onclick=function () {
                return false;
            };

        }
        return [_chk,_label];

    }
});

