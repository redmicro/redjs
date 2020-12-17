
/**
* 
* */
Rsd.define("Rsd.developer.ApiRequestLogListPage", {
    extend: "Rsd.view.BaseListPage",
    requires: [],
    xtype: "list-ui-api-log",
    border: false,
    titleField:"LogTime",
    readOnly:true,
    /** 
     * 获取后台日志列表的api接口名称
    */
    serviceName:null,
    /**
     * 
     */
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
            align:'left',
            xtype:'template',
            formatString:'操作人:#=User=#</br>级别:#=LogLevel=#</br>类型:#=LogType=#</br>主机:#=HostIp=#',
            "width": 90,
            "nobr": true
        },
         
        {
            "name": "Content",
            "dataIndex": "Content",
            "sortable": false,
            "text": "日志内容",
            "index": 50,
            align:'left',
            "exist": true,
            "xtype": "template",
            "width": 350,
            lineClamp:8,
            format:'fromat_content',
            "nobr": false
        },
        {
            "name": "Request",
            "dataIndex": "Request",
            "sortable": false,
            "text": "Request",
            "index": 60,
            "exist": true,
            align:'left',
            xtype:'template',
            formatString:'ClientIp:#=ClientIp=#</br>Method:#=Method=#</br>Refer:#=Refer=#</br>Session:#=SessionId=#<br>Host:#=Host=#',
            "width": 200,
            "nobr": true
        } 
       
    ],
    /**
     * 
     */
    sort:[{name:'CreateTime',direction:'DESC'}],
    /*
     * */
    constructor: function ApiRequestLogListPage(config) {
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
    },
    /**
     * 
     * @param {*} row 
     */
    fromat_content:function fromat_content(row)
    {
        return [ 
            Rsd.text(row['Message'] + '(' + (row['EndTime'] - row['StartTime'])+'ms)','red'), 
            Rsd.newLine(),
            Rsd.nobr('['+row['Origin']+']'), 
            Rsd.newLine(),
            Rsd.nobr(row['UserAgent']),
            Rsd.newLine(),
            Rsd.text(Rsd.formatTimestamp(row['LogTime']),'blue')];
    }
});
