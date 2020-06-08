/**
 * Created by seeker910 on 2017/6/19.
 */
Rsd.define('Rsd.view.SingleGuider', {
    extend: 'Rsd.container.Guider',
    requires: ['Rsd.controlEx.ModelViewer'],
    xtype: 'single-guider',
    width: '100%',
    layout:'fit',
    items:[
        {
            xtype:'model-viewer'
        }
    ],
    readOnly:true,
    fields:[],
    /*
     *
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    /*
     *
     * */
    onAfterRender:function onAfterRender()
    {

        var mv = this.items[0];
        try
        {
            mv.fields = this.fields;
            mv.loadFields(this.readOnly);

        }catch (ex)
        {
            Rsd.error('SingleGuider加载模型结构失败', 'Rsd.view.SingleGuider',ex);
        }
        this.callParent();

        this.height = 100 + mv.height;
    },
    /*
    *
    * */
    getData:function getData() {
        return this.items[0].getRecord();
    }

},function (type) {

});