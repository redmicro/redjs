/**
 * Created by seeker910 on 2017/8/23.
 * label:{width:'auto'}
 */
Rsd.define('Rsd.control.Radio', {
    extend: 'Rsd.control.Input',
    xtype: 'radio',
    height: 25,
    widht: 80,
    inputType: 'radio',
    ctrlCls: 'x-control-radio',
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
    /*
    * */
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
     *  */
    check:function check(check)
    {
        this.checked = check;
        return this.ctrl.checked = check;
    }
});
