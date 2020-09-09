/**
 * Created by dwj on 2017/2/27.
 */
Rsd.define("Rsd.developer.SessionListPage", {
    extend: "Rsd.view.BaseListPage",
    requires: [],
    xtype: "list-session",
    border: false,
    dataStore:[],
    titleField:"name",
    /** 
     * 获取后台Session列表的api接口名称
    */
    serviceName:"dev.getSessionList",
    gridColumns: [
        {
            "text": "序号",
            "xtype": "index",
            "width": 40
        },
        {
            "name": "Key",
            "text": "Key",
            "dataindex": "Key",
            "sortable": true,
            "width": 250,
            xtype:'template',
            formatString:'#=Key=#</br>[#=Group=#]&nbsp;&nbsp;#=UserId=#',
            "nobr": false
        },
      
        {
            "name": "DataType",
            "text": "数据类型",
            "dataindex": "DataType",
            "sortable": false,
            "width": 150,
            "nobr": true
        },
        {
            "name": "CreateTime",
            "text": "时间",
            "dataindex": "CreateTime",
            "sortable": true,
            "width": 100,
            xtype:'template',
            formatString:'创建时间:#=CreateTime=#</br>过期时间:#=ExpireAt=#</br>时长（秒）:#=Duration=#',
            "nobr": true,
        },
        
        {
            "name": "FromHost",
            "text": "请求Url地址",
            "dataindex": "FromHost",
            "sortable": false,
            "width": 80,
            xtype:'template',
            formatString:'HOST:#=FromHost=#</br>Referer:#=FromReferer=#',
            "nobr": true
        },
        
        {
            "name": "FromUserAgent",
            "text": "浏览器代理",
            "dataindex": "FromUserAgent",
            "sortable": false,
            xtype:'template',
            formatString:'源IP:#=ClientIP=#</br>浏览器:#=FromUserAgent=#',
            "width": 80,
            "nobr": true
        },
        
        {
            "name": "Host",
            "text": "主机IP",
            "dataindex": "Host",
            "sortable": false,
            "width": 80,
            "nobr": true
        }

    ],
    templateCols: [
        {
            name: "space",
            text: "",
            xtype: "template",
            width: 5,
            hideable: false,
            sortable: false
        }
    ],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    load:function load(args,callback) {
        var me = this;
        var _serviceName = this.serviceName||this.menu.serviceName;
        if(Rsd.isEmpty(_serviceName))
        {
            Rsd.alert("未设置属性serviceName");
        }
        this.dataStore = Rsd.app.getService(this.serviceName||this.menu.serviceName);

        this.callParent(args,callback) ;
    },

    /*
     * */
    templateFormat:function templateFormat(row){

        var me = this;
        var  btn = Rsd.button("详情",function(){
            Rsd.alert("访问被拒绝");
            //var form = Rsd.create("Rsd.developer.ApiDialog",{title:"["+ row.name + "]Session详情"});
            //form.showDialog(null,null,null,0).load(row);
        } )


       
        return [Rsd.newLine(),btn] ;

    }

});