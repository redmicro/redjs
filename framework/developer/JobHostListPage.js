/**
 * 
 */
Rsd.define("Rsd.developer.JobHostListPage", {
    extend: "Rsd.view.BaseListPage",
    requires: [],
    xtype: "list-job-host",
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
            "name": "HostId",
            "dataIndex": "HostId",
            "sortable": false,
            "text": "主机标识",
            "index": 22,
            "exist": true,
            "xtype": "string",
            "width": 100,
            "nobr": true,
            "deep": 1
        },
        {
            "name": "NotifyFormatUrl",
            "dataIndex": "NotifyFormatUrl",
            "sortable": false,
            "text": "通讯URL",
            "index": 24,
            "exist": true,
            "xtype": "string",
            "width": 300,
            "nobr": true,
            "deep": 1
        },
        {
            "name": "IsManager",
            "dataIndex": "IsManager",
            "sortable": false,
            "text": "管理节点",
            "index": 26,
            "exist": true,
            "xtype": "checkbox",
            "width": 40,
            "deep": 1,
            "__index__": 5
        },
        {
            "name": "ExpireTime",
            "dataIndex": "ExpireTime",
            "sortable": false,
            "text": "失效时间",
            "index": 28,
            "exist": true,
            "xtype": "timestamp",
            "width": 100,
            "precision": 6,
            "deep": 1
        },
        {
            "name": "LastHeartTime",
            "dataIndex": "LastHeartTime",
            "sortable": false,
            "text": "最后一次心跳",
            "index": 30,
            "exist": true,
            "xtype": "timestamp",
            "width": 100,
            "precision": 6,
            "deep": 1
        },
        {
            "name": "LoadedWeight",
            "dataIndex": "LoadedWeight",
            "sortable": false,
            "text": "负载",
            "index": 32,
            "exist": true,
            "xtype": "string",
            "width": 100,
            "nobr": true,
            "deep": 1
        },
        {
            "name": "Enabled",
            "dataIndex": "Enabled",
            "sortable": false,
            "text": "可用",
            "index": 34,
            "exist": true,
            "xtype": "checkbox",
            "width": 40,
            "deep": 1,
            "__index__": 5
        },
        {
            "name": "HostIP",
            "dataIndex": "HostIP",
            "sortable": false,
            "text": "主机IP",
            "index": 36,
            "exist": true,
            "xtype": "string",
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
    },
     
    title_format:function title_format(row)
    {
        return [
            Rsd.newLine(),
            Rsd.text('创建时间：'+row['CreateTime']),Rsd.newLine(),
            Rsd.text('有效期:'+ new Date(row['StartTime']).format('yyyy-MM-dd hh:mm:ss')) ,Rsd.newLine(),
            Rsd.blankspan(6),Rsd.text('    至' + new Date(row['EndTime']).format('yyyy-MM-dd hh:mm:ss')),Rsd.newLine()
         
        ];
    },

    host_format:function host_format(row)
    {
        return [
            Rsd.newLine(),
            Rsd.text('失效时间：'+ new Date(row['ExpireTime']).format('yyyy-MM-dd hh:mm:ss')),Rsd.newLine(),
            Rsd.text('已绑定：'+(row['IsFixed']>0?"是":"否") ),Rsd.newLine(),
            Rsd.text('局域网IP：'+row['RunHostIP']),Rsd.newLine(),
            ];     
    },

    time_format:function time_format(row)
    {
            var _view_log = function()
            {
                 Rsd.create('Rsd.view.BaseListDialog',{}).showDialog();
            };
        
       return [
            Rsd.newLine(),
            Rsd.text('重复执行:'+ (row['IsInterval']>0?"是":"否") +"(间隔时长：" +  row['Interval'] + ")"),Rsd.newLine(),
            Rsd.text('每周执行:'+ (row['IsWeek']>0?"是":"否") ),Rsd.newLine(),
            Rsd.button('查看日志',_view_log,this,{},{float:'right'})
       ];
    }
    

});
