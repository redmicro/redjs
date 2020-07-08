Rsd.define('Rsd.example.GridPage', {
    extend: 'Rsd.container.Page',
    requires: [
        'Rsd.control.Button',
        'Rsd.control.CheckBox',
        'Rsd.control.Radio',
        'Rsd.control.Table',
        'Rsd.control.Grid',
        'Rsd.control.GridToolBar',
        'Rsd.control.PagingBar'
    ],
    xtype: 'ctrl-grid-page',
    border: false,
    tabTitle: 'Controls-Table-Grid ',
    layout: 'hbox',
    selected:true,
    pagging:true,
    items:[
        {
            xtype: 'grid',
            label:{content:'0.this is table',space:2},
            footBar:{xtype:'paging-bar',indexChanged:'pageIndexChanged'},
            width:'100%',
            height:300,
            margin:'0 20 0 10',
            border:true,
            dataSource:[
                {a:'2012-02-22',b:'22.00',c:'aaaa',d:'jack',e:false },
                {a:'2013-03-08',b:'33.33',c:'cccc',d:'tom',e:true},
                {a:'2015-09-13',b:'2.20' ,c:'dddd' ,d:'🌞🌞',e:false},
                {a:'2018-01-11',b:'1.10',c:'bbbb',d:'张三',e:false},
                {a:'2013-07-09',b:'2982',c:'3333',d:'🌟天空🌟',e:false},
                {a:'2014-04-04',b:'0.00',c:'4444',d:'mary',e:false},
                {a:'2012-02-22',b:'22.00',c:'aaaa',d:'jack' ,e:true},
                {a:'2013-03-08',b:'33.33',c:'cccc',d:'tom',e:false},
                {a:'2015-09-13',b:'2.20' ,c:'dddd' ,d:'🌞🌞',e:false},
                {a:'2018-01-11',b:'1.10',c:'bbbb',d:'张三',e:true},
                {a:'2013-07-09',b:'2982',c:'3333',d:'🌟天空🌟',e:false},
                {a:'2014-04-04',b:'0.00',c:'4444',d:'mary',e:true},
                {a:'2012-02-22',b:'22.00',c:'aaaa',d:'jack' ,e:true},
                {a:'2013-03-08',b:'33.33',c:'cccc',d:'tom',e:false},
                {a:'2015-09-13',b:'2.20' ,c:'dddd' ,d:'🌞🌞',e:true},
                {a:'2018-01-11',b:'1.10',c:'bbbb',d:'张三',e:false},
                {a:'2013-07-09',b:'2982',c:'3333',d:'🌟天空🌟',e:false},
                {a:'2014-04-04',b:'0.00',c:'4444',d:'mary',e:true}
                ],
            columns:[
                {xtype:'index',text:'index'},
                {xtype:'checkbox',text:'Check All',checkAll:true,name:'isCheck'},
                {xtype:'template',text:'template',formatString:'#=d=#<br>#=a=#'},
                {
                    text:'merge',subs:[
                        {xtype:'checkbox',text:'Check All',checkAll:true,name:'isCheck1'},
                        {xtype:'text',text:'text',name:'d'}
                    ]
                } ,
                {xtype:'string',text:'string',name:'c',format:'format_c'},
                {text:'merge',subs:[
                        {xtype:'bool',text:'bool',name:'e'},
                        {xtype:'text',text:'text',name:'d'}
                    ]}

                ]

        },
        {
            xtype: 'button',
            text:'1.load data',
            handler:function () {
                this.parent.items[0].loadData();
            }
        },
        {width:'100%',height:10},

    ] ,
    /*
    * */
    constructor: function GridPage(config) {
        config = config || {};
        this.apply(config);

    },
    format_c:function (row) {

        return [Rsd.circle(10,'red'),Rsd.text(row.c),Rsd.button('click me',function () {
            alert('hello...')
        }),Rsd.blankspan(3),Rsd.label('this is label','#cc2323')];
    }





},function(type){


});