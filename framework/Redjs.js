/**
 * @namespace Rsd
 * @copyright redmicro all Copyright (c)
 * @author Created by seeker910 on 14-3-18.
 */

/**
 *
 * @constructor Redjs
 * @param config
 * */
function Redjs(config) {


    Rsd.apply(this, config || {});

    /**
     * @public
     * @description 验证浏览是否兼容redjs框架
     * @function
     * @memberof Redjs
     */
    this.validateBrowser = function validateBrowser() {
        return typeof Element !== "undefined";
    };

    /**
     * @public
     * @description 兼容处理，定义EventListener对象
     * @function
     * @memberof Redjs
     * */
    this.defineEventListener = function defineEventListener() {
        //"use strict";
        if (this.validateBrowser() == false) {
            return
        }


        (function () {
            var _add = 'addEventListener';

            if (Element.prototype.hasOwnProperty(_add)) {
                return;
            }

            Element.prototype[_add] == function (name, fn, useCapture) {

                if (this.addEventListener) {
                    this.addEventListener(name, fn, useCapture);

                } else if (this.attachEvent) {
                    this.attachEvent('on' + name, fn)
                }
                else {
                    this['on' + name] = fn;
                }
            };
        })();
        (function () {
            var _remove = 'removeEventListener';
            if (Element.prototype.hasOwnProperty(_remove)) {
                return;
            }
            Element.prototype[_remove] == function (name, fn, useCapture) {
                if (this.removeEventListener) {
                    this.removeEventListener(name, fn, useCapture);

                } else if (this.detachEvent) {
                    this.detachEvent('on' + name, fn)
                }
                else {
                    delete this['on' + name];
                }
            };
        })();

    };

    /**
     * @public
     * @description 兼容处理，定义ClassList对象
     * @function
     * @memberof Redjs
     * */
    "use strict";
    this.defineClassList = function defineClassList(type) {
        //"use strict";
        if (this.validateBrowser() == false) {
            return
        }
        var classListPropertyName = "classList";
        if (type.prototype.hasOwnProperty(classListPropertyName)) {
            return;
        }
        var trim = /^\s+|\s+$/g;
        var setClasses = function (elem, classes) {
            elem.className = classes.join(" ");
        };

        var checkAndGetIndex = function (classes, token) {
            if (token === "") {
                throw "SYNTAX_ERR";
            }
            if (/\s/.test(token)) {
                throw "INVALID_CHARACTER_ERR";
            }

            return classes.indexOf(token);
        };

        var classListGetter = function () {

            var elem = this;
            var classes;
            if (typeof(elem.className) == '[object String]') {
                classes = elem.className.replace(trim, "").split(/\s+/);
            } else {
                classes = [];
            }


            return {
                length: classes.length,
                item: function (i) {
                    return classes[i] || null;
                },
                contains: function (token) {
                    return checkAndGetIndex(classes, token) !== -1;
                },
                add: function (token) {
                    if (checkAndGetIndex(classes, token) === -1) {
                        classes.push(token);
                        this.length = classes.length;
                        setClasses(elem, classes);
                    }
                },
                remove: function (token) {
                    var index = checkAndGetIndex(classes, token);
                    if (index !== -1) {
                        classes.splice(index, 1);
                        this.length = classes.length;
                        setClasses(elem, classes);
                    }
                },
                toggle: function (token) {
                    if (checkAndGetIndex(classes, token) === -1) {
                        this.add(token);
                    } else {
                        this.remove(token);
                    }
                },
                toString: function () {
                    return elem.className;
                }
            };
        };

        if (Object.defineProperty) {
            Object.defineProperty(type.prototype, classListPropertyName, {get: classListGetter, enumerable: true});
        } else if (Object.prototype.__defineGetter__) {
            type.prototype.__defineGetter__(classListPropertyName, classListGetter);
        }

    };

    /**
     *
     *窗体自适应
     * */
    this.defineRem = function defineRem(maxWidth) {
        var doc = document;

        var _maxWidth = maxWidth || 640;
        var docEl = doc.documentElement;
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;

        if(this.isMobile())
        {
            this.___rem = 14;
            if (clientWidth < _maxWidth) {
                this.___rem = 14 * (clientWidth / _maxWidth);
            }
        }else
        {
            this.___rem = 12;
        }

        docEl.style.fontSize = this.___rem + 'px';
    };
    /*
    * */
    this.getRem = function getRem() {

        if(this.isEmpty(this.___rem))
        {
            var docEl = doc.documentElement;
            this.___rem = parseFloat(docEl.style.fontSize);
        }
        return this.___rem;
    };

    /**
     * @public
     * @description 兼容处理，定义全屏功能
     * @function
     * @memberof Redjs
     * */
    "use strict";
    this.defineFullScreen = function defineFullScreen() {
        /*
         Native FullScreen JavaScript API
         Assumes Mozilla naming conventions instead of W3C for now
         */
        var fullScreenApi = {
            supportsFullScreen: false,
            isFullScreen: function () {
                return false;
            },
            requestFullScreen: function () {
            },
            cancelFullScreen: function () {
            },
            fullScreenEventName: '',
            prefix: ''
        };
        var browserPrefixes = 'webkit moz o ms khtml'.split(' ');

        // check for native support
        if (typeof document.cancelFullScreen != 'undefined') {
            fullScreenApi.supportsFullScreen = true;
        }
        else {
            // check for fullscreen support by vendor prefix
            for (var i = 0, il = browserPrefixes.length; i < il; i++) {
                fullScreenApi.prefix = browserPrefixes[i];

                if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined') {
                    fullScreenApi.supportsFullScreen = true;

                    break;
                }
            }
        }

        // update methods to do something useful
        if (fullScreenApi.supportsFullScreen) {
            fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';

            fullScreenApi.isFullScreen = function () {
                switch (this.prefix) {
                    case '':
                        return document.fullScreen;
                    case 'webkit':
                        return document.webkitIsFullScreen;
                    default:
                        return document[this.prefix + 'FullScreen'];
                }
            }
            fullScreenApi.requestFullScreen = function (el) {
                return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
            }
            fullScreenApi.cancelFullScreen = function (el) {
                return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
            }
        }

        // jQuery plugin
        if (typeof jQuery != 'undefined') {
            jQuery.fn.requestFullScreen = function () {

                return this.each(function () {
                    var el = jQuery(this);
                    if (fullScreenApi.supportsFullScreen) {
                        fullScreenApi.requestFullScreen(el);
                    }
                });
            };
        }

        // export api
        this.apply(window, fullScreenApi);

        fullScreen = function () {
            if (window.supportsFullScreen == false) {
                alert('SORRY: Your browser does not support FullScreen');
                return;
            }

            if (window.isFullScreen()) {
                window.cancelFullScreen(document.body);
            }
            else {
                window.requestFullScreen(document.body);
            }
            return window.isFullScreen();
        }

    };

    /**
     * @public
     * @description重写 window.console 对象
     * @function
     * @memberof Redjs
     * */
    this.defineConsole = function defineConsole() {
        if (!window.console) {
            var console = {};
            console.info = function (message) {
                //alert(message);
            };
            console.log = function (message) {
                alert(message);
            };
            console.warn = function (message) {
                alert(message);
            };
            console.error = function (message) {
                alert(message);
            };
            window.console = console;
        }
    };

    /**
     * @public
     * @description 创建一个前端程序
     * @function
     * @memberof Redjs
     * */
    "use strict";
    this.createApplication = function createApplication(config) {

        var me = Rsd || this;
        if (me.isEmpty(config)) {
            console.error("配置不得为空")
            return;
        }
        me.isDebug = config.isDebug ? true : false;
        me.isDemo = config.isDemo ? true : false;

        config.launch = config.launch || function () {
            alert('config launch funtion is null.')
        };
        config.appName = config.appName || 'unamed_application';
        config.appFolder = config.appFolder || './src';
        config.getUserUrl = config.getUserUrl || 'authority/user';
        config.indexUrl = config.indexUrl || 'login.html';
        config.appEdition = config.appEdition || 'beta';
        config.appVersion = config.appVersion || '3.0';
        config.logoUrl = config.version || 'resources/images/sys/logo.jpg';
        config.requires = config.requires || [];

        /*
         * */
        me.onReady(function onReady() {

            me.app = me.create('Rsd.common.Application', config);
            me.app.startTime = new Date().getTime();
            if (me.isFunction(me.app.beforeRun)) {
                me.app.beforeRun.call(me.app);
            }
            me.app.run();
        });


        if (me.isMobile()) {
            window.onerror = function (error) {
                alert(error);
            }
        }

    };

    /*
    *
    * */
    this.clearHotKey = function clearHotKey(key) {
        if (this.isEmpty(this.__hotKey)) {
            return;
        }
        if (arguments.length == 0) {
            this.__hotKey = {};
            return;
        }
        delete this.__hotKey[key.toLowerCase()];
    };
    /**
     *@desc 注册全局热键
     * */
    this.registerHotKey = function hotKey(key, fn, caller, args) {
        this.__hotKey = this.__hotKey || {};
        this.__hotKey[key.toLowerCase()] = {fn: fn, caller: caller, args: args};
    };
    /*
    *
    * */
    this.exeHotKeyFun = function exeHotKeyFun(key) {
        if (this.isEmpty(key)) {
            return;
        }
        if (this.isEmpty(this.__hotKey)) {
            return;
        }
        var _hotKey = this.__hotKey[key.toLowerCase()];
        if (_hotKey) {
            this.callFunction(_hotKey.caller || this, _hotKey.fn, _hotKey.args);
        }

    };
    /**
     * @public
     * @description 注册事件，在 document onload 事件执行结束
     * @function
     * @memberof Redjs
     * */
    "use strict";
    this.onReady = function onReady(callback) {

        var me = Rsd || this;

        var _fn = function (){

            if (me.isFunction(callback)) {

                callback.call();
            }

            window.Rsd.events.fire(null,'ready',arguments);
        }
        if(me.isReady())
        {
            _fn();
        }
        else
        {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", _fn, false);
            }
        }


    };
    /*
    *
    * */
    this.isReady = function isReady( ) {
        return this.__readyTime > 0;
    }
    /**
     * @public
     * @description 注册 document Resize事件
     * @function
     * @memberof Redjs
     * */
    "use strict";
    this.onResize = function onResize(obj, callback) {
        if(this.isWeChatApp())
        {
            return;
        }
        var me = Rsd || this;
        var events = me.events;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        events.add(obj, resizeEvt, callback);
    };

    /*
    * */
    this.unResize = function unResize(callback) {
        if(this.isWeChatApp())
        {
            return;
        }
        var me = Rsd || this;
        var _fn = callback;
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        var events = me.events;
        events.remove(resizeEvt, _fn);
    };

    /**
     *  @public
     * @description Fires on the source object continuously during a drag operation.
     * @function
     * @param dom 可拖动区域的dom对象
     * @param callback 控件拖动结束后回调方法
     * @memberof Redjs
     * */
    "use strict";
    this.onDrag = function onDrag(dom, callback) {
        if(this.isWeChatApp())
        {
            return;
        }
        var _dom = dom || document;
        _dom.ondrag = function (event) {
            event.preventDefault();
            if (Rsd.isFunction(callback)) {
                callback(event);
            }
        }
    };

    /*
    *
    * */
    "use strict";
    this.onDrop = function onDrop(dom, callback) {
        if(this.isWeChatApp())
        {
            return;
        }
        var _dom = dom || document;
        _dom.ondrop = function (event) {
            event.preventDefault();
            if (Rsd.isFunction(callback)) {
                callback(event);
            }
        }

    };

    /*
    * 使用 onDrop 前必须注册onDragOver
    * Fires on the target element continuously while the user drags the object over a valid drop target.
    * */
    "use strict";
    this.onDragOver = function onDragOver(dom, callback) {
        if(this.isWeChatApp())
        {
            return;
        }
        var _dom = dom || document;
        _dom.ondragover = function (event) {
            event.preventDefault();
            if (Rsd.isFunction(callback)) {
                callback(event);
            }
        }
    };
    /*
    *
    *  Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
    * */
    "use strict";
    this.onDragLeave = function onDragLeave(dom, callback) {
        if(this.isWeChatApp())
        {
            return;
        }
        var _dom = dom || document;
        _dom.ondragleave = function (event) {
            event.preventDefault();
            if (Rsd.isFunction(callback)) {
                callback(event);
            }
        }
    };
    /*
    * Fires on the source object when the user releases the mouse at the close of a drag operation.
    * */
    "use strict";
    this.onDragEnd = function onDragEnd(dom, callback) {
        if(this.isWeChatApp())
        {
            return;
        }
        var _dom = dom || document;
        _dom.ondragend = function (event) {
            event.preventDefault();
            if (Rsd.isFunction(callback)) {
                callback(event);
            }
        }
    };
    /*
    *
    * Fires on the target element when the user drags the object to a valid drop target.
    * */
    this.onDragEnter = function onDragEnter(dom, callback) {
        if(this.isWeChatApp())
        {
            return;
        }
        var _dom = dom || document;
        _dom.ondragenter = function (event) {
            event.preventDefault();
            if (Rsd.isFunction(callback)) {
                callback(event);
            }
        }
    };
    /**
     * @public
     * @description 获取dom 计算后样式
     * @param {stirng} id dom ID值
     * @param {string} style 样式名称
     * @function
     * @memberof Redjs
     * */
    "use strict";
    this.getComputedStyle = function getComputedStyle(id, style) {
        if(this.isWeChatApp())
        {
            console.error('Wechat小程序环境下getComputedStyle方法不可用');
            return null;
        }
        var el = document.getElementById(id);
        var _value = null;
        if (el) {
            if (el.currentStyle) {
                _value = el.currentStyle[style];
                alert('ie:' + _value);
            } else if (window.getComputedStyle) {
                _value = window.getComputedStyle(el, null)[style];
                alert('firefox:' + _value);
            }
        }
        return _value;

    };
    /**
     * @description 预加载图片对象
     * */
    this.loadImage = function loadImage(src) {
        var img = new Image();
        img.src =  src;
        return img;
    };
    /**
     * @public
     * @description 展示提示信息,可自定义按钮
     * @param {string} title 标题
     * @param {string} msg 消息内容
     * @param {array} btns 按钮集合，如：[{text:'OK',fn:function(){}}]
     * @function
     * @memberof Redjs
     * */
    this.showMessage = function showMessage(title, msg, btns) {
        var me = Rsd || this;
        var _title = "提示信息"
        var _msg = '';
        var _btns = [{text: '确 定', fn: null}];
        if (arguments.length > 2) {
            _title = arguments[0];
            _msg = Rsd.toString(arguments[1]);
            _btns = arguments[2];
        }
        if (arguments.length == 2) {
            _msg = Rsd.toString(arguments[0]);
            _btns = arguments[1];
        }
        if (arguments.length == 1) {
            _msg = Rsd.toString(arguments[0]);
        }

        var box = me.create('Rsd.control.MessageBox', {title: _title, messageType: 'text', message:_msg,buttons:_btns,parent: me});
        return box.showDialog(document.body);
    };
    /**
     *  @function
     * @memberof Redjs
     * */
    this.showHtml = function showHtml(title, html) {
        var me = Rsd || this;
        var _title = title;
        var _html = html||'';
        if (arguments.length == 1) {
            _title = "提示信息";
            _html = arguments[0];
        }
        var _btns = [{text: '确 定', fn: null}];
        var box = me.create('Rsd.control.MessageBox', {
            width: 600,
            height: 400,
            title: _title,
            messageType: 'html',
            message:_html,
            buttons:_btns,
            parent: me
        });
        return box.showDialog(document.body);
    };
    /**
     * @description 展示【确定】或【取消】操作的信息提示框
     * @function
     * @memberof Redjs
     * */
    this.yesOrNo = function yesOrNo(msg, callback_yes, callback_no) {
        var me = Rsd || this;
        var _title = "重要操作确认"
        var _msg = msg;
        var _btns = [{text: '确 定', fn: callback_yes}, {text: '取 消', fn: callback_no}];

        var box = me.create('Rsd.control.MessageBox', {title: _title, message:_msg,buttons:_btns,parent: this});
        return box.showDialog(document.body);
    };


    /**
     * @public
     * @description 提示popup信息
     * @param {number} x x轴方向位置信息，以提示框居中时为位置 0
     * @param {number} y y轴方向位置信息
     * @function
     * @memberof Redjs
     * */
    this.showPopup = function showPopup(msg, x, y) {
        var me = Rsd || this;

        me.__popup_count = this.__popup_count||0;

        var _popup = me.create('Rsd.container.Component', {
            border: false,
            width: '100%',
            height: 50,
            fixed:true,
            layout: 'auto',
            style: {zIndex: 99999,top:(y||0) + me.__popup_count*50},
            cls: 'x-popup-bar-top',
            items: [{xtype: 'label',style:{left:x||0 }, cls: 'x-text', width: '100%', height: '100%', text: msg}]
        });

        _popup.header.visible = false;
        me.__popup_count++;
        _popup.show(function () {
            _popup.animate({top:-50},500,function () {});
        });


        setTimeout(function () {
            me.__popup_count--;

            _popup.close({opacity:0,top:-50},2000,0);

        }, 3000);

    };

    /**
     * @public
     * @description 以动画的形式 将TipBox（有尖头指向）样式显示到目标（x,y）位置
     * @param string msg
     * @param int w
     * @param int h
     * @param int x
     * @param int x
     * @param int y
     * @param int position
     * */
    this.showTip = function showTip(msg ,w,h,x,y,position) {

        var _msg = null;
        var _w = null;
        var _h = null;
        var _x = null;
        var _y = null;
        var _position = null;

        for(var i =0;i <  arguments.length;i++)
        {
            if(this.isString(arguments[i]) && _msg == null)
            {
                _msg = arguments[i];
                continue;
            }
            if(this.isString(arguments[i]) && _position == null)
            {
                _position = arguments[i];
                continue;
            }
            if(this.isNumber(arguments[i]) && _w ==null)
            {
                _w = arguments[i];
                continue;
            }
            if(this.isNumber(arguments[i]) && _h ==null)
            {
                _h = arguments[i];
                continue;
            }
            if(this.isNumber(arguments[i]) && _x==null)
            {
                _x = arguments[i];
                continue;
            }
            if(this.isNumber(arguments[i]) && _y==null)
            {
                _y = arguments[i];
                continue;
            }

        }
        this.loadClass('Rsd.control.HtmlBox');

        var _tip = this.widget("container",{
            header:{position:_position||'top',space:0},
            width:_w||200,
            height:_h||50,
            border:false,
            style:{opacity:0},
            layout:{type:'border',align:'center'},
            listeners:{
                'click':{
                    element:'dom',
                    fn:function (sender,event) {

                        this.close(1000,{opacity:0,top:_y-200,left:_x-200},0);
                        Rsd.events.remove(Rsd,'click',this.id);
                    }
                }

            },
            items:[
                {xtype:'html-box',margin:'10 10 10 10',region:'center',style:{align:'center'},height:'100%',width:'100%',html:_msg||''}
            ]
        });
        _tip.showTip({left:_x==null?100:_x,top:_y==null?50:_y },1000,function () {
            var _me = this;
            //延时加入 队列 防止click 事件 关闭显示
            Rsd.events.add(Rsd,'click',this.id,function () {
                _me.close(1000,{opacity:0,top:_y-200,left:_x-200},0);
            },true);
        });

        return _tip.id;
    };

    /**
     * @description 提示JSON数据信息
     * @function
     * @memberof Redjs
     * */
    this.alertLog = function alertLog(obj) {
        alert(Rsd.toString(obj));
    };

    /**
     * @public
     * @description 提示信息
     * @function
     * @memberof Redjs
     * */
    this.alert = function alert(title, msg, callback) {
        //console.log(arguments);
        var me = Rsd || this;
        var _title = "提示信息";
        var _msg = "";
        var _callback = null;
        if (arguments.length > 2) {
            _title = arguments[0];
            _msg = arguments[1];
            _callback = arguments[2];
        }
        if (arguments.length == 2) {
            if (Rsd.isFunction(arguments[1])) {
                _msg = arguments[0];
                _callback = arguments[1];
            }
            else {
                _title = arguments[0];
                _msg = arguments[1];
            }

        }
        if (arguments.length == 1) {
            _msg = arguments[0];
        }

        var _btns = null;
        if (Rsd.isFunction(_callback)) {
            _btns = [{text: '确 定', fn: _callback}];
        }else {
            _btns = [{text: '确 定', fn: null }];
        }
        var box = me.create('Rsd.control.MessageBox', {title: _title, message:_msg,messageType:((_msg.indexOf('<')>-1||_msg.indexOf('>')>-1 ) ? 'html':'text'),buttons:_btns,parent: this});
        box.showDialog(document.body);
    };

    /**
     * @public
     * @description 关闭窗口
     * @function
     * @memberof Redjs
     * */
    this.closeWindow = function closeWindow() {
        var win = window.open("about:blank", "_self");
        win.close();
    };
    /*
    * */
    this.getTiming = function getTiming(ext) {
        var _timing ={
            redjsLoadStartTime: Rsd.__loadStartTime,
            redjsLoadEndTime: Rsd.__loadEndTime,
            redjsLoadTime: (Rsd.__loadEndTime || 0) - (Rsd.__loadStartTime || 0),
            redjsBuildStartTime: Rsd.__buildStartTime,
            redjsBuildEndTime: Rsd.__buildEndTime,
            redjsBuildTime: (Rsd.__buildEndTime || 0) - (Rsd.__buildStartTime || 0)
        };
        var _per = window.performance;
        if (_per && _per.timing) {

            _timing.start = _per.timing.navigationStart;
            //DNS查询耗时
            _timing.DNS = _per.timing.domainLookupEnd - _per.timing.domainLookupStart;
            //TCP链接耗时
            _timing.TCP = _per.timing.connectEnd - _per.timing.connectStart;
            //request请求耗时
            _timing.request = _per.timing.responseEnd - _per.timing.responseStart;
            //解析dom树耗时
            _timing.domComplete = _per.timing.domComplete - _per.timing.domInteractive;
            //白屏时间
            _timing.white = _per.timing.responseStart - _per.timing.navigationStart;
            //domready时间(用户可操作时间节点) ：
            _timing.domReady = _per.timing.domContentLoadedEventEnd - _per.timing.navigationStart;
            //onload时间(总下载时间)
            _timing.total = _per.timing.loadEventEnd - _per.timing.navigationStart;

            _timing.end = _per.timing.loadEventEnd;
        }

        var _data =  Rsd.apply( _timing,ext||{});

        return _data;
    };
    /**
     * @public
     * @description 记录调试信息
     * @param {string} msg
     * @param {object} data
     * @function
     * @memberof Redjs
     * */
    this.debug = function debug(msg, data) {
        var me = Rsd || this;
        //debugger;
        if (me.isDebug) {

            console.info(msg);

            if (me.Logger) {
                me.Logger.debug(msg, data);
            }
        }

    };

    /**
     * @public
     * @description log日志
     * @function
     * @memberof Redjs
     * */
    this.log = function log(msg) {
        console.log(msg);
    };

    /**
     * @public
     * @description info日志
     * @param {string} msg
     * @param {object} data
     * @function
     * @memberof Redjs
     * */
    this.info = function info(msg, data) {
        var me = Rsd || this;
        if (me.Logger) {
            me.Logger.info(msg, data);
        }
    };

    /**
     * @public
     * @desc 调试模式下，提示错误信息，非调试模式打印到控制台；如日志接口（Rsd.Logger）存在发送日志到服务端
     * @param {string} msg
     * @param {string} url
     * @param {object} ex
     * */
    this.error = function error(msg, url, ex) {
        var _msg = msg;
        var _url = url;
        var _ex = ex;

        if (arguments.length == 1 && this.isObject(arguments[0])) {
            _msg = null;
            _url = null;
            _ex = arguments[0];
        }

        if (arguments.length == 2 && this.isObject(arguments[1])) {
            _url = null;
            _ex = arguments[1];
        }
        var me = Rsd || this;
        if (me.isDebug) {
            alert(msg + ((_ex && _ex instanceof Error) ? (':' + _ex.message) : ''));
        }
        else {
            console.error((Rsd.isEmpty(msg) ? '运行异常' : _msg) + (_url ? '(' + _url + ')' : ''));
        }
        if (_ex) {
            console.trace(_ex);
        }
        if (me.Logger) {
            me.Logger.error(_msg + '(' + _url + ')', ex);
        }
    };

    /**
     * @public
     * @description 警告日志
     * @param {string} msg
     * @param {object} data
     * */
    this.warn = function warn(msg, data) {
        var me = Rsd || this;
        console.warn(msg);
        if (me.Logger) {
            me.Logger.warn(msg, data);
        }

    };

    /**
     * @public
     * @description 写入会话缓存
     * @param {string} key
     * @param {string} value
     * */
    this.writeSession = function writeSession(key, value) {
        var me = Rsd || this;
        var storage = window.sessionStorage;
        if (storage) {
            storage.setItem(key, me.toString(value));
        }
    };

    /**
     * @public
     * @description 读取指定会话缓存
     * @param {string} key
     * */
    this.readSession = function readSession(key) {
        var me = Rsd || this;
        var storage = window.sessionStorage;
        var data = null;
        if (storage && storage.getItem(key) != null) {
            data = me.toJson(storage.getItem(key));
        }

        return data;
    };

    /**
     * @public
     * @description 清除指定会话缓存
     * @param {string} key
     * */
    this.removeSession = function removeSession(key) {
        var me = Rsd || this;
        var storage = window.sessionStorage;
        if (key && storage && storage.getItem(key) != null) {
            return storage.removeItem(key);
        }
    };

    /**
     * @public
     * @description 清除所有会话缓存
     * */
    this.clearSession = function clearSession()
    {
        window.sessionStorage.clear();
    };

    /**
     * @public
     * @description 写到本地缓存
     * @param {string} key
     * */
    this.writeLocal = function writeLocal(key, value) {
        var me = Rsd || this;
        var storage = window.localStorage;
        if (storage) {
            storage.setItem(key, me.toString(value));
        }
    };

    /**
     * @public
     * @description 读取指定本地缓存
     * @param {string} key
     * */
    this.readLocal = function readLocal(key) {
        var me = Rsd || this;
        var storage = window.localStorage;
        var data = null;
        if (storage && storage.getItem(key) != null) {
            data = me.toJson(storage.getItem(key));
        }

        return data;
    };

    /**
     * @public
     * @description 清除指定本地缓存
     * @param {string} key
     * */
    this.removeLocal = function removeLocal(key) {
        var me = Rsd || this;
        var storage = window.localStorage;

        if (key && storage && storage.getItem(key) != null) {
            return storage.removeItem(key);
        }

    };

    /**
     * @public
     * @description 清除所有本地缓存
     * */
    this.clearLocal = function clearLocal() {
        window.localStorage.clear();
    };

    /**
     * @public
     * @description 添加Cookie
     *  */
    this.addCookie = function addCookie(name, value, expiresHours) {
        var me = Rsd || this;
        var cookieString = name + "=" + escape(value);
        //判断是否设置过期时间
        if (expiresHours > 0) {
            var date = new Date();
            date.setTime(date.getTime + expiresHours * 3600 * 1000);
            cookieString = cookieString + "; expires=" + date.toGMTString();
        }
        document.cookie = cookieString;
    };
    /**
     * @public
     * */
    this.getCookie = function getCookie(name) {
        var me = Rsd || this;
        var strCookie = document.cookie;
        var arrCookie = strCookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if (arr[0] == name) return arr[1];
        }
        return "";
    };
    /**
     * @public
     * */
    this.deleteCookie = function deleteCookie(name) {
        var me = Rsd || this;
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=null; expires=" + date.toGMTString();
    };

    /**
     * @public
     * */
    "use strict";
    this.getScript = function getScript(obj, f) {
        if (obj == undefined) {
            return "null";
        }

        var r = [];
        if (typeof obj == "string") {
            return "\'" + obj.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t").replace(/(\')/g, "\\'") + "\'";
        }
        if (typeof obj == "object") {
            var _type = this.getType(obj);
            if (_type == '[object Array]') {
                for (var i = 0; i < obj.length; i++)
                    r.push(Rsd.getScript(obj[i], true))
                r = "[" + r.join() + "]";
            }
            if (_type == '[object Object]') {
                if (Rsd.isCreated(obj)) {
                    this.error('类型为[' + obj.xtype + ']属性定义为已创建对象,该类无法定义。');
                } else {

                    for (var i in obj) {
                        if(obj.hasOwnProperty(i))
                        {
                            if (typeof obj[i] != 'function') {

                                r.push((f ? '' : 'this.') + i + (f ? ':' : '=') + this.getScript(obj[i], true));
                            }
                            else {
                                //无法实现自动为未命名的方法加上方法名
                                r.push((f ? '' : 'this.') + i + (f ? ':' : '=') + obj[i].toString());
                            }
                        }

                    }
                    r = (f ? '{' : '') + r.join(f ? ',' : ';') + (f ? '}' : '');
                }

            }

            return r;
        }

        return obj.toString().replace(/\"\:/g, '":""');
    };

    /**
     * @public
     * @param className string
     * @param config object
     * @param callback function
     *
     * */
    "use strict";
    this.define = function define(className, config, callback) {

        if(!Rsd.isString(className))
        {
            console.error(className);
            return;
        }
        var me = Rsd || this;

        me.debug('define class:' + className);

        if (me.classes[className] != null) {

            me.error('Failed to define class', className, new Error('class \'' + className + '\' has defined.'));
            return;
        }

        config = config || {};
        //模拟类静态方法，在类型定义之前被执行
        if (config.static && config.static instanceof Function) {
            var _static = config.static;
            delete  config.static;

            if (_static.length > 0) {
                _static(function () {
                    me.define(className, config, callback);
                });

                return;
            } else {
                _static();
            }

        }

        var _extend = config.extend;
        //delete config.extend;
        var _requires = config.requires;
        delete config.requires;
        var _xtype = config.xtype ? config.xtype : className;
        delete config.xtype;
        var _properties = {};
        var _functions = {};
        if (_extend === className) {
            this.error('Failed to define class', className, new Error('extend class don\'t allow same to className'));
            return;
        }

        if (_extend) {
            if (!me.classes[_extend]) {

                me.debug('load class '+className+' extend class:' + _extend);
                me.loadClass(_extend);

            }

            if (typeof me.classes[_extend] !== 'function') {
                throw new Error('Inheritance dependency error:' + _extend + ' can not found.');
            }

        }

        var _namespace=null;
        var _namespaces = className.split('.');

        for (var i in config) {

            if(!config.hasOwnProperty(i))
            {
                continue;
            }
            if (me.isFunction(config[i])) {
                _functions[i] = config[i]
                continue;
            }

            //定义对象属性
            _properties[i] = config[i];
            continue;
        }

        if (!_functions.hasOwnProperty('constructor') || !me.isFunction(_functions.constructor)) {
            _functions['constructor'] = function () {
                me.warn('Could not find function constructor in ' + this.$className + '.');
            };
        }


        for (var n in _namespaces) {

            if(!_namespaces.hasOwnProperty(n))
            {
                continue;
            }

            var _script="";


            if (!_namespaces[n]) {
                continue;
            }

            if (_namespace) {
                _namespace += '.';
            }
            else {
                _namespace = '';
            }

            _namespace += _namespaces[n];

            if (n < _namespaces.length - 1) {
                _script = 'if(!' + _namespace + '){' + _namespace + '={};}; ';
            }
            else {

                _script = '' + _namespace + ' =';
                _script += ' function ' + _namespaces[n] + '(_config){';
                //动态原型技术
                if (_extend) {
                    _script += 'this.__proto__.__proto__ = new ' + (_extend || 'Object') + '(false);';
                }

                //属性初始化
                _script += me.getScript(_properties) + ';';
                //_script += 'console.log(this.constructor);';
                _script += 'this.constructor.call(this,_config);';
                _script += 'if(_config && Rsd.isFunction(this.init)){ this.init.call(this);}';
                _script += 'return this;};';
                _script += 'Rsd.classes[\'' + className + '\']=' + _namespace + ';';

            }

            window.eval(_script);
        }

        var _depClass = _extend;

        for (var p in _functions) {
            me.classes[className].prototype[p] = _functions[p];
        }

        me.classes[className].prototype.$className = className;
        me.classes[className].prototype.xtype = _xtype;
        me.classes[className].prototype.dependencies = new Array();
        me.classes[className].prototype.dependencies[_xtype] = className;

        if (_depClass) {
            me.classes[className].prototype.dependencies[me.types[_depClass]] = _depClass;
        }

        for (var i in _requires) {
            if(!_requires.hasOwnProperty(i))
            {
                continue;
            }
            _depClass = _requires[i];
            if (_depClass.length == 0) {
                continue;
            }
            if (!me.classes[_depClass]) {
                me.debug('load class '+className+' dependent :' + _extend);
                this.loadClass(_depClass);
            }

            this.classes[className].prototype.dependencies[me.types[_depClass]] = _depClass;
        }

        me.types[className] = _xtype

        if (me.xtypes.hasOwnProperty(_xtype)) {
            me.error('The xtype \'' + _xtype + '\' of class [' + className + '] is exist.');
        }
        else {
            me.xtypes[_xtype] = className;
        }


        //_properties 属性定义
        var _t = _extend ? new me.classes[_extend]() : {};

        var _script = '';
        for (var p in _properties) {
            if (_t.hasProperty && _t.hasProperty(p)) {

                /** @bug 父类对象属性不能重复定，否则会覆盖父类功能*/
                //console.log('[' + className + '] prototype has property \'' + p + '\',program continue.');
                continue;
            }

            //var enumerable = true;
            //console.log('==>define [' + className + '] property :' + p);
            _script += 'Rsd.defineProperty(Rsd.classes[\'' + className + '\'],\'' + p + '\',function __getter(){return this[\'__' + p + '\'];},function __setter(value){ this[\'__' + p + '\'] = value;},true);';
        }

        //console.log(_script);
        window.eval(_script);

        if (me.isFunction(callback)) {
            callback.call(me, me.classes[className]);
        }

        me.debug('define class:' + className + ' end.');
    };

    /**
     * @public
     * @description 属性定义,如果属性存在，将跳过
     * */
    "use strict";
    this.defineProperty = function defineProperty(type, propertyName, getter, setter, enumerable) {

        var _type = this.isString(type) ? this.classes[type] : type;

        if (!_type) {
            return;
        }
        if (_type.prototype.hasOwnProperty(propertyName)) {
            console.warn('Property [' + propertyName + '] is exsit in ' + _type.prototype.$className);
            return;
        }

        if (Object.defineProperty) {
            var _obj = {enumerable: enumerable, configurable: true};//{value:defaultValue,writable:true,enumerable: enumerable,configurable:true};
            if (getter) {
                _obj['get'] = getter;
            }
            if (setter) {
                _obj['set'] = setter;
            }
            Object.defineProperty(_type.prototype, propertyName, _obj);
        } else {
            if (getter && Object.prototype.__defineGetter__) {
                _type.prototype.__defineGetter__(propertyName, getter);
            }
            if (setter && Object.prototype.__defineSetter__) {
                _type.prototype.__defineSetter__(propertyName, setter);
            }
        }
    };

    /**
     *@public
     * */
    this.setDomToken = function setDomToken(flag, value) {
        this.domFlag = flag;
        this.domFlagValue = value;
    };

    /**
     * @public
     * @description 单列和需要缓存的对象会存入Rsd.objects对象中。
     * */
    "use strict";
    this.create = function create(className, config) {
        var me = Rsd || this;
        //debugger;
        if (!className || className == '') {
            throw new Error('call Rsd.create function argument \'className\' is null. ');
        }
        if (me.singletons[className]) {
            return me.objects[me.singletons[className]];
        }

        me.debug('create object:' + className);

        me.loadClass(className);

        if (me.classes[className] == null) {
            throw new Error('class \'' + className + '\' not found.');
        }

        var _obj = new me.classes[className](config);

        if (_obj.events) {
            _obj.events.fire(_obj, 'aftercreate', {});
        }


        //debugger;
        if (_obj.singleton || _obj.cache) {
            me.objects[_obj.id] = _obj;
        }
        if (_obj.singleton) {
            me.singletons[className] = _obj.id;
        }
        me.debug('return object:' + _obj.id);
        return _obj;
    };
    /**
     * @public
     * @param xtype
     * @param config
     *
     * */
    "use strict";
    this.widget = function widget(xtype, config) {

        var _xtype = xtype;
        var _className = null;
        var _config = config || {};


        if (this.isString(xtype)) {
            _xtype = xtype;
        }

        if (this.isObject(xtype)) {

            _config = xtype;
            _xtype = _config['xtype'];
            delete  _config['xtype'];
        }
        if (this.isEmpty(_xtype)) {
            console.error(arguments);
            throw new Error('call Redjs.widget of argument \'xtype\' is null.');
        }
        _className = this.xtypes[_xtype];
        if (!_className) {
            throw new Error('call Redjs.widget of xtype \'' + _xtype + '\' mapping className not found.');
        }

        return this.create(_className, _config);
    };

    /**
     *@public
     * */
    this.isCreated = function isCreated(obj) {
        return obj && this.isFunction(obj.isCreated) && obj.isCreated();
    };

    /**
     * @private
     * */
    this.getId = function getId(prefix) {
        
        this.__id++;
        var _id = prefix.replaceAll('[-]', '_') + '_' + this.__id;
        if(this.isWeChatApp())
        {
            //console.error('Wechat小程序环境下getId方法不可用');
            return _id;
        }else
        {
            while (document.getElementById(_id)) {
                this.__id++;
            }
        }
         
        return _id;
    };

    /**
     * @public
     * @description zIndex  + offset
     * @return number
     * */
    this.getZIndex = function getZIndex(offset) {
        return this.__zIndex + offset;
    };

    /**
     * @public
     * @description 对象克隆
     * */
    this.clone = function clone(obj) {
        var o;

        switch (typeof obj) {
            case 'undefined':
                break;
            case 'string'   :
                o = obj + '';
                break;
            case 'number'   :
                o = obj - 0;
                break;
            case 'boolean'  :
                o = obj;
                break;
            case 'object'   :
                if (obj === null) {
                    o = null;
                    break;
                }
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {

                    if (obj instanceof Node) {
                        o = obj.cloneNode(true);
                        break;
                    }

                    o = {};

                    for (var k in obj) {
                        o[k] = clone(obj[k]);
                    }
                }
                break;
            default:
                o = obj;
                break;
        }
        return o;
    };

    /**
     @description 将参数config合并到obj中
     * */
    this.apply = function apply(obj, config, deep) {

        var _deep = deep || 1;
        _deep = _deep < 1 ? 1 : _deep;

        if (obj && config && this.isType(obj, Object) && this.isObject(config)) {

            for (var i in config) {
                try {
                    //delete  obj[i];
                    if (_deep == 1) {
                        obj[i] = config[i];
                        continue;
                    }
                    //console.log(i + '--' + _deep);
                    if (obj[i] && config[i] && this.isType(obj[i], Object) && this.isObject(config[i])) {
                        //console.log('1111'); console.log(this.toString(obj[i])); console.log(this.toString(config[i]));
                        this.apply(obj[i], config[i], _deep - 1)
                    } else {

                        obj[i] = config[i];
                    }

                } catch (ex) {
                    this.error('Run function Redjs.apply fail', 'Rsd', ex);
                }
            }
        }

        return obj;
    };

    /**
     * @public
     * */
    this.loadClass = function loadClass(className, callback) {

        if (!this.isString(className)) {
            console.error(className);
            return;
        }
        var me = Rsd || this;

        if (!me.isNullOrUndefined(me.classes[className])) {

            return;
        }

        if(me.classesCallback[className])
        {
            me.classesCallback[className].push(callback);
            return;
        }

        me.classesCallback[className] = [callback];

        me.debug('Load class: ' + className);

        var _url = className;
        var _flag = true;

        if (_flag && me.app && me.app.plugins) {

            var _plugins = me.app.plugins || [];

            for (var i in _plugins) {

                var _p = _plugins[i];
                //console.log(className,_p.name);
                if (className.startWith(_p.name)) {
                    
                    _url = _url.replace(_p.name, '');
                    _url = _url.replace("Rsd", me.getRedjsHost());
                    _url = _p.path + '/' + _url.replaceAll('[.]', '/') + '.js';
                    _url += '?t=' + (_p.isDebug ? new Date().getTime() : _p.pluginDate);
                   
                    _flag = false;

                    break;
                }else
                {
                    if (className.toLowerCase().startWith(_p.name.toLowerCase()))
                    {
                        console.error('要加载的类（' + className + '），类名称大小写不规范。（应以：'+_p.name+'开始)');
                    }
                }
            }
        }

        if (_flag && me.app && className.startWith(me.app.appName)) {

            _url = _url.replace(me.app.appName, '');
            _url = _url.replace("Rsd", me.getRedjsHost());
            _url = me.app.appFolder + '/' + _url.replaceAll('[.]', '/') + '.js';
            _url += '?t=' + (me.app.isDebug ? new Date().getTime() : this.app.appDate);

            _url = (this.app && this.app.jsAgentHost) ? (this.app.jsAgentHost + '?' + this.UTF8ToBase64(_url)) : _url;

            _flag = false;
        }



        if (_flag) {
            _url = _url.replaceAll('[.]', '/') + '.js';
            if (me.isAgentHost()) {
                _url = _url.replace("Rsd", "");
                _url = me.getRedjsHost() + this.UTF8ToBase64(_url + '?t=' + (me.isDebug ? new Date().getTime() : this.timestamp));
            }
            else {
                _url = _url.replace("Rsd", me.getRedjsHost());
                _url += '?t=' + (me.isDebug ? new Date().getTime() : this.timestamp);
            }

        }

        me.loadScriptFile(_url, function (response, status) {

            if (me.classes[className]) {

                me.debug('Load class: ' + className + ' end.');

                var _list = me.classesCallback[className];
                for(var i in _list)
                {
                    me.callFunction(me, _list[i]);
                }

            }
            else {

                me.error(className + ' can not found.Please check class name is case upper or lower.');
            }

        });

    }

    /**
     *@public
     *@desc 用<script> 加载标签 pugins 目录下资源或第三方资源,可以避免异步加载方式失败。
     * */
    this.loadPlugin = function loadPlugin(url, callback) {
        if(this.isWeChatApp())
        {
            console.log(url);
            console.error('Wechat小程序环境下loadPlugin方法不可用,请在document的head中提前加载css文件。');
            return ;
        }
        var me = Rsd || this;
        var name = url;
        if (name == undefined || name == null || name == '') {
            return;
        }
        var src = null;
        if (name.toLowerCase().startWith('http://') || name.toLowerCase().startWith('https://')) {
            src = name;
        } else {
            src = me.getRedjsUrl(name) ;
        }

        me.debug('Load plugin:' + src);

        var el = document.createElement('script');
        el.type = "text/javascript"
        el.src = src;
        el.onload = el.onreadystatechange = function onready() {

            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                if (me.isFunction(callback)) callback.call();
                // Handle memory leak in IE
                el.onload = el.onreadystatechange = null;
            }
        };

        document.getElementsByTagName('head')[0].appendChild(el);

    };

    /**
     * @public
     * @description 用ajax加载资源 不用用于加载jquery
     * @param {string} url 脚本地址
     * @param {string} callback 加载完成回调函数
     * */
    this.loadScriptFile = function loadScriptFile(url, callback) {

        var me = Rsd || this;
        var _url = url;
        if (_url.startWith('http://') || _url.startWith('https://')) {
        }
        else {
            _url = (this.app && this.app.jsAgentHost) ? (this.app.jsAgentHost + '?' + this.UTF8ToBase64(_url)) : _url;
        }

        me.debug('Load file: ' + _url);

        // 创建ajax对象
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }

        xhr.open('GET', _url, false);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        //xhr.setRequestHeader("Content-type", 'application/x-javascript; charset=utf-8');//开启后会出现 OPTIONS 请求
        xhr.send(null);

        if (xhr.readyState == 4 && xhr.status == 200) {

            var str = xhr.responseText;

            try {
                window["eval"].call(window, str);
            } catch (e) {
                try {
                    window.eval(str);
                } catch (e1) {

                    console.error('load file error[' + url + ']');
                    console.error(e1);
                }

            }


            if (me.isFunction(callback)) callback.call();

        } else {
            me.error('Failed to load resource: ' + _url + "(" + xhr.responseText + ")");
        }

        me.debug('Load file: ' + _url + ' end.');

    };

    /**
     *@public
     * */
    this.loadCssFile = function loadCssFile(url) {

        if(this.isWeChatApp())
        {
            console.error(url);
            console.error('Wechat小程序环境下loadCssFile方法不可用,请在document的head中提前加载css文件。');
            return ;
        }
        var head = document.getElementsByTagName('HEAD').item(0);
        var style = document.createElement('link');
        style.href = url;
        style.rel = 'stylesheet';
        style.type = 'text/css';
        head.appendChild(style);
    };

    /**
     * @public
     * */
    this.GbkToUTF8 = function GbkToUTF8(wide) {
        var c, s;
        var enc = "";
        var i = 0;
        while (i < wide.length) {
            c = wide.charCodeAt(i++);
            // handle UTF-16 surrogates
            if (c >= 0xDC00 && c < 0xE000) continue;
            if (c >= 0xD800 && c < 0xDC00) {
                if (i >= wide.length) continue;
                s = wide.charCodeAt(i++);
                if (s < 0xDC00 || c >= 0xDE00) continue;
                c = ((c - 0xD800) << 10) + (s - 0xDC00) + 0x10000;
            }
            // output value
            if (c < 0x80) enc += String.fromCharCode(c);
            else if (c < 0x800) enc += String.fromCharCode(0xC0 + (c >> 6), 0x80 + (c & 0x3F));
            else if (c < 0x10000) enc += String.fromCharCode(0xE0 + (c >> 12), 0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
            else enc += String.fromCharCode(0xF0 + (c >> 18), 0x80 + (c >> 12 & 0x3F), 0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
        }
        return enc;
    };

    /**
     *
     * @public
     * */
    this.UnicodeToUTF8 = function UnicodeToUTF8(str) {
        if (null == str)
            return null;
        var strUni = String(str);
        var strUTF8 = String();
        for (var i = 0; i < strUni.length; i++) {
            var wchr = strUni.charCodeAt(i);
            if (wchr < 0x80) {
                strUTF8 += strUni.charAt(i);
            }
            else if (wchr < 0x800) {
                var chr1 = wchr & 0xff;
                var chr2 = (wchr >> 8) & 0xff;
                strUTF8 += String.fromCharCode(0xC0 | (chr2 << 2) | ((chr1 >> 6) & 0x3));
                strUTF8 += String.fromCharCode(0x80 | (chr1 & 0x3F));
            }
            else {
                var chr1 = wchr & 0xff;
                var chr2 = (wchr >> 8) & 0xff;
                strUTF8 += String.fromCharCode(0xE0 | (chr2 >> 4));
                strUTF8 += String.fromCharCode(0x80 | ((chr2 << 2) & 0x3C) | ((chr1 >> 6) & 0x3));
                strUTF8 += String.fromCharCode(0x80 | (chr1 & 0x3F));
            }
        }
        return strUTF8;
    };

    /*
    *
    * */
    this.UTF8ToBase64 = function UTF8ToBase64( str ) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

    /*
    *
    * */
    this.Base64ToUTF8 = function Base64ToUTF8( str ) {

        return decodeURIComponent(escape(window.atob(str)));
    }

    /**
     * @public
     * @description  获取屏幕设备像素值（1英寸正方形区域（长*宽）像素）
     * */
    this.getDPI = function getDPI() {
        if(this.__dpi)
        {
            return this.__dpi;
        }
        var _width, _height;
        if (window.screen.deviceXDPI) {
            _width = window.screen.deviceXDPI;
            _height = window.screen.deviceYDPI;
        }
        else {
            var tmpNode = document.createElement("DIV");
            tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden;";
            document.body.appendChild(tmpNode);
            _width = parseInt(tmpNode.offsetWidth);
            _height = parseInt(tmpNode.offsetHeight);
            tmpNode.parentNode.removeChild(tmpNode);
            //console.log(_width,_height);
        }
        this.__dpi = {width: _width, height: _height};
        return this.__dpi;
    };
    /**
     * @description  将一个块区域的长宽的值（px）转换为以mm为计算单位的值
     * @param {number} width
     * @param {number} height
     * @param {number} scale 缩放比例 参考: window.devicePixelRatio;
     * @returns {object} {width:100,height:100}
     */
    this.PxToMm = function PxToMm(width, height,scale) {

        var dpi = this.getDPI();
        var _scale = scale||1;
        var inch_w = (width||0)/ (dpi.width * _scale);
        var _width = inch_w * 25.4 ;

        var inch_h = (height||0)/(dpi.height * _scale);
        var _height = inch_h * 25.4 ;

        return {width:_width,height:_height};
    };
    /**
     * @description  将一个块区域的长宽的值（mm）转换为以px为计算单位的值
     * @param {number} width
     * @param {number} height
     * @param {number} scale 缩放比例 参考: window.devicePixelRatio;
     * @returns {object} {width:100,height:100}
     */
    this.MmToPx = function MmToPx(width, height,scale) {

        var dpi = this.getDPI();
        var inch_w = (width||0)/25.4;
        var inch_h = (height||0)/25.4;
        var _scale = scale||1;
        var _width = inch_w * dpi.width * _scale;
        var _height = inch_h * dpi.height * _scale;

        return  {width:_width,height:_height};;
    };
    /**
     * @public
     * @description  格式化模版字符串
     * */
    this.formatTemplateString = function formatTemplateString(str, data) {
        var _data = data||{};
        var html = "";
        var arr = str.split('#');

        var _c_str = null;
        var _n_str = null;
        for (var i = 0; i < arr.length; i++) {
            _c_str = arr[i];
            if (_c_str == undefined) {
                continue;
            }
            if (_c_str.startWith('=') && _c_str.endWith('=')) {
                if (_data[_c_str.replaceAll("=", "")] != undefined) {
                    html += _data[_c_str.replaceAll("=", "")];
                }
                continue;
            }

            html += _c_str;
            if (i < (arr.length - 1)) {
                _n_str = arr[i + 1];
                if (_n_str == undefined || !(_n_str.startWith('=') && _n_str.endWith('='))) {
                    html += '#';
                }
            }
        }
        return html;
    },
        /*
        * */
        this.getApp = function getApp() {
            return this.app;
        };

    /**
     * @public
     * @description 获取App token
     * */
    this.getAppToken = function getAppToken() {
        if(this.isEmpty(this.app) && this.getApp)
        {
            this.app = this.getApp();
        }
        return this.app.token;
    };

    /**
     * @public
     * @description 设置token
     * */
    this.setAppToken = function setAppToken(token) {
        if(this.isEmpty(this.app) && this.getApp)
        {
            this.app = this.getApp();
        }
        this.app.token = token
    };

    /**
     * @public
     * */
    this.checkToken = function checkToken() {

    };

    /**
     * @public
     * @param config 将被合并到Ajax对象上
     * @param callback 回调函数
     * */
    this.request = function request(config, data, callback) {
        var _c = null;
        var _d = null;
        var _fn = null;
        for(var i in arguments)
        {
            if(_c == null && this.isString(arguments[i]))
            {
                _c = {url:arguments[i]};
                continue;
            }
            if(_c == null && this.isObject(arguments[i]))
            {
                _c = arguments[i];
                continue;
            }
            if(_d == null && this.isObject(arguments[i]))
            {
                _d = arguments[i];
                continue;
            }
            if(_fn == null && this.isFunction(arguments[i]))
            {
                _fn = arguments[i];
                continue;
            }
        }
        if (_fn == null) {

            _fn = void(0);
        }
        var _ajax = this.create('Rsd.data.Ajax', this.apply({key: this.getAppToken()}, _c));
        return _ajax.request(_d, _fn);
    };

    /**
     @public
     @param config:将被合并到Ajax对象上
     @param callback:回调函数
     * */
    this.requestJson = function requestJson(config, data, callback) {

        var _c = null;
        var _d = null;
        var _fn = null;
        for(var i in arguments)
        {
            if(_c == null && this.isString(arguments[i]))
            {
                _c = {url:arguments[i]};
                continue;
            }
            if(_c == null && this.isObject(arguments[i]))
            {
                _c = arguments[i];
                continue;
            }
            if(_d == null && Rsd.isObject(arguments[i]))
            {
                _d = arguments[i];
                continue;
            }
            if(_fn == null && this.isFunction(arguments[i]))
            {
                _fn = arguments[i];
                continue;
            }
        }
        if (_fn == null) {

            _fn = void(0);
        }

        //Rsd.apply(config,{dataType:'json'})
        var _ajax = this.create('Rsd.data.Ajax', this.apply({key: this.getAppToken()}, _c));
        return _ajax.requestJson(_d, _fn);
    };

    /**
     *
     * @public
     * */
    this.sleep = function sleep(msec) {
        var start = new Date().getTime();
        while (true) if (new Date().getTime() - start > msec) break;
    };

    /**
     * @public
     * */
    this.toJson = function toJson(str) {

        if (str == null || this.getType(str) != '[object String]') {
            return str;
        }
        if (!str || str.length == 0) {
            return null;
        }
        var _data = null;
        try {
            _data = window.eval('(' + str + ')');

        } catch( ex) {

            try {
                _data = window["eval"].call(window, str);
            } catch (err) {
                _data= {msg:'JSON格式化失败',data:str,success:false};

                this.showHtml("JSON格式化失败", str);
            }
        }

        return _data;
    };

    /**
     * @public
     * */
    this.toString = function toString(obj) {

        if (obj == undefined) {
            return "null";
        }
        var r = [];
        if (typeof obj == "string") {
            return "\"" + obj.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
        }
        if (typeof obj == "object") {
            if (!obj.sort) {

                for (var i in obj) {
                    if (typeof (obj[i]) == 'function') {
                        continue;
                    }
                    r.push("\"" + i + "\":" + this.toString(obj[i]));
                }

                r = "{" + r.join() + "}"
            } else {
                for (var i = 0; i < obj.length; i++)
                    r.push(this.toString(obj[i]))
                r = "[" + r.join() + "]";
            }
            return r;
        }

        return obj.toString().replace(/\"\:/g, '":""');
    };

    /**
     * @description 将字符串转化为dom节点
     * @public
     * */
    this.toHtml = this.parseDom = function parseDom(str) {
        var objE = document.createElement('div');
        objE.innerHTML = str;
        return objE.childNodes;
    };

    /**
     * @public
     * */
    this.getType = function getType(obj) {
        return Object.prototype.toString.apply(obj);
    };

    /**
     *@public
     * */
    this.isEmpty = function isEmpty(obj) {


        if (obj == undefined || obj == null || obj == '') {
            return true;
        }
        if (obj instanceof Function) {
            return false;
        }
        if (obj instanceof Array) {
            return obj.length == 0
        }

        if (obj instanceof Date) {
            return false
        }
        if (Rsd && Rsd.common && Rsd.common.Object && obj instanceof Rsd.common.Object) {
            return false
        }
        if (obj instanceof HTMLElement) {
            return false;
        }
        if ( obj instanceof Node) {
            return false;
        }
        if (obj instanceof Object) {

            return Object.keys ? Object.keys(obj).length == 0 : JSON.stringify(obj) == "{}";
        }

        return false;
    };

    /**
     * @public
     * */
    this.isNull = function isNull(obj) {
        return this.getType(obj) == '[object Null]';

    };

    /**
     *@public
     *
     * */
    this.isNaN = function isNaN(obj) {
        if(window)
        {
            return window.isNaN(obj);
        }
        return Number.isNaN(obj);
    };

    /**
     * */
    this.isUndefined = function isUndefined(obj) {
        return this.getType(obj) == '[object Undefined]';
    };

    /**
     * @public
     * */
    this.isNullOrUndefined = function isNullOrUndefined(obj) {
        return this.isNull(obj) || this.isUndefined(obj);
    };

    /**
     * @public
     * */
    this.isBoolean = function isBoolean(obj) {
        return this.getType(obj) === this.getType(true);
    };

    /**
     * @public 是否为true
     * */
    this.isTrue = function isTrue(obj) {
 
        if (this.isNullOrUndefined(obj)) {
            return false;
        }
       
        if (this.isBoolean(obj)) {
            return obj==true;
        }

        if (this.isString(obj)) {
            return obj.toLowerCase() == 'true';
        }

        if(this.isNumber(obj))
        {
            new Boolean(obj) == true;
        }

        return new Boolean(obj) == true;
    };

    /**
     * @public
     * */
    this.isString = function isString(obj) {
        return this.getType(obj) === this.getType('');
    };

    /**
     * @public
     * @description 是否是数字
     * */
    this.isNumber = function isNumber(obj) {

        return !isNaN(Number(obj));
    };

    /**
     * @public
     * */
    this.isFunction = function isFunction(obj) {
        return obj instanceof Function;
    };
    /*
    *
    * */
    this.isArguments = function isArguments(obj) {
        return this.getType(obj) == this.getType(arguments);
    };

    /**
     * @public
     * @description 是否是原生态对象,Rsd.getType(obj) == this.getType({})
     * */
    this.isObject = function isObject(obj) {
        return this.getType(obj) == this.getType({});
    };

    /**
     * @public
     * @description  判断对象是否是数组
     * @return boolean
     * */
    this.isArray = function isArray(obj) {

        return this.getType(obj) == this.getType([]);
    };

    /**
     * @public
     * @description obj instanceof  type
     * @param {object} obj 对象
     * @param {class} type 类型名称
     * @return boolean
     * */
    this.isType = function isType(obj, type) {
        if(this.isString(type))
        {
            return this.getType(obj) == type;
        }
        return obj instanceof type || this.getType(obj) == '[object ' + type.name + ']';
    };

    /**
     * @public
     * @description获取提示语言
     * */
    this.lang = function lang(name) {
        var lang = this.create('Rsd.common.Lang', {});
        return lang.get(name);
    };

    /**
     * @public
     * @description getUserAgent*/
    this.getUserAgent = function getUserAgent() {
        return navigator.userAgent.toLowerCase();
    };

    /**
     * @public
     *@description 判断是否是移动端
     * */
    this.isMobile = function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    /**
     *
     * @public
     * @description 判断是否是Chrome浏览器
     * */
    this.isChrome = function isChrome() {
        return /\bchrome\b/.test(this.getUserAgent());
    };
    /**
     * @public
     * @description 判断是否是微信浏览器
     * */
    this.isWeChat = function isWeChat(){
 
        if(this.isEmpty(this.app) || this.isEmpty(this.app.appType))
        {
            if(navigator && navigator.userAgent)
            {
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i)=="micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }

        
    };
    /**
     * @description 判断是否是微信小程序 （this.app.appType == 'wxapp'）
     */
    this.isWeChatApp = function isWeChatApp(){

        return this.app && this.app.appType == 'wxapp'; 
    };
    /**
     * @public
     * @description Gets the classname of an object or function if it can.
     *  @description Otherwise returns the provided default.
     *
     */
    this.getFunctionName = function getFunctionName(fn, defaultName) {
        var nameFromToStringRegex = /^function \s?([^\s(]*)/;
        var result = "";
        if (typeof fn === 'function') {
            result = fn.name || fn.toString().match(nameFromToStringRegex)[1];
        } else if (typeof fn.constructor === 'function') {
            result = getFunctionName(fn.constructor, defaultName);
        }
        return result || defaultName;
    };

    /**
     * @public
     * */
    this.getCallStack = function getCallStack(count) {
        //var _stack = [];
        //console.trace()
        //return _stack ;
    };

    /**
     * @public
     * */
    this.print = function print(id) {
        if(this.isWeChatApp())
        {
            console.error('Wechat小程序环境下print方法不可用,无法打印。');
            return;
        }

        if (arguments.length == 0) {
            window.print();
            return;
        }
        var _list = [];
        var _node;
        for (var i in document.body.childNodes) {
            _node = document.body.childNodes[i];
            if (_node instanceof Element) {
                _list.push({node: _node, display: _node.style.display});
                _node.style.display = 'none';
            }

        }
        // A4 210mm* 297mm 1in=25.4mm
        var _dpi = this.getDPI();
        var _a4_width = _dpi.width * 210 / 25.4;
        document.body.style.width = _a4_width + 'px';
        alert(document.body.style.width);
        var _div = document.getElementById(id);
        var _temp = document.createElement('div');
        _temp.innerHTML = _div.innerHTML;
        document.body.appendChild(_temp);
        window.print();
        document.body.removeChild(_temp);
        for (var i in _list) {
            _list[i].node.style.display = _list[i].display;
        }
        return;
    };

    /**
     * @public
     * @description 复制数据到剪贴板
     * */
    this.copy = function copy(data) {

        if(this.isWeChatApp())
        {
            console.error('Wechat小程序环境下copy方法不可用，无法复制数据。');
            return ;
        }
        var currentFocus = document.activeElement;

        if (window.clipboardData && window.clipboardData.setData('Text', data)) // 赋予 text 格式的数据
        {
            this.showPopup("复制成功!");
            return;
        }

        var _text_for_copy = document.getElementById('rsd_text_for_copy');
        if (_text_for_copy == null) {
            _text_for_copy = document.createElement('textarea');
            _text_for_copy.setAttribute('id', 'rsd_text_for_copy');
            //_text_for_copy.style.width ='0px';
            // _text_for_copy.style.height ='0px';
            _text_for_copy.style.position = "absolute";
            _text_for_copy.style.left = "-9999px";
            _text_for_copy.style.top = "0";


            document.body.appendChild(_text_for_copy);
        }


        _text_for_copy.textContent = data;
        _text_for_copy.setSelectionRange(0, _text_for_copy.value.length);
        _text_for_copy.focus();
        _text_for_copy.select();
        var _flag = document.execCommand != undefined;
        try {
            //第一始终失败
            _flag = document.execCommand('copy');
            //第二次成功
            _flag = _flag || document.execCommand('copy');

        } catch (err) {
            this.error("复制数据失败", "", err);
        }

        if (_flag) {
            this.showPopup("复制成功！");

        } else {
            var _d = this.create('Rsd.container.Dialog', {width: 600, height: 420, layout: 'fit', title: '复制数据'});
            var _t = this.create('Rsd.control.TextArea', {height: 350, value: data, margin: '5 5 5 5'});
            _d.add(_t);
            _d.showDialog();
            _t.focus();
            _t.select();
        }
        if (currentFocus && typeof currentFocus.focus === "function") {
            currentFocus.focus();
        }
        document.body.removeChild(_text_for_copy);

        return;

    };


    /**
     * @public
     * @description 显示等待窗口
     * */
    this.showWaiting = function showWaiting(key, parent) {
        var _key = key || (parent && parent.id) || Math.random();
        if (this.isEmpty_key) {
            throw new Erorr('key is null. Rsd.showWaiting=function closeWaiting(key, parent)');
        }
        var me = Rsd || this;
        setTimeout(function (parent) {
            me.__waitings = me.__waitings || {};
            if (!me.__waitings[_key]) {
                me.__waitings[_key] = me.create('Rsd.container.WaitingBox', {
                    message: me.lang('rsd.waiting'),
                    border: false
                });
            }
            me.__waitings[_key].showDialog(document.body);
        }, 0);
        return _key;
    };

    /**
     * @public
     @description 关闭等待窗口
     * */
    this.closeWaiting = function closeWaiting(key, delay) {
        if (this.isEmpty(key)) {
            throw new Erorr('key is null. Rsd.closeWaiting=function closeWaiting(key, delay)');
        }
        var me = Rsd || this;
        setTimeout(function () {
            if (me.__waitings && me.__waitings[key]) {
                me.__waitings[key].close();
                delete me.__waitings[key];
            }
        }, (delay == undefined || delay == null) ? 500 : delay);
    };

    /**
     *@public
     * */
    this.showModalDialog = function showModalDialog(url, title, height, width, data) {

        if (window.showModalDialog) {
            window.showModalDialog(url);
        }
        else {
            var _h = height || 400;
            var _w = width || 500;
            var _params = 'height=' + _h + ', width=' + _w + ', top=' + (((window.screen.height - _h) / 2) - 50) + ',left=' + ((window.screen.width - _w) / 2) + ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
            window.open(url, title, _params);
        }
    };

    /**
     * @public
     * */
    this.get = function get(id) {
        return this.objects[id];
    };

    /**
     * @public
     * */
    this.getDom = function getDom(id) {
        if(this.isWeChatApp())
        {
            console.error('小程序getDom方法不可用，无法获取dom对象。');
            return {};
        }
        return document.getElementById(id);
    };

    /*
    *
    * */
    this.getFileExt = function getFileExt(url) {
        var file = url;

        var FileExt = file.replace(/.+\./, "");   //正则表达式获取后缀
        return FileExt;
    };

    /**
     * */
    this.getFileName = function getFileName(url) {
        var file = url;
        var pos = file.lastIndexOf('/');
        file = file.substring(pos + 1);
        pos = file.lastIndexOf('.');
        return file.substring(0, pos);
    };

    /**
     * @public
     * @desc 映射成当前网站网站目录
     * */
    this.mappingUrl = function mappingUrl(url) {
        if (this.isNullOrUndefined(this.__homePath )) {
            this.__homePath = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname + '/';
        }
        return  this.__homePath + url;
    };
    /*
    * RedjsHost是否是代理服务器
    * */
    this.isAgentHost = function isAgentHost( ) {
        return this.__isAgentHost || false;
    };
    /**
     *@public
     *@description 获取redjs框架服务器地址，支持将框架部署在远程服务器上
     * */
    this.getRedjsHost = function getRedjsHost() {
 
        if (this.isNullOrUndefined(this.__jsHomePath )) {

            if(this.isWeChatApp())
            {
                console.error('Wechat小程序环境下getRedjsHost方法不可用,默认返回：https://js.redmicro.cn。');
                return 'https://js.redmicro.cn';
            }

            var result = ""

            var e = Error('redjs');
            if (e.fileName) {//firefox
                result = e.fileName;
            } else if (e.sourceURL) {//safari
                result = e.sourceURL;
            } else if (e.stacktrace) {//opera
                var m = e.stacktrace.match(/\(\) in\s+(.*?\:\/\/\S+)/m);
                if (m && m[1])
                    result = m[1];
            }
            if (!result) {//IE与chrome
                var scripts = document.getElementsByTagName("script");
                var reg = /rsd([.-]\d)*\.js(\W|$)/i
                for (var i = 0, n = scripts.length; i < n; i++) {
                    var src = !!document.querySelector ? scripts[i].src : scripts[i].getAttribute("src", 4);
                    if (src && reg.test(src)) {
                        result = src
                        break;
                    }
                }
            }
            var _path = result.substr(0, result.lastIndexOf('/') + 1);

            var _d = _path.split('/');
            this.__jsHomePath = _path.replace(_d[_d.length - 1], '');
        }
        if(window.location.protocol=='https:' && this.__jsHomePath.startsWith('http://'))
        {
            this.__jsHomePath = 'https://' + this.__jsHomePath.substring(7);
        }
        if(window.location.protocol=='http:' && this.__jsHomePath.startsWith('https://'))
        {
            this.__jsHomePath = 'http://' + this.__jsHomePath.substring(8);
        }
        return this.__jsHomePath;
    };
    /*
    * */
    this.getRedjsUrl = function getRedjs(url) {
        if(this.isAgentHost())
        {
            return this.getRedjsHost() +  this.UTF8ToBase64(url);
        }
        else
        {
            return this.getRedjsHost() + url;
        }
    }
    /**
     *@public
     *@description重定向
     * */
    this.redirect = function redirect(url) {
        window.location.href = url;
    };

    /**
     * @public
     * @description 获取url参数
     * */
    this.getUrlParam = function getUrlParam(url, name) {
        var _url = '';
        var _name = name;
        if (arguments.length == 1) {
            _url = window.location.search.substr(1);
            _name = arguments[0];
        }
        if (arguments.length > 1) {
            var _list = (url || '?').split('?');
            _url = _list[_list.length - 1];
            _name = name;
        }
        var reg = new RegExp("(^|&)" + _name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = _url.match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    };

    /**
     *
     *@public
     *@description 设置url参数
     * */
    this.setUrlParam = function setUrlParam(name, value) {
        // var _url = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname + '/';
        var _params = {};
        if (arguments.length == 1 && this.isObject(arguments[0])) {
            _params = arguments[0];
        }
        if (arguments.length == 2) {

            if (this.getUrlParam(name) == value) {
                return;
            }
            else {
                _params[name] = value;
            }
        }

        var currentUrl = window.location.href.split('#')[0];

        for (var i in _params) {
            var _name = i;
            var _value = _params[i];

            if (/\?/g.test(currentUrl)) {
                var exp = new RegExp(_name + '=[-\\w]{4,100}');
                if (exp.test(currentUrl)) {
                    currentUrl = currentUrl.replace(exp, _name + "=" + _value);
                } else {
                    currentUrl += "&" + _name + "=" + _value;
                }
            } else {
                currentUrl += "?" + _name + "=" + _value;
            }
        }

        if (window.location.href.split('#')[1]) {
            window.location.href = currentUrl + '#' + window.location.href.split('#')[1];
        } else {
            window.location.href = currentUrl;
        }
    };

    /**
     *@public
     * */
    this.getByteLength = function getByteLength(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^x00-xff]/ig) != null) //全角
                len += 2;
            else
                len += 1;
        }
        ;
        return len;
    };

    /**
     * @public
     * @description 调用方法执行
     * @param {Rsd.common.Object} caller,
     * @param {function|string} fn,
     * @param {array} args []
     * */
    this.callFunction = function callFunction(caller, fn, args) {
        var _caller = null;
        var _fn = null;
        var _args = null;

        for(var i=0;i< arguments.length;i++)
        {
            if (this.isFunction(arguments[i]) || this.isString(arguments[i])) {
                _fn = arguments[i];
                continue;
            }
            if (arguments[i] instanceof Rsd.common.Object) {
                _caller = arguments[i];
                continue;
            }
            if (this.isArray(arguments[i]) ) {
                _args = arguments[i];
                continue;
            }
            if(_args==null && this.isArguments(arguments[i]))
            {
                var _args = Array.prototype.slice.call(arguments[i]);
                continue;
            }
        }

        if (this.isFunction(_fn)) {

            return _fn.apply(_caller || window.Rsd, _args||[]);
        }
        if (this.isString(_fn)) {
            if (!(_caller instanceof Rsd.common.Object)) {
                this.error('argument caller is not instanceof Rsd.common.Object,when call function callFunction(caller,fn,args).');
                return true;
            }
            return _caller.funApplyByIOC(_fn, _args||[]);
        }
        return null;
    };

    /**
     @public
     @description 获取字符宽度，像素值
     @param val：文本,
     @param size：单个英文字符文本宽度（像素）
     @return 文本宽度
     @type Number
     * */
    this.getStringWidth = function getStringWidth(container, str) {
        var span = document.createElement("span");
        var _parent = container || document.body;
        _parent.appendChild(span);
        span.style.visibility = "hidden";
        span.style.whiteSpace = "nowrap";
        span.innerText = str;
        var _width = span.offsetWidth;
        _parent.removeChild(span);
        return _width;
    };

    /**
     * @public
     *  @description 货币格式化，不做四舍五入处理
     *  @param {number} num 金额
     *  @param {string} currency 货币符号 ￡(英镑) ￥(人民币,日元) €(欧元) ＄(美元)
     *  @return string
     * */
    this.formatCurrency = function formatCurrency(num, currency) {
        if (num == undefined || num == null) {
            return "";
        }
        num = num.toFixed(2);
        //num = this.toString(num);
        var str = (currency || '') + num.split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('');
        return str;
    };

    /**
     * @public
     * @description 金额小写转大写
     * */
    this.formatCurrencyCN = function formatCurrencyCN(num) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
        var head = num < 0? '欠': '';
        num = Math.abs(num);

        var s = '';

        for (var i = 0; i < fraction.length; i++)
        {
            s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        num = Math.floor(num);

        for (var i = 0; i < unit[0].length && num > 0; i++)
        {
            var p = '';
            for (var j = 0; j < unit[1].length && num > 0; j++)
            {
                p = digit[num % 10] + unit[1][j] + p;
                num = Math.floor(num / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');

    };

    /**
     * @public
     * @description 时间转化
     * @param {Number|String} timestamp
     * @param {string} [format] 格式：yyyy-MM-dd|yyyy-MM-dd hh:mm:ss|yyyy-MM-dd hh:mm:ss S
     * */
    this.formatTimestamp = function formatTimestamp(timestamp, format) {
        var _s = timestamp;
        if (this.isString(_s)) {
            _s = Number(_s);
        }
        if (this.isNumber(_s)) {
            return new Date(_s).format(format || 'yyyy-MM-dd hh:mm:ss');
        }
        return timestamp;
    };

    /**
     * @public
     * @description 数字格式化
     * @param {Number|String} value
     * @param {Number} precision
     * */
    this.formatNumber = function formatNumber(value, precision) {
        var _n = Number(value);
        if (isNaN(_n)) {
            return 0;
        }
        return _n.toFixed(precision || 0);
    };

    /**
     * @public
     * @description 格式化json
     * @param {string|object} json
     * @param {Function|String|Number} [replacer]
     * @param {Number|String} [space]
     * */
    this.formatJson = function formatJson(json, replacer, space) {
        return JSON.stringify(json, replacer || null, space || 4);
    };

    /**
     * @public
     * @description 检测浏览器及其版本
     * */
    this.detectNavigator = function detectNavigator() {

        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? this.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? this.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? this.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? this.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? this.safari = s[1] : 0;

        //以下进行测试
        if (this.ie) return ('IE: ' + this.ie);
        if (this.firefox) return ('Firefox: ' + this.firefox);
        if (this.chrome) return ('Chrome: ' + this.chrome);
        if (this.opera) return ('Opera: ' + this.opera);
        if (this.safari) return ('Safari: ' + this.safari);
    };

    /**
     * @public
     @description 检查操作系统
     * */
    this.detectOS = function detectOS() {
        var sUserAgent = navigator.userAgent;
        var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
        var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
        if (isMac) return "Mac";
        var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
        if (isUnix) return "Unix";
        var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
        if (isLinux) return "Linux";
        if (isWin) {
            var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
            if (isWin2K) return "Win2000";
            var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
            if (isWinXP) return "WinXP";
            var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
            if (isWin2003) return "Win2003";
            var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
            if (isWinVista) return "WinVista";
            var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
            if (isWin7) return "Win7";
        }
        return "other";

    };

    /**
     *@public
     * @description 数组拼接
     * arr1,arr2.... arr n
     * */
    this.arrayConcat = function arrayConcat(arr1, arr2) {
        var _arr = [];

        for (var i in arguments) {
            if (this.isArray(arguments[i])) {
                Array.prototype.push.apply(_arr, arguments[i]);
            }

        }

        return _arr;
    };
    /*
    * */
    this.label = function label(text, color,tip) {

        var _lbl = document.createElement('label');
        _lbl.classList.add('x-text-label');
        _lbl.innerHTML = text;
        if(Rsd.isString(tip))
        {
            _lbl.title = tip;
        }
        if(!this.isEmpty(color))
        {
            _lbl.style.backgroundColor = color;
            _lbl.style.borderColor = color;
        }
        return _lbl;
    };
    /**
     * @public
     *@description 生成text HtmlElement
     * @param {string} text 文本信息
     *  @param {number} width 宽度
     *   @param {string} color 文本颜色
     * */
    this.text = function text(text, width, color,tip) {
        var _t = text || '';
        var _w = width||0;
        var _c = color || 'grey';
        if(arguments.length == 2)
        {
            if(this.isString(_w)) {
                _c = _w;
                _w = 0;
            }
        }
        if (_w > 0) {
            return this.parseDom('<span style="display: inline-block;overflow:hidden;color:' + _c + ';max-width: ' + _w + 'px;">' + _t + '</span>')[0];
        }
        var txt = this.parseDom('<span style="color:' + _c + ';">' + _t + '</span>')[0];
        if(Rsd.isString(tip))
        {
            txt.title = tip;
        }
        return txt;
    };

    /**
     * @public
     * @description 创建圆dom对象 function circle(size, color)
     * */
    this.circle = function circle(size, color) {
        var _s = size || 10;
        var _c = color || 'green';

        return this.parseDom('<div class="x-icon_circle" style="width: ' + _s + 'px;height: ' + _s + 'px;background-color: ' + _c + ';"></div>')[0];
    };

    /**
     * @public
     * @description 创建空格dom对象
     * */
    this.blankspan = function blankspan(count,style) {
        var _c = count || 1;
        var _s = '';
        for (var i = 0; i < _c; i++) {
            _s = _s + '&nbsp;';
        }
        var span =  this.parseDom('<span>' + _s + '</span>')[0];
        this.setElStyle(span,style||{});
        return span;
    };

    /**
     * @public
     * @description 创建换行dom对象
     * */
    this.newLine = function newLine() {
        return  this.parseDom('<br>')[0]
    };

    /**
     * @public
     * @description 创建buttom(a)对象，function (text,fn,caller,args)
     * @param {string|object}  text 文字信息
     * @param {string|function} fn 点击事件函数
     * @param {object}  caller 调用对象
     * @param {array}  args fn参数
     * @param {object} style 样式对象{text:'',backroud}
     * */
    this.button = function button(text, fn, caller, args,style,tip) {
        var me = Rsd||this;
        var btn = document.createElement('a');
        btn.classList.add('x-text-button');
        btn.href = 'javascript:void(0);';
        btn.innerHTML = text;
        if(Rsd.isString(tip))
        {
            btn.title = tip;
        }
        this.setElStyle(btn,style||{});
        if (me.isEmpty(fn)) {
            btn.title = "暂不可操作。";
            btn.classList.add("x-control-disabled");
        }
        else {
            btn.onclick = function () {
                me.callFunction(caller, fn, args);
            };
        }

        return btn;
    };
    /**
     * @description 空白透明PNG 图片base64编码
     * */
    this.emptyImage = function emptyImage() {
        return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    };
    /**
     *  @public
     * @description 创建mailTo dom对象
     * */
    this.mailTo = function mailTo() {
        console.error('暂未实现。')
        return [];
    };

    /**
     * @public
     * @description md5加密
     * */
    this.md5 = function md5(str) {

        if ($.md5) {
            return $.md5(str);
        }
        else {
            this.error('$.md5(jquery md5插件) 加密插件不存在。')
        }
        return null;
    };

    /**
     * @public
     * @description 是否包含属性 name ，含其原型的属性。
     * */
    this.hasProperty = function hasProperty(obj, name) {
        if (obj && obj instanceof Object) {
            return name in obj;
        }
        return false;
    };

    /**
     *
     * @desc 清空dom对象
     * */
    this.empty = function empty(ctrl) {

        if (this.isType(ctrl, Element)) {
            if (ctrl.childNodes && ctrl.childNodes.forEach) {
                ctrl.childNodes.forEach(function (node) {
                    ctrl.removeChild(node);
                });
                return;
            }
            ctrl.innerHTML = null;
        }

    };

    /**
     *@description 查询dom
     * @param {dom} dom
     * @param {string} express
     * */
    this.select = function select(dom,express)
    {
        var _doc = dom;
        var _express = express;

        if(arguments.length == 1)
        {
            _express = arguments[0];
            _doc = document;

        }
        return _doc.querySelectorAll(_express);
    };

    /**
     *@description 设置dom 元素style属性值
     * */
    this.setElStyle=function setElStyle(el,style,sizeUnit)
    {
        var _dom = el;
        var _style = style||{};
        //
        if (_dom instanceof Element||_dom instanceof  Node) {
            var _sizeUnit = this.isEmpty(sizeUnit) ? 'px':sizeUnit;

            var _list = [
                'width',
                'height',
                'minWidth',
                'minHeight',
                'lineHeight',
                'top',
                'right',
                'bottom',
                'left',
                'marginTop',
                'marginRight',
                'marginBottom',
                'marginLeft'
            ];
            var _p = null;

            for (var i in _list) {

                _p = _list[i];
                if (this.isNullOrUndefined(_style[_p])) {

                    continue;
                }

                if (this.isString(_style[_p])) {
                    if (_style[_p].endWith('%') || _style[_p].endWith('px') || _style[_p].endWith('rem') || _style[_p].endWith('em')) {

                        continue;
                    }

                    _style[_p] = parseFloat(_style[_p]) + _sizeUnit;

                    continue;
                }
                if (this.isNumber(_style[_p])) {

                    _style[_p] = _style[_p] + _sizeUnit;

                    continue;
                }

            }

            if (_dom.style.setProperty) {

                for (var p in _style) {

                    if (/^[0-9a-z]*$/.test(p)) {
                        _dom.style.setProperty(p, _style[p], 'important');
                    } else {

                        var _l = p.match(/[A-Z]/g);
                        var _new_p = p;
                        for (var i in _l) {
                            _new_p = _new_p.replaceAll(_l[i], '-' + _l[i].toLowerCase());
                        }

                        _dom.style.setProperty(_new_p, _style[p], 'important');

                    }

                }
            } else {
                this.apply(_dom.style, _style);
            }
        }
    };

    /**
     * testUrl:健康探测 API
     * services:[{group:'',url:'',useSSL:true}]
     */
    this.loadServices = function loadServices(testUrl,services)
    {

        if(!Rsd.isString(testUrl))
        {
            console.error('testUrl 不是有效的值',testUrl);

            return;
        }
        Rsd.services=Rsd.services||{};

        var servicesList = [];
        if(Rsd.isArray(services))
        {
            servicesList=services;
        }
        else
        {
            servicesList.push(services);
        }

        for(var i in servicesList)
        {
            var _s = servicesList[i];
            _s.api={};
            Rsd.services[_s.group]=_s;
        }

        var _timer = 0;

        var _load = function(data)
        {
            if(data.code =="-1" && _timer<4)
            {
                setTimeout(_test,200);
                return true;
            }

            //探测成功

        };
        var _textFail = function()
        {

            if(_timer<4)
            {
                setTimeout(_test,500);
            }else
            {
                Rsd.warn('系统繁忙，稍后再试')
            }

        };

        var _test = function()
        {
            _timer++;
            console.log('第'+ _timer.toString() + '次:探测（url:'+testUrl+'）远程服务。');
            Rsd.requestJson({url:testUrl,method:'POST',fail:_textFail},{},_load,'连接远程服务');
        };

        _test();

    };
    /**
     * @description  加载controller 的方法
     * */
    this.loadServiceApi = function loadServiceApi(service,callback) {

        service.isLoading = true;

        var _group = service.group.toLowerCase();
        var _ssl = service.useSSL;

        //console.log('load =>' + _group);

        Rsd.request({ url: service.url}, {}, function(data) {

            var list = data.data;

            for(var j in list)
            {
                var item = list[j];
                
                if (item.IsWebMethod)
                {
                    if(!Rsd.isString(item.Url))
                    {
                        console.error('属性Url的值（'+item.Url+'）无效',item);
                        item.Url = ''; 
                    }
                    if( _ssl && item.Url.startWith('http://'))
                    { 
                        item.Url = 'https://' + item.Url.substr(7);
                    }

                    var config = {
                        key:_group + '.' + item.Name.toLowerCase(),
                        name:item.Name.toLowerCase(),
                        group:_group,
                        text:item.Description,
                        parent : Rsd.app,
                        errorHandler :service.errorHandler||'',
                        failureHandler : service.failureHandler||'',
                        successHandler : service.successHandler||'',
                        progressHandler: service.progressHandler||'',
                        ajaxType:service.ajaxType ||'ajax',
                        local:{method:'get',url:''},
                        server:{
                            url:item.Url||'',
                            method:'POST',
                            //contentType:'application/json',
                            //dataType: 'json',
                            async:true
                        }
                    }
                    Rsd.services[_group].api[item.Name.toLowerCase()] = new Rsd.data.Service(config);;
                }
            }
            service.isLoading = false;

            //console.log('loaded =>' + _group);
            if(Rsd.isFunction(callback))
            {
                callback.call(service,data);
            }

        },'加载服务');
    };

    /**
     *
     * @description 请求API服务
     * @param name
     *
     * */
    this.requestService = function requestService(name, data, callback,msg,timeout) {

        if(Rsd.isEmpty(name))
        {
            throw new Error('param [name] is null when call  Rsd.requestService method.');
        }
        var _name = name.toLowerCase();
        var _group = _name.substr(0,_name.lastIndexOf('.'));
        var _method = _name.substr(_name.lastIndexOf('.')+1);


        var service = Rsd.services[_group];

        if(Rsd.isEmpty(service) )
        {
            var _error =  '服务['+ name +']不存在,请先注册';
            Rsd.warn(_error);
            console.error(_error);
            return;
        }

        var _fn = function () {

            var api = service.api[_method];
            if(Rsd.isEmpty(api))
            {
                var _error =  '服务['+ name +']不存在,请确认';
                Rsd.warn(_error);
                console.error(_error);
                return;
            }
            //msg 提示信息 未实现
            console.log('request =>'+ name);
            
            api.requestJson(data,callback);

        }
        var _timer = 0;
        var _request = function () {

            if(service.isLoading)
            {
                //如果正在加载服务 延时200毫秒 最多延时5次
                _timer++;
                if(_timer>5)
                {
                    Rsd.warn('系统繁忙，请稍后再试');
                    return;
                }
                console.log(_timer + '- call '+_name + ' => ' + service.group + ' loading api' );
                setTimeout(_request,200);
            }
            else
            {
                _fn();
            }

        }
        if(Rsd.isEmpty(service.api))
        {

            if(service.isLoading)
            {
                _request();
            }
            else
            {
                Rsd.loadServiceApi(service,_fn);
            }

        }else
        {
            _fn();
        }

    };
}