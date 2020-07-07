/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-11-1
 * Time: 上午3:45
 * To change this template use File | Settings | File Templates.
 */

/**
 * @memberof Rsd.data
* */
Rsd.define('Rsd.data.Ajax', {
    extend:'Rsd.common.Object',
    xtype:'ajax',
    method: 'POST',
    url: null,
    /*
    * 'application/json; charset=utf-8' ： 以json字符串形式发送，格式如：userid=admin&pwd=654321 需要服务端JSON.parse 还原JSON
    * 'application/x-www-form-urlencoded;charset=UTF-8'：以formData 格式发送
    * */
    contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
    dataType: 'text',
    async: true,
    timeout:10000,
    username: '',
    password: '',
    /**
     * 是否是跨域请求
     * */
    crossDomain:true,
    /**
    * @description Ajax请求标识，作用域：每个客户端
    * */
    key:'',
    /**
     * @description 请求token，作用域：每次请求
     * * */
    token:'',
    /**
     * @constructs Rsd.data.Ajax
     * @classdesc Ajax请求类
     *
     * @property  {string} extend Rsd.common.Object
     * @property  {string} xtype ajax
     * @property {EventList} events 事件列表
     * @property {string} method GET，POST，PUT，DELETE
     * @property {string} url
     * @property {string} contentType application/x-www-form-urlencoded; charset=UTF-8
     * @property {string} dataType text，json
     * @property {boolean} async false
     * @property {string} username
     * @property {string} password
     * @property {string} key
     *
     * @param {object} config 自定义配置项
     * */
    constructor: function Ajax (config) {
        config = config || {};
        this.apply(config);
    },
    /**
     * @description 事件注册
     * @public
     * @function
     * @memberof Rsd.data.Ajax
     * */
    on: function on(name, fn) {

        if (!name || name == '') {
            throw new Error('argument \'name\' is null.');
        }
        if (!fn || typeof (fn) != 'function') {
            throw new Error('argument \'fn\' is not a function object.');
        }
        //var me = this;

        this.events.add(this, name, fn);
    },
    /**
     * @public
     * @function
     * @memberof Rsd.data.Ajax
     * */
    complete:function(response)
    {
        Rsd.debug('request complete:['+this.url+']');
    },

    /**
     * @public
     * @function
     * @memberof Rsd.data.Ajax
     * @param {XmlHttpRequest}  xhr
     * @param {string} textStatus
     * @param {string} error
    * */
    error:function(xhr, textStatus, error){

        Rsd.debug('request failure:['+this.url+'] (' + textStatus + ')');
        if(xhr.status == 404 )
        {
            Rsd.showModalDialog(this.url,'服务器资源不存在(404)',400,500);
        }
        else
        {
            Rsd.error('ajax请求失败['+this.url+']','Rsd.data.Ajax',new Error(error + '(' + textStatus + ')'));
        }
    },
    /**
     * @public
     * @function
     * @memberof Rsd.data.Ajax
    * */
    success:function(response) {
        Rsd.debug('request success:[' + this.url + ']');
    },

    /**
     * @public
     * @function
     * @memberof Rsd.data.Ajax
     * @description http 请求
     * @param {object} data 作为Ajax对象请求时的参数中data属性（即远程方法的参数）
     * @param {function} callback 回调函数，callback方法即为：ajax中的success方法。
    * */
    request: function request(data,callback) {

        var _c = this.getAjaxConfig();

        if(Rsd.isEmpty(_c.url))
        {
            console.error(_c);
            throw new Error('Ajax object config value url is null.');
        }
        _c.data = data;
        _c.xhrFields={
            withCredentials: _c.crossDomain==false
        };
        _c.crossDomain=true;
        _c.beforeSend==function(xhr)
        {
            //xhr.withCredentials = true;
            xhr.setRequestHeader('redjs-ui-token', this.token||this.key);
        }
        var me = this;
        if(callback)
        {
            _c.success = function(response){

                if(Rsd.isFunction(callback))
                {
                    return callback.call(me,response);
                }
                if(Rsd.isString(callback))
                {
                    return me.funApplyByIOC(callback,arguments);
                }
            };
        }
        if(Rsd.app.appType=='wxapp' && wx && wx.request)
        {
           return wx.request(_c);
        }

        return this.selfAjax(_c);
        //return $.ajax( _c);
    },
    /**
     * @public
     * @function
     * @memberof Rsd.data.Ajax
     * @description http请求,返回json结构数据
     * @param {object} data 作为Ajax对象请求时的参数中data属性（即远程方法的参数）
     * @param {string|function} callback 回调函数，callback方法在success方法执行后执行。
    * */
    requestJson:function requestJson(data,callback) {

        var me = this;
        var _c = this.getAjaxConfig();
        if(Rsd.isEmpty(_c.url))
        {
            console.error(_c);
            throw new Error('Ajax object config url value  is null.');
        }

        _c.data = data;
        _c.xhrFields={
            withCredentials:_c.crossDomain==false
        };

        _c.beforeSend==function(xhr)
        {
            //xhr.withCredentials = true;
            xhr.setRequestHeader('redjs-ui-token', this.token||this.key);
        }
        if(callback)
        {
            _c.success = function(response){

                var _data = Rsd.toJson(response);
                if(Rsd.isFunction(callback))
                {
                    return callback.call(me,_data);
                }
                if(Rsd.isString(callback))
                {
                    return me.funApplyByIOC(callback,[_data]);
                }

            };
        }
        if(Rsd.app.appType=='wxapp' && wx && wx.request)
        {
            return wx.request(_c);
        }
        return this.selfAjax(_c);
        //return $.ajax(_c);
    },
    /**
     * @public
     * @function
     * @description 获取当前ajax的配置项
     * @memberof Rsd.data.Ajax
    * */
    getAjaxConfig:function getAjaxConfig() {
        var _c = {};
        var _keys = [
            'method',
            'url',
            'contentType',
            'dataType',
            'async',
            'username',
            'password',
            'complete',
            'error',
            'success',
            'data',
            'timeout'
        ];

        for(var i in _keys)
        {
            if(_keys.hasOwnProperty(i))
            {
                _c[_keys[i]] = Rsd.clone(this[_keys[i]]);
            }

        }
  console.log(_c.url);
  console.log(_c.url.toLowerCase());
  console.log(_c.url.toLowerCase().startWith);
        if(this.key && _c.url && !_c.url.toLowerCase().startWith(Rsd.getRedjsHost().toLowerCase()))
        {
            _c.url = _c.url + (_c.url.indexOf('?')> 0? '&':'?') + '___key=' + this.key;
        }
        var _url = _c.url;
        if(_url.startWith('http://') || _url.startWith('https://')||_url.startWith('file://'))
        {}
        else
        {
            //只处理相对路径
            _url = (Rsd.app&&Rsd.app.jsAgentHost)?(Rsd.app.jsAgentHost+'?' + Rsd.UTF8ToBase64(_url)):_url;
            _c.url = _url;
        }

        return _c;
    },


    toString:function toString(obj,pre) {


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
    },
    /**
     *
     * */
    selfAjax:function selfAjax(config){


        var _c = config ||{type:'GET', url:'', data:null, success:null, failed:null};
        _c.method = _c.method||_c.type|| this.method ||'GET';

        // 创建ajax对象
        var xhr = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }


        //可注册事件
        //onreadystatechange
        //abort
        //error
        //load
        //loadend
        //loadstart
        //progress
        //timeout

        xhr.ontimeout = function (event) {

            //框架可扩展部分 timeout
            if (Rsd.isFunction(_c.error))
            {
                _c.error( xhr,xhr.statusText,event);

            }else
            {
                console.error(event);
            }

        };
        xhr.onerror = function (event) {


            if (Rsd.isFunction(_c.error)) {
                _c.error(xhr, xhr.statusText, event);
            } else {
                console.error(event);
            }
        };
        /*
                xhr.readyState =（0，1，2，3，4）
                0：请求未初始化，还没有调用 open()。
                1：请求已经建立，但是还没有发送，还没有调用 send()。
                2：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。
                3：请求在处理中；通常响应中已有部分数据可用了，没有全部完成。
                4：响应已完成；您可以获取并使用服务器的响应了。
                */

        /*
        * xhr.status
        * 200——成功
        * 201——提示知道新文件的URL
　　    * 300——请求的资源可在多处得到
        * 301——删除请求数据
　　     * 404——没有发现文件、查询或URl
        * 500——服务器产生内部错误
        * */

        //console.log(_c);

        if(_c.async == undefined||_c.async) {

            xhr.timeout = (_c.timeout == null || _c.timeout == undefined) ? 10000 : _c.timeout;
            //处理返回数据
            xhr.onreadystatechange = function(event){
                //console.log(arguments);

                if(xhr.readyState == 4){

                    var str = xhr.responseText;

                    if(xhr.status == 200){

                        var data=null;

                        try {
                            data = Rsd.toJson(str);
                        } catch (e) {
                            data = str;
                        }

                        if (Rsd.isFunction(_c.complete))
                        {
                            _c.complete(data);
                        }

                        if (Rsd.isFunction(_c.success))
                        {
                            _c.success(data);
                        }

                    } else {

                        if (Rsd.isFunction(_c.error)) {
                            _c.error(xhr, xhr.statusText, event);
                        }
                        if (Rsd.isFunction(_c.complete))
                        {
                            _c.complete(xhr, xhr.statusText, event);
                        }

                    }
                }
            }
        }
        var type = _c.method.toUpperCase();
        // 用于清除缓存
        var random = Math.random();

        if(type == 'GET'){

            if(Rsd.isEmpty(_c.data)){

                xhr.open('GET', _c.url + (_c.url.indexOf('?')<0?'?':'&') + 't=' + random, _c.async == undefined ? true : _c.async);

            } else {

                var _data = this.toString(_c.data);
                xhr.open('GET', _c.url + (_c.url.indexOf('?')<0?'?':'&') + _data, _c.async == undefined ? true : _c.async);

            }
            xhr.send();

        }
        if(type == 'POST'){

            xhr.open('POST', _c.url, _c.async == undefined ? true : _c.async);

            //框架可扩展部分

            //setRequestHeader()添加http 头。

            xhr.setRequestHeader("Content-type", _c.contentType||'application/json;charset=utf-8');
            var _data = this.toString(_c.data);
            xhr.send(_data);
        }



        if(_c.async == undefined||_c.async)
        {

        }
        else {
            //同步
            var str = xhr.responseText;


            if(xhr.status == 200)
            {
                var data=null;

                try {
                    data = Rsd.toJson(str);
                } catch (e) {
                    data = str;
                }
                if (Rsd.isFunction(_c.complete))
                {
                    _c.complete(data);
                }

                if (Rsd.isFunction(_c.success))
                {
                    _c.success(data);
                }
            }
            else {

                if (Rsd.isFunction(_c.error)) {
                    _c.error(xhr, xhr.statusText, event);
                }

                if (Rsd.isFunction(_c.complete))
                {
                    _c.complete(xhr, xhr.statusText, event);
                }
            }
        }

    }

},function (type) {

    if (!Rsd.data.Ajax.prototype.hasOwnProperty("events")) {
        var _eventsGetter = function () {
            var _me = this;
            if (_me.__events == null) {
                _me.__events = Rsd.create('Rsd.common.EventList', {});
            }
            return  _me.__events;
        };

        this.defineProperty(type,"events", _eventsGetter, null,true);

    }
});

