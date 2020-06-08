/**
 * Created by seeker910 on 2017/3/30.
 *
 * 未测试
 */
Rsd.define('Rsd.control.TabBar', {
    extend: 'Rsd.container.Component',
    requires:['Rsd.control.Svg'],
    xtype: 'tabBar',
    width: '100%',
    cls: 'x-tab-header',
    closeBtn:true,
    positionX: 20,
    offsetX: 12.0,
    current: null,
    selectBg: null,
    fillColor: "#EEEEEE",
    selectedColor: "#1B9DD4",
    tabs:{},
    /*
     * */
    constructor: function TabPage(config) {

        config = config || {};
        this.apply(config);
    },

    /*
     * */
    add: function add(id, text,select) {
        if (arguments.length < 2) {
            throw new Error('id or text is null.');
        }

        var _w = Rsd.getStringWidth(this.body,text) + 80;
        var _h = this.body.clientHeight;
        _w = _w > 250?250:_w;
        var _tab = this.newTabBySvg(_w, _h, text);
        _tab.id = id;
        this.tabs[id] = _tab;

        _tab.renderTo(this.body);

        _tab.dom.style.left = this.positionX  + "px";
        this.positionX += (_w - 20);
    },

    /*
    移除
     * */
    remove: function removeTab(tab) {
        var _tab = typeof(tab) == "string" ? this.tabs[tab] : tab;

        if (_tab == null) {
            return;
        }
        if (_tab == this.current) {
            this.current = null;
        }

        delete this.tabs[_tab.id];
        _tab.remove();
        this.reload();
        this.events.fire(this, 'afterremoved', _tab);
    },

    /*
    id,{}
     * */
    select: function select(obj) {
        //debugger;
        var me = this;
        var _tab = typeof(obj) == "string" ? this.tabs[obj] : obj;

        if (_tab == null) {
            throw new Error('tab not found.');
        }
        if(_tab == this.current)
        {
            return;
        }
        for(var i in this.tabs){

            var _t = this.tabs[i];
            _t.selected = false;
            var _svg =  _t.ctrl;
            _svg.childNodes[0].style.display = 'none';
            _svg.childNodes[1].style.display = 'none';
            _svg.childNodes[2].style.display = 'inline-block';
            _t.removeCls('dom','x-tab-selected');
        }

        this.current = _tab;
        this.current.selected = true;
        var _svg =  this.current.ctrl;
        _svg.childNodes[0].style.display = 'inline-block';
        _svg.childNodes[1].style.display = 'inline-block';
        _svg.childNodes[2].style.display = 'none';
        this.current.addCls('dom','x-tab-selected');

        this.events.fire(this, 'afterselected', this.current);
    },

    /*
     * */
    reload: function reload() {
        //debugger
        var _tab;
        this.positionX = 20;
        for (var t in this.tabs) {
            _tab = this.tabs[t];
            _tab.dom.style.left = this.positionX + "px";
            this.positionX += _tab.width - 20;
        }
        //选中删除后的默认tab
        if (this.current == null && _tab != null) {
            this.select(_tab.id.substring(5));
        }

    },


    /*
     @private
     * */
    newTabBySvg: function newTabBySvg(width, height, text) {

        var _svg = new Rsd.create('Rsd.control.Svg',{
            cls:'x-tab',
            ctrlCls:'x-image',
            width:width,
            height:height
        });

        var _offset_x = this.offsetX;
        var _h = height - 38;
        var _y0 = 1 +_h, _y1 = 5 +_h, _y2 = 4 +_h, _y3 = height;
        var _path = [
            {tag: 'M', value: [0, _y3]},
            {tag: 'C', value: [_offset_x * 1.0, _y3, _offset_x * 1.0, _y1, _offset_x * 2.0, _y1]},
            {tag: 'L', value: [width - _offset_x * 2.0, _y1]},
            {tag: 'C', value: [width - _offset_x * 1.0, _y1, width - _offset_x * 1.0, _y3, width , _y3]},
            {tag: 'Z', value: null}
        ];

        var _selectedPath1 = [
            {tag: 'M', value: [0, _y3]},
            {tag: 'C', value: [_offset_x * 1.5, _y3, _offset_x * 1.0, _y2, _offset_x * 2.5, _y2]},
            {tag: 'L', value: [width - _offset_x * 2.5, _y2]},
            {tag: 'C', value: [width - _offset_x * 1.0, _y2, width - _offset_x * 1.5, _y3, width , _y3]},
            {tag: 'Z', value: null}
        ];
        var _selectedPath = [
            {tag: 'M', value: [0.0, _y3]},
            {tag: 'C', value: [_offset_x * 1.0 , _y3 , _offset_x * 1.0, _y0 , _offset_x * 2.5, _y0]},
            {tag: 'L', value: [width - _offset_x * 2.5, _y0]},
            {tag: 'C', value: [width - _offset_x * 1.0, _y0 , width - _offset_x * 1.0, _y3 , width  , _y3]},
            {tag: 'Z', value: null}
        ];

        var _fillC = this.fillColor;
        var _selectedC = this.selectedColor;
        _svg.addPath(_selectedPath, _selectedC, 'transparent');
        _svg.addPath(_selectedPath1, _fillC, 'transparent');

        _svg.ctrl.childNodes[0].style.display = 'none';
        _svg.ctrl.childNodes[1].style.display = 'none';

        var _p = _svg.addPath(_path, _fillC, 'transparent');

        var me = this;

        _p.addEventListener("click", function () {
            me.select(this.parentNode.parentNode.parentNode.id.substring(5));
        });
        _p.addEventListener("mouseover", function () {
            _p.setAttributeNS(null, "fill", '#ececec');
        });
        _p.addEventListener("mouseout", function () {
            _p.setAttributeNS(null, "fill", _fillC);
        });

        _svg.addText(text,{x:_offset_x *2,y:25 +_h,class:'x-title'});


        if(this.closeBtn){
            this.addCloseBtn(_svg, width - _offset_x * 3,_h);
        }
        return _svg;
    },

    /*
     @private
     * */
    addCloseBtn: function addCloseBtn(svg, x,y) {
        var me = this;
        var _s = svg;
        var _l1 = _s.addLine(x + 2, 18 + y, x + 10, 26 + y, 'grey');
        var _l2 = _s.addLine(x + 2, 26 + y, x + 10, 18 + y, 'grey');
        var _c = _s.addRect(x, 16 + y, 10, 10 + y, 'transparent', 'transparent');
        //_c.title = '关闭';
        function onClick() {
            me.remove(_s.id.substring(5));
        };
        function onMouseOver() {
            _l1.setAttributeNS(null, "stroke", 'red');
            _l2.setAttributeNS(null, "stroke", 'red');
            _l1.setAttributeNS(null, "stroke-width", 2);
            _l2.setAttributeNS(null, "stroke-width", 2);
            //_c.setAttributeNS(null, "stroke", 'red');
        };
        function onMouseOut() {
            _l1.setAttributeNS(null, "stroke", 'grey');
            _l2.setAttributeNS(null, "stroke", 'grey');
            _l1.setAttributeNS(null, "stroke-width", 1);
            _l2.setAttributeNS(null, "stroke-width", 1);
            //_c.setAttributeNS(null, "stroke", 'transparent');
        }

        _c.addEventListener("click", onClick);
        _c.addEventListener("mouseover", onMouseOver);
        _c.addEventListener("mouseout", onMouseOut);
    }
});