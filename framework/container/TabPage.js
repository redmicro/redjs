/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.container.TabPage', {
    extend: 'Rsd.container.PageContainer',
    requires:['Rsd.control.Svg'],
    xtype: 'tabPage',
    width: '100%',
    closeBtn:true,
    bodyTagName:'fieldset',
    bodyCls: 'x-tab-body',
    positionX: 20,
    offsetX: 12.0,
    currentTab: null,
    selectBg: null,
    fillColor: "#EEEEEE",
    selectedColor: "#1B9DD4",
    /*
    * svg collection
    * */
    tabs:{},
    layout:'fit',
    header:{
        cls: 'x-tab-header',
        visible: true,
        position: 'top',
        height:40,
        style:{fontSize:'100%'},
        space: 0
    },
    /*
    * */
    constructor: function TabPage(config) {

        config = config || {};
        this.apply(config);
    },
    /**
     * */
    onAfterRender:function onAfterRender() {
        this.callParent();
    },
    /*
    * */
    doLayout: function doLayout() {
        var me = this;
        me.callParent();
        if (me.currentPage) {
            me.select(me.currentPage.id);
        }
    },
    /**
    * */
    addTab: function addTab(id, text,select) {
        if (arguments.length < 2) {
            throw new Error('id or text is null.');
        }

        var _w = Rsd.getStringWidth(this.header.element,text) + 80;
        var _h = this.header.height;
        _w = _w > 250?250:_w;
        var _tab = this.createTab(_w, _h, text,id.substring(5));

        this.tabs[id] = _tab;

        _tab.renderTo(this.header.element);
        _tab.doLayout();
        this.positionX = this.positionX||20;
        _tab.dom.style.left = (this.positionX  - (Object.getOwnPropertyNames(this.tabs).length-1) * 10) + "px"

        return _tab;
    },
     /*
     * */
    removeTab: function removeTab(tab) {
        var _tab = typeof(tab) == "string" ? this.tabs[tab] : tab;

        if (_tab == null) {
            return;
        }
        if (_tab == this.currentTab) {
            this.currentTab = null;
        }
        delete this.tabs['_tab_' + _tab.pageId];

        _tab.remove();
        this.reload();

    },
    /*
    * */
    selectTab: function selectTab(obj) {
        //debugger;
        var _tab = typeof(obj) == "string" ? this.tabs[obj] : obj;

        if (_tab == null) {

            var _msg = 'can not found tab object (id:' +   obj +')';
            Rsd.error(_msg,'Rsd.container.TabPage',new Error(_msg));
            return;
        }
         if(_tab == this.currentTab)
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
        _tab.selected = true;

        var _svg =  _tab.ctrl;
        _svg.childNodes[0].style.display = 'inline-block';
        _svg.childNodes[1].style.display = 'inline-block';
        _svg.childNodes[2].style.display = 'none';
        _tab.addCls('dom','x-tab-selected');

        this.currentTab = _tab;
    },
    /*
    * */
    createTab: function createTab(width, height, text,pageid) {

        var _svg = new Rsd.create('Rsd.control.Svg',{
            cls:'x-tab',
            ctrlCls:'x-image',
            pageId:pageid,
            size:[width,height],
            width:width,
            height:height
        });

        var _offset_x = this.offsetX;
        var _h = height * 0.1;
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

            var _targetId = this.parentNode.parentNode.parentNode.getAttribute('targetid');

            me.select(_targetId );
        });
        _p.addEventListener("mouseover", function () {
            _p.setAttributeNS(null, "fill", '#ececec');
        });
        _p.addEventListener("mouseout", function () {
            _p.setAttributeNS(null, "fill", _fillC);
        });

        _svg.addText(text,{"x":this.closeBtn?_offset_x *2:_offset_x *3,"y":(height*0.67),"class":'x-title'});

        if(this.closeBtn){
            this.addCloseBtn(_svg, width - _offset_x * 3,_h);
        }
        return _svg;
    },
    /*
     * */
    reload: function reload() {
        //debugger
        var _tab;
        this.positionX = this.positionX||20;
        var _x = 0;
        for (var t in this.tabs) {
            _tab = this.tabs[t];
            _tab.dom.style.left = (this.positionX - _x) + "px";
            _x += 10;
        }
        //选中删除后的默认tab
        if (this.currentTab == null && _tab != null) {
            this.select(_tab.pageId);
        }
    },
    /**
     *
     * */
    select: function select (id,speed) {

        this.selectTab("_tab_" + id );
        this.callParent(id,speed);

        this.events.fire(this, 'afterselected', {tab: this.currentTab,page:this.getCurrentPage()});
    },
    /*
     * */
    remove: function remove(id) {

        this.removeTab('_tab_'+ id);
        this.callParent(id);

        this.events.fire(this, 'afterremoved', {tab: this.tabs[id],page:this.getCurrentPage()});
    },
    /*
     page.selected控制tab selected样式
     speed:动画显示速度
     * */
    add: function add(page,speed) {
        var me = this;

        if (me.muliti) {

        }
        else {
            //remove all tabs
            me.tabs={};

        }
        if (!me.contain(page.id)) {

            var _tab = me.addTab("_tab_" + page.id, page.tabTitle||'tabTitle未设置');
            _tab.setElAttribute('dom','targetid',page.id);
            me.callParent(page);

        }

        if(page.selected){
            me.select(page.id,speed);
        }

    },
    /*
    * */
    getCurrentPage: function getCurrentPage() {
        return this.currentPage;
    },
    /*
     * */
    addCloseBtn: function addCloseBtn(svg, x,y) {
        var me = this;
        var _s = svg;
        var _l1 = _s.addLine(x + 2, 18 + y, x + 10, 26 + y, 'grey');
        var _l2 = _s.addLine(x + 2, 26 + y, x + 10, 18 + y, 'grey');
        var _c = _s.addRect(x, 16 + y, 10, 10 + y, 'transparent', 'transparent');
        //_c.title = '关闭';
        function onClick() {
            me.remove(_s.pageId);
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
