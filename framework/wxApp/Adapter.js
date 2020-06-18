(function (){

    Rsd.alert= function (msg) {
        wx.showToast({
            title: msg,
            icon: 'OK',
            image: '',
            duration: 2000,
            mask: true,
            success: function (res) {
            },
            fail: function (res) {
            },
            complete: function (res) {
            },
        });
    };

    Rsd.warn= function (msg,callback) {

        var _list = [];
        if(Rsd.isArray(msg))
        {
            _list = msg;
        }
        else
        {
            _list = msg.split("\r\n");
        }        
        wx.showModal({
            title: _list.length > 1 ?_list[0]:'提示信息',
            content: _list.length > 1?_list[1]:_list[0],
            "showCancel":false,
            success:function (res) {
                if(callback instanceof Function)
                {
                    callback();
                }
            },
            fail:function (res) {
                console.error(res);
            }
        });

    };

    Rsd.error= function (msg,callback) {

        wx.showModal({
            title: '错误信息',
            content: msg,
            "showCancel":false,
            success:function (res) {
                if(callback instanceof Function)
                {
                    callback();
                }
            },
            fail:function (res) {
                console.error(res);
            }
        });
    };
     /**
     *  @param string msg 文本消息
     * @param int interval 延时
     * */
    Rsd.showLoading=function showLoading(msg,interval) {

        var _interval=0;
        if(Rsd.isNumber(interval))
        {
            _interval = interval;
        }
        if(!Rsd.isEmpty(msg)){

            if(Rsd.___last_loading_text == msg )
            {
                Rsd.___last_loading_count++;
            }
            else
            {
                setTimeout(function () {
                    wx.showLoading({
                        title: msg,
                        success:function () {
                            Rsd.___last_loading_count=0;
                            Rsd.___last_loading_text = msg;
                        }
                    });
                },_interval);
            }

        }

    };
    /**
     * @param boolean all 关闭全部
     * @param int interval 延时
    * */
    Rsd.hideLoading=function hideLoading(all,interval) {

        if ((all==undefined || all==null || !all) && Rsd.___last_loading_count > 0)
        {
            Rsd.___last_loading_count--;
            return;
        }
        var _interval=0;
        if(Rsd.isNumber(interval))
        {
            _interval = interval;
        }
        setTimeout(function () {
            wx.hideLoading({
                success:function () {
                    Rsd.___last_loading_count == 0;
                    Rsd.___last_loading_text = '';
                }
            });
        },_interval);
    };

    /**
     * @public
     * @param config 将被合并到Ajax对象上
     * @param callback 回调函数
     * */
    Rsd.request = function request(config, data, callback,msg) {
        var _c = null;
        var _d = null;
        var _fn = null;
        for(var i in arguments)
        {
            if(_c == null && Rsd.isString(arguments[i]))
            {
                _c = {url:arguments[i]};
                continue;
            }
            if(_c == null && Rsd.isObject(arguments[i]))
            {
                _c = arguments[i];
                continue;
            }
            if(_d == null && Rsd.isObject(arguments[i]))
            {
                _d = arguments[i];
                continue;
            }
            if(_fn == null && Rsd.isFunction(arguments[i]))
            {
                _fn = arguments[i];
                continue;
            }
        }
        //
        if (_fn == null) {

            _fn = void(0);
        }
        if (_fn == null) {

            _fn = void(0);
        }

        _c = _c||{};
        _c.timer=0;//异常处理次数
        _c.data = _d||_c.data||{};;
        _c.header = _c.header|| { 'content-type': 'application/x-www-form-urlencoded' };
        _c.success =_c.success || function  (res) {

            if(res.statusCode != '200' || res.data.code =="-1")
            {
                if( _c.timer < 4)
                {
                    _c.timer++;
                    setTimeout(function () {
                        wx.request(_c);
                    },500);

                }else {
                    Rsd.hideLoading();
                    Rsd.error('服务异常('+res.statusCode+')');
                }

                return;
            }

            var _rs = _fn(res.data);

            Rsd.hideLoading();

            if(res.data.success || _rs)
            {
                return;
            }

            Rsd.warn(res.data.msg);
        };
        _c.fail = _c.fail||function(res)
        {
            //延时0.5秒 再次请求一次
            if(_c.timer < 4)
            {
                _c.timer++;
                setTimeout(function () {
                    wx.request(_c);
                },500);

                return;
            }

            Rsd.hideLoading();
            Rsd.error('请求服务异常！');
        }
        //console.log(_c);

        wx.showLoading(msg);
        _c.timer++;
        wx.request(_c);
    };
    /*
    *
    * */
    Rsd.requestJson=function requestJson(config, data, callback,msg) {
        var _c = null;
        var _d = null;
        var _fn = null;
        for(var i in arguments)
        {
            if(_c == null && Rsd.isString(arguments[i]))
            {
                _c = {url:arguments[i],data:data};
                continue;
            }
            if(_c == null && Rsd.isObject(arguments[i]))
            {
                _c = arguments[i];
                continue;
            }
            if(_d == null && Rsd.isObject(arguments[i]))
            {
                _d = arguments[i];
                continue;
            }
            if(_fn == null && Rsd.isFunction(arguments[i]))
            {
                _fn = arguments[i];
                continue;
            }
        }

        if (_fn == null) {

            _fn = void(0);
        }

        _c = _c||{};
        _c.timer=0;//异常处理次数
        _c.data = _d||_c.data||{};
        _c.header = _c.header|| { 'content-type': 'application/x-www-form-urlencoded' };
        _c.success =_c.success || function  (res) {

            if(res.statusCode != '200' || res.data.code =="-1")
            {
                if( _c.timer < 4){

                    _c.timer++;
                    setTimeout(function () {
                        wx.request(_c);
                    },500);

                }else {
                    Rsd.hideLoading();
                    Rsd.error('服务异常('+res.statusCode+')');
                }

                return;
            }

            var _rs = _fn(res.data);

            Rsd.hideLoading();

            if(res.data.success || _rs)
            {
                return;
            }
            //同意拦截错误处理
            if(Rsd.app.onRequestError)
            {
                _rs = Rsd.app.onRequestError(res.data);
            }
            if(_rs)
            {
                return;
            }
            if(res.data.data && res.data.data.Title && res.data.data.Message)
            {
                Rsd.warn([res.data.data.Title,res.data.data.Message]);
            }
            else
            {
                Rsd.warn(res.data.msg);
            }
            

        };
        _c.fail = _c.fail||function(res)
        {
            console.log(res);
            //延时0.5秒 再次请求一次
            if(_c.timer < 4)
            {
                _c.timer++;
                setTimeout(function () {
                    wx.request(_c);
                },500);

                return;
            }

            Rsd.hideLoading();

            Rsd.error('请求服务异常！');
        }

        Rsd.showLoading(msg);

        _c.timer++;
        wx.request(_c);
    };

    /**
     * @description 服务未加载完成时，有两次各延时1秒的处理
    *
    * */
    Rsd.requestService=function requestService(name, data, callback,msg) {

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

            var _error =  '服务['+_name+']不存在,请先注册';
            Rsd.warn(_error);
            console.error(_error);
            return;
        }

        var _fn = function () {

            var api = service.api[_method];
            if(Rsd.isEmpty(api))
            {

                var _error =  '服务['+_name+']不存在,请确认';
                Rsd.warn(_error);
                console.error(_error);
                return;
            }


            var app = Rsd.app||getApp();

            var token = app.token || wx.getStorageSync('token');
            //console.log('request api '+_name );

            Rsd.requestJson({url:api.server.url+'?___key='+token||'',method:api.server.method||'POST'},data,callback,msg);

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

            }else
            {
                Rsd.loadServiceApi(service,_fn);
            }

        }else
        {
            _fn();
        }

    };
 
    /**
     * @description 获取服务
     */
    Rsd.getService = function(name)
    {
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
            var _error =  '服务['+_name+']不存在,请先注册';
            Rsd.warn(_error);
            console.error(_error);
            return null;
        }

        return  service.api[_method];;
    };

    /**
     * testUrl:健康探测 API
     * services:[{group:'',url:'',useSSL:true}]
     */
    Rsd.loadServices = function loadServices(testUrl,services)
    {

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
            console.log('第'+ _timer.toString() + '次:连接（探测）远程服务。');
            Rsd.requestJson({url:testUrl,method:'POST',fail:_textFail},{},_load,'连接远程服务');
        };

        _test();

    };
    /**
     * @description  加载controller 的方法
     * */
    Rsd.loadServiceApi = function loadServiceApi(service,callback) {

        service.isLoading = true;

        var _group = service.group.toLowerCase();
        var _ssl = service.useSSL;

        //console.log('load =>' + _group);

        Rsd.request({ url: service.url}, {}, function(data) {

            var list = data.data;

            for(var j in list)
            {
                var item = list[j];
                //console.log(item);
                if (item.IsWebMethod)
                {
                    if( _ssl && item.Url.startWith('http://'))
                    {
                        item.Url = 'https://' + item.Url.substr(7)
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
                            url:item.Url,
                            method:'POST',
                            //contentType:'application/json',
                            //dataType: 'json',
                            async:true
                        }
                    }
                    Rsd.services[_group].api[item.Name.toLowerCase()] = config;
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
     *@description 上传文件 参数 url, file,name, args,callback
     */
    Rsd.uploadFile=function uploadFile(url, file,name, args,callback) {
      
        var _url = url || '';
  
        var service = Rsd.getService(_url);
         
        if (service) {
          _url = service.server.url;
        }
        else
        {
            return;
        }
  
        if (Rsd.isEmpty(_url)) {
            Rsd.warn('请设置上传地址');
            return;
        } 

        var _formData = args || {};
        _formData.token = Rsd.app.token;
        //console.log(_formData); 
        //console.log( '上传文件('+ name+')');
         
        var uploadTask = wx.uploadFile({
          url: _url, //上传接口地址
          filePath: file,
          name: name,
          formData: _formData,
          "header": {
            'Content-Type': 'multipart/form-data;charset=utf-8'
          },
          success: null,
          complete:callback
           
        });
  
        //进度监控
        uploadTask.onProgressUpdate(function(res){
          console.log( '文件('+ name+')上传进度', res.progress);
  
          //console.log(index +'-已经上传的数据长度', res.totalBytesSent);

          //console.log(index +'-预期需要上传的数据总长度', res.totalBytesExpectedToSend);

        });
  
      };
    /**
    * @description 小程序更新升级
    * */
    Rsd.appUpdate=function appUpdate()
    {
        var hasUpdate = false;
        var updateManager = wx.getUpdateManager();

        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            hasUpdate = res.hasUpdate;
        });
        //强制更新
        updateManager.onUpdateReady(function () {
            updateManager.applyUpdate();
        });
        //
        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
        });

    };
   
  
    /**
     * @public
     * @description 写到本地缓存
     * @param {string} key
     * */
    Rsd.writeLocal = function writeLocal(key, value) {
       
        wx.setStorageSync(key, value)
         
    };

    /**
     * @public
     * @description 读取指定本地缓存
     * @param {string} key
     * */
    Rsd.readLocal = function readLocal(key) {
         
        return wx.getStorageSync(key);
    };

    /**
     * @public
     * @description 清除指定本地缓存
     * @param {string} key
     * */
    Rsd.removeLocal = function removeLocal(key) {
        wx.removeStorageSync(key);
    };

    /**
     * @public
     * @description 清除所有本地缓存
     * */
    Rsd.clearLocal = function clearLocal() {
        wx.clearStorageSync();
    };
   /**
     *
     * @public
     * */
    Rsd.sleep = function sleep(msec) {
        var start = new Date().getTime();
        while (true) if (new Date().getTime() - start > msec) break;
    };
    /**
     * @public
     * */
    Rsd.toString = function toString(obj) {

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
                    r.push("\"" + i + "\":" + Rsd.toString(obj[i]));
                }

                r = "{" + r.join() + "}"
            } else {
                for (var i = 0; i < obj.length; i++)
                    r.push(Rsd.toString(obj[i]))
                r = "[" + r.join() + "]";
            }
            return r;
        }

        return obj.toString().replace(/\"\:/g, '":""');
    };
})();