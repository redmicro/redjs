Rsd.define('Rsd.example.RedjsPage', {
    extend: 'Rsd.container.Page',
    xtype:'redjs',
    requires: [
        'Rsd.control.Button'
    ],
    items:[
        {width:'100%',height:10},
        {
            xtype: 'button',
            width:300,
            height:40,
            cls:'btn btn-success',
            text:'1.Rsd.showMessage(\'hello world.\')',
            handler:function () {
                Rsd.showMessage('hello world.');
            }
        },
        {
            xtype: 'button',
            width:300,
            height:40,
            cls:'btn btn-primary',
            text:'2.Rsd.yesOrNo',
            handler:function () {

                Rsd.yesOrNo('check yes or no.',function () {
                    alert('you check yes.')
                },function () {
                    alert('you check no.')
                });
            }
        },
        {
            xtype: 'button',
            width:300,
            text:'3.Rsd.showHtml',
            handler:function () {

                Rsd.showHtml('this is html <span style="color: red">hello world</span>');
            }
        },
        {
            xtype: 'button',
            width:300,
            text:'4. Rsd.showPopup(\'hello world.\',-450,200)',
            handler:function () {
                Rsd.showPopup('hello world.',-450,200);
            }
        },
        {width:'100%',height:10},
        {
            xtype: 'button',
            width:300,
            text:'5.Rsd.showTipBox-top',
            handler:function (sender,e) {

                Rsd.showTip('top: click me close',200,50,350,140,'top');

            }
        },
        {
            xtype: 'button',
            width:300,
            text:'6.Rsd.showTipBox-left',
            handler:function (sender,e) {

                Rsd.showTip('left: click me close',200,150,950,90,'left');

            }
        },
        {
            xtype: 'button',
            width:300,
            text:'7.Rsd.showTipBox-bottom',
            handler:function (sender,e) {

                Rsd.showTip('bottom: click me close',200,50,1000,40,'bottom');

            }
        },
        {
            xtype: 'button',
            width:300,
            text:'8.Rsd.showTipBox-right',
            handler:function () {

                Rsd.showTip('right: click me close',200,150,1030,70,'right');
            }
        },
        {
            xtype: 'button',
            width:300,
            text:'9.Rsd.alert( html)',
            handler:function (sender,e) {

                Rsd.alert('<span style="color: red">hello word </span>');

            }
        },
        {
            xtype: 'button',
            width:300,
            text:'10.Rsd.alert(string) ',
            handler:function (sender,e) {

                Rsd.alert('hello word');

            }
        },
        {
            xtype: 'button',
            width:300,
            text:'11.Rsd.alertLog({msg:\'hello\'})',
            handler:function () {

                Rsd.alertLog({msg:'hello'});
            }
        },
        {
            xtype: 'button',
            width:300,
            text:'12.ShowDialog()',
            handler:function () {

                Rsd.create('Rsd.container.Dialog',{height:200,width:300,style:{opacity:0}}).showDialog(null,null,null,'fadeIn',5000);
            }
        }

    ],
    /* */
    constructor: function RedjsPage(config) {
    config = config || {};
    this.apply(config);

}


},function(type){


});