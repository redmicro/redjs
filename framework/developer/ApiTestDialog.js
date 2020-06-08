/**
 * Created by dwj on 2017/3/6.
 */
Rsd.define('Rsd.developer.ApiTestDialog', {
    extend: 'Rsd.container.Dialog',
    requires: [
        'Rsd.control.Grid'
    ],
    title:'服务测试',
    width:1000,
    height:600,
    layout:'vbox',
    items : [
        {
            height:100

        },
        {
            xtype: 'grid',
            margin: '0 1 0 0',
            toolBar:null,
            footBar:null,
            flex:100,
            columns:[
                {
                    "text": "序号",
                    "xtype": "index",
                    "width": 40
                },
                {
                    "name": "PramaNameCN",
                    "text": "名称",
                    "dataindex": "name_cn",
                    "sortable": true,
                    "width": 150,
                    "nobr": true
                },
                {
                    "name": "TestValue",
                    "text": "测试值",
                    //"dataindex": "test_value",
                    "sortable": true,
                    editable:true,
                    xtype:'string',
                    "width": 150,
                    "nobr": true
                },
                {
                    xtype: 'template',
                    formatString: '#=value_type=#(#=target_type=#)',
                    "name": "ValueType",
                    "text": "类型",
                    "dataindex": "value_type",
                    "sortable": true,
                    "width": 170,
                    "nobr": true
                },
                {
                    "name": "NotEmpty",
                    "text": "必填",
                    "dataindex": "not_empty",
                    "sortable": true,
                    align:'center',
                    "width": 70,
                    "nobr": true
                }

            ],
            dataSource:[{},{},{}]
        },
        {
            xtype: 'grid',
            margin: '0 1 0 0',
            toolBar:null,
            footBar:null,
            flex:100,
            columns:[
                {
                    "text": "序号",
                    "xtype": "index",
                    "width": 40,
                    "sortable": true
                },
                {
                    "name": "PramaNameCN",
                    "text": "输入",
                    "dataindex": "name_cn",
                    "sortable": true,
                    "width": 150,
                    "nobr": true
                },
                {
                    "name": "TestValue",
                    "text": "输出",
                    //"dataindex": "test_value",
                    "sortable": true,
                    editable:true,
                    xtype:'string',
                    "width": 150,
                    "nobr": true
                },
                {
                    xtype: 'template',
                    formatString: '#=value_type=#(#=target_type=#)',
                    "name": "ValueType",
                    "text": "结果",
                    "dataindex": "value_type",
                    "sortable": true,
                    "width": 170,
                    "nobr": true
                },
                {
                    "name": "NotEmpty",
                    "text": "方法",
                    "dataindex": "not_empty",
                    "sortable": true,
                    align:'center',
                    "width": 70,
                    "nobr": true
                }

            ],
            dataSource:[{},{},{}]
        },
    ],
    /*
     *
     * */
    constructor :function constructor(config) {
        config = config || {};
        this.apply(config);
        //console.log(this.data.pramas);
        this.title =  '['+ this.data.name + ']服务测试';

    },
    /*
     * */
    onAfterInit: function onAfterInit() {
        //debugger;
        this.callParent();
        var me = this;
        setTimeout( function(){
            //debugger;
            me.items[1].loadData(me.data.pramas);
        },50);



    }
});