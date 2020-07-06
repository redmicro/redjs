/*
 * redmicro all Copyright (c)

 * Created by seeker910 on 2015/1/6.
 */
Rsd.define('Rsd.developer.PageListPage', {
    extend: "Rsd.view.BaseListPage",
    requires: [],
    gridColumns:[
        {
            "text": "序号",
            "xtype": "index",
            "width": 40,
            "index": 0
        },
       /* {
            "name": "SortCode",
            "dataIndex": "SortCode",
            "sortable": false,
            "text": "排序编码",
            "index": 46,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },*/
        {
            "name": "Text",
            "dataIndex": "Text",
            "sortable": false,
            "text": "文本",
            "index": 28,
            "exist": true,
            align:'left',
            format:'format_text',
            "xtype": "template",
            "width": 200,
            "nobr": true
        },
        {
            "name": "ViewType",
            "dataIndex": "ViewType",
            "sortable": false,
            "text": "页面类",
            "index": 20,
            "exist": true,
            "xtype": "string",
            format:'format_viewType',
            "width": 300,
            "nobr": true
        },
        {
            "name": "ModelType",
            "dataIndex": "ModelType",
            "sortable": false,
            "text": "对象类名",
            "index": 34,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "ServiceName",
            "dataIndex": "ServiceName",
            "sortable": false,
            "text": "服务名",
            "index": 36,
            "exist": true,
            "xtype": "string",
            "width": 100,
            "nobr": true
        },
        {
            "name": "Path",
            "dataIndex": "Path",
            "sortable": false,
            "text": "路径",
            "index": 22,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "Icon",
            "dataIndex": "Icon",
            "sortable": false,
            "text": "图标",
            "index": 24,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "Enable",
            "dataIndex": "Enable",
            "sortable": false,
            "text": "可用",
            "index": 25,
            "exist": true,
            "xtype": "checkbox",
            "width": 40
        },
        {
            "name": "Group",
            "dataIndex": "Group",
            "sortable": false,
            "text": "分组",
            "index": 26,
            "exist": true,
            "xtype": "string",
            "width": 100,
            "nobr": true
        },
        {
            "name": "Where",
            "dataIndex": "WhereCondition",
            "sortable": false,
            "text": "筛选条件",
            "index": 38,
            "exist": true,
            "xtype": "string",
            "width": 100,
            "nobr": true
        },
        {
            "name": "Sort",
            "dataIndex": "SortCondition",
            "sortable": false,
            "text": "排序条件",
            "index": 40,
            "exist": true,
            "xtype": "string",
            "width": 100,
            "nobr": true
        },
        {
            "name": "Description",
            "dataIndex": "Description",
            "sortable": false,
            "text": "描述",
            "index": 42,
            "exist": true,
            "xtype": "string",
            "width": 150,
            "nobr": true
        },
        {
            "name": "Width",
            "dataIndex": "Width",
            "sortable": false,
            "text": "菜单宽度",
            "index": 32,
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
            "width": 100,
            "nobr": true
        }
    ],
    formFields:[
        {
            "name": "SortCode",
            "label": {
                "width": 80,
                "content": "排序编码"
            },
            "dataIndex": "SortCode",
            "index": 46,
            "exist": true,
            "xtype": "text",
            "length": 50
        },
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
            "length": 50
        },
        {
            "name": "Text",
            "label": {
                "width": 80,
                "content": "文本"
            },
            "dataIndex": "Text",
            "index": 28,
            "exist": true,
            "xtype": "text",
            "length": 50
        },
        {
            "name": "ViewType",
            "label": {
                "width": 80,
                "content": "页面类型"
            },
            "dataIndex": "ViewType",
            "index": 20,
            "exist": true,
            "xtype": "text",
            "length": 150
        },
        {
            "name": "Path",
            "label": {
                "width": 80,
                "content": "路径"
            },
            "dataIndex": "Path",
            "index": 22,
            "exist": true,
            "xtype": "text",
            "length": 50
        },
        {
            "name": "Icon",
            "label": {
                "width": 80,
                "content": "图标"
            },
            "dataIndex": "Icon",
            "index": 24,
            "exist": true,
            "xtype": "text",
            "length": 50
        },
        {
            "name": "Enable",
            "label": {
                "width": 80,
                "content": "可用"
            },
            "dataIndex": "Enable",
            "index": 25,
            "exist": true,
            "xtype": "checkbox"
        },
        {
            "name": "Group",
            "label": {
                "width": 80,
                "content": "分组"
            },
            "dataIndex": "Group",
            "index": 26,
            "exist": true,
            "xtype": "text",
            "length": 50
        },

        {
            "name": "Width",
            "label": {
                "width": 80,
                "content": "菜单文本宽度"
            },
            "dataIndex": "Width",
            "index": 32,
            "exist": true,
            "xtype": "number",
            "precision": 0
        },
        {
            "name": "ModelType",
            "label": {
                "width": 80,
                "content": "类型名称"
            },
            "dataIndex": "ModelType",
            "index": 34,
            "exist": true,
            "xtype": "text",
            "length": 50
        },
        {
            "name": "ServiceName",
            "label": {
                "width": 80,
                "content": "API服务名"
            },
            "dataIndex": "ServiceName",
            "index": 36,
            "exist": true,
            "xtype": "text",
            "length": 50
        },
        {
            "name": "Where",
            "label": {
                "width": 80,
                "content": "筛选条件"
            },
            "dataIndex": "WhereCondition",
            "index": 38,
            "exist": true,
            "xtype": "text",
            "length": 50
        },
        {
            "name": "Sort",
            "label": {
                "width": 80,
                "content": "排序条件"
            },
            "dataIndex": "SortCondition",
            "index": 40,
            "exist": true,
            "xtype": "text",
            "length": 50
        },
        {
            "name": "Description",
            "label": {
                "width": 80,
                "content": "描述"
            },
            "dataIndex": "Description",
            "index": 42,
            "exist": true,
            "xtype": "text",
            "length": 50
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
    format_text:function format_text (row)
    {
        //#=SortCode=#-#=Text=#
        return [Rsd.blankspan(row['SortCode'].length),Rsd.text(row['Text']+'('+row['SortCode']+')')];
    },
    format_viewType:function format_viewType(row)
    {
        if(Rsd.isEmpty(row['ViewType']))
        {
            return [];
        }
        return [Rsd.newLine(),Rsd.btn('添加权限',function () {
            Rsd.alert('添加按钮权限');
        })];
    },
    /*
    * */
    btn_new:function btn_new() {
        Rsd.app.showModelView('',this.formFields,{},'新增页面',[ {text:'保存',handler:'btn_save'}],false,this);
    },
    /**/
    btn_save:function btn_save(record,form) {
        //console.log(arguments);
        Rsd.app.requestService('dev.addPage',record,function (data) {
            if(data.success)
            {
                Rsd.popup('保存成功');
                form.close();
            }
        });
    }
});
