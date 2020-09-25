/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:26
 * To change this template use File | Settings | File Templates.
 */
/*
 define class Rsd.container.Component
 * */
Rsd.define('Rsd.container.Component', {
    extend: 'Rsd.common.ComponentX',
    requires: ['Rsd.common.Layouter'],
    xtype: 'container',

    /*
    * vbox:一列多行布局
    * hbox:一行多列布局
    *
    * {type: 'auto',align:'left'}
    * */
    //layout: null,
    /*
    * {
    *    xtype:null,
    *    position: 'top',
    *    align: 'center',
    *    space: 10,
    *    cls: null,
    *    style:{},
    *    visible:null,
    *    element: null
    * }
    * */
    // header: {},
    /*
    * 等于header.content
    * */
    //title: '',
    /*
    *
    * */
    body: null,
    /*
    * {
    * 背景样式
    * style:{}
    * 背景是否使用动画
    * animate:false
    * value:true
    * }
    * */
    //是否显示模态框 和 样式
    //modular:{value:false,style:null},
    //
    headerTagName:'div',
    bodyTagName:'div',
    bodyCls: '',
    //items: [],
    //event:功能等于this.on('beforeshow',function(){}),支持IOC
    beforeShow:null,
    //event:功能等于this.on('aftershow',function(){}),支持IOC
    afterShow:null,
    //event:功能等于this.on('beforeclose',function(){}),支持IOC
    beforeClose:null,
    //event:功能等于this.on('afterclose',function(){}),支持IOC
    afterClose:null,
    /*
     * @param {object} config
     */
    constructor: function Component(config) {

        config = config || {};
        this.apply(config);
    },
    /*
     * */
    initComponentEx: function initComponentEx() {

        //debugger;
        this.header.element = document.createElement(this.headerTagName);
        this.body = document.createElement(this.bodyTagName);

        this.body.id = this.id + '_body';
        this.header.element.id = this.id + '_header';
        this.header.element.style.fontSize = '120%';

        this.elements['header'] =this.header.element;
        this.elements['body'] =  this.body;

        if(!Rsd.isEmpty(this.header.xtype))
        {
            this.header.content = Rsd.widget(this.header.xtype,this.header.config||this.header);
            this.header.content.parent = this;
        }

        if(Rsd.isEmpty(this.header.content) && this.header.text)
        {
            this.header.content = this.header.text;
        }

        if (Rsd.isString(this.header.content)) {
            this.header.element.innerHTML = this.header.content;
        }

        if (this.tip != undefined && this.tip != null) {

            this.body.title = this.tip;
        }

        if (this.tabIndex != null) {
            this.body.tabIndex = this.tabIndex;
        }
        this.body.style.textAlign = this.layout.align;
        if(this.overflow)
        {
            this.body.style.overflow = this.overflow;
        }
        var me = this;
        if(this.draggable)
        {
            this.header.element.onmouseover=function(e)
            {
                me.dom.setAttribute('draggable',true);
            }
    
            this.body.onmouseover=function(e){
                
                me.dom.setAttribute('draggable',false);
            }
        }
        
    },

    /*
    * */
     onAfterInit:function onAfterInit()
     {
         var me = this;
         this.callParent();
         /*
          * */
         var items =  me.items;
         if (Rsd.isArray(items) && items.length > 0) {
             var item;
             for (var i = 0; i <  items.length;i++) {
                 item = items[i];

                 if (!Rsd.isCreated(item)) {
                     var _xtype = item.xtype || Rsd.defaultType || 'container';
                     if (me.dependencies[_xtype]) {
                         items[i] = Rsd.create(me.dependencies[_xtype],item);
                     } else {
                         items[i] = Rsd.widget(_xtype, item);
                     }

                     items[i].parent = me;
                 }

             }
         }
         if(this.beforeShow)
         {
             this.on('beforeshow',this.beforeShow);
         }
         if(this.afterShow)
         {
             this.on('aftershow',this.afterShow);
         }

         if(this.beforeClose)
         {
             this.on('beforeclose',this.beforeClose);
         }
         if(this.afterClose)
         {
             this.on('afterclose',this.afterClose);
         }
     },
    /**
     *
     * @description 执行控件布局，需主动调用。
     * */
    doLayout: function doLayout() {
        //布局自己
        this.callParent();

        var me = this;
        //布局子对象
        setTimeout(function () {
            me.layouter.layoutItems(me);
            for (var i = 0; i < me.items.length; i++) {

                if (me.items[i] instanceof Rsd.common.ComponentX) {
                    me.items[i].doLayout();
                }
            }

        },50);
        return this;
    },
    /**
     *@description 自身render自后，render子对象
     * */
    onAfterRender: function onAfterRender() {

        this.container.appendChild(this.header.element);
        this.container.appendChild(this.body);


        if (this.border) {
            this.addCls('container','x-container-border');
        }

        this.addCls('body','x-body');
        this.addCls('container',this.cls);
        this.addCls('body',this.bodyCls);

        this.header.element.classList.add('x-header');

        if (Rsd.isEmpty(this.header.xtype) && this.header.cls) {
            this.header.element.classList.add(this.header.cls);
        }
        if(this.header.content instanceof  Rsd.common.ComponentX)
        {
            this.header.content.renderTo(this.header.element);
        }


        this.header.element.style.display = (this.header.visible==false ?  'none' :'inline-block' );

        this.callParent();

        var me = this;
        var _item;
        for (var i = 0;i < me.items.length;i++) {
            _item = me.items[i];
            if(! _item instanceof  Rsd.common.ComponentX)
            {
                console.error( me);
                console.error( _item);
                throw new Error('items['+i+'] is not instanceof Rsd.common.ComponentX in object [' + me.id + '].(Maybe using error xtype.)');
            }
            if (_item.isRendered()) {
                continue;
            }
            _item.renderTo.call(_item,me);


        }
    },

    /*
     *
     * */
    add: function add(child) {

        var me = this;
        var _c = child;
        if (!_c.render || typeof (_c.render) != 'function') {
            _c = Rsd.widget(_c.xtype, _c);
        }
        _c.parent = me;

        me.items.push(_c);
        if (me.isRendered()) {
            _c.renderTo.call(_c,me);
            me.doLayout();
        }

        return _c;
    },
    /**
     * @description 删除items数组中指定对象
     * */
    removeItem:function removeItem(item) {

        var index = -1;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] == item) {
                index = i;
                break;
            }
        }

        if (index > -1) {
            this.items.splice(index, 1);
        }
    },
    /*
     * 移除所有dom对象
     * */
    removeAll:function removeAll() {

        var me = this;
        var _c;
        for (var i = 0 ;i< me.items.length;i++) {
            _c = me.items[i];

            if(_c && _c.removeAll)
            {
                _c.removeAll();
            }
            if(_c && _c.remove)
            {
                _c.remove();
            }
            delete Rsd.objects[_c.id];
        }

        while(me.items.length>0)
        {
            me.items.splice(0, 1);
        }
        if(this.body)
        {
            $(this.body).empty();
        }

    },
    /**
     * */
    onBeforeShow:function onBeforeShow()
    {
        this.events.fire(this, 'beforeshow', arguments);
    },

    /**
    *  @param parent 要展示的窗体 所在父窗体
    *  @param 位置：x
    *  @param 位置：y
    *  @param animate 动画：fadeIn，slideDown
    *  @param speed 打开速度
    * */
    showDialog:function showDialog(parent, x, y,animate,speed) {

        if (this.floating == false && this.fixed == false)
        {
            throw new Error("Property 'floating' or  'fixed' must value  is true.");
        }
        if(this.modular.value == false)
        {
            throw new Error("Property 'modular' is not true.");
        }
        // debugger;
        var _p =null, _x=null, _y=null,_animate=null,_speed=null;


        if (arguments.length == 1) {
            if(arguments[0] instanceof  Rsd.common.ComponentX || arguments[0] instanceof HTMLElement)
            {
                _p = arguments[0];
            }
        }
        if (arguments.length == 2) {
            _x = arguments[0];
            _y = arguments[1];
        }
        if (arguments.length == 3) {
            if(arguments[0] instanceof  Rsd.common.ComponentX || arguments[0] instanceof HTMLElement)
            {
                _p = arguments[0];
            }
            _x = arguments[1];
            _y = arguments[2];

        }
        if (arguments.length == 4) {
            if(arguments[0] instanceof  Rsd.common.ComponentX || arguments[0] instanceof HTMLElement)
            {
                _p = arguments[0];
            }
            _x = arguments[1];
            _y = arguments[2];

            if(Rsd.isString(arguments[3]))
            {
                _animate = arguments[3];
            }
        }
        if (arguments.length == 5) {
            if(arguments[0] instanceof  Rsd.common.ComponentX || arguments[0] instanceof HTMLElement)
            {
                _p = arguments[0];
            }
            _x = arguments[1];
            _y = arguments[2];
            if(Rsd.isString(arguments[3]))
            {
                _animate = arguments[3];
            }
            _speed = arguments[4];

        }
        _p = _p || document.body;

        if (this.isRendered() == false) {

            this.renderTo(_p);
        }

        var _p_dom = _p;
        if(_p instanceof Rsd.container.Component)
        {
            _p_dom = _p.dom;
        }


        //以模式框 形式展示
        {
            var _parent = _p_dom ;
            var _id = "__modular_bg__" + ((_parent&&_parent.id) || 'body');
            var _m_bg = document.getElementById(_id)

            if(Rsd.isEmpty(_m_bg)) {

                _m_bg = document.createElement("div");
                _m_bg.setAttribute("id", _id);
                _m_bg.style.background = "#000";
                _m_bg.style.width = "100%";
                _m_bg.style.height = "100%";
                _m_bg.style.position = "absolute";
                _m_bg.style.top = "0";
                _m_bg.style.left = "0";

                _m_bg.style.opacity = "0.3";
                _m_bg.style.filter = "Alpha(opacity=30)";

                _m_bg.opacity = Number(_m_bg.style.opacity);

                if(this.modular.animate)
                {

                    var _o =  Number(_m_bg.style.opacity);
                    var _i = 1;
                    var _j = 1;
                    var _k = setInterval(function () {

                        _m_bg.style.opacity = _o + 0.01 * _j;
                        _i++;
                        _i = _i % 200;
                        if(_i>100)
                        {
                            _j = 200 - _i;
                        }else
                        {
                            _j =  _i;
                        }
                        if(_i==0)
                        {
                            clearInterval(_k);
                        }

                    },10);

                }
                _m_bg.intervalKey = _k;
            }
            else
            {
                clearInterval( _m_bg.intervalKey);
                _m_bg.style.opacity =  _m_bg.opacity;
            }
            var _style = this.modular.style || {};

            if (_m_bg.style.setProperty) {

                for (var p in _style) {
                    if (/^[0-9a-z]*$/.test(p)) {
                        _m_bg.style.setProperty(p, _style[p], 'important');
                    } else {
                        var _l = p.match(/[A-Z]/g);
                        var _new_p = p;
                        for (var i in _l) {
                            _new_p = _new_p.replaceAll(_l[i], '-' + _l[i].toLowerCase());
                        }
                        _m_bg.style.setProperty(_new_p, _style[p], 'important');
                    }
                }
            } else {

                Rsd.apply(_m_bg.style, _style);
            }
            _m_bg.count = _m_bg.count || 0;
            _m_bg.count++;

            this.on('beforeshow', function () {
                //debugger
                _m_bg.style.zIndex = Rsd.getZIndex(_m_bg.count);
                _parent.appendChild(_m_bg);
                _parent.style.overflow = "hidden";
            });

            this.on('afterclose', function () {
                //debugger

                if (_m_bg) {
                    _m_bg.count--;
                    if (_m_bg.count > 0) {
                        _m_bg.style.zIndex = Rsd.getZIndex(_m_bg.count);
                        return;
                    }
                    else
                    {
                        try {

                            _parent.removeChild(_m_bg);

                        } catch (error) {

                        }
                    }
                }
            });

            this.show(_animate, _speed);
        }

        //set position
        {
            var me = this;

            if (_x == null) {

                var _w = _p_dom.clientWidth > window.screen.availWidth ? window.screen.availWidth : _p_dom.clientWidth;
                _x = (_w - me.width) / 2;
            }
            if (_y == null) {
                var _h = _p_dom.clientHeight > window.screen.availHeight ? window.screen.availHeight : _p_dom.clientHeight;
                _y = ((_h - me.height) * 3) / 10;
            }

            if (_x < 0) {
                _x = 0;
            }
            if (_y < 0) {
                _y = 0;
            }

            me.setPosition(_x, _y);
        }

        this.dom.style.zIndex = Rsd.getZIndex(_m_bg.count+1);
        this.dom.style.opacity=0;

        this.show(0,function () {
            this.animate({opacity:1},80,function () {});
        });

        return this;
    },

    /**
     *  @public
     *  @description 以 TipBox（有尖头指向）样式显示
     *  @description 将控件以动画的形式将对象显示出来
     *  @param {string|Object} animate 动画：fadeIn,slideDown,{top,30,left:100,backgroudColor:'red'}
     *  @param speed 速度
     *  @callback callback
     * */
    showTip:function showTip(parent,animate,speed,callback) {


        var _parent =null;
        var _animate = null;
        var _speed = null;
        var _style = null;
        var _callback = null;
        for(var i =0;i <  arguments.length;i++)
        {
            if(arguments[i] instanceof  Rsd.common.ComponentX || arguments[i] instanceof  HTMLElement|| arguments[i] instanceof Node  )
            {
                _parent = arguments[i];
                continue;
            }
            if(Rsd.isString(arguments[i]))
            {
                _animate = arguments[i];
                continue;
            }
            if(Rsd.isObject(arguments[i]))
            {
                _style = arguments[i];
                continue;
            }

            if(Rsd.isNumber(arguments[i]) && _speed ==null)
            {
                _speed = arguments[i];
                continue;
            }
            if(Rsd.isFunction(arguments[i]))
            {
                _callback = arguments[i];
                continue;
            }

        }


        var _parent = _parent || this.parent||null;
        var _box = this.container;

        this.dom.classList.add('x-rsd-tip');
        _box.classList.add('x-box');

        var _p = _parent;
        if(Rsd.isEmpty(_parent))
        {
            _p = _parent = document.body;
        }
        if(_parent instanceof  Rsd.common.ComponentX)
        {
            _p = _parent = _parent.dom;
        }

        var _tip =  this.header.element;
        this.header.visible = true;

        _tip.classList.add('x-tip-'+this.header.position);


        this.renderTo(_p);


        this.show(_style || _animate,_speed,function () {

            Rsd.callFunction(this,_callback);

        });


        return this;
    },

    /**
     *  @public
     *  @description 将控件以动画的形式将对象显示出来
     *  @param {string|Object} animate 动画：fadeIn,slideDown,{top,30,left:100,backgroudColor:'red'}
     *  @param speed 速度
     *  @callback speed 速度
     * */
    show:function show(animate,speed,callback) {

        this.markTime('showStartTime');

        this.onBeforeShow();

        if (this.isRendered() == false) {

            this.renderTo(this.parent||document.body);
        }

        this.dom.focus();

        this.callParentFn('show',arguments);

        var me = this;

        setTimeout(function () {
            me.doLayout();
        },100);

        this.onAfterShow();

        return this;
    },

    /**
    * */
    onAfterShow:function  onAfterShow()
    {
        this.events.fire(this, 'aftershow', arguments);
    },

    /**
     *
     * */
    close: function close(animate,speed,style, callback) {

        this.events.fire(this, 'beforeclose', arguments);

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
        var _fn = function () {
            me.removeAll();
            me.remove();

            Rsd.callFunction(me,_callback);
        }

        var _param = _style||{};

        setTimeout(function () {

            if (Rsd.isEmpty(_param) && _animate) {
                if (Rsd.isEmpty(_param) && _animate) {

                    //_animate 动画参数映射 _param={};
                    switch (_animate.toLowerCase())
                    {
                        case 'fadeout':
                            _param={opacity:0};
                            _speed=_speed||150;

                            break;
                        default:
                            console.error( _animate + '动画参数映射，暂未开发。');
                            break;
                    }
                }
            }

            if (!Rsd.isEmpty(_param) || _speed > 0) {
                //params, speed,delay,fun, callback
                me.animate(_param, _speed, _delay || 0,'ease-out', _fn);

            }else
            {
                _fn();
            }

        },0);


        this.events.fire(this, 'afterclose', arguments);
    },

    /**
     * */
    getItemByXtype: function getItemByXtype(xtype) {

        function iterate(parent) {
            var _item = null;
            if (parent.items) {
                for (var i = 0; i < parent.items.length;i++) {
                    if (parent.items[i].xtype == xtype) {
                        _item = parent.items[i];
                        break;
                    }
                    _item = iterate(parent.items[i]);
                    if (_item != null) {
                        break;
                    }
                }
            }
            return _item;
        }

        return iterate(this);
    },

    /**
     * 根据ID获取
     * */
    getItemById: function getItemById(id) {
       
        if(Rsd.isEmpty(id))
        {
            return null;
        }
        function iterate(parent) {
            var _item = null; 
            if (Rsd.isArray(parent.items)) {
                for (var i = 0;i < parent.items.length;i++) { 
                    if (parent.items[i].id && parent.items[i].id == id) {
                        _item = parent.items[i];
                        break;
                    }
                    _item = iterate(parent.items[i]);
                    if (_item != null) {
                        break;
                    }
                }
            }
            return _item;
        }

        return iterate(this);
    },

    /**
    * 根据Name获取
    * */
    getItemByName: function getItemByName(name) {

        if(Rsd.isEmpty(name))
        {
            return null;
        }
        function _fn(parent) {
            //debugger;
            var _item = null;
            if (Rsd.isArray(parent.items)) {


                for (var i = 0;i < parent.items.length;i++) {

                    if (parent.items[i].name && parent.items[i].name == name) {
                        _item = parent.items[i];
                        break;
                    }

                    _item = _fn(parent.items[i]);
                    if (_item != null) {
                        break;
                    }
                }
            }
            return _item;
        }

        return _fn(this);
    },

    /**
     * */
    setHeaderVisible: function setHeaderVisible(flag) {
        this.header.visible = flag;
        if( this.header.element)
        {
            this.header.element.style.display =  (this.header.visible==false ? 'none':'inline-block');
        }
    }


},function(type){
    {
        var _itemsGetter = function () {
            //debugger;

            var __name =  '__items';

            //console.log(this.$className);
            //console.log(this.hasOwnProperty(__name));

            if (!this.hasOwnProperty(__name)) {

                this[__name] = [];

                var  _tmp = this;

                while (_tmp.$className != 'Rsd.container.Component'
                && !_tmp.__proto__.hasOwnProperty(__name))
                {
                    _tmp =  _tmp.__proto__;
                }
                if(_tmp.__proto__.hasOwnProperty(__name))
                {
                    if(Rsd.isArray(_tmp.__proto__[__name]))
                    {
                        for(var i in _tmp.__proto__[__name])
                        {
                            this[__name].push(Rsd.clone(_tmp.__proto__[__name][i]));
                        }
                    }
                    else
                    {
                        Rsd.error(_tmp.__proto__.$className + ' items is not array.');
                    }

                }


            }

            return this[__name];
        };
        var _itemsSetter = function (items) {
            if(!Rsd.isArray(items))
            {
                throw new Error('items is not array.');
            }
            for(var i = 0; i < items.length;i++)
            {
                if(!Rsd.isObject(items[i]))
                {
                      throw new Error('items['+i+'] is not a object.');
                }
                this.items[i] = items[i];
            }

        }

        this.defineProperty(type,"items", _itemsGetter, _itemsSetter,true);

        var _headerGetter = function () {

            if (this.hasOwnProperty('__header') == false) {

                this.__header = Rsd.apply({
                    content: '',
                    xtype:null,
                    position: 'top',
                    align: 'center',
                    space: 10,
                    cls: null,
                    visible:null,
                    element: null},this.__proto__['__header']||{});


            }
            if(this.__header.visible == null)
            {
                this.__header.visible = (Rsd.isString(this.__header.content) && this.__header.content.length > 0);
                this.__header.visible = this.__header.visible || (this.__header.content instanceof Rsd.common.ComponentX);
                this.__header.visible = this.__header.visible || (this.__header.xtype && this.__header.xtype.length > 0);
            }

            return this.__header;
        };
        var _headerSetter = function (header) {
            if (this.hasOwnProperty('__header') == false) {
                this.__header = Rsd.apply({
                    content: '',
                    xtype:null,
                    position: 'top',
                    align: 'center',
                    space: 10,
                    cls: null,
                    visible:null,
                    element: null},this.__proto__['__header']||{});
            }
            if(Rsd.isObject(header))
            {
                Rsd.apply(this.__header,header);
            }
            if(Rsd.isString(header))
            {
                this.__header.content = header;
            }

        };

        this.defineProperty(type,"header", _headerGetter, _headerSetter,true);


        var _dataGetter = function () {

            if (!this.hasOwnProperty('__data')) {
                this.__data = {};
            }
            return this.__data;
        };
        var _dataSetter = function (value) {

            this.__data = value;
            return;

        };
        this.defineProperty(type,"data", _dataGetter, _dataSetter,true);

        var _modularGetter = function () {

            if (Rsd.isNullOrUndefined( this.__modular)) {
                this.__modular = {value:false,animate:false,style:null};
            }
            return this.__modular;
        };
        var _modularSetter = function (value) {

            if (Rsd.isNullOrUndefined( this.__modular)) {
                this.__modular = {value:false,animate:false,style:null};
            }
            if(Rsd.isBoolean(value))
            {
                this.__modular.value = value;
            }
            if(Rsd.isObject(value))
            {
                Rsd.apply(this.__modular , value);
            }

            return ;

        };
        this.defineProperty(type,"modular", _modularGetter, _modularSetter,true);

        var _layoutGetter = function () {

            if (Rsd.isNullOrUndefined(this.__layout)) {
                this.__layout = {type: 'auto',align:'left'};
            }
            return this.__layout;
        };
        var _layoutSetter = function (value) {

            if(Rsd.isString(value))
            {
                this.layout.type = value;
            }
            if(Rsd.isObject(value))
            {
                Rsd.apply(this.layout , value);
            }

            return;

        };

        this.defineProperty(type,"layout", _layoutGetter, _layoutSetter,true);

        var _titleGetter = function () {

            return this.header.content;
        };
        var _titleSetter = function (value) {

            if(Rsd.isEmpty(this.header.content) || Rsd.isString(this.header.content))
            {
                this.header.content = value;
            }

            if(this.header && this.header.content instanceof  Rsd.common.ComponentX)
            {
                this.header.content.setValue(value);
                return;
            }
            if(this.header && this.header.content instanceof  Element)
            {
                this.header.content.innerHTML = value;
                return;
            }
            if(this.header && this.header.element)
            {
                this.header.element.innerHTML = value;
                return;
            }

            return;

        };
        this.defineProperty(type,"title", _titleGetter, _titleSetter,true);

    }
});
