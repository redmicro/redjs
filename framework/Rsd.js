/*
 * 
 */
String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    return this.substring(this.length - s.length) == s;
};

/*
 * */
String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    return this.substr(0, s.length) == s;
};

/*
 * */
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};

/*
 * */
String.prototype.format = function format(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}


/**
 * @description 删除左边的空格
 */
String.prototype.ltrim=function() {
    return this.replace(/(^\s*)/g,'');
}
/**
 * @description 删除右边的空格
 */
String.prototype.rtrim=function() {
    return this.replace(/(\s*$)/g,'');
}

/**
 * @description 值有效性判断
 * */
Date.prototype.isValid =function isValid( ) {
    return !(this == 'Invalid Date');
};

/**
*
* @description 格式：yyyy-MM-dd
* */
Date.prototype.format = function format(fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };

    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/*
*
* */
Date.prototype.getWeek = function getWeek() {
    var result;
    var now = new Date();
    var day;
    switch (now.getDay()) {
        case 0:
            day = "日";
            break;
        case 1:
            day = "一";
            break;
        case 2:
            day = "二";
            break;
        case 3:
            day = "三";
            break;
        case 4:
            day = "四";
            break;
        case 5:
            day = "五";
            break;
        case 6:
            day = "六";
            break;
    }
    return '星期'+ day;
};

"use strict";
(function () {

    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var _fn =  function resize() {

        var _rsd = window.Rsd||Rsd||{};
        _rsd.events.fire(null,resizeEvt,arguments);

    };


    if (window && window.addEventListener) {
        window.addEventListener(resizeEvt, _fn, false);
    }

    //初始化
    window.Rsd = window.Rsd||{};

    if(window.Rsd.apply==undefined)
    {
        window.Rsd.apply = function apply(obj,config){
            var _obj = obj||{};
            var _config = config||{};
            for (var i in _config) {
                _obj[i] = _config[i];
            }
            return _obj;
        };
    }
    if (document && document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function () {
            var _rsd = window.Rsd||{};
            _rsd.__readyTime = new Date().getTime();
        }, false);
    }

    var getUrl = function getUrl() {
        if(Rsd.__jsHomePath)
        {
            return Rsd.__jsHomePath;
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
        if (!result && document && document.getElementsByTagName) {//IE与chrome
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
        return result;
    };

    var getUrlParam = function getUrlParam(url,name) {

            var _list = (url || '?').split('?');
            var _url = _list[_list.length - 1];
            var _name = name;

            var reg = new RegExp("(^|&)" + _name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = _url.match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值

        };

    var _url = getUrl();
    var _host = _url.substr(0, _url.lastIndexOf('/') + 1);
    //多版本控制，v表示指定版本目录；如v=3.0.0 ,则框架加载目录为http://js.redmicro.cn/3.0.0/;不设置v 表示最新版本
    var _v = getUrlParam(_url,'v');
    if(_v)
    {
        _host = _host + _v + '/';
    }

    if(document && document.getElementById)
    {
        var scriptArgs = document.getElementById('Redjs');

        if(!scriptArgs)
        {
            scriptArgs = document.getElementById('redjs');
        }
        if(!scriptArgs)
        {
            scriptArgs = document.getElementById('REDJS');
        }
        if(scriptArgs)
        {
            window.Rsd.projectId = scriptArgs.getAttribute('appId') || 'TS-' + Rsd.timestamp;
            window.Rsd.token = scriptArgs.getAttribute('token') || 'NO Token';
        }
    }


    var _appConfig = null;

    if(window.Rsd.createApplication == undefined) {
        window.Rsd.createApplication = function createApplication(config) {

            _appConfig = config;
        }
    }

    var init = function (c) {

        var _rsd = window.Rsd||{};
        delete  _rsd.onReady;
        delete  _rsd.createApplication;

        var _jsConfig = _rsd.apply({
            id:'redjs',
            version: '3.0.0',
            copyRight:'@redmicro',
            releaseTime:'2018-08-17 01:07:33',
            timestamp:new Date().getTime(),
            author: 'red micro',
            domFlag:'redjs',
            domFlagValue:'',
            defaultType:'container',
            isDebug: false,
            isDemo:false,
            app: null,
            types: {},
            classes: {},
            classesCallback:{},
            xtypes: {},
            objects: {},
            singletons: {},
            __readyTime:0,
            __id: 0,
            __zIndex: 9000
        },c);

        /**
         *
         *@global
         *
         * */
        window.Rsd = new Redjs(_jsConfig);

        window.Rsd.apply(window.Rsd, _rsd);

        /*
        *
        * */
        Rsd.defineEventListener();
        /*
        * */
        Rsd.defineConsole();
        /*
        * */
        Rsd.defineClassList(Element);
        /*
        * */
        Rsd.defineFullScreen();
        /*
        * */
        Rsd.defineRem(Rsd.isMobile()?640:800);

        window.$class = Rsd.define;
        window.$lang = Rsd.lang;
        window.$blank = Rsd.blankspan;
        window.$new = Rsd.create ;
        window.$popup = Rsd.popup=Rsd.showPopup;
        window.$msg = Rsd.msg=Rsd.showMessage;
        window.$yesOrNo = Rsd.yesOrNo;
        window.$btn = Rsd.btn = Rsd.button ;
        window.$txt = Rsd.txt  = Rsd.text;
        window.$empty = Rsd.isEmpty;
        window.$app = Rsd.createApplication;
        window.$RMB = window.$rmb = Rsd.formatCurrency;

        if(_appConfig != null)
        {
            window.$app(_appConfig);
        }

    };

    var _fn = function () {};

    var _sys_event = function () {
        var me = Rsd;

        if(document && document.body)
        {
            document.body.onkeydown = function (event) {

                if (event.code == 'Enter') {

                }
                if (event.code == 'Escape') {
                    Rsd.events.fire(document.body,'click',[event]);

                }
                if (event.code == 'ArrowUp') {

                }
                if (event.code == 'ArrowDown') {

                }

                var _key = '';
                if (event.altKey) {
                    _key = 'alt';
                }
                if (event.shiftKey) {
                    _key = 'shift';
                }
                if (event.ctrlKey) {
                    _key = 'ctrl';
                }
                if (me.isEmpty(_key)) {
                    me.exeHotKeyFun(event.code);
                } else {
                    me.exeHotKeyFun(_key + '+' + event.code);
                }
            };

            document.body.onclick = function (event) {

                if (event.isCancel) {
                    return;
                }

                Rsd.events.fire(document.body,'click',[event]);


            };
        }


    };

    if(window && window.Config && window.Redjs) {
        var _c = new Config();
        _c.timestamp = new Date(Date.parse(_c.releaseTime.replace(/-/g,"/"))).getTime();
        init(_c);
        var me = Rsd;

        var _url = 'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.0.min.js';
        _url = Rsd.getRedjsUrl('/plugin/jquery/jquery-3.2.0.min.js');
        me.loadScriptFile(_url, function () {});

         _fn = function domLoaded( ) {
             _sys_event();
        }

    }else {

        var loadRedjs = function loadRedjs(url, callback) {

            var _new_url = (_host || '') + url;
            // 创建ajax对象
            var xhr = null;
            if (window && window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else {
                xhr = new ActiveXObject('Microsoft.XMLHTTP')
            }

            if (window && Rsd.__isAgentHost) {
                var _code = window.btoa(unescape(encodeURIComponent(url)));
                _new_url = Rsd.__jsHomePath + _code;
            }
            xhr.open('GET', _new_url, true);
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            //xhr.setRequestHeader("Content-type", 'application/x-javascript; charset=utf-8'); // 开启后会出现 OPTIONS 请求
            xhr.send(null);

            //处理返回数据
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var str = xhr.responseText;

                        try {

                            window["eval"].call(window, str);

                        } catch (e) {
                            console.error('load file error[' + _new_url + ']');
                            console.error(e);
                        }

                        if (callback) {
                            callback.call();
                        }

                    } else {
                        console.error('Failed to load resource: ' + _new_url + '(' + xhr.status + ")");
                    }
                }
            }
        };

         _fn = function domLoaded() {
            loadRedjs('config.js' + '?t=' + new Date().getTime(), function () {

                var _c = new Config();
                _c.timestamp = new Date(Date.parse(_c.releaseTime.replace(/-/g, "/"))).getTime();
                var _redjsUrl = 'Redjs.js' + '?t=' + _c.timestamp;

                loadRedjs(_redjsUrl, function () {
                    init(_c);
                    var me = Rsd;

                    var _url = 'http://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.0.min.js';
                    _url = Rsd.getRedjsUrl('/plugin/jquery/jquery-3.2.0.min.js');
                    me.loadScriptFile(_url, function () {});

                    _sys_event();

                });
            });
        };
    }
    if (document && document.addEventListener) {

        document.addEventListener("DOMContentLoaded", _fn, false);
    }
})();



"use strict";
(function () {

    if( window.Rsd.Logger)
    {
        window.Rsd.Logger.info('Licence',{projectId: window.Rsd.projectId,token: window.Rsd.token});
        window.Rsd.Logger.send('Redjs');
    }

})();



