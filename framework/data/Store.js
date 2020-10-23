/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:15
 * To change this template use File | Settings | File Templates.
 */

/*
 * 负责数据远程本地混存JSON格式存贮，
 * 支持缓存到本地
 * */
Rsd.define('Rsd.data.Store', {
    extend:'Rsd.common.Object',
    xtype:'store',
    /*
    * 是否缓存
    * */
    //cache:false,
    /*
    * session(默认),local,memory
    * */
    //cacheType:session,
    /*
     proxy.url 对象简写属性
    * */
    url: '',
    /*
    可以是Rsd.common.Service，也可以是用于创建Rsd.common.Service的参数config对象{}
    * */
    proxy:{},
    /*
    * 键值字段名
    * */
    //keyName:'',
    /*
    * 返回数据结构为：{sucess:,msg:data:}
    * listName为data中数据列表字段名,null:为 data 本身
    * */
    //listName:'rows',
    /*
    * */
    constructor: function Store(config) {
        config = config || {};
        this.apply(config);
    },
    /**
     @param {object} args: 作为Ajax对象请求时的参数中data属性（即远程方法的参数）
     @param {function} callback:回调函数，等待数据请求返回后，cache=true 时 ，异步执行
    * */
    load: function load (args,callback) {
        //debugger;

        var me = this;

        if(this.cache && Rsd.isEmpty(this.keyName))
        {
            me.error(me.$className + ' cache is true ,keyName not allowed empty.');
        }

        var _localCache = me.getCache();
        //获取缓存数据
        if(me.cache && _localCache)
        {
            if(Rsd.isFunction(callback) )
            {
                setTimeout(function () {
                    callback.call(me,_localCache.data);
                },0);

                return this;

            }

        }

        if(me.cache && this.hasOwnProperty('__callbacks'))
        {
            me.__callbacks.push(callback);

            return this;
        }
        else
        {
            this.__callbacks = [callback];
        }

        var _callback = function _store_callback(data) {

            var _rs = [];
            if(me.cache)
            {
                if(!data.hasOwnProperty('success')|| data.success)
                {
                    //异步执行，无法返回 回调函数返回值
                    setTimeout(function () {
                        var mapping={};
                        if(me.keyName)
                        {

                            var _list = null;

                            if(Rsd.isEmpty(me.listName) )
                            {
                                _list = data.hasOwnProperty('data')?data.data:data;
                            }else
                            {
                                if(!data.data.hasOwnProperty(me.listName))
                                {
                                    me.error('Data has no property(listName is ['+me.listName+']).',data.data);
                                }
                                _list = data.data[me.listName];
                            }
 
                            for(var i in _list)
                            {
                                var _r = _list[i];
                                if(Rsd.isEmpty(_r[me.keyName]))
                                {
                                    me.error('Object key value is null(KeyName is ['+me.keyName+']).');
                                    me.log(_r);
                                }
                                mapping[_r[me.keyName]] = _r;
                            }

                        }

                        me.cacheData({data:data,mapping:mapping});

                        for(var i in me.__callbacks)
                        {
                            //console.log(me.id + '---4');
                            if(Rsd.isFunction(me.__callbacks[i]))
                            {
                                me.__callbacks[i].call(me,data);
                            }
                        }

                        me.__callbacks=[];

                        var _list = me.__callbacks1||[];
                        for(var i in _list)
                        {
                            _list[i].fn.call(me,mapping[_list[i].key]);
                        }

                        me.__callbacks1 = [];

                    },10);

                }
            }
            else
            {


                for(var i in me.__callbacks)
                {
                    if(Rsd.isFunction(me.__callbacks[i]))
                    {
                        _rs.push(me.__callbacks[i].call(me,data));
                    }
                }

                me.__callbacks=[];

            }

            return _rs.length==1?_rs[0]:true;
        }

        this.proxy = this.proxy || {};
        // debugger;
        if(this.proxy instanceof  Rsd.data.Service){

            this.proxy.requestJson(args,_callback);
        }
        else
        {
            //debugger;
            this.proxy.url = this.proxy.url || this.url;

            Rsd.requestJson(this.proxy,args,_callback);
        }
    },


    /*
    *获取缓存对象
    * */
    getObject:function getObject(key,callback) {

        if(!this.cache)
        {
            this.error(" cache is false ,function getObject not allowed call. ");
            return null;
        }
        if(Rsd.isEmpty(key))
        {
            return null;
        }
        var _localCache =  this.getCache();
        if(Rsd.isEmpty(_localCache))
        {
            if(!this.hasOwnProperty('__callbacks1'))
            {
                this.__callbacks1 = [];
            }
            if(Rsd.isFunction(callback))
            {
                this.__callbacks1.push({fn:callback,key:key});
            }

            return null;
        }
        else
        {
            Rsd.callFunction(this,callback,[_localCache.mapping[key.trim()]]);
            return _localCache.mapping[key.trim()];
        }



    },
    /*
    *
    * */
    cacheData:function cacheData(data) {

        if(this.cacheType.toLowerCase() == 'memory')
        {
            this.__data = data;
        }
        if(this.cacheType.toLowerCase() == 'session')
        {
             this.writeSession(data);
        }
        if(this.cacheType.toLowerCase() == 'local')
        {
             this.writeLocal(data);
        }
        this.__isCached = true;
    },
    /*
    *
    * */
    getCache:function getCache() {

        if(!this.__isCached)
        {
            return null;
        }
        if(this.cacheType.toLowerCase() == 'memory')
        {
            return this.__data;
        }
        if(this.cacheType.toLowerCase() == 'session')
        {
            return this.readSession();
        }
        if(this.cacheType.toLowerCase() == 'local')
        {
            return this.readLocal();
        }
        return null;
    }, /*
     * 清楚缓存
     * */
    clearCache:function clearCache( )
    {
        this.__data = null;
        this.removeSession();
        this.removeLocal();
    }


},function (type) {
    var _cacheGetter = function () {

        if (!this.hasOwnProperty('__cache')) {
            this.__cache = false;
        }
        return this.__cache;
    };
    var _cacheSetter = function (value) {
        this.__cache =value;
    };
    this.defineProperty(type,"cache", _cacheGetter, _cacheSetter,true);

    var _keyNameGetter = function () {

        if (!this.hasOwnProperty('__keyName')) {
            this.__keyName = '';
        }
        return this.__keyName;
    };
    var _keyNameSetter = function (value) {
        this.__keyName =value;
    };

    this.defineProperty(type,"keyName", _keyNameGetter, _keyNameSetter,true);

    var _listNameGetter = function () {

        if (!this.hasOwnProperty('__listName')) {
            this.__listName = 'rows';
        }
        return this.__listName;
    };
    var _listNameSetter = function (value) {
        this.__listName =value;
    };

    this.defineProperty(type,"listName", _listNameGetter, _listNameSetter,true);


    var _cacheTypeGetter = function () {

        if (!this.hasOwnProperty('__cacheType')) {
            this.__cacheType = 'session';
        }
        return this.__cacheType;
    };

    var _cacheTypeSetter = function (value) {
        this.__cacheType =value;
    };
    this.defineProperty(type,"cacheType", _cacheTypeGetter, _cacheTypeSetter,true);
})