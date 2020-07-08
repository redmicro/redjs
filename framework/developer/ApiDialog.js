/**
 * Created by dwj on 2017/2/27.
 */
//
Rsd.define('Rsd.developer.ApiDialog', {
    extend: 'Rsd.view.MajorSubDialog',
    requires: [
        'Rsd.controlEx.MajorSubViewer'
    ],
    title:'服务详情',
    closeBtn: true,
    sub: {
        "columns": [
            {
                "text": "序号",
                "xtype": "index",
                "width": 40
            },
            {
                xtype: 'template',
                "name": "Name",
                "text": "名称",
                formatString:'#=NameCn=#(#=Name=#)',
                align:'left',
                "sortable": false,
                "width": 150,
                "nobr": true
            },
            {
                xtype: 'template',
                formatString: '#=ValueType=#(#=TargetType=#)',
                "name": "ValueType",
                "text": "类型",
                "dataindex": "ValueType",
                "sortable": false,
                "width": 170,
                "nobr": true
            },
            {
                "name": "NotEmpty",
                "text": "必填",
                "dataindex": "NotEmpty",
                "sortable": false,
                align: 'center',
                "width": 70,
                "nobr": true
            },
            {
                "name": "Max",
                "text": "最大值（长度）",
                "dataindex": "max",
                "sortable": false,
                align: 'center',
                "width": 100,
                "nobr": true
            },
            {
                "name": "Min",
                "text": "最小值（长度）",
                "dataindex": "min",
                "sortable": false,
                align: 'center',
                "width": 100,
                "nobr": true
            },
            {
                "name": "RegularExpress",
                "text": "正则表达式",
                "dataindex": "RegularExpress",
                "sortable": false,
                "width": 150,
                "nobr": true
            }
        ]
    },
    major: {
        height:200,
        legend: '概况',
        "fields": [
            {
                "name": "Key",
                "label": {content:"Key",width:100},
                "dataindex": "Key",
                "width": 350
            }, 
            {
                "name": "TypeName",
                "label": {content:"所在类",width:100},
                "dataindex": "Type",
                "width": 350
            },
            {
                "name": "ServiceName",
                "label": {content:" 方法名",width:100},
                "dataindex": "Name",
                "width": 350
            },
            {
                "name": "LocalUrl",
                "label": {content:"本地路径",width:100},
                "dataindex": "local.Url",
                "width": 350
            },
            {
                "name": "ServerUrl",
                "label": {content:"服务器路径",width:100},
                "dataindex": "Url",
                "width": 350
            },
            {
                "name": "Description",
                "label": {content:"描述",width:100},
                "dataindex": "Description",
                "width": 350
            },
            {
                "name": "IsWebService",
                "label": {content:"公开",width:100},
                "dataindex": "IsWebMethod",
                "width": 350
            },
            {
                "name": "EnableSession",
                "label": {content:"启用会话",width:100},
                "dataindex": "EnableSession",
                "width": 350
            },
            {
                "name": "CheckSession",
                "label": {content:"验证会话",width:100},
                "dataindex": "CheckSession",
                "width": 350
            }
        ]
    },
    width: 1200,
    height: 600,
    /*
    *
    * */
    constructor :function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    /*
    * */
    load:function load(service) {

        var _data = service||this.data; 
        this.callParent(_data,_data.Pramas);
    }

});