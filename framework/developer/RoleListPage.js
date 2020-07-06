/*
 * redmicro all Copyright (c)

 * Created by seeker910 on 2015/1/6.
 */
Rsd.define('Rsd.developer.RoleListPage', {
    extend: "Rsd.view.BaseListPage",
    requires: [],
    gridColumns:[
        {
            "text": "序号",
            "xtype": "index",
            "width": 40,
            "index": 0
        },
        {
            "name": "Name",
            "dataIndex": "Name",
            "sortable": false,
            "text": "名称",
            "index": 20,
            "exist": true,
            "xtype": "string",
            format:'format_name',
            "width": 150,
            "nobr": true
        },
        {
            "name": "Enable",
            "dataIndex": "Enable",
            "sortable": false,
            "text": "可用",
            "index": 22,
            "exist": true,
            "xtype": "checkbox",
            "width": 40
        },
        {
            "name": "OrgId",
            "dataIndex": "OrgId",
            "sortable": false,
            "text": "组织ID",
            "index": 24,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "Description",
            "dataIndex": "Description",
            "sortable": false,
            "text": "描述",
            "index": 26,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "SortIndex",
            "dataIndex": "SortIndex",
            "sortable": false,
            "text": "排序号",
            "index": 499,
            "exist": true,
            "xtype": "number",
            "width": 100,
            "precision": 0
        },
        {
            "name": "Remark",
            "dataIndex": "Remark",
            "sortable": false,
            "text": "备注",
            "index": 500,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        }
    ],
    formFields:[
        {
            "name": "Name",
            "label": {
                "width": 80,
                "content": "名称"
            },
            "dataIndex": "Name",
            "index": 20,
            "exist": true,
            "xtype": "text",
            "length": 100
        },
        {
            "name": "Enable",
            "label": {
                "width": 80,
                "content": "可用"
            },
            "dataIndex": "Enable",
            "index": 22,
            "exist": true,
            "xtype": "checkbox"
        },
        {
            "name": "OrgId",
            "label": {
                "width": 80,
                "content": "组织ID"
            },
            "dataIndex": "OrgId",
            "index": 24,
            "exist": true,
            "xtype": "text",
            "length": 100
        },
        {
            "name": "Description",
            "label": {
                "width": 80,
                "content": "描述"
            },
            "dataIndex": "Description",
            "index": 26,
            "exist": true,
            "xtype": "text",
            "length": 100
        },
        {
            "name": "SortIndex",
            "label": {
                "width": 80,
                "content": "排序号"
            },
            "dataIndex": "SortIndex",
            "index": 499,
            "exist": true,
            "xtype": "number",
            "precision": 0
        },
        {
            "name": "Remark",
            "label": {
                "width": 80,
                "content": "备注"
            },
            "dataIndex": "Remark",
            "index": 500,
            "exist": true,
            "xtype": "text",
            "length": 100
        }
    ],
    serviceName:'',
    /*
    * */
    constructor: function (config) {

        config = config || {};
        Rsd.apply(this, config);
        this.toolBar.newButtons = [{text:'新 增',handler:'btn_new'}];
    },
    /*
    *获取服务
    * */
    load:function load(args,callback) {

        var _args = args;

        var _serviceName = this.serviceName||this.menu.serviceName;
        if(Rsd.isEmpty(_serviceName))
        {
            Rsd.alert("未设置属性serviceName");
        }
        this.dataStore = Rsd.app.getService(_serviceName);

        this.callParent(_args,callback) ;
    },
    /*
    * */
    format_name:function format_name(row)
    {
        return [
            Rsd.btn('设置页面权限',function () {
                Rsd.alert('设置页面权限');
        }),
            Rsd.blankspan(1),
            Rsd.btn('设置API权限',function () {
                Rsd.alert('设置API权限');
        })];
    },
    /*
    * */
    btn_new:function () {
        Rsd.app.showModelView('',this.formFields,{},'新增角色',[ {text:'保存',handler:'btn_save'}],false,this);
    },
    /*
    * */
    btn_save:function btn_save(record,form) {
        //console.log(arguments);
        Rsd.app.requestService('dev.addRole',record,function (data) {
            if(data.success)
            {
                Rsd.popup('保存成功');
                form.close();
            }
        });
    }
});
