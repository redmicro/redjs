/**
 * Created by seeker910 on 13-12-31.
 */
Rsd.define('Rsd.common.Application', {
    extend:'Rsd.common.Object',
    requires:['Rsd.data.Plugin','Rsd.data.Schema',"Rsd.common.EventList",'Rsd.data.Service','Rsd.data.Logger','Rsd.common.Lang'],
    xtype:'application',
    authorization:null,
    token:null,
    appTitle: '',
    appName: '',
    //源文件
    appFolder:'src',
    //插件
    plugins:[],
    //
    //appHost:''
    // 服务端 状态探测地址
    appHostIndex:'',
    //版本号
    appVersion:'0.0.0.0',
    //版本发布日期
    appDate:new Date().getTime(),
    //js 脚本代理服务器地址 ，设置该值后，所有js脚本请求 会被指向该地址，且请求格式为jsAgentHost/base64(path),且需要在代理服务上 先解析path内容 
    jsAgentHost:'',
    lang:'zh-cn',
    svg:null,
    /*api service*/
    //services:{},
    schemas:{},
    //app启动时间
    startTime:0,
    isDemo: window.location.protocol  == 'file:',
    getSchemaListHandler:'',
    getSchemaHandler:'',
    /*
    * web,wap,wxapp,
    * */
    appType:null,
    /*
    * */
    constructor: function Application(config) {
        //debugger;
        this.apply(config);
    },
    /**
     * */
    run :function run() {
        var me = this;

        Rsd.create('Rsd.common.Lang',{}).load(me.lang);

        if(me.svg)
        {
            Rsd.create('Rsd.common.Svg',{}).load('./resources/svg/' + me.svg+'.js?t=' + Rsd.timestamp);
        }

        if (Rsd.validateBrowser() == false) {
            var error = '浏览器版本过低，请升级或选择其他浏览器。';
            Rsd.alert(error);
            document.title = error;
            return;
        }

        window.document.title=  this.appTitle;

        var _obj;

        for (var c in me.requires) {
            if(!me.requires.hasOwnProperty(c))
            {
                continue;
            }
            _obj = me.requires[c];
            var isJs = /(\.js)$/.test(_obj);
            if (isJs) {

                Rsd.loadScriptFile(_obj);
            }
            else {
                //console.log('application run',_obj);
                Rsd.loadClass(_obj);
            }

        }
        if(Rsd.isEmpty(me.appHostIndex))
        {
            me.launch.call(me);
        }
        else
        {
            setTimeout(function () {

                me.testServer(function (data) {
                    if(!data.success)
                    {
                        Rsd.create('Rsd.view.ErrorPage',{text:data.msg}).show();
                    }else{
                        me.launch.call(me);
                    }

                })

            },0);
        }

        Rsd.debug('App is runing.');
    },
    /**
     * @description 加载插件
     * * */
    loadPlugin:function loadPlugin(plugin,callback)
    {
        var app = this;
        if(Rsd.isString(plugin))
        {
            var _plugin = {path:plugin};
            var _fn = function () {
                var _p = this;
                var _s = new Rsd.data.Store({
                    proxy: {
                        url: plugin + '/config.js',
                        method:'get'
                    }});

                _s.load({},function (config) {

                   
                    if(config)
                    {
                     
                        var pConfig = new Rsd.data.Plugin(config);
                        pConfig.path = _p.path;
                       
                        app.loadPlugin(pConfig);
                    }

                    if(callback)
                    {
                        callback(pConfig);
                    }
                });
            }
            _fn.call(_plugin);

            return;
        }

        this.plugins = this.plugins || [];
        this.__plugin_mapping = this.__plugin_mapping || {};
        this.plugins.push(plugin);
        this.__plugin_mapping[plugin.name.toLowerCase()] = plugin;
    },
    /**
     * 
     */
    getPlugin:function getPlugin(name)
    {
       return  this.__plugin_mapping[name.toLowerCase()] ;
    },
    /**
    * 探测服务端 是否可用
    * */
    testServer:function testServer(callback) {

        var me = this;

        me.___t_timers = me.___t_timers||0;

        Rsd.request(
            {
                async:false,
                url: me.appHost+me.appHostIndex,
                error: function (xhr,text,event) {

                    if(me.___t_timers<5)
                    {

                        setTimeout(function () {
                            me.testServer(callback);
                            me.___t_timers++;
                        },200);
                        return;
                    }

                    console.error(event);
                }},
            { },
            callback
            );
    },

    /**
     * */
    getUser: function () {
        var user = Rsd.request(Rsd.getUserUrl);

        var user = Rsd.toJson(user);

        return user;
    },
    /**
     * */
    showModelView:function(config) {

        var _type = config.modeltype;

        if(!_type.startWith('Rsd.'))
        {
            _type = Rsd.app.assembelyName + '.' + _type;
        }

        var _readOnly = (config.readOnly==undefined?false:config.readOnly);
        if(_readOnly)
        {
            var form = Rsd.create('Rsd.view.SingleDialog', {
                modelType:_type,
                fields:config.formfields,
                title: config.title,
                buttons:config.btns,
                schema:null,
                readOnly:_readOnly,
                parent:parent||this
            });

            form.showDialog().load(config.record);
        }
        else
        {
            this.getSchema(_type,function (schema) {
                var form = Rsd.create('Rsd.view.SingleDialog', {
                    modelType:_type,
                    fields:config.formfields,
                    title: config.title,
                    buttons:config.btns,
                    schema:config.schema,
                    readOnly:_readOnly,
                    parent:config.parent||this,
                });

                form.showDialog().load(config.record);
            });

        }

    },

    /**
    *
    *
    * */
    addService:function addService(key,config)
    {
        var _name = key.toLowerCase();
        var _group = _name.substr(0,_name.lastIndexOf('.'));
        var _method = _name.substr(_name.lastIndexOf('.')+1);

        this.services[_group].api[_method] = new Rsd.data.Service(config);
    },

    /**
     *
     * */
    getService: function getService(name){

        if(Rsd.isEmpty(name))
        {
            throw new Error('param [name] is null when call  Application.getService method.');
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

        //console.log(service);

        if(!service.api.hasOwnProperty(_method))
        {
            Rsd.error('服务['+ name +']不存在,请确认');
            return null;
        }

        if(Rsd.isEmpty(service.api) && service.isLoading)
        {
            Rsd.error('服务['+ name +']正在加载，请稍后');
            return;
        }

        var item = service.api[_method];

        if(item instanceof  Rsd.data.Service)
        {
            return item;
        }

        return new Rsd.data.Service({
            key:_name,
            group:_group,
            parent : this,
            errorHandler :'',
            failureHandler : '',
            successHandler : '',
            progressHandler: '',
            ajaxType:'ajax',
            local:{method:'get',url:''},
            server:{
                url:item.Url,
                method:item.Method || 'POST',
                //contentType:'application/json',
                //dataType: 'json',
                async:true
            }

        });
    },

    /**
     * @description 服务未加载完成时，有两次各延时1秒的处理
     *
     * */
    requestService:function requestService(name, data, callback,timeout) {

        Rsd.requestService(name, data, callback,"正在加载",timeout);
     },
    /**
    *
     * */
    getSchemaList:function getSchemaList(callback) {

        if(!this.getSchemaListHandler)
        {
            Rsd.error('Application 类中未找到getSchemaListHandler的定义。');
            return;
        }
        return this.funApplyByIOC(this.getSchemaListHandler,[callback]);
    },

    /*
    *
    * */
    getSchema:function getSchema(modelType,callback) {
        //debugger;
        if(!this.getSchemaHandler)
        {
            Rsd.error('Application 类中未找到getSchemaHandler的定义。');
            return;
        }
        return this.funApplyByIOC(this.getSchemaHandler,[modelType,callback])

    }
},function(type){
    //
    this.defineProperty(type,'appHost',function(){return this.__appHost;},function(appHost){
        this.__appHost = appHost;
        //主协议是https时，必须https请求接口
        if(window.location.protocol=='https:' && this.appHost.startsWith('http://'))
        {
            this.__appHost = 'https://' + this.__appHost.substring(7);
        }
        //主协议是http时，请求接口没有要求
       // if(window.location.protocol=='http:' && this.appHost.startsWith('https://'))
       // {
       //     this.__appHost = 'http://' + this.__appHost.substring(8);
       // }

    },false);



});