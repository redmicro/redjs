
Rsd.define("Rsd.developer.ServiceListPage", {
    extend: "Rsd.view.BaseListPage",
    requires: ["Rsd.control.ComboBox"],
    xtype: "list-service",
    border: false,
    titleField:"name",
    /** 
     * 获取后台Servic服务列表的api接口名称
    */
    serviceName:null,
    searchColumns:[{name:'Name',text:"关键字",width:350}],
    gridColumns: [
        {
            "text": "序号",
            "xtype": "index",
            "width": 40
        },
        {
            "name": "Name",
            "text": "服务名",
            "dataindex": "Name",
            "sortable": true,
            "width": 250,
            "nobr": true,
        },
        {
            "name": " entryid",
            "text": "服务实例KEY",
            "dataindex": "EntryId",
            "sortable": true,
            "width": 250,
            "nobr": false

        },
        {
            "name": "serviceid",
            "text": "接口GUID",
            "dataindex": "ServiceId",
            "sortable": true,
            "width": 250,
            "nobr": false

        },
        {
            "name": "interface",
            "text": "接口",
            "dataindex": "Interface",
            "sortable": true,
            "width": 50,
            "nobr": false

        },
         {
             "name": "instacecount",
             "text": "实例个数",
             "dataindex": "InstaceCount",
             "sortable": true,
             "width": 50,
             "nobr": true
         },
        {
            "name": "Proxcy",
            "text": "策略",
            "dataindex": "Proxcy",
            "sortable": true,
            align:"center",
            "width": 100,
            "nobr": true
        },
        {
            "name": "usingtimes",
            "text": "使用次数",
            "dataindex": "UsingTimes",
            "sortable": true,
            align:"center",
            "width": 100,
            "nobr": true
        },
        {
            "name": "vflag",
            "text": "标识",
            "dataindex": "VFlag",
            "sortable": true,
            "width": 100,
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

        this.toolBar.searchColumns = this.searchColumns;
    },

    /*
    *获取服务
    * */
    load:function load(args,callback) {
        var _serviceName = this.serviceName||this.menu.serviceName;
        if(Rsd.isEmpty(_serviceName))
        {
            Rsd.alert("未设置属性serviceName");
        }
        this.dataStore = Rsd.app.getService(_serviceName);

        this.callParent(args,callback) ;
    }


});