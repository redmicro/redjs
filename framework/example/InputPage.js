/*
 * redmicro all Copyright (c)
 */

Rsd.define('Rsd.example.InputPage', {
    extend: 'Rsd.container.Page',
    requires: [
        'Rsd.control.Button',
        'Rsd.control.CheckBox',
        'Rsd.control.Radio',
        'Rsd.controlEx.ModelViewer',
        'Rsd.control.Grid',
        'Rsd.control.GridToolBar',
        'Rsd.control.PagingBar',
        'Rsd.control.Date',
        'Rsd.control.AutoComplete',
        'Rsd.control.MulitiSelect',
        'Rsd.control.NavigateMenu'
    ],
    xtype: 'ctrl-input-page',
    border: false,
    tabTitle: 'Controls-Checkbox-Radio',
    layout: 'hbox',
    selected:true,
    items:[
        {
            xtype: 'checkbox',
            margin:'0 20 0 10',
            label:'0.this is checkbox left '
        },
        {
            xtype: 'button',
            text:'1.isChecked',
            handler:function () {
                Rsd.msg(this.parent.items[0].isChecked());
            }
        },
        {header:'2-----',width:'100%',height:30},
        {
            xtype: 'checkbox',
            margin:'0 20 0 10',
            label:{content:'3.this is checkbox right ',position:'right',align:'left'}
        },
        {
            xtype: 'button',
            text:'4.GetValue',
            handler:function () {
                Rsd.msg(this.parent.items[3].getValue());
            }
        },
        {
            xtype: 'button',
            width:120,
            text:'5.SetChecked',
            handler:function () {
                this.parent.items[3].check(true);
            }
        },
        {
            xtype: 'button',
            width:120,
            text:'6.CancelChecked',
            handler:function () {
                this.parent.items[3].check(false);
            }
        },
        {header:'7-----',width:'100%',height:30},
        {
            xtype: 'radio',
            dataIndex:'group1',
            margin:'0 20 0 10',
            label:'8.this is checkbox left '
        },
        {
            xtype: 'button',
            text:'9.isChecked',
            handler:function () {
                Rsd.msg(this.parent.items[8].isChecked());
            }
        },
        {width:'100%',header:'10-----',height:30},
        {
            xtype: 'radio',
            dataIndex:'group1',
            margin:'0 20 0 10',
            label:{content:'11.this is checkbox right ',position:'right',align:'left'}
        },
        {
            xtype: 'button',
            text:'12.GetValue',
            handler:function () {
                Rsd.msg(this.parent.items[11].getValue());
            }
        },
        {
            xtype: 'button',
            width:120,
            text:'13.SetChecked',
            handler:function () {
                this.parent.items[11].check(true);
            }
        },
        {
            xtype: 'button',
            width:120,
            text:'14.CancelChecked',
            handler:function () {
                this.parent.items[11].check(false);
            }
        },
        {width:'100%',header:'15-----',height:30},
        {
            xtype:'date',
            label:'16.起始日期'
        },

        {
            xtype:'date',
            label:'17.结束日期'
        },
        {header:'18-----',width:'100%',height:30},
        {
            xtype:'autocomplete',
            autoCompleteHandler:function(key,fn){fn(['aaaa','bbbbb','ccccc']);},
            label:'19.自动填充'
        },
        {
            xtype:'mulitiselect',
            label:'20.多选',
            dataSource:[{text:'中国',value:'CN'},{text:'美国',value:'US'},{text:'德国',value:'DE'},{text:'日本',value:'JP'}]
        },
        {header:'20-----',width:'100%',height:30},
        {
            xtype:'navigate-menu',
            label:'21.navigate-menu',
            dataSource:[
                {
                    text:'菜单1',
                    handler:function () {
                    alert('hellloooooo');
                }},
                '菜单2',
                '菜单3']
        }

    ] ,
    /*
    * */
    constructor: function InputPage(config) {
        config = config || {};
        this.apply(config);


    },
    load:function () {
        this.items[16].setValue(new Date());
    }


},function(type){


});