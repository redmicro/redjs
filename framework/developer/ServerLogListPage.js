
/**
*
*  暂时还没有做好外部对接
* */
Rsd.define("Rsd.developer.ServerLogListPage", {
    extend: "Rsd.view.BaseListPage",
    requires: [],
    xtype: "list-s-log",
    border: false,
    titleField:"LogTime",
    readOnly:true,
    /** 
     * 获取后台日志列表的api接口名称
    */
    serviceName:null,
    gridColumns:[
        {
            "text": "序号",
            "xtype": "index",
            "width": 40,
            "index": 0
        },
        {
            "name": "LogTime",
            "dataIndex": "LogTime",
            "sortable": false,
            "text": "记录时间",
            "index": 30,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "Operator",
            "dataIndex": "Operator",
            "sortable": false,
            "text": "操作人",
            "index": 40,
            "exist": true,
            "xtype": "string",
            "width": 100,
            "nobr": true
        },
        {
            "name": "LogLevel",
            "dataIndex": "LogLevel",
            "sortable": false,
            "text": "日志级别",
            "index": 41,
            "exist": true,
            "xtype": "enum",
            "enum": "LogLevelTypes"
        },
        {
            "name": "Content",
            "dataIndex": "Content",
            "sortable": false,
            "text": "日志内容",
            "index": 50,
            "exist": true,
            "xtype": "text",
            "width": 250,
            "nobr": true
        },
        {
            "name": "RefType",
            "dataIndex": "RefType",
            "sortable": false,
            "text": "引用所在类",
            "index": 60,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "RefMethod",
            "dataIndex": "RefMethod",
            "sortable": false,
            "text": "引用所在方法",
            "index": 70,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "SessionId",
            "dataIndex": "SessionId",
            "sortable": false,
            "text": "会话ID",
            "index": 80,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "ThreadFlag",
            "dataIndex": "ThreadFlag",
            "sortable": false,
            "text": "线程标识",
            "index": 90,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "LogType",
            "dataIndex": "LogType",
            "sortable": false,
            "text": "日志类型",
            "index": 100,
            "exist": true,
            "xtype": "enum",
            "enum": "LogType"
        },
        {
            "name": "CilentIp",
            "dataIndex": "CilentIp",
            "sortable": false,
            "text": "主机IP",
            "index": 110,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        }

    ],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    /*
    *获取服务
    * */
    load:function load(args,callback) {

        var _args = args;
        if(Rsd.isEmpty(_args))
        {
            _args ={modelType:this.modelType||this.menu.modelType};
        }
        var _serviceName = this.serviceName||this.menu.serviceName;
        if(Rsd.isEmpty(_serviceName))
        {
            Rsd.alert("未设置属性serviceName");
        }
        this.dataStore = Rsd.app.getService(_serviceName);

        this.callParent(_args,callback) ;
    }

});
