
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
            "name": "Operator",
            "dataIndex": "Operator",
            "sortable": false,
            "text": "操作人",
            "index": 40,
            "exist": true,
            xtype:'template',
            formatString:'操作人:#=Operator=#</br>时间:#=LogTime=#</br>会话:#=SessionId=#',
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
            "name": "Content",
            "dataIndex": "Content",
            "sortable": false,
            "text": "日志内容",
            "index": 50,
            "exist": true,
            "xtype": "text",
            "width": 250,
            "nobr": false
        },
        {
            "name": "RefType",
            "dataIndex": "RefType",
            "sortable": false,
            "text": "引用位置",
            "index": 60,
            "exist": true,
            xtype:'template',
            formatString:'#=RefType=#</br>#=RefMethod=#',
            "width": 150,
            "nobr": true
        }, 
        {
            "name": "SessionId",
            "dataIndex": "SessionId",
            "sortable": false,
            "text": "主机ID",
            "index": 80,
            "exist": true,
            xtype:'template',
            formatString:'线程:#=ThreadFlag=#</br>主机IP:#=CilentIp=#',
            "width": 150,
            "nobr": true
        }
        
       
    ],
    sort:[{name:'CreateTime',direction:'DESC'}],
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
        _args.sort = this.sort || this.menu.sort||[];
        this.callParent(_args,callback) ;
    }

});
