/**
 * 
 */
Rsd.define("Rsd.developer.JobLogListPage", {
    extend: "Rsd.view.BaseListPage",
    requires: [],
    xtype: "list-job-log",
    border: false,
    titleField:"Title",
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
            "index": 0,
            "deep": 1
        },
        {
            "name": "LogTime",
            "dataIndex": "LogTime",
            "sortable": false,
            "text": "日志时间",
            "index": 20,
            "exist": true,
            "xtype": "timestamp",
            "width": 100,
            "precision":6,
            "deep": 1
        }, 
        {
            "name": "JobTitle",
            "dataIndex": "JobTitle",
            "sortable": false,
            "text": "标题",
            "index": 24,
            "exist": true,
            "xtype": "string",
            "width": 200,
            "nobr": false,
            "deep": 1
        },
        {
            "name": "Type",
            "dataIndex": "Type",
            "sortable": false,
            "text": "类型",
            "index": 28,
            "exist": true,
            "xtype": "enum", 
            enum:{
                name:'Rsd.Dudu.Job.LogType',
                "valueMember": "code",
                "textMember": "text",
                items:[
                    {text:'未知',code:'null',color:'red'},
                    {text:'Job日志',code:'Job',color:'blue'},
                    {text:'驱动程序日志',code:'Provider',color:'green'}
                ]
            },
            "width": 80,
            "nobr": true,
            "deep": 1
        }, 
        {
            "name": "Status",
            "dataIndex": "Status",
            "sortable": false,
            "text": "任务状态",
            "index": 28,
            "exist": true,
            "xtype": "string", 
            "width": 80,
            "nobr": true,
            "deep": 1
        },
        {
            "name": "Log",
            "dataIndex": "Log",
            "sortable": false,
            "text": "内容",
            "index": 30,
            "exist": true,
            "xtype": "text",
            "width": 350,
            lineClamp:8,
            "nobr": false,
            "deep": 1
        },
        {
            "name": "HostIp",
            "dataIndex": "HostIp",
            "sortable": false,
            "text": "主机",
            "index": 26,
            "exist": true,
            "xtype": "template",
            formatString:"<span>标识:#=HostId=#</span></br><span>内网IP:#=HostIp=#</span>",
            "width": 100,
            "nobr": true,
            "deep": 1
        }
    ],
    sort:[{name:'LogTime',direction:'DESC'}],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

        this.toolBar.searchColumns=[
            {
                xtype:'mulitiselect',
                label:'状态筛选:',
                name: 'Status',
                width:400,
                style:{fontWeight:'bold'},
                op:'in',
                dataSource:[
                    {text:'已创建',value:'Created'},
                    {text:'已加载',value:'Loaded'},
                    {text:'正在运行',value:'Runing'},
                    {text:'已完成',value:'Completed'},
                    {text:'已休眠',value:'Sleep'},
                    {text:'已关闭',value:'Close'},
                 ]
            }, 
            {
                xtype:'combobox',
                label:'类型筛选:',  
                name: 'Type',
                style:{fontWeight:'bold'},
                width:250,
                op:'equals',
                dataSource:[{text:'全部',value:''},{text:'Job日志',value:'Job'},{text:'驱动程序日志',value:'Provider'}]
            }

        ];
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
        _args.sort = this.sort||this.menu.sort||[];
        this.callParent(_args,callback) ;
    }
});
