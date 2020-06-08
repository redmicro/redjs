/**
 * Created by seeker910 on 2017/4/22.
 * 动态缓存
 * 对象在缓存中，则在缓存中获取，
 * 对象不在缓存中，则向服务端请求获取，并在获取后存入缓存中。
 */
Rsd.define('Rsd.data.Cache', {
    extend: 'Rsd.common.Object',
    xtype: 'cache',
    /*
     可以是Rsd.common.Service，也可以是用于创建Rsd.common.Service的参数config对象{}
     * */
    proxy:{},
    /*
     * */
    constructor: function Store(config) {
        config = config || {};
        this.apply(config);
        if(!Rsd.isObject(this.cache ))
        {
            this.cache={};
        }
    },
    /*
    *@prama args 必须包含keyName对映字段。
    * */
    get:function get(key,args,callback) {

        var me = this;
        var _args = args || {};

        if(key == undefined || key == null || key == ""  )
        {
            throw new Error("参数key值无效:不允许为空。");
        }

        //debugger;
        if(this.cache.hasOwnProperty(key))
        {
            if(this.cache[key].data)
            {
                Rsd.callFunction(this,callback,[this.cache[key].data]);
            }
            else
            {
                this.cache[key].callbacks.push(callback);
            }

        }
        else
        {
            this.cache[key] = {callbacks:[],data:null};
            this.cache[key].callbacks.push(callback);

            var _callback = function _cache_callback(data)
            {
                //debugger;
                var list=[];
                if(me.cache[key]){
                    me.cache[key].data = data;
                    list =  me.cache[key].callbacks;
                }

                for(var i in list)
                {
                    Rsd.callFunction(me,list[i],[data]);
                }

            }

            me.proxy = me.proxy || {};
            // debugger;
            if(me.proxy instanceof Rsd.data.Service){
                me.proxy.requestJson(_args,_callback);
            }
            else
            {
                me.proxy.url = me.proxy.url || me.url;

                Rsd.requestJson(me.proxy ,_args,_callback);
            }
        }

    },
    /*
    * */
    clear:function () {
        this.cache={};
    },
    /*
    * */
    remove:function (key) {
        delete  this.cache[key];
    }

},function (type) {
    var _cacheGetter = function () {

        if (!this.hasOwnProperty('__cache')) {
            this.__cache = {};
        }
        return this.__cache;
    };
    var _cacheSetter = function (value) {
        if(Rsd.isObject(value))
        {
            this.__cache = this.__cache||{};
            Rsd.apply(this.__cache,value);
        }
    };
    this.defineProperty(type,"cache", _cacheGetter, _cacheSetter,true);
});
