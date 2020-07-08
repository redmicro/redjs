/**
 * Created by seeker910 on 13-12-31.
 * @description 自定义事件管理器
 */
Rsd.define("Rsd.common.EventList", {
    extend:'Rsd.common.Object',
    xtype: 'event-list',
    /*
     * */
    constructor: function EventList(config) {
        this.apply(config);
        this.handlers = {};
    },
    /**
     * @description 添加事件
     * @param {object} caller 指定fire时允许的调用者
     * @param {string} name
     * @param {function|string} handler
     * @param {boolean} once 只执行一次
     * @param {string} group 分组关键字
     * */
    add: function add(caller,name, handler,once,group) {

        var obj = this;
        if (!obj.handlers) {
            obj.handlers = {};
        }
        var _caller = null;
        var _name = null;
        var _fn = null;
        var _once = null;
        var _group = null;

        for (var i = 0; i < arguments.length; i++) {

            if (Rsd.isFunction(arguments[i])) {
                if(Rsd.isString(_fn) )
                {
                    _group = _fn;
                }
                _fn = arguments[i];
                continue;
            }
            if (Rsd.isString(arguments[i]) && _name == null) {
                _name = arguments[i].toLocaleString();
                continue;
            }
            if (arguments[i] == Rsd || arguments[i] instanceof Rsd.common.Object) {
                _caller = arguments[i];
                continue;
            }
            if (Rsd.isBoolean(arguments[i]) && _once==null) {
                _once = arguments[i];
                continue;
            }
            if (Rsd.isString(arguments[i]) && _fn == null) {
                _fn = arguments[i];
                continue;
            }
            if (Rsd.isString(arguments[i]) && _group== null) {
                _group = arguments[i];
                continue;
            }
        }

        if(_caller==null) {

            _caller = this.parent;
        }
        if(_caller==null)
        {
            throw new Error('argument caller is not allow null and must instanceof type Rsd.common.Object.');
        }

        if (typeof obj.handlers[_name] == "undefined") {
            obj.handlers[_name] = {};
        }
        if (typeof obj.handlers[_name][_caller.id] == "undefined") {
            obj.handlers[_name][_caller.id] = [];
        }

        obj.handlers[_name][_caller.id].push({caller: _caller, fn: _fn, once: _once || false,group:_group});


    },
    /**
     * @description 触发事件
     * @param {object} caller 调用者，必须和add时caller一致，否则不会触发事件
     * @param {function|string} name
     * @param {Array} args
     * @param {string} group 分组关键字
     * */
    fire: function fire(caller,name, args,group) {

        var _caller = null;
        var _name = null;
        var _args = null;
        var _group = null;

        for(var i=0;i< arguments.length;i++)
        {
            if (Rsd.isString(arguments[i])) {
                _name = arguments[i];
                continue;
            }
            if (arguments[i] == Rsd || arguments[i] instanceof Rsd.common.Object) {
                _caller = arguments[i];
                continue;
            }
            if (Rsd.isArray(arguments[i])) {
                _args = arguments[i];
                continue;
            }
            if (Rsd.isString(arguments[i]) && _group== null) {
                _group = arguments[i];
                continue;
            }
        }

        var obj = this;
        if(_caller==null) {

            _caller = this.parent;
        }
        if(_caller==null)
        {
            throw new Error('argument caller is not allow null and must instanceof type Rsd.common.Object.');
        }

        if (obj.handlers && obj.handlers[_name] && obj.handlers[_name][_caller.id] instanceof Array) {

            var handlers = obj.handlers[_name][_caller.id];

            for (var i = 0, len = handlers.length; i < len; i++) {

                if(_caller==handlers[i].caller && (_group==null || handlers[i].group==_group ))
                {
                    var rs = Rsd.callFunction( _caller,handlers[i].fn, _args);
                    if(handlers[i].once && (rs == undefined ||rs==true) )
                    {
                        obj.handlers[_name][_caller.id].splice(i, 1);
                        len = handlers.length;
                        i--;
                    }
                }
            }
        }

    },
    /**
     * @description 移除事件，条件caller，name完全相等
     * @param {object} caller 调用者，必须和add时caller一致，否则事件不会移除
     * @param {string} name
     * @param {string} group 分组关键字
     * */
    remove: function remove(caller,name,group) {
        var _caller = null;
        var _name = null;
        var _group = null;
        for(var i=0;i< arguments.length;i++)
        {
            if (Rsd.isString(arguments[i])&& _name ==null) {
                _name = arguments[i];
                continue;
            }
            if (arguments[i] == Rsd || arguments[i] instanceof Rsd.common.Object) {
                _caller = arguments[i];
                continue;
            }
            if (Rsd.isString(arguments[i]) && _group== null) {
                _group = arguments[i];
                continue;
            }
        }
        if(_caller==null) {

            _caller = this.parent;
        }
        if(_caller==null)
        {
            throw new Error('argument caller is not allow null and must instanceof type Rsd.common.Object.');
        }
        var obj = this;

        if (obj.handlers[_name] && obj.handlers[_name][_caller.id] instanceof Array) {
            var handlers = obj.handlers[_name][_caller.id];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if(_caller==handlers[i].caller && (_group==null || handlers[i].group==_group )){

                     obj.handlers[_name][_caller.id].splice(i, 1);
                    len = handlers.length;
                    i--;
                }
            }
        }
    }

},function (type) {

    window.Rsd.events = Rsd.create('Rsd.common.EventList',{parent:window.Rsd});
});