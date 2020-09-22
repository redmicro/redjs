/**
 * Created by seeker910 on 2017/5/5.
 */
Rsd.define('Rsd.developer.JobLogListDialog', {
    extend: 'Rsd.view.BaseListDialog',
    requires: [],
    xtype: 'list-dialog-joblog',
    dataStore:'listStore',
    gridColumns:[
        {
            "text": "序号",
            "xtype": "index",
            "width": 40,
            "index": 0,
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
            format:'format_type',
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
            "width": 80,
            "nobr": true,
            "deep": 1
        }
    ], 
    sort:[{name:'CreateTime',direction:'DESC'}],
    width:1200,
    height:600, 
    /*
     *
     *  */
    constructor: function JobLogListDialog(config) {
        config = config || {};
        this.apply(config); 
    },
   
    /*
     * */
    load:function load(args,callback)
    {
        var _args = args||{};
        
        var _serviceName = this.serviceName;
        if(Rsd.isEmpty(_serviceName))
        {
            Rsd.alert("未设置属性serviceName");
        }
        this.dataStore = Rsd.app.getService(_serviceName);
        _args.sort = this.sort||this.menu.sort||[];
        _args.where =this.where||this.menu.where||[];
        _args.pageSize =100;
        _args.pageIndex= 0;
        this.callParent(_args,callback);
        return this;
    },
    format_type:function format_type(row)
    {
        return [
            Rsd.newLine(),
            Rsd.text(row['Status']),
            Rsd.newLine(),
            Rsd.text(new Date(row['LogTime']).format('yyyy-MM-dd hh:mm:ss')),
        ];        
    }
});