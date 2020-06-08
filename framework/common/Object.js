/*
 * redmicro all Copyright (c)
 */

/**
 * Created by seeker910 on 14-3-17.
 */

Rsd.define('Rsd.common.Object', {
    //extend:null,
    xtype:'object',
    //单例对象
    //singleton:false,
    //cache:false,
    //拥有该对象的父节点
    //parent:null,
    /**
        * @description 性能统计参数
        * */
    timing:{},
    /*
    * @private
    * */
    constructor: function Object (config) {
        config = config || {};
        this.apply(config);
        this.__isCreated =true;
    },
    /*
    * @protected
    * */
    init:function init() {

        this.markTime('initStartTime');
    },
    /*
    *
    * 性能计时器
    * */
    markTime:function markTime(name)
    {
        try {
            this.__timing = this.__timing||{};
            this.__timing[name] = new Date().getTime();
            if(Rsd.isEmpty(this.__timing.start))
            {
                this.__timing.start = this.__timing[name];
            }
            this.__timing.total = this.__timing[name] - this.__timing.start;
        }catch (e) {
            console.error(e);
        }


    },
    /*
    *
    * */
    getTiming:function getTiming() {
        return this.__timing;
    },

    /*
    * @public
    * */
    callParentFn: function callParentFn(name,args) {

        var _rs = null;
        var _fn = null;

        var _name = name;
        var _args = [];
         var _t = args||[];

        for(var i=0 ;i< _t.length;i++)
        {
            _args.push(_t[i]);
        }

        if( Rsd.isString(_name) && Rsd.isArray(_args))
        {
            if (this.__$protos == null) {
                this.__$protos = {};
            }
            if (this.__$protos[_name] == null) {
                this.__$protos[_name] = [];
                var _proto = this.__proto__;
                while (_proto != null
                && !_proto.hasOwnProperty(_name)) {
                    _proto = _proto.__proto__;
                }
                if (_proto != null) {
                    _proto = _proto.__proto__;
                }

                while (_proto != null) {
                    if (_proto.hasOwnProperty(_name)
                        && _proto[_name] != _fn) {
                        _fn = _proto[_name];
                        this.__$protos[_name].push(_fn);
                    }
                    _proto = _proto.__proto__;
                }
                //console.log(this.id + '---' + _name +  '---' + this.__$protos[_name].length);
            }

            if (this.__$protos.hasOwnProperty(_name)
                && this.__$protos[_name].length > 0) {
                _fn = this.__$protos[_name][0];
                //console.log(_fn);
                this.__$protos[_name].shift();
                _rs = _fn.apply(this, _args);
            }
            if(_fn==null)
            {
                console.error( '在对象（' + (this.id || this.$className ||'未知对象')+ '）的父类中未找到方法：' + _name );
            }
            delete this.__$protos[_name];

            return _rs;
        }
        if(!Rsd.isString(_name))
        {
            console.error('callParentFn第一个参数必须为string类型。');
        }
        if(!Rsd.isArray(_args))
        {
            console.error('callParentFn第二个参数必须为array类型。');
        }
    },
    /*
     * @public
     * */
    callParent: function callParent() {

        var _name = Rsd.getFunctionName(arguments.callee.caller);

        if (_name == null
            || _name == undefined
            || _name=='') {
            throw new Error('the name of function that call function callParent is null. ');
        }

        return this.callParentFn(_name,arguments);
    },

    /**
     * @public
     * @description  方法动态注入调用，由自身开始逐级向高一级父对象探测,将最终function 绑定到对象属性上,提供程序执行效率
     * @param obj:要注入的对象，
     * @param propertyName：要注入的属性名
     *
     * */
    funBindByIOC:function funBindByIOC(obj,propertyName)
    {
        if(Rsd.isEmpty(propertyName))
        {
            return true;
        }
        if(Rsd.isEmpty(obj) || Rsd.isEmpty(obj[propertyName]))
        {
            return;
        }

        if(Rsd.isString(obj[propertyName]) )
        {
            var __obj = this;
            var _fnName = obj[propertyName];
            var _fn = null;
            try
            {
                while(__obj && __obj instanceof Rsd.common.Object)
                {
                    _fn = __obj[_fnName];
                    if( Rsd.isFunction(_fn))
                    {
                        _fn = function(){return __obj[_fnName].apply(__obj,arguments);};
                        break;
                    }
                    __obj = __obj.parent;
                }


            }catch (ex)
            {
                Rsd.error('函数注入失败','Rsd.common.Object',ex);
            }

            if(_fn != null)
            {
                obj[propertyName] = _fn;
            }
            else
            {
                throw  new Error('Can not find function \'' + _fnName + '\''  );
            }
        }


    },
    /**
    *
    * @public
    * @description 方法动态注入调用，由自身开始逐级向高一级父对象探测，返回最近父对象中被探测到的方法执行结果
    * 对parent的依赖，降低到最后
    *
    * @fun:方法名称
    * @args:arrary,参数数组
    * */
    funApplyByIOC:function funApplyByIOC(fun,args) {

        if(Rsd.isNullOrUndefined(fun))
        {
            return true;
        }
        if( Rsd.isFunction(fun))
        {
            return fun.apply(this,args||[]);
        }
        if(Rsd.isString(fun))
        {
            var obj = this;
            var _fn = null;
             while(obj && obj instanceof Rsd.common.Object)
             {
                 _fn = obj[fun];
                 if( Rsd.isFunction(_fn))
                 {
                     break;
                 }
                 obj = obj.parent;
             }

            if(_fn != null)
            {
                return _fn.apply(obj,args||[]);
            }
            else
            {
                  throw new Error('Can not find function \'' + fun + '\''  );
            }
        }
        return null;
    },
    /*
    * @public
    * */
    getCallStack:function getCallStack(count)
    {
        return Rsd.getCallStack(count) ;
    },
    /*
    *@public
    * 将数据合并到对象中（用于对象创建后使用）*/
    apply:function apply(data)
    {
        Rsd.apply(this,data);
    },
    /*
    * @public
    * 是否包含属性 name ，含其原型的属性。
    * */
    hasProperty:function hasProperty(name)
    {
        return  name in this;
    },
    /*
    * @public
    * */
    isCreated:function isCreated()
    {
        return  this.__isCreated;
    },
    /**
     *   @public
     * 延时执行，延时时间内的事件被放弃
     * @ms 延时时长 （单位毫秒）
     * */
    delay:function delay(callback,ms) {
        var me = this;
        if( me.___timerDelay )
        {
            return;
        }
        me.___timerDelay = ms||100;

        var _id = setInterval(function () {
            me.___timerDelay  -= 100;
            if( me.___timerDelay > 0)
            {
                //延时时间内的事件被放弃

            }else
            {
                clearInterval(_id);
                callback.call(me);
            }


        },100);
    },
    /**
     * @public
     * @desc 阻赛执行，阻赛期间的事件被放弃
     * @param callback 被阻塞执行的方法
     * @param ms 延时时长 （单位毫秒）
     * @param 同一个对象下有多个阻塞方法时，需要为每个阻塞方法指定键值
     * */
    block:function block(callback,ms,key) {
        var me = this;
        var _key = '___timerBlock__' + key || 'default';
        if( me[_key] )
        {
            return;
        }
        me[_key] = ms||100;
        callback.call(me);
        var _id = setInterval(function () {
            me[_key] -= 100;
            if(me[_key] > 0)
            {
                //阻赛期间的事件被放弃

            }else{
                clearInterval(_id);
            }
        },100);
    },
    /*
    *@public
    * 写入本地缓存
    * */
    writeLocal:function writeLocal(data) {
        Rsd.writeLocal(this.id,data);
    },
    /*
    * @public
    * 读取本地缓存
    * */
    readLocal:function readLocal() {
        return Rsd.readLocal(this.id);
    },
    /*
    *@public
    * 删除本地缓存
    * */
    removeLocal:function removeLocal() {
        Rsd.removeLocal(this.id);
    },
    /*
     *@public
     * 写入会话缓存
     * */
    writeSession:function writeSession(data) {
        Rsd.writeSession(this.id,data);
    },
    /*
     * @public
     * 读取会话缓存
     * */
    readSession:function readSession() {
        return Rsd.readSession(this.id);
    },
    /*
     *@public
     * 删除会话缓存
     * */
    removeSession:function removeSession() {
        Rsd.removeSession(this.id);
    },

    /*
    *@public
    * */
    log:function log(msg,data) {
        Rsd.log('Ctrl(' + this.id + '):' + msg + '(' + this.$className + ')');
    },
    /**
    *@public
    * 延时(1000ms)执行，将相同信息合并统计后提示。
    * */
    warn:function (msg,data) {
        var me = this;

        me.__warn__ = me.__warn__ || {};
        me.__warn__[msg] = (me.__warn__[msg]||0) + 1;

        me.delay(function () {

            for(var i in me.__warn__)
            {
                Rsd.warn('Ctrl(' + me.id + '):' + i + '(' + me.$className + ')[' + me.__warn__[i] + '次]');
            }
            delete  me.__warn__;
        },1000);


    },
    /**
    *@public
    * */
    error:function error(msg,data) {
        Rsd.error('Ctrl(' + this.id + '):' + msg + '(' + this.$className + ')');
        if(!Rsd.isEmpty(data))
        {
            console.error(data);
        }

    },
    /**
    *@public
    * */
    debug:function debug(msg,data) {
        Rsd.debug('Ctrl(' + this.id + '):' + msg + '(' + this.$className + ')');
    },
    /*
    *@public
    * */
    msg:function msg(text,data) {
        Rsd.showMessage(text);
    }

},function(type){
    //
    this.defineProperty(type,'parent',function(){return this.__parent;},function(parent){
        this.__parent = parent;
    },false);

    this.defineProperty(type,'singleton',function(){return this.__singleton;},function(singleton){
        this.__singleton = singleton;
    },false);

    this.defineProperty(type,'extend',function(){return this.__extend;},function(extend){
        this.__extend = extend;
    },false);

    this.defineProperty(type,'cache',function(){return this.__cache;},function(cache){
        this.__cache = cache;
    },false);

    this.defineProperty(type,'id',function(){
         if (!this.__id) {
                     this.__id = Rsd.getId(this.xtype);
                 }
        return this.__id;
        },
        function(id){
        this.__id= id;
    },false);

});
