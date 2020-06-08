/**
 * Created by seeker910 on 13-12-25.
 */
Rsd.define('Rsd.container.WaitingBox', {
    extend: 'Rsd.container.Component',
    requires:['Rsd.control.LoadingBar','Rsd.control.Label'],
    xtype: 'waiting-box',
    border: 0,
    floating: true,
    modular: true,
    cls: 'x-waiting-box',
    message: '正在处理，请稍后...',
    layout: 'vbox',
    height: 40,
    width: 300,
    items: [
        {
            xtype: 'label',
            flex:50,
            ctrlCls:'x-text',
            listeners:{
                'dblclick':{
                    element:'dom',
                    fn:function (sender,event) {
                       this.parent.close();
                    }
                }
            }
        },
        {
            xtype: 'loading-bar',
            height:10
        }
    ],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
        var me = this;
        me.items[0].text = me.message;
    },

    /*
     *
      *  */
    setMsg:function setMsg(msg) {
        this.setMessage(msg);
    },
    /*
    *
    * */
    setMessage:function setMessage(msg) {
        var me = this;
        me.message = msg;
        me.items[0].setText(me.message);
    },
    onAfterShow:function onAfterShow() {
        this.items[1].start(4);
    }
});