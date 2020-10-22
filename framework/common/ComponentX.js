/**
 * Created by seeker910 on 13-12-31.
 */
//"use strict";
Rsd.define('Rsd.common.ComponentX', {
    extend: 'Rsd.common.Object',
    requires: ['Rsd.common.Layouter'],
    xtype: 'component-x', 
    cache: Rsd.isDebug,
    singleton:false,
    //dom: null,
    container: null,
    /*
    * dom 加密标识
    * */
    domFlag: null,
    /*
    * dom 加密值
    * */
    domFlagValue: '',
    domTagName: 'div',
    containerTagName: 'div',
    bodyTagName: 'div',
    /*
    * container Element classname
    * */
    cls: '',
    /*
    * 计量单位
    * */
    //sizeUnit:'px',
    /*
    * container.style.margin
    * '10 10 10 10' or {top:10px,right:10px,bottom:10px,left:10px}
     */
    margin: null,
    /*
   * 可拖动
   * */
    draggable: false,
    /*
    * container border style 用于页面布局调试
    * */
    border:false,
    tabIndex: null,
    shadow: false,
    /**
    * @desc 控制display属性，隐藏后dom所在位置不会被占用
    * */
    hidden: false,
    /**
     * @desc 控制visibility,设置为不可见时， dom所在位置仍然被占用
     * */
    //visible:true,
    /*
    * */
    disabled: false,
    /**
    @description 是否打印
     */
    print:true,
    /*
    * 已执行doLayout
    * */
    isLayout:false,
    /**
    *  @desc {top|right|bottom|left:50} dom.style.position = absolute ;
     *
    * */
    floating: false,

    /**
    * @desc {top|right|bottom|left:50} dom.style.position = fixed
    * */
    fixed: false,
    /*
    * ctrl 或 body的hover
    * */
    useHoverStyle: false,
    /*
    * ctrl or body  style.overflow value
    * null ,auto,visible,hidden
    * */
    overflow: null,
    /*
    * listeners:{
            'click':{
                element:'dom',
                fn:function (sender,event) {
                    alert('hello');
                     }
                }
            }
    * */
    listeners: null,
    /**
    *@description dom Element 的 name 属性,数据源映射键值
    * */
    name: '',
    /*
    * dom的style*/
    //style:null,
    /*
    * 父控件
    * */
    //parent: null,
    //event :对象级属性，先注册后触发，不会被继承，执行过程不受子类控制，
    // 功能等于this.on('beforeinit',function(){}),支持IOC
    beforeInit: null,
    //event:功能等于this.on('afterinit',function(){}),支持IOC
    afterInit: null,
    //event:功能等于this.on('beforelayout',function(){}),支持IOC
    beforeLayout: null,
    //event:功能等于this.on('afterlayout',function(){}),支持IOC
    afterLayout: null,
    //event:功能等于this.on('beforerender',function(){}),支持IOC
    beforeRender: null,
    //event:功能等于this.on('afterrender',function(){}),支持IOC
    afterRender: null,
    /*
    * 对象创建于哪个控件
    * */
    from:null,
    /**
     *  */ 
    constructor: function ComponentX(config) {

        config = config || {};
        this.apply(config);

    },
    /**
     *
     *
     * */
    init: function init() {
        var me = this;

        this.callParent();

        me.events.fire(me, 'beforeinit', {});
        me.onBeforeInit();

        me.initComponent();

        if (Rsd.isFunction(me.initComponentEx)) {
            me.initComponentEx.call(me);
        }
        me.onAfterInit();
        me.events.fire(me, 'afterinit', {});
        return this;

    },

    /**
     * @description initComponent 处理dom对象的创建，dom结构，样式，事件注册
     * */
    initComponent: function initComponent() {
        var me = this;
        me.dom = document.createElement(me.domTagName);
        me.dom.id = me.id;
        if (me.name) {
            me.dom.setAttribute("name", me.name)
        }
        me.dom.setAttribute('draggable',this.draggable);
        me.dom.setAttribute(me.domFlag || Rsd.domFlag || 'RSD', me.domFlagValue || Rsd.domFlagValue || '');
        me.dom.setAttribute("rsdtype", me.xtype);
        me.dom.setAttribute("from",me.from||(me.parent&&me.parent.id)||'rsd');
        me.dom.style.opacity = 0;
        me.dom.style.visibility = me.visible ? 'visible' :'hidden';

        me.container = document.createElement(me.containerTagName);
        me.container.id = me.id + '__container';

        me.elements['dom'] = me.dom;
        me.elements['container'] = me.container;

        me.dom.classList.add('x-componentx-dom');
        if(!me.print)
        {
            me.dom.classList.add('x-no-print');
        }

        var _l = ['top','right','bottom','left'];
        if (me.floating) {
            me.dom.classList.add('x-componentx-floating');
            if(Rsd.isObject(me.floating))
            {

                for(var i in _l)
                {
                    var _p = _l[i];
                    if(me.floating.hasOwnProperty(_p))
                    {
                        me.dom.style[_p] = Rsd.isNumber(me.floating[_p])?(me.floating[_p]+me.sizeUnit):me.floating[_p];
                    }
                }

            }
        }

        if (me.fixed) {
            me.dom.classList.add('x-componentx-fixed');
            if(Rsd.isObject(me.fixed))
            {
                for(var i in _l)
                {
                    var _p = _l[i];
                    if(me.fixed.hasOwnProperty(_p))
                    {
                        me.dom.style[_p] = Rsd.isNumber(me.fixed[_p])?(me.fixed[_p]+me.sizeUnit):me.fixed[_p];
                    }
                }

            }
        }

        if (me.domCls) {
            me.addCls('dom', me.domCls);
        }

        me.container.classList.add('x-componentx-container');

        if (me.useHoverStyle) {
            me.container.classList.add('x-componentx-hover');
        }

        if (me.hidden) {
            me.hide()
        }

        //me.dom.style.pointerEvents = 'none';

        me.dom.onkeydown = function (event) {

            var _key = '';
            if(event.altKey)
            {
                _key = 'alt';
            }
            if(event.shiftKey)
            {
                _key = 'shift';
            }
            if(event.ctrlKey)
            {
                _key = 'ctrl';
            }
            if(Rsd.isEmpty(_key))
            {
                me.exeHotKeyFun(event.code);
            }else
            {
                me.exeHotKeyFun(_key +'+' + event.code);
            }
        };

        return this;
    },

    /**
    @description 类级别 在自身beforerender之后发生 ，初始化之前
     * */
    onBeforeInit: function onBeforeInit() {

    },

    /**
     @description 在自身afterrender之前发生 ，初始化之后
     * */
    onAfterInit: function onAfterInit() {
        var me = this;
        if (me.listeners) {
            for (var name in me.listeners) {
                var _event = me.listeners[name];
                if (_event.element == undefined || _event.element == null) {
                    throw new Error('event [' + name + '] element is null.');
                }
                var _el = me.elements[_event.element];

                var _fn = function (e) {
                    //var _t = e.toElement || e.originalTarget || e.target;
                    me.listeners[e.type].fn.call(me, me, e);    //sender event
                };
                if (_el) {
                    if (_el.addEventListener) {
                        _el.addEventListener(name, _fn, true);
                    }
                }
            }
        }

        if(this.beforeInit)
        {
            this.on('beforeinit',this.beforeInit);
        }
        if(this.afterInit)
        {
            this.on('afterinit',this.afterInit);
        }


        if(this.beforeRender)
        {
            this.on('beforerender',this.beforeRender);
        }

        if(this.afterRender)
        {
            this.on('afterrender',this.afterRender);
        }

        if(this.beforeLayout)
        {
            this.on('beforelayout',this.beforeLayout);
        }

        if(this.afterLayout)
        {
            this.on('afterlayout',this.afterLayout);
        }
    },

    /** 
     @public
     @description 用于布局控件，对于先隐藏，布局后再显示对控件，需要重新调用该方法。
     * */
    doLayout: function doLayout() {

        this.markTime('layoutStartTime');
        var me = this;
        setTimeout(function () {
            me.onBeforeLayout();
            me.layouter.layout(me);
            me.isLayout = true;

            me.onAfterLayout();

        },30);
        return this;
    },

    /** 
    * @public
    * */
    onBeforeLayout: function onBeforeLayout() {
        this.events.fire(this, 'beforelayout', {});
    },

    /**
     * @public
     * */
    onAfterLayout: function onAfterLayout() {

        this.events.fire(this, 'afterlayout', {});

    },

    /**
    * @private
    * * */
    render: function render(parent) {

        var me = this;
        var _parent = parent || me.parent;

        if (Rsd.isString(_parent)) {
            _parent = document.getElementById(_parent);
        }

        if (_parent instanceof Rsd.container.Component) {
            _parent = _parent.body;
        }

        if (!me.id) {
            throw new Error(me.xtype + ' component id is null.');
        }

        if (_parent == null) {
            throw new Error('Component\'s(id: \'' + this.id + '\') parent is null or is not Rsd.container.Component or is not dom.');
        }

        me.dom.appendChild(me.container);

        if(_parent instanceof  Redjs)
        {
            _parent = document.body;
        }

        if (typeof Element != 'undefined'
            && (Rsd.isType(_parent, Element) || Rsd.isType(_parent, HTMLBodyElement))) {

            _parent.appendChild(me.dom);

        } else {


            if (!(_parent instanceof Element)) {
                console.error("追加组件失败,请查看日志。");
                console.trace("未能追加组件["+me.$className+"],parent不是有效的组件。");
                console.error(me);
                console.error(_parent);
            }
            else {
                console.error("浏览器不支持Element类型。");
            }
        }


        return this;

    },

    /**
    * @public
    * */
    renderTo: function renderTo(parent) {
        var me = this;

        setTimeout(function renderTo() {
            if(!me.isRendered())
            {
                me.onBeforeRender();
                me.render(parent);
                me.onAfterRender();
            }

        },0);

        return this;
    },
    /**
     * @description 自身及所有子对象render前
     * */
    onBeforeRender: function onBeforeRender() {

        this.events.fire(this, 'beforerender', {});
    },
    /**
     * @description 自身及所有子对象初始化结束，render结束
     * */
    onAfterRender: function onAfterRender() {
        this.events.fire(this, 'afterrender', {});
    },

    /**
     * 
     * */
    on: function on(name, fn) {

        if (!name || name == '') {
            throw new Error('argument \'name\' is null.');
        }
        if (Rsd.isFunction(fn)|| Rsd.isString(fn)) {

            this.events.add(this, name, fn);

        }
        else
        {
            throw new Error('argument \'fn\' is not a function object or string object.');
        }


    },

    /**
    *  @description 配置项 值为空时，取dom值
    * */
    getHeight:function getHeight() {
        if (Rsd.isNullOrUndefined(this.height) && this.isLayout) {
            return $(this.dom).height();
        }

        if (typeof (this.height) == 'string') {

            if (this.height.endsWith('%')) {
                return this.dom.clientHeight;
            }
            return this.toPxValue(this.height);
        }
        if (typeof (this.height) == 'number') {
            return this.toPxValue(this.height + this.sizeUnit);
        }

        return this.height;

    },

    /**  
    * @description 配置项 值为空时，取dom值
    * */
    getWidth:function getWidth() {
        if (Rsd.isNullOrUndefined(this.width) && this.isLayout) {
            return $(this.dom).width() ;
        }

        if (typeof (this.width) == 'string') {

            if (this.width.endsWith('%')) {
                return this.dom.clientWidth;
            }
            return this.toPxValue(this.width);
        }
        if (typeof (this.width) == 'number') {

            return this.toPxValue(this.width + this.sizeUnit);
        }
        return this.width;


    },

    /** 
     * */ 
    toPxValue : function toPxValue(value) {
        if (Rsd.isEmpty(value)) {
            return 0;
        }

        if (typeof (value) == 'string') {

            if (value.endsWith('px')) {
                return parseFloat(value);
            }
            if (value.endsWith('rem')) {
                return Rsd.getRem() * parseFloat(value);
            }
            if (value.endsWith('em')) {
                console.error('暂未实现em 到 px 的转换。');
                return parseFloat(value);
            }

        }
        if (typeof (value) == 'number') {

            return value;
        }

    },

    /** 
     * */ 
    remove: function remove() {
        //debugger;
        if (this.dom && this.dom.parentNode) {
            try {


                var itemNode = this.dom;
                itemNode.parentNode.removeChild(itemNode);

                var _temp = $(this.dom)[0];
                if (_temp && _temp.parent) {
                    _temp.remove();
                }

            } catch (ex) {
                console.error('移除对象失败：');
                console.error(ex);
            }

        }
        if (Rsd.objects[this.id]) {
            delete Rsd.objects[this.id];
            //Rsd.objects[this.id]=null;
        }

    },

    /** 
     * */ 
    addCls: function addCls(ele, cls) {
        var _ele, _cls;
        if (arguments.length == 1) {
            _ele = 'dom';
            _cls = arguments[0];
        }
        if (arguments.length == 2) {
            _ele = arguments[0];
            _cls = arguments[1];
        }
        var _arr = [];
        if (Rsd.isString(_cls) && _cls.length > 0) {
            _arr = _cls.split(' ');
        }
        if (Rsd.isArray(_cls)) {
            _arr = _cls;
        }
        if (Rsd.isString(_ele)) {
            _ele = this[_ele];
        }

        if (_ele instanceof Element) {
            for (var i in _arr) {
                if (!Rsd.isEmpty(_arr[i])&&!this.containCls(_ele, _arr[i])) {

                    _ele.classList.add(_arr[i]);
                }
            }
        }
        return this;
    },

    /** 
     * */ 
    containCls: function containCls(ele, cls) {

        var _ele, _cls;
        if (arguments.length == 1) {
            _ele = 'dom';
            _cls = arguments[0];
        }
        if (arguments.length == 2) {
            _ele = arguments[0];
            _cls = arguments[1];
        }
        var _b = true;

        if (Rsd.isString(_ele)) {
            _ele = this[_ele];
        }
        if (_ele instanceof Element) {
            try {
                _b = (' ' + _ele.className + ' ').indexOf(' ' + _cls + ' ') > -1;
                //_b = $(_ele).hasClass(_cls);

            } catch (ex) {
                Rsd.error('containCls', 'Rsd.common.ComponentX', ex);
            }
        }

        return _b;
    },

    /**
     * */
    removeCls: function removeCls(ele, cls) {
        var _ele, _cls;
        if (arguments.length == 1) {
            _ele = 'dom';
            _cls = arguments[0];
        }
        if (arguments.length == 2) {
            _ele = arguments[0];
            _cls = arguments[1];
        }
        if (Rsd.isString(_ele)) {
            _ele = this[_ele];
        }
        if (_ele instanceof Element && this.containCls(_ele, _cls)) {


            var reg = new RegExp('(\\s|^)' + _cls + '(\\s|$)');
            _ele.className = _ele.className.replace(reg, ' ');
            _ele.classList.remove(_cls);
        }
        return this;
    },
    
    /**
     * */
    toggleCls: function toggleCls(ele, cls) {
        var _ele, _cls;
        if (arguments.length == 1) {
            _ele = this.dom;
            _cls = arguments[0];
        }
        if (arguments.length == 2) {
            _ele = arguments[0];
            _cls = arguments[1];
        }
        if (this.containCls(_ele, _cls)) {
            this.removeCls(_ele, _cls);
        }
        else {
            this.addCls(_ele, _cls);
        }
        return this;
    },

    /**
     * */
    changeCls: function changeCls(ele, oldcls, newcls) {
        var _ele, _oldcls, _newcls;
        if (arguments.length == 2) {
            _ele = 'dom';
            _oldcls = arguments[0];
            _newcls = arguments[1];
        }
        if (arguments.length == 3) {
            _ele = arguments[0];
            _oldcls = arguments[1];
            _newcls = arguments[2];
        }
        if (this.containCls(_ele, _oldcls)) {

            this.removeCls(_ele, _oldcls);
        }
        if (!this.containCls(_ele, _newcls)) {

            this.addCls(_ele, _newcls);
        }
        return this;
    },

    /**
     * */
    isDisabled: function isDisabled() {
        $(this.dom).attr("disabled") == 'true';
    },

    /**
     * */
    isHidden: function isHidden() {
        $(this.dom).css("display") == 'none';
    },

    /**
     * */
    isRendered: function isRendered() {
        return this.dom != null && this.dom.parentNode != null;
    },

    /**
     * */
    isDestroyed: function isDestroyed() {
        return Rsd.objects[this.id] == undefined || Rsd.objects[this.id] == null;
    },

    /**
     * */
    setDisabled: function setDisabled(disabled) {
        this.disabled = disabled;
        if (disabled) {
            this.dom.style.pointerEvents = 'none';
            this.dom.classList.add('x-container-disabled');
        }
        else {
            this.dom.style.pointerEvents = 'all';
            this.dom.classList.remove('x-container-disabled');
        }
    },

    /**
     @description 必须在show之后引用
     @param {int|string} 'left'
     @param {int|string} 'top',
     @param {int|string} 'bottom'
     @param {int|string} 'right'
     * */
    setPosition: function setPosition(left, top, bottom, right) {

        var position = {};

        if (arguments.length == 1 && Rsd.isObject(arguments[0])) {
            position = arguments[0];
        }
        if (arguments.length == 2) {
            position['top'] = top;
            position['left'] = left;
        }

        if (arguments.length > 2) {
            position['top'] = top;
            position['right'] = right;
            position['bottom'] = bottom;
            position['left'] = left;
        }

        for (var i in position) {
            if (Rsd.isNullOrUndefined(position[i])) {
                continue;
            }
            if (Rsd.isNumber(position[i])) {
                position[i] = position[i] + (this.sizeUnit||'px');
            }
            else {
                position[i] = position[i];
            }
        }

        this.dom.style.top = position.top;
        this.dom.style.right = position.right;
        this.dom.style.bottom = position.bottom;
        this.dom.style.left = position.left;

        return this;
    },

    /**
     * @description 隐藏dom
     * */
    hide: function hide(speed, callback) {

        var _animate = null;
        var _speed = 0;
        var _callback = null;
        var _style=null;
        var _delay=null;
        for(var i =0;i< arguments.length;i++) {

            if(arguments[i]==null || arguments[i]==undefined)
            {
                continue;
            }
            if (Rsd.isFunction(arguments[i])) {
                _callback = arguments[i];
                continue;
            }
            if (Rsd.isObject(arguments[i])) {
                _style = arguments[i];
                continue;
            }
            if (_animate==null && Rsd.isString(arguments[i])) {
                _animate = arguments[i];
                continue;
            }

            if (_speed == 0 && Rsd.isNumber(arguments[i])) {
                _speed = arguments[i];
                continue;
            }
            if (_speed > 0 && Rsd.isNumber(arguments[i])) {
                _delay = arguments[i];
                continue;
            }
        }

        var me = this;

        //this.events.fire(this, 'beforehide', arguments);
        me.__dom_display =  me.dom.style.display||null;
        me.__container_display = me.container.style.display||null;
        var _param = _style||{};

        var _fn = function () {
            me.dom.style.display = 'none';
            me.container.style.display = 'none';

            Rsd.callFunction(me,_callback);
        }
        setTimeout(function () {

            if (Rsd.isEmpty(_param) && _animate) {
                console.error( _animate + '动画参数映射，暂未开发。');
                //_animate 动画参数映射 _param={};
            }

            if (!Rsd.isEmpty(_param) || _speed > 0) {

                me.animate(_param, _speed, _delay || 0,'ease-out', _fn);

            }else
            {
                _fn();
            }

        },0);


        //this.events.fire(this, 'afterhide', arguments);
        return this;
    },

    /**
     *  @public
     *  @description 将控件以动画的形式将对象显示出来
     *  @param {string|Object} animate 动画：fadeIn,slideDown,{top,30,left:100,backgroudColor:'red'}
     *  @param speed 速度
     *  @callback callback
     * */
    show: function show(animate,speed, callback) {

        //console.log('comx-'+this.id);

        var me = this;
        me.timing['showStartTime'] = new Date().getTime();
        var _animate = null;
        var _speed = 0;
        var _callback = null;
        var _style=null;
        var _fun=null;
        var _delay=null;
        for(var i =0;i< arguments.length;i++) {

            if(arguments[i]==null || arguments[i]==undefined)
            {
                continue;
            }
            if (Rsd.isFunction(arguments[i])) {
                _callback = arguments[i];
                continue;
            }
            if (Rsd.isObject(arguments[i])) {
                _style = arguments[i];
                continue;
            }
            if (_animate==null && Rsd.isString(arguments[i])) {
                _animate = arguments[i];
                continue;
            }

            if (_speed == 0 && Rsd.isNumber(arguments[i])) {
                _speed = arguments[i];
                continue;
            }
            if (_speed > 0 && Rsd.isNumber(arguments[i])) {
                _delay = arguments[i];
                continue;
            }
        }

        var me = this;
        //

        me.dom.style.display = me.__dom_display;
        me.container.style.display = me.__container_display;
        //
        var _param = _style||{};

        if (!Rsd.isEmpty(_param) || !Rsd.isEmpty(_animate)) {
            me.dom.style.top='0px';
            me.dom.style.left='0px';
        }


        setTimeout(function () {

            if (Rsd.isEmpty(_param) && _animate) {

                //_animate 动画参数映射 _param={};
                switch (_animate.toLowerCase())
                {
                    case 'fadein':
                        _param={opacity:1};
                        _speed=_speed||150;
                        _fun = 'linear';

                    break;
                    default:
                        console.error( _animate + '动画参数映射，暂未开发。');
                        break;
                }
            }

            if (!Rsd.isEmpty(_param) || _speed > 0) {


                me.animate(_param, _speed, _delay || 0, _fun||'ease-in',_callback);

            }else
            {
                Rsd.callFunction(me,_callback);
            }

        },50);

        return this;
    },

    /**
     * @public
     * @description 切换显示与控件的隐藏状态
     * */
    toggle: function toggle(speed, callback) {
        if(this.isHidden())
        {
            this.show(speed,callback);
        }else
        {
            this.hide(speed,callback);
        }
        return this;
    },
    /**
     *@public
     *@description 初始化PopupBox控件，将要显示的控件，添加到PopupBox中，并设置PopupBox的style。
     *@param {object}  style PopupBox的初始样式
     *@param {string}  boxCls PopupBox的样式名称
     *@param {string}  tipCls PopupBox的tip控件样式名称
     * */
    initPopupBox: function initPopupBox(style,boxCls,tipCls) {

        //var me = this;
        var _box = this.popupBox;

        if (Rsd.isEmpty(_box)) {

            _box = document.createElement('div');

            _box.classList.add(boxCls||'x-rsd-popup-box');
            _box.onclick = function (e) {
                e.isCancel = true;
                return false;
            }
            this.container.appendChild(_box);

            this.popupBox = _box;
        }
        _box.innerHTML = '';

        var _tip = document.createElement('div');
        _tip.classList.add(tipCls||'x-tip');
        _box.appendChild(_tip);

        this.setElStyle(_box,style||{});

        _box.style.display = 'none';

        return this;
    },
    /**
    * @public
    * @description 每个控件都有一个内部的PopupBox,默认显示位置在该控件container内部定位，也可以在显示指定。
    * @description 在显示PopupBox前，需要在控件的onAfterInit方法中通过initPopupBox初始化PopupBox的样式。
    * @description 展示PopupBox，PopupBox的内容设置，通过属性popupBox（ dom 对象）的设置。
     * @param {object} ctrl 展示PopupBox的容器
     * @param {object} style PopupBox的样式对象
    * */
    showPopupBox: function showPopupBox(ctrl, style) {

        var _ctrl = ctrl||this.container;
        var _style = style||{};

        var _box = this.popupBox;
        if (_box) {
            this.setElStyle(_box,_style); 
            if( _box.style.display == 'none')
            {
                _box.style.display = null;
                _box.style.visibility = 'hidden'; 
                setTimeout(function(){
                    _box.style.visibility = 'visible';
                },250);
            } 
          
            var me = this;
            Rsd.events.add(Rsd,'click',this.id,function () {
                me.closePopupBox();
            },true);
        }

        if (_ctrl instanceof Rsd.common.ComponentX && (_ctrl.dom == null
            || _ctrl.dom.parentNode == null
            || _ctrl.dom.parentNode != _box)) {

            _ctrl.renderTo(_box);

            _ctrl.show();
            _ctrl.setPosition(10, 10);
            return this;
        }
        if (_ctrl instanceof HTMLElement) {
            _ctrl.appendChild(_box);
            return this;
        }
        if (_ctrl instanceof Node) {
            _ctrl.appendChild(_box);
            return this;
        }

        return this;
    },
    /**
     * @public
    *  @description 关闭 PopupBox
    * */
    closePopupBox: function closePopupBox() {

        var _box = this.popupBox;
        if (_box) {
            _box.style.display = 'none';
        }
        return this;
    },


    /**
    *@public
     * @description 显示控件正在加载
     * @param {string} msg 提示信息
     * @param {cls} msg Rsd.container.WaitingBox的cls 属性
    * */
    showLoading: function showLoading(msg, cls) {

        var _x = (this.container.clientWidth - 250) / 2;
        var _y = (this.container.clientHeight - 50) / 2;

        if (this.__loadingBox) {
            this.__loadingBox.close();
            this.__loadingBox=null;
        }

        if (this.__loadingBar == undefined || this.__loadingBar == null) {
            this.__loadingBox = Rsd.create('Rsd.container.WaitingBox', {
                //width:'100%',
                //height:'100%',
                message: msg || '正在加载...',
                cls: cls || 'x-loading-box',
                border: false
            });
        }

        this.__loadingBox.showDialog(this.container, _x, '40%');
        return this.__loadingBox;
    },
    /**
    *@public
     * @description 关闭加载框
    * */
    closeLoading: function closeLoading() {
        if (this.__loadingBox) {
            this.__loadingBox.close();
            this.__loadingBox=null;
        }
        return this;
    },
    /**
    *  @public
     * @description 清楚注册的热键
    * */
    clearHotKey: function clearHotKey(key) {
        if (Rsd.isEmpty(this.__hotKey||Rsd.isEmpty(key))) {
            return this;
        }
        if (arguments.length == 0) {
            this.__hotKey = {};
            return;
        }
        delete this.__hotKey[key.toLowerCase()];
        return this;
    },
    /**
    * @public
     * @description 注册热键
    * */
    registerHotKey: function hotKey(key, fn, args) {
        if(Rsd.isEmpty(key))
        {
            return this;
        }
        this.__hotKey = this.__hotKey || {};
        this.__hotKey[key.toLowerCase()] = fn;
        return this;
    },
    /**
    *@public
     * @description 触发热键事件执行
    * */
    exeHotKeyFun: function exeHotKeyFun(key) {

        if (Rsd.isEmpty(this.__hotKey)||Rsd.isEmpty(key)) {
            return this;
        }
        Rsd.callFunction(this, this.__hotKey[key.toLowerCase()]);
        return this;
    },

    /**
     * @public
    * @description 设置transform 属性
     * */
    transform: function transform(value) {

        this.container.style.transform = value;
        return this;
    },

    /**
     @description 设置transition属性,实现动画效果的基本方法
     @param  params:{
        left:'250px',
        opacity:'0.5',
        height:'150px',
        width:'150px'
     }
     @param speed
     @param delay
     @param fun:{linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);}
     @param callback
    * */
    animate: function animate(params, speed,delay,fun, callback) {

        var _style = params||{};
        var _speed = speed||0;
        var _delay = delay||0;
        var _fun = fun||'ease-in';
        var _callback = callback;

        if(arguments.length < 5 )
        {
            for(var i =0;i< arguments.length;i++) {
                if (Rsd.isFunction(arguments[i])) {
                    _callback = arguments[i];
                }
                if (Rsd.isObject(arguments[i])) {
                    _style = arguments[i];
                }
                if (Rsd.isString(arguments[i])) {
                    _fun = arguments[i];
                }
                if (_speed == 0 && Rsd.isNumber(arguments[i])) {
                    _speed = arguments[i];
                }
                if (_speed > 0 && Rsd.isNumber(arguments[i])) {
                    _delay = arguments[i];
                }
            }
        }

        var me = this;
        me.dom.style.transitionDuration= (_speed/1000.00) + "s";
        me.dom.style.transitionProperty="none";
        var _ps = '';
        for(var p in _style) {
            _ps += p + ',';
        }

        if(_ps.length >0)
        {
            _ps = _ps.substring(0, _ps.length - 1);
            me.dom.style.transitionProperty=_ps;
        }
        me.dom.style.transitionTimingFunction= _fun;
        me.dom.style.transitionDelay=(_delay/1000.00) + "s"

        me.setElStyle(me.dom,_style);

        setTimeout(function () {
            Rsd.callFunction(me,_callback);
        },_speed+10);

        return this;
    },

    /**
     * @public
     * @description 获取触屏到滑动信息:{direction:'none',speed:1000,angle:0}
     * */
    getTouched:function getTouched(startx, starty, endx, endy,starttime,endtime) {

        var _angx = endx - startx;
        var _angy = endy - starty;
        var _speed = endtime - starttime;

        var _rs = {direction:'none',speed:(_speed||100)*10,angle:0};

        //如果滑动距离太短
        if (Math.abs(_angx) < 2 && Math.abs(_angy) < 2) {
            return _rs;
        }

        var angle = Math.atan2(_angy, _angx) * 180 / Math.PI;
        _rs.angle = angle;
        if (angle >= -135 && angle <= -45) {
            _rs.direction = 'up';
        } else if (angle > 45 && angle < 135) {
            _rs.direction = 'down';
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            _rs.direction = 'left';
        } else if (angle >= -45 && angle <= 45) {
            _rs.direction = 'right';
        }

        return _rs;
    },

    /*
    *
    * */
    getElComputedStyle: function (el, name) {
        var _pv = document.defaultView.getComputedStyle(el, null);
        return _pv[name]
    },
    /*
     * */
    getElStyleValue: function (el, name) {
        return $(el).css(name);
    },
    /*
     * */
    setElStyleValue: function (el, name, value) {

        var _dom = el;
        if (Rsd.isString(el)) {
            _dom = this.elements[el] ;
        }
        if (_dom instanceof Element) {
            _dom.style.setProperty(name, value, 'important');
        }

        return this;
    },
    /**
    *@description 设置dom 元素style属性值
    * */
    setElStyle:function setElStyle(el,style)
    {
        var _dom = el;
        var _style = style||{};

        if(Rsd.isString(el))
        {
            _dom = this.elements[el];
        }

        Rsd.setElStyle(_dom,_style,this.sizeUnit || 'px');

    },

    /**
     * @param {stirng|Element} el:dom对象
     * */
    setElAttribute: function setElAttribute(el, name, value) {
        if (Rsd.isString(el)) {
            this.elements[el].setAttribute(name, value);
        }
        if (el instanceof Element) {
            el.setAttribute(name, value);
        }

        return this;
    },
    /**
     * @param {stirng|Element} el:dom对象
     *
     */
    getElAttribute: function getElAttribute(el, name) {
        if (Rsd.isString(el)) {
            return this.elements[el].getAttribute(name);
        }
        if (el instanceof Element) {
            return el.getAttribute(name);
        }
        return null;
    },
    /**
     * @description dom节点滚动到可视区
     * */
    scrollIntoView:function scrollIntoView(top)
    {
        var dom =  document.getElementById(this.id);
        if(dom)
        {
            dom.scrollIntoView(top);
        }
    }

},function(type){
    {
        var _elementsGetter = function () {

            if (this.__elements == undefined) {
                this.__elements = {};
            }
            return this.__elements;
        };

        this.defineProperty(type,"elements", _elementsGetter, _domSetter,true);
    }

    {
        var _domGetter = function () {

            if (this.__dom == undefined) {
                this.__dom = null;
            }
            return this.__dom;
        };
        var _domSetter = function (dom) {
            this.__dom = dom;
        }

        this.defineProperty(type,"dom", _domGetter, _domSetter,false);
    }

     {
        var _layouterGetter = function () {
            var _com = this;
            if (_com.__layouter == null) {
                _com.__layouter = Rsd.create('Rsd.common.Layouter', {});
            }
            return  _com.__layouter;
        };
        this.defineProperty(type,"layouter", _layouterGetter, null,false);
    }

     {
        var _styleGetter = function () {
            var _com = this;

            if (_com.__style == null) {
                _com.__style = {};
            }
            return _com.__style;
        };
        var _styleSetter = function (style) {
            var _com = this;
            Rsd.apply(_com.style, style);
            if (this.dom) {
                for (var p in style) {
                    this.setElStyleValue(this.dom, p, style[p]);
                }
            }
        }

        this.defineProperty(type,"style", _styleGetter, _styleSetter,false);
    }

    {
        var _positionGetter = function () {
            if(this.___position == undefined)
            {
                this.___position ={};

            }
            return this.dom?{top:this.dom.top,right:this.dom.right,bottom:this.dom.bottom,left:this.dom.left}:this.___position;
        };

        this.defineProperty(type,"position", _positionGetter, null,true);
    }
    //

    if (!Rsd.common.ComponentX.prototype.hasOwnProperty("events")) {
        var _eventsGetter = function () {
            var _com = this;
            if (_com.__events == null) {
                _com.__events = Rsd.create('Rsd.common.EventList', {parent:this});
            }
            return  _com.__events;
        };

        this.defineProperty(type,"events", _eventsGetter, null,true);

    }

    var _widthGetter = function () {

        return this.__width;
    };

    var _widthSetter = function (value) {
        if (!value) {
            return;
        }
        this.__width = value;

        if(this.dom)
        {
            this.dom.style.width = (this.__width + (Rsd.isString(this.__width)?'' : this.sizeUnit||'px'));
        }
    };
    this.defineProperty(type,"width", _widthGetter, _widthSetter,false);

    var _heightGetter = function () {

        return this.__height;

    };

    var _heightSetter = function (value) {
        if (!value) {
            return;
        }
        this.__height = value;

        if(this.dom) {
            this.dom.style.height = (this.__height + (Rsd.isString(this.__height) ? '' : this.sizeUnit||'px'));
        }

    };
    this.defineProperty(type,"height", _heightGetter, _heightSetter,false);

    //
    var _sizeUnitGetter = function () {
        if(Rsd.isEmpty(this.__sizeUnit) && this.parent && this.parent instanceof  Rsd.common.ComponentX)
        {
            this.__sizeUnit = this.parent.sizeUnit;
        }
        return this.__sizeUnit||'px';

    };

    var _sizeUnitSetter = function (value) {
        this.__sizeUnit = value;
    };
    this.defineProperty(type,"sizeUnit", _sizeUnitGetter, _sizeUnitSetter,false);

    var _visibleGetter = function () {

        return  Rsd.isNullOrUndefined(this.__visible) || this.__visible;
    };

    var _visibleSetter = function (value) {
        this.__visible = value;
        if(this.dom) {
            this.dom.style.visibility = value ? 'visible' : 'hidden';
        }
    };
    this.defineProperty(type,"visible", _visibleGetter, _visibleSetter,false);

    var _popupBoxGetter = function () {

        return  this.___popupBox;
    };

    var _popupBoxSetter = function (value) {
        this.___popupBox = value;

    };
    this.defineProperty(type,"popupBox", _popupBoxGetter, _popupBoxSetter,false);

});


