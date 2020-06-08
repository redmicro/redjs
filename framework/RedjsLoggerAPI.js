/**
 * Created by seeker910 on 2018/2/23.
 */
window.Rsd = window.Rsd || {};

/*
* */
window.Rsd.startLog = function startLog(callback) {

    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {

            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
    //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        })
    }
    else if (document.lastChild == document.body) {
        callback();
    }
}

/**
 * @constructor
 * @param {string} appId 绑定项目
 * @param {string}token 加密串
* */
window.Rsd.LogApi = function LogApi(appId,token,app) {

    this.projectId = appId;
    this.from = app;
    this.token = token;
    this.user = null;
    this.__errorEntries =  [];
    this.__warnEntries =  [];
    this.__debugEntries =  [];
    this.__infoEntries =  [];
    this.__pvEntries =  [];
    this.__clickEntries = [];
    this.__timing = null;
    this.__navigation = null;
    this.__memoryEntries = [];

};
/*
*
* */
window.Rsd.LogApi.prototype.setUser=function setUser(user) {
    this.user = user;
};
/*
 * @url 事件发生所在页面
 * */
window.Rsd.LogApi.prototype.error =function error(msg,ex) {
    if (msg || ex) {
        this.__errorEntries = this.__errorEntries || [];
        this.__errorEntries.push({
            data: JSON.stringify(ex),
            message: msg,
            projectId: this.projectId,
            logTime: new Date().getTime()
        });

        this.send(this.user || 'Redjs');
    }
    return this;
};
/*
 * @url 事件发生所在页面
 * */
window.Rsd.LogApi.prototype.warn = function warn(msg,data) {
    if (msg || data) {
        this.__warnEntries = this.__warnEntries || [];
        this.__warnEntries.push({
            data: JSON.stringify(data),
            message: msg,
            projectId: this.projectId,
            logTime: new Date().getTime()
        });
        this.send(this.user || 'Redjs');
    }
    return this;
};
/*
 * @url 事件发生所在页面
 * */
window.Rsd.LogApi.prototype.debug = function debug(msg,data) {
    if (msg || data) {
        this.__debugEntries = this.__debugEntries || [];
        this.__debugEntries.push({
            data: JSON.stringify(data),
            message: msg,
            projectId: this.projectId,
            logTime: new Date().getTime()
        });
        this.send(this.user || 'Redjs');
    }
    return this;
};
/*
 * @url 事件发生所在页面
 * */
window.Rsd.LogApi.prototype.info = function (msg,data) {
    if (msg || data) {
        this.__infoEntries = this.__infoEntries || [];
        this.__infoEntries.push({
            data: JSON.stringify(data),
            message: msg,
            projectId: this.projectId,
            logTime: new Date().getTime()
        });
        this.send(this.user || 'Redjs');
    }
    return this;
},
/*
* 开始执行 标记
* */
window.Rsd.LogApi.prototype.markStart = function markStart(name) {
    var _per = window.performance;
    if (_per) {
        _per.mark(name + '_start');
    }
    return this;
};
/**
 * 执行结束 标记
 * */
window.Rsd.LogApi.prototype.markEnd=function markEnd(name) {
    var _per = window.performance;
    if (_per) {
        _per.mark(name + '_end');
    }
    return this;
},
/**
* 计算 执行时长
* */
window.Rsd.LogApi.prototype.measureMark=function measureMark(name) {
    var _per = window.performance;
    if (_per) {
        _per.measure(name, name + '_start', name + '_end');
        this.send(this.user || 'Redjs');
    }
    return this;
};

/**
 * page view 日志
 * @page 当前访问的页面，URL 或 class
 * */
window.Rsd.LogApi.prototype.pv=function pv(page,text,data) {

    var _page = page||'unknown';
    var _className = _page.toString();

    this.__pvEntries = this.__pvEntries || [];
    this.__pvEntries.push({
        data: data || document.cookie,
        text: (text || document.title).toString(),
        page: _className || document.URL,
        projectId: this.projectId,
        logTime: new Date().getTime()
    });
    this.send(this.user || 'Redjs');
    return this;
};
/**
 * 点击事件日志
 * @eleType 点击的dom节点类型
 * @text 点击的dom节点文本描述
 * @url 目标URL
 * */
window.Rsd.LogApi.prototype.click=function click(eleType,text,data) {
    var _per = window.performance;
    var _now;
    if (_per) {
        _now = _per.now();
    }
    this.__clickEntries = this.__clickEntries || [];
    this.__clickEntries.push({
        elementType: eleType.toString(),
        elementText: text.toString(),
        data: data,
        ElementNow: _now,
        projectId: this.projectId,
        logTime: new Date().getTime()
    });
    this.send(this.user || 'Redjs');
    return this;
};
/**
 * 性能监控
 * */
