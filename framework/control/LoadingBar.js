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
    start: function start(speed) {

        var _span = this.___bar ;
        $(_span).removeClass('x-fullwidth').delay(speed||10).queue(function (next) {

            $(this).addClass('x-fullwidth');
            if (speed < 5) {
                $(this).addClass('x-fast');
                next();
            }
            if (speed > 10) {
                $(this).addClass('x-slow');

                next();
            }
            $(this).addClass('x-normal');
            next();

        });
    },
    stop:function () {
        var _span = this.___bar ;
        _span.classList.remove('x-fullwidth');
    }


});