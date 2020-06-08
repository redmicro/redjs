
/**
 * @copyright redmicro all Copyright (c)
 * @author Created by seeker910 on 14-3-17.
 * @memberof Rsd.data
 */
Rsd.define('Rsd.data.Service',{
    extend:'Rsd.common.Object',
    xtype:'service',
    name:'',
    text:'',
    isDemo:false,
    //server:{},
    //local:{},
    failureHandler:null,
    successHandler:null,
    errorHandler:null,
    completeHandler:null,
    /**
     * @constructs Rsd.data.Service
     * @classdesc Rsd.common.Service用于对业务接口的对象化管理，并且同时提供本地（local）和远程(Server)两种方式的请求;负责远程远程或本地服务调用;将远程服务与本地ajax请求逻辑合并封装
     *
     * @property  {string} extend Rsd.common.Object
     * @property  {string} xtype service
     * @property {string|function} failureHandler 服务请求业务处理失败时事件处理
     * @property {string|function} successHandler 服务请求业务处理成功时事件处理
     * @property {string|function} errorHandler 服务请求发生错误时事件处理
     * @property {string|function} completeHandler 服务请求完成事件处理
     * @property {object} local 格式：{ method:'get',url:''},
     * @property {object } server 格式：{ method:'get',url:''}
     * @property  {boolean} isDemo 是demo版本
     * @property  {string} name 英文名称
     * @property  {string} text 中文名称
     * * */
    constructor: function Service(config) {
        //debugger;
        config = config || {};
        this.apply(config);
    },
    /**
     *
     * @description 远程测试,支持批量数据测试
     * @function
     * @public
     * @memberof Rsd.data.Service
     * */
    testServer:function testServer(args){
        //debugger;
        var me =this;
        var _args =  args||me.args||[];
        if( _args.length == 0)
        {
            Rsd.debug('Testing:'+me.server.url);
            Rsd.request(this.server,{},function (data) {
                Rsd.log(data);
            });
        }
        else  {
            for(var data in _args) {
                Rsd.debug('Testing:'+me.server.url+";args:"+data);
                Rsd.request(me.server,data,null);
            }
        }
    },
    /**
     * @description 本地模拟数据测试
     * @function
     * @public
     * @memberof Rsd.data.Service
     * */
    testLocal:function testLocal()
    {
        Rsd.request(this.local,{},null);
    },

    /**
     * @private
     * @function
     * @memberof Rsd.data.Service
     * @description ajax 请求完成时执行
     * */
    complete:function complete(response)
    {
        if(Rsd.isFunction(this.completeHandler))
        {
            return this.completeHandler.call(this,response);
        }
        if(Rsd.isString(this.completeHandler)&& this.completeHandler !='')
        {
            return this.funApplyByIOC(this.completeHandler,arguments);
        }
        return true;
    },
    /**
     * @private
     * @function
     * @memberof Rsd.data.Service
     * @description ajax请求成功，返回json数据中,success==true时执行
    * */
    success : function(response) {

        if (Rsd.isFunction(this.successHandler)) {
            return this.successHandler.call(this, response);
        }
        if (Rsd.isString(this.successHandler) && this.successHandler !='') {
            return this.funApplyByIOC(this.successHandler, arguments);
        }
        return true;
    },
    /**
     * @private
     * @function
     * @memberof Rsd.data.Service
     * @description ajax请求成功，返回json数据中,success==flase时执行
     * */
    failure:function failure(data)
    {
        if (Rsd.isFunction(this.failureHandler)) {
            return this.failureHandler.call(this, data);
        }
        if (Rsd.isString(this.failureHandler) && this.failureHandler !='') {
            return this.funApplyByIOC(this.failureHandler, arguments);
        }

        return true;
    },
    /**
     * @private
     * @function
     * @memberof Rsd.data.Service
     * @description ajax请求失败时执行，如：网络不通
     * */
    error:function error(xhr, textStatus, error){

        if(Rsd.isFunction(this.errorHandler))
        {
            return this.errorHandler.call(this,xhr, textStatus, error);
        }
        if(Rsd.isString(this.errorHandler)&& this.errorHandler !='')
        {
            return this.funApplyByIOC(this.errorHandler,arguments);
        }
        return true;
    },
    /**
     * @public
     * @function
     * @memberof Rsd.data.Service
     * @param {object} data  作为Ajax对象请求时的参数中data属性（即远程方法的参数）
     * @param {function} callback 返回true时,后续方法继续执行，返回false时，后续方法终止。
    * */
    request:function request(data,callback)
    {
        data = data||{};
        var me = this;
        var _callback=function(response){

            var _b = true;
            if(_b &&Rsd.isFunction(callback) )
            {
                _b = callback.call(me,arguments);
            }
            if(_b == false || _b == 0 || _b < 0 )
            {
                return false;
            }
            me.success(response);

        };
        if(this.isDemo){
            var _ajax = Rsd.create('Rsd.data.Ajax',Rsd.apply(
                {
                    key:Rsd.getAppToken(),
                    complete:function _complete(){me.complete.apply(me,arguments);},
                    error:function _error(){me.error.apply(me,arguments);}
                },this.local));

            var _fn = function (_data) {
                var _name = Rsd.getUrlParam(_ajax.url,'name');
                _callback(_data[_name]);
            }

            return _ajax.request(data,_fn);
        }
        else{
            //debugger;
            var _args = {};
            _args = Rsd.apply(_args,this.server.data||{});
            _args = Rsd.apply(_args,data||{});
            var _class = 'Rsd.data.Ajax';
            if(me.ajaxType && me.ajaxType == 'file')
            {
                _args = data;
                _class = 'Rsd.data.File';
            }
            var _ajax = Rsd.create(_class,Rsd.apply(
                {
                    key:Rsd.getAppToken(),
                    complete:function _complete(){me.complete.apply(me,arguments);},
                    error:function _error(){me.error.apply(me,arguments);}
                },this.server));

            return  _ajax.request(_args,_callback);
        }
    },

    /**
     * @public
     * @function
     * @memberof Rsd.data.Service
     * @param {object} data 作为Ajax对象请求时的参数中data属性（即远程方法的参数）
     * @param {function} 返回true时,后续方法继续执行，返回false时，后续方法终止。
    * */
    requestJson:function requestJson(data,callback) {
        data = data||{};
        var me = this;
        var _callback=function(_data){
            //debugger;
            var _b = true;
            if(_b && Rsd.isFunction(callback) )
            {
                _b = callback.call(me,_data);
            }
            if(_b == undefined )
            {
                _b = true;
            }
            if( _b == false || _b == 0 || _b < 0 || _b == null)
            {
                return false;
            }
            if(_data && !_data.success)
            {
                me.failure(_data);
            }
            else
            {
                me.success(_data);
            }

        };
         //debugger;
        if(this.isDemo){
            var _ajax = Rsd.create('Rsd.data.Ajax',Rsd.apply(
                {
                    key:Rsd.getAppToken(), 
                    complete:function _complete(){me.complete.apply(me,arguments);},
                    error:function _error(){me.error.apply(me,arguments);}
                },this.local));

            var _fn = function (_data) {
                var _name = Rsd.getUrlParam(_ajax.url,'name');
                _callback(_data[_name]);
            }

            return _ajax.requestJson(data,_fn);
        }
        else{
            //debugger;
            var _args = data;
            if(Rsd.isType(data,Object))
            {
                _args = {};
                _args = Rsd.apply(_args,this.server.data||{});
                _args = Rsd.apply(_args,data||{});
            }
            var _class = 'Rsd.data.Ajax';
            if(me.ajaxType && me.ajaxType == 'file')
            {
                _args = data;
                _class = 'Rsd.data.File';
            }
            var _ajax = Rsd.create(_class,Rsd.apply(
                {
                    key:Rsd.getAppToken(),
                    complete:function _complete(){me.complete.apply(me,arguments);},
                    error:function _error(){me.error.apply(me,arguments);}
                },this.server));


            if(me.progressHandler)
            {
                _ajax.on('progress',function (data) {

                    me.funApplyByIOC(me.progressHandler,arguments);
                })
            }
            return _ajax.requestJson(_args,_callback);
        }
    }

},function(type){

    var _localGetter = function () {

        if (this.__local == undefined) {
            this.__local = { method:'get',url:''};
        }
        return this.__local;
    };
    var _localSetter = function (local) {
        if(Rsd.isObject(local))
        {
            Rsd.apply(this.local,local);
        }
        if(Rsd.isString(local))
        {
            this.local.url = local;
        }

    };

    this.defineProperty(type,"local", _localGetter, _localSetter,true);

    var _serverGetter = function () {

        if (this.__server == undefined) {
            this.__server = { timeout:10000,method:'get',url:''};
        }
        return this.__server;
    };

    var _serverSetter = function (server) {
        if(Rsd.isObject(server))
        {
            Rsd.apply(this.server,server);
        }
        if(Rsd.isString(server))
        {
            this.server.url = server;
        }

    };

    this.defineProperty(type,"server", _serverGetter, _serverSetter,true);
});
