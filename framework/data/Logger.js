/**
 * Created by seeker910 on 2018/1/24.
 * 项目日志自定义接口使用
 */
Rsd.define('Rsd.data.Logger', {
    extend:'Rsd.common.Object',
    xtype:'loger',
    singleton:true,
    projectId:'',
    /*
    * */
    constructor: function Logger (config) {
        config = config || {};
        this.apply(config);
        this.__errorEntries =  [];
        this.__warnEntries =  [];
        this.__debugEntries =  [];
        this.__infoEntries =  [];
        this.__pvEntries =  [];
        this.__clickEntries = [];
        this.__timing = {};
        this.__navigation ={};
        this.__memoryEntries=[];
    },
    /*
    * @url 事件发生所在页面
    * */
    error:function error(msg,ex) {
        this.__errorEntries = this.__errorEntries||[];
        this.__errorEntries.push({data:ex,message:msg,projectId:this.projectId,logTime:Date.parse(new Date())});
    },
    /*
    * @url 事件发生所在页面
    * */
    warn:function warn(msg,data)
    {
        this.__warnEntries = this.__warnEntries||[];
        this.__warnEntries.push({data:data,message:msg,projectId:this.projectId,logTime:Date.parse(new Date())});
    },
    /*
    * @url 事件发生所在页面
    * */
    debug:function debug(msg,data) {
        this.__debugEntries = this.__debugEntries||[];
        this.__debugEntries.push({data:data,message:msg,projectId:this.projectId,logTime:Date.parse(new Date())});
    },
    /*
    * @url 事件发生所在页面
    * */
    info:function (msg,data) {
        this.__infoEntries = this.__infoEntries||[];
        this.__infoEntries.push({data:data,message:msg,projectId:this.projectId,logTime:Date.parse(new Date())});
    },
    /*
    * 开始执行 标记
    * */
    markStart:function markStart(name)
    {
        var _per = window.performance;
        if(_per)
        {
            _per.mark(name + '_start');
        }
    },
    /*
    * 执行结束 标记
    * */
    markEnd:function markEnd(name) {
        var _per = window.performance;
        if(_per)
        {
            _per.mark(name + '_end');
        }
    },
    /*
    * 计算 执行时长
    * */
    measureMark:function measureMark(name)
    {
        var _per = window.performance;
        if(_per)
        {
            _per.measure(name, name + '_start', name + '_end');
        }
    },

    /*
    * page view 日志
    * @page 当前访问的页面，URL 或 class
    * */
    pv:function pv(page,text,data) {
        this.__pvEntries = this.__pvEntries||[];
        this.__pvEntries.push({data:data||document.cookie,text:text|document.title,page:page||document.URL,projectId:this.projectId,logTime:Date.parse(new Date())});
    },
    /*
    * 点击事件日志
    * @eleType 点击的dom节点类型
    * @text 点击的dom节点文本描述
    * @url 目标URL
    * */
    click:function click(eleType,text,data) {
        var _per = window.performance;
        var _now ;
        if(_per)
        {
            _now = _per.now();
        }
        this.__clickEntries = this.__clickEntries||[];
        this.__clickEntries.push({elementType:eleType,elementText:text,data:data,ElementNow:_now,projectId:this.projectId,logTime:Date.parse(new Date())});
    },
    /*
    * 性能监控
    * */
    timing:function timing() {
        var _per = window.performance;
        if(_per) {
            this.__timing = _per.timing;
        }
    },
    navigation:function navigation() {
        var _per = window.performance;
        if(_per) {
            this.__navigation = _per.navigation;
        }
    },
    /*
    * 记录内存信息
    * */
    memory:function memory() {
        this.__memoryEntries = this.__memoryEntries||[];
        var _per = window.performance;
        if(_per) {

            this.__memoryEntries.push(_per.memory);
        }
    },
    /*
    * 提交日志,在onLoad之后提交
    * */
    send:function send() {
        //
        var me = this;

        var _per = window.performance;
        if(_per)
        {

            me.__perEntries = _per.getEntries();

            _per.clearMarks();
            _per.clearMeasures();
            _per.clearResourceTimings();
        }
        var _logTime = Date.parse(new Date());
        var data = {
            logTime:_logTime,
            projectId:me.projectId,
            perTiming: [me.__timing||{}],
            perMemoryEntries:me.__memoryEntries.splice(0,100),
            //信息日志
            errorEntries: me.__errorEntries.splice(0,100),
            warnEntries: me.__warnEntries.splice(0,100),
            debugEntries: me.__debugEntries.splice(0,100),
            infoEntries: me.__infoEntries.splice(0,100),
            //行为日志
            pvEntries: me.__pvEntries.splice(0,100),
            clickEntries: me.__clickEntries.splice(0,100),
            //所有资源请求的时间数据
            perEntries:me.__perEntries.splice(0,100)
        };

        if(me.__navigation)
        {
            data.perTiming.NavType = me.__navigation.type;
            data.perTiming.NavRedirectCount = me.__navigation.redirectCount;
        }


        //缓存到本地
        me.writeLocal(data);

        //异步发送日志数据
        setTimeout(function () {
            var data = me.readLocal();
            me.funApplyByIOC(me.commit,[data]) ;
            me.removeLocal();
        },100);


        me.__timing = null;
        me.__navigation = null;

    },
    /*
    *
    * */
    commit:function commit(data) {

        console.warn('提交日志到服务端方法commit未实现');
        console.warn(data);

    }
});