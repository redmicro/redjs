/**
 * Created by seeker910 on 2020/5/1.
 */
Rsd.define('Rsd.template.gov.web.TPrintPage', {
    extend: 'Rsd.template.TPage',
    requires: [
        'Rsd.control.Button',
        'Rsd.control.PrintArea',
        //'Rsd.web.CTopBarPart',
        //'Rsd.web.CSubTopicPart',
        //'Rsd.web.CDetailPart',
        //'Rsd.web.CBottomPart',
        //'Rsd.web.CSitePathPart'
    ],
    xtype:'t-print-page',
    layout:{type:'vbox'},
    height:'100%',
    width:'100%',
    sizeUnit:'px',
    //打印模板名称
    templateType:'',
    //打印数据缓存 键值
    key:'',
    items:[
        {
            xtype: 'print-area',
            region: 'center'
        },
        {
            xtype:'button',
            print:false,
            width:'100%',
            height: 100,
            margin:'10 35% 60 35%',
            text:' 立 即 打 印',handler:'btn_print'
        },
    ],
    /*
    *
    * */
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
        this.items[0] = Rsd.create(this.templateType,{});
    },
    /*
    * */
    load:function () {

        this.items[0].data = Rsd.readSession(this.key)||{};

        this.callParent();
    },
    btn_print:function btn_print() {
        Rsd.removeSession(this.key);
        window.print();
    }
});