window.Rsd.LogApi.prototype.timing=function timing() {
    var _per = window.performance;
    if (_per) {
        this.__timing = _per.timing;
        this.send(this.user || 'Redjs');
    }
    return this;
};
/**
 * */
window.Rsd.LogApi.prototype.navigation=function navigation() {
    var _per = window.performance;
    if (_per) {
        this.__navigation = _per.navigation;
        this.send(this.user || 'Redjs');
    }
    return this;
};
/**
 * 记录内存信息
 * */
window.Rsd.LogApi.prototype.memory=function memory() {
    this.__memoryEntries = this.__memoryEntries||[];
    var _per = window.performance;
    if(_per && _per.memory) {

        this.__memoryEntries.push(_per.memory);
        this.send(this.user||'Redjs');
    }
    return this;
};
/**
 * 提交日志,在onLoad之后提交
 * */
window.Rsd.LogApi.prototype.send =function send(user) {
    //
    var me = this;
    if( me.__isSending)
    {
        return;
    }
    me.__isSending = true;

    setTimeout(function () {
        var _per = window.performance;
        if(_per)
        {
            me.__perEntries = _per.getEntries();
            _per.clearMarks();
            _per.clearMeasures();
            _per.clearResourceTimings();
        }
        var timer = 100;
        if(me.__debugEntries.length > 0)
        {
            me.commit('Debug',me.__debugEntries.splice(0,100),user,timer+=50) ;
        }

        if(me.__infoEntries.length > 0)
        {
            me.commit('Info',me.__infoEntries.splice(0,100),user,timer+=50) ;
        }

        if(me.__warnEntries.length > 0)
        {
            me.commit('Warn',me.__warnEntries.splice(0,100),user,timer+=50) ;
        }

        if(me.__errorEntries.length > 0 )
        {
            me.commit('Error',me.__errorEntries.splice(0,100),user,timer+=50) ;
        }
        //所有资源请求的时间数据
        if(me.__perEntries.length > 0)
        {
            var list = me.__perEntries.splice(0,100);
            for(var i in list)
            {
                list[i] = list[i];
            }
            me.commit('PerformanceEntry',list,user,timer+=50) ;

        }

        if(me.__timing)
        {
            if(me.__navigation)
            {
                me.__timing.NavType = me.__navigation.type;
                me.__timing.NavRedirectCount = me.__navigation.redirectCount;
            }
            me.commit('PageTiming', [me.__timing]) ;
        }

        if(me.__memoryEntries.length > 0)
        {
            me.commit('ClientMemory',me.__memoryEntries.splice(0,100),user,timer+=50) ;
        }

        if(me.__clickEntries.length > 0)
        {
            me.commit('PageEvent',me.__clickEntries.splice(0,100),user,timer+=50) ;
        }

        if(me.__pvEntries.length > 0)
        {
            me.commit('PageView',me.__pvEntries.splice(0,100),user,timer+=50) ;
        }

        me.__timing = null;
        me.__navigation = null;
        me.__isSending = false;
    },500);

    return this;
};
/**
* 转化为Jquery参数格式
* */
window.Rsd.LogApi.prototype.toString = function toString(obj,pre) {


    var _pre = pre || '';
    if (obj == undefined || obj==null) {

        return '';
    }

    if (typeof obj == "string") {
        return "" + obj.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "";
    }
    if (obj instanceof Array) {
        var r = [];
        for (var i = 0; i < obj.length; i++) {
            if (typeof (obj[i]) == 'function') {
                continue;
            }
            if (typeof obj[i] == 'object') {
                var _t = this.toString(obj[i], _pre + '[' + i + ']');
                 Array.prototype.push.apply(r, _t);
            }
            else {
                r.push(this.toString(obj[i], _pre + '[' + i + ']'))
            }

            if (!_pre) {
                r = r.join('&');
            }
        }
        return r;
    }

    if (typeof obj == "object") {
        var r = [];

        for (var k in obj) {
            if (typeof (obj[k]) == 'function') {
                continue;
            }
            if ( obj[k]==null || typeof  obj[k] == "string") {


                if(_pre)
                {
                    r.push(_pre + '[' + k + ']' + "=" +  this.toString(obj[k]));
                }else
                {
                    r.push(k + "=" +  this.toString(obj[k]));
                }
                continue;
            }
            if(typeof obj[k] == 'object' )
            {
                if(_pre)
                {
                    var _t = this.toString(obj[k],_pre + '[' + k + ']');
                    Array.prototype.push.apply(r , _t);
                }else
                {
                    var _t = this.toString(obj[k], k);
                    Array.prototype.push.apply(r , _t);
                }
            }
            else
            {
                if(_pre)
                {
                    r.push(_pre + '[' + k + ']' + "=" +  this.toString(obj[k]));
                }else
                {
                    r.push(k + "=" +  this.toString(obj[k]));
                }

            }

        }
        if(!_pre)
        {
            r = r.join('&');
        }
        return r;
    }

    return obj.toString().replace(/\"\:/g, '":""');
};
/**
*
* */
window.Rsd.LogApi.prototype.ajax = function ajax(config){

        var _c = config ||{type:'GET', url:'', data:null, success:null, failed:null};
        _c.type = _c.type|| 'GET';

        // 创建ajax对象
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }

        xhr.timeout = _c.timeout||3000;
        xhr.ontimeout = function (event) {
            console.error(event);
        };

        var type = _c.type.toUpperCase();
        // 用于清除缓存
        var random = Math.random();

        if(type == 'GET'){

            if(_c.data){
                var _data = this.toString(_c.data);
                xhr.open('GET', _c.url + '?' + _data, _c.async == undefined ? true : _c.async);
            } else {
                xhr.open('GET', _c.url + '?t=' + random, _c.async == undefined ? true : _c.async);
            }
            xhr.send();

        }
        if(type == 'POST'){
            xhr.open('POST', _c.url, true);
            //setRequestHeader()添加http 头。
            xhr.setRequestHeader("Content-type", _c.contentType||'application/json; charset=utf-8');
            var _data = this.toString(_c.data);
            xhr.send(_data);
        }


        return ;//日志提交 不做结果处理

        //处理返回数据
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){

                } else {
                    console.error('send log fail:'+xhr.status)
                }
            }
        }
    };
