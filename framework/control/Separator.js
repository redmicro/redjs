/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:19
 * To change this template use File | Settings | File Templates.
 */
/*
 *
 * items[{itemHeight:100,itemWidth:20%}]
 * */
Rsd.define('Rsd.control.Separator', {
    extend: 'Rsd.container.Component',
    xtype: 'separator',
    table: null,
    layout: 'hbox',
    panelContainers: [],
    separatorContainers: [],
    bodyTagName:'table',
    constructor: function Separator(config) {
        config = config || {};
        this.apply(config);

    },
    onAfterInit: function onAfterInit() {

        var me = this;
        if (me.items.length > 1) {

            //me.table = window.document.createElement('table');
            me.table = me.body;
            me.table.classList.add('x-separator-container');
            if (me.layout.type.toLowerCase() == 'hbox') {
                var tr = window.document.createElement('tr');

                var td = window.document.createElement('td');

                tr.appendChild(td);
                me.panelContainers.push(td);
                for (var i = 1; i < me.items.length; i++) {
                    var td = window.document.createElement('td');
                    td.style.width = '4px';
                    td.style.cursor = "w-resize";
                    td.style.backgroundColor = '#bfbfcc';
                    //td.style.border ="none";
                    td.style.borderLeft ="1px dashed #1E90FF";
                    td.style.borderRight ="1px dashed #1E90FF";
                    td.classList.add('x-bg-checkered');

                    tr.appendChild(td);
                    me.separatorContainers.push(td);
                    var td = window.document.createElement('td');

                    tr.appendChild(td);
                    me.panelContainers.push(td);


                }
                me.table.appendChild(tr);
            }
            if (me.layout.type.toLowerCase() == 'vbox') {
                var tr = window.document.createElement('tr');

                var td = window.document.createElement('td');

                tr.appendChild(td);
                me.panelContainers.push(td);
                me.table.appendChild(tr);

                for (var i = 1; i < me.items.length; i++) {
                    var tr = window.document.createElement('tr');

                    var td = window.document.createElement('td');

                    td.style.height = '4px';
                    td.style.cursor = "w-resize";
                    td.style.backgroundColor = '#bfbfcc';
                    td.style.borderTop ="1px dashed #1E90FF";
                    td.style.borderBottom ="1px dashed #1E90FF";
                    td.classList.add('x-bg-checkered');

                    tr.appendChild(td);
                    me.separatorContainers.push(td);
                    me.table.appendChild(tr);

                    var tr = window.document.createElement('tr');

                    var td = window.document.createElement('td');

                    tr.appendChild(td);
                    me.panelContainers.push(td);
                    me.table.appendChild(tr);
                }
            }

            //me.body.appendChild(me.table);
        }
        me.callParent();
    },
    /*
     * */
    onAfterRender: function onAfterRender() {
        var _panel;
        var _item;
        var me = this;

        //debugger;

        if (me.items.length > 1) {
            var _last = me.items.length-1;
            for (var i = 0; i < me.items.length; i++) {


                try {
                    var _td = me.panelContainers[i];
                    _item = me.items[i];

                    if (me.layout.type.toLowerCase() == 'hbox') {
                        if(i < _last)
                        {
                            _td.style.width = Rsd.isNumber(_item.width) ? (_item.width + 'px') : _item.width;
                        }

                        _td.style.height = '100%';

                    }
                    if (me.layout.type.toLowerCase() == 'vbox') {
                        if(i < _last)
                        {
                            _td.style.height = Rsd.isNumber(_item.height) ? (_item.height + 'px') : _item.height;
                        }

                        _td.style.width = '100%';

                    }

                    _item.renderTo(_td);
                    _item.width = '100%';
                    _item.height = '100%';
                    _item.dom.classList.add('x-separator-item');
                } catch (e) {
                    console.error(e);
                }

            }
            var _separator;
            for (var i = 0; i < me.separatorContainers.length; i++) {
                _separator = me.separatorContainers[i];
                _separator.addEventListener("mousedown", me.onmousedown);
            }
        }
        me.callParent();

    },
    /*
     * */
    onmousedown: function onmousedown(e) {

        var _e = e || window.event;
        var x = _e.pageX;
        var y = _e.pageY;

        var _bar = _e.srcElement || _e.target || this;
        var _obj = _bar.previousSibling;
        var _layout = 'hbox';
        if (_obj == null) {
            _obj = _bar.parentNode.previousSibling.childNodes[0];
            _layout = 'vbox';
        }
        if (_obj == null) {
            return;
        }
        var _width = _obj.clientWidth;
        var _height = _obj.clientHeight;

        if (_bar.setCapture) {
            _bar.setCapture();
        }
        else if (window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
        /*
         * */
        function onmousemove(e) {
            var _e = e || window.event;
            if (_bar && _obj) {
                window.document.body.style.cursor = "w-resize";
                if (!_e.pageX) _e.pageX = _e.clientX;
                if (!_e.pageY) _e.pageY = _e.clientY;
                var tx = _e.pageX - x;
                var ty = _e.pageY - y;

                if (_layout == 'hbox') {
                    _obj.style.width = (_width + tx * 1.2) + 'px';
                }
                if (_layout == 'vbox') {
                    _obj.style.height = (_height + ty * 1.2) + 'px';
                }
            }
        }

        function onmouseup(e) {

            if (_bar.releaseCapture) {
                _bar.releaseCapture();
            }
            else if (window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            window.document.body.style.cursor = "default";
            window.removeEventListener("mousemove", onmousemove);

        }

        window.removeEventListener("mouseup", onmouseup);
        window.addEventListener("mouseup", onmouseup);

        window.removeEventListener("mousemove", onmousemove);
        window.addEventListener("mousemove", onmousemove);
    }
});
