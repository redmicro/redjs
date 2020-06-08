/*
 * redmicro all Copyright (c)
 */

/**
 * Created by seeker910 on 2014/8/10.
 */
Rsd.define('Rsd.control.MessageBox', {
    extend: 'Rsd.container.Dialog',
    requires: [
        'Rsd.control.Label',
        'Rsd.control.Button'
    ],
    xtype: 'message-box',
    width:300,
    height:150,
    title:'提示信息',
    closeBtn:false,
    layout:'border',
    buttons:[{btn:'确 定',fn:function(){}}],
    items:[
        {xtype:'container',  cls:'x-message-box', region:'center', layout:{type:'vbox'}},
        {
            xtype:'container',
            margin: '2 10 7 10',
            cls:'x-message-box-line',
            layout:{type:'hbox',align:'center'},
            region:'bottom',
            width:'100%',
            height:45
        }
    ] ,
    /*
    * text |html
    * */
    messageType:'text',
    /*
    * */
    message:null,
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    /*
    * */
    onBeforeInit:function onBeforeInit()
    {

        this.callParent();
    },
    /*
    * */
    load:function load()
    {
        var me = this;

        setTimeout(function () {
            me.visible = false;
            me.setMessage();
            me.setButtons();
            me.visible = true;
        },100);

    },
    /*
     * */
    setMessage:function setMessage()
    {
        var me = this;
        if(me.message && me.message.length > 0){

            var _f = Rsd.isCreated(me.items[0]);
            if(_f)
            {
                me.items[0].removeAll();
            }

            if(me.messageType=='text')
            {
                var _list = [];
                if(Rsd.isArray(me.message))
                {
                    _list = me.message;
                }
                else
                {
                    _list = me.message.split("\r\n");
                }


                for(var i in _list)
                {
                    if(_f)
                    {
                        me.items[0].add({xtype:'label',ctrlCls:'x-text',width:'100%',text:_list[i]});
                    }else {
                        me.items[0].items=me.items[0].items||[];
                        me.items[0].items.push({xtype:'label',ctrlCls:'x-text',width:'100%',text:_list[i]});
                    }

                    if(i>20) {
                        if (_f) {
                            me.items[0].add({
                                xtype: 'label',
                                ctrlCls: 'x-text',
                                width: '100%',
                                text: '......[更多信息请查看日志]'
                            });
                        } else {
                            me.items[0].items.push({
                                xtype: 'label',
                                ctrlCls: 'x-text',
                                width: '100%',
                                text: '......[更多信息请查看日志]'
                            });
                        }
                        break;
                    }
                }
                var _h = me.items[0].items.length * 30 + 90;//header margin_top margin_bottom bottom
                if(_h < 150)
                {
                    _h = 150;
                }

                me.height = _h;
            }else
            {
                if( me.items[0].body)
                {
                    me.items[0].body.innerHTML = me.message.replace("\r\n","<br>").replace("\\r\\n","<br>").replace("\r","<br>").replace("\n","<br>");
                }

            }

        }

    },
    /*
     * */
    setButtons:function setButtons()
    {
        var me = this;
        var _f = Rsd.isCreated(this.items[1]);
        if(_f)
        {
            this.items[1].removeAll();

        }
        if(_f)
        {
            this.items[1].add({xtype: 'container', flex: 1});
        }else {
            this.items[1].items = this.items[1].items||[];
            this.items[1].items.push({xtype: 'container', flex: 1});
        }

        if(this.buttons && this.buttons.length > 0) {

            for (var i in  this.buttons) {

                var fn = function () {

                    var flag = Rsd.callFunction(me, me.buttons[this._index].fn);
                    if (flag == false) {
                        return;
                    }
                    me.close();

                };
                if (_f) {
                    this.items[1].add({
                        xtype: 'button',
                        align: 'center',
                        _index: i,
                        margin: '2 5 2 5',
                        width: 70,
                        value: this.buttons[i].text || this.buttons[i].btn,
                        handler: fn
                    });
                }
                else {
                    this.items[1].items.push({
                        xtype: 'button',
                        align: 'center',
                        _index: i,
                        margin: '2 5 2 5',
                        width: 70,
                        value: this.buttons[i].text || this.buttons[i].btn,
                        handler: fn
                    });
                }

            }
            if (_f) {
                this.items[1].add({xtype: 'container', flex: 1});
            } else {
                this.items[1].items.push({xtype: 'container', flex: 1});
            }

            Rsd.clearHotKey('Enter');
            Rsd.registerHotKey('Enter', me.buttons[0].fn, me);
        }

    }

});