/**
*
* */
window.Rsd.LogApi.prototype.commit = function commit(api,data,user,timer) {
    var me = this;
    if (me.projectId == undefined || me.projectId == null || me.projectId == '')
    {
        return;
    }
    var _data = {type:api,token:me.token, projectId:me.projectId,cookies:document.cookie, from:me.from,logTime:new Date().getTime(), user:user || me.user ||'Redjs',logData:data};

    //异步发送日志数据
    setTimeout(function () {
        try {
            me.ajax({
                url:window.location.protocol + '//prophet.redmicro.cn/LogService.asmx/Log?___api='+ api +'&___key='+new Date().getTime(),
                //url:'http://log.redmicro.cn:8060/LogService.asmx/Log?___key='+new Date().getTime(),
                type:'POST',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                dataType: 'text',
                timeout:1000,
                async:true,
                data:_data
            });
        }
        catch(error)
        {
            console.error('提交'+api+'日志失败。');
            console.error(error);
        }

    },timer||100);

};
/**
* */
window.onerror = function error(message, url, lineNo, columnNo, error) {
    window.Rsd.Logger.error( message + '['+url+'](L:'+lineNo+',C:'+columnNo+')',error);
};

/**
* */
window.onunload = function unload() {
    window.Rsd.Logger.info('页面退出',{url:window.location.href,title:document.title});

};

 (function () {
    //初始化
     var scriptArgs = document.getElementById('RedjsLoggerAPI');
     if(scriptArgs)
     {
         window.Rsd.Logger = new Rsd.LogApi(scriptArgs.getAttribute('appId'),scriptArgs.getAttribute('token'),scriptArgs.getAttribute('from'));
     }
     else
     {
         console.error('未发现id为RedjsLoggerAPI的script标签，请正确引用RedjsLoggerAPI');
     }

})();

/**
*
* */
window.Rsd.startLog(function(){

    if(window.Rsd.Logger){

        window.Rsd.Logger.setUser('Redjs');
        window.Rsd.Logger.timing();
        window.Rsd.Logger.navigation();
        window.Rsd.Logger.memory();
        var form = document.getElementsByTagName('form');
        window.Rsd.Logger.pv(document.baseURI,document.title,form instanceof HTMLFormElement ? new FormData(form):null);
    }

});

//Example:
//<script id='RedjsLoggerAPI' type="text/javascript" src="./redjs/RedjsLoggerAPI.js" appId="b110c126-f428-489f-82fe-a8fcd12ba99a" token="token"></script>