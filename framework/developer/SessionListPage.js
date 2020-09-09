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
            "sortable": true,
            "width": 200,
            align:'left',
            xtype:'template',
            formatString:'#=UserId=#</br>#=Key=#</br>[#=Group=#]</br>{#=DataType=#}',
            "nobr": false
        },
      
        {
            "name": "CreateTime",
            "text": "时间",
            "sortable": true,
            align:'left',
            "width": 130,
            xtype:'template',
            formatString:'创建:#=CreateTime=#</br>过期:#=ExpireAt=#</br>时长（秒）:#=Duration=#',
            "nobr": true,
        },
        
        {
            "name": "FromHost",
            "text": "请求信息",
            align:'left',
            "sortable": false,
            "width": 200,
            xtype:'template',
            formatString:'HOST:#=FromHost=#</br>Referer:#=FromReferer=#/<br>浏览器:#=FromUserAgent=#',
            "nobr": true
        },
        
        {
            "name": "FromUserAgent",
            "text": "IP",
            align:'left',
            "sortable": false,
            xtype:'template',
            formatString:'源IP:#=ClientIP=#</br>主机IP:#=Host=#',
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