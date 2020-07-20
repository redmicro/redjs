/**
 * Created by seeker910 on 2017/8/14.
 */
Rsd.define('Rsd.control.LoadingBar', {
    extend: 'Rsd.control.Component',
    xtype: 'loading-bar',
    margin: '3 0 2 0',
    widht: '100%',
    height: 30,
    ctrlTagName: 'div',
    cls: 'x-loading-bar',
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    /*
     *
     * */
    initComponentEx: function initComponentEx() {
        this.callParent();
        var me = this;

        var _span = document.createElement('span');
        this.___bar = _span;

        me.ctrl.appendChild(_span);

    },
    /**
     * 
     * @param {*} speed 
     */
    start: function start(speed) {

        var _span = this.___bar ;
        _span.classList.remove('x-fullwidth');
        setTimeout(function(){

            _span.classList.add('x-fullwidth');
            if (speed < 5) {
                _span.classList.add('x-fast'); 
                return;
            }
            if (speed > 10) {
                _span.classList.add('x-slow'); 
                return;
            }
            _span.classList.add('x-normal');    
            return;
        },speed||10)
        
    },
    /**
     * 
     */
    stop:function () {
        var _span = this.___bar ;
        _span.classList.remove('x-fullwidth');
    }


});