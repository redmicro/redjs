/**
 * Created by dwj on 2017/2/27.
 */
Rsd.define('Rsd.developer.ApiListPage', {
    extend: 'Rsd.view.BaseListPage',
    requires: [],
    xtype: 'api-list',
    border: false,
    dataStore:[],
    titleField:'name',
    gridColumns: [
        {
            "text": "序号",
            "xtype": "index",
            "width": 40
        },
        {
            "name": "Key",
            "text": "Key",
            "dataindex": "Key",
            "sortable": true,
            "width": 250,
            format:'format_key',
            "nobr": false

        },
        {
            "name": "Url",
            "text": "URL",
            "dataindex": "Url",
            "sortable": true,
            "width": 250,
            "nobr": true,
            //xtype: 'template',
            format:'templateFormat'
        },
        {
            "name": "Level",
            "text": "访问等级",
            "dataindex": "Level",
            "sortable": true,
            "width": 150,
            "nobr": true
        },
        {
            "name": "IsWebService",
            "text": "公开",
            "dataindex": "IsWebMethod",
            "sortable": true,
            "xtype":"template",
            "format":"isWebMethodFormat",
             align:'center',
            "width": 100,
            "nobr": true
        },
        {
            "name": "EnableSession",
            "text": "en_Session",
            "dataindex": "EnableSession",
            "xtype":"template",
            "format":"enabledSessionFormat",
            "sortable": true,
            align:'center',
            "width": 100,
            "nobr": true
        },
        {
            "name": "CheckSession",
            "text": "ck_Session",
            "dataindex": "CheckSession",
            "xtype":"template",
            "format":"checkSessionFormat",
            "sortable": true,
            align:'center',
            "width": 100,
            "nobr": true
        },
        {
            "name": "errorHandler",
            "text": "error",
            "dataindex": "errorHandler",
            "sortable": true,
            "width": 150,
            "nobr": true
        },
        {
            "name": "failureHandler",
            "text": "failure",
            "dataindex": "failureHandler",
            "sortable": true,
            "width": 150,
            "nobr": true
        },
        {
            "name": "successHandler",
            "text": "success",
            "dataindex": "successHandler",
            "sortable": true,
            "width": 150,
            "nobr": true
        },{
            "name": "TypeName",
            "text": "类/方法",
            "dataindex": "Type",
            "sortable": true,
            xtype:'template',
            formatString:'#=TypeName=#</br>#=ServiceName=#',
            "width": 150,
            "nobr": true
        } 
    ],
    searchColumns:[{text:'关键字',name:'key',width:350},{xtype:'combobox',name:'group',text:'分组',op:'equals'}],
    templateCols: [
        {
            name: 'space',
            text: '',
            xtype: 'template',
            width: 5,
            hideable: false,
            sortable: false
        }
    ],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
        var group = [];
        for(var i in Rsd.services)
        {
            group.push(i);
        }
        this.searchColumns[1].dataSource=group;
        this.toolBar.searchColumns = this.searchColumns;
    },
    /**
     *
     * */
    load:function load(args)
    {
      
        var me = this;
        me.callParent();

        var _args = args||{};
        setTimeout(function load(){
             
            me.loadServices(_args.where||[],function (data) {
                me.dataStore = data;
                me.callParentFn('load'); 
            });
        },500)
       
       
   
        
    },
    /*
    *获取服务
    * */
    loadServices:function loadServices(args,callback) {

        
        var list = [];
        var _args = args||[];
        var _key=null;
        var _group=null;


        for(var i in _args)
        {
            if(_args[i].name == 'key')
            {
                _key = _args[i].value;
                _key = _key.substr(3,_key.length-6).trim().toLowerCase();
                continue;
            }
            if(_args[i].name == 'group')
            {
                _group = _args[i].value.trim().toLowerCase();
                continue;
            }
        }
       
        for(var i in Rsd.services)
        {
          
            if (!Rsd.isEmpty(_group) && i.toLowerCase() != _group.toLowerCase()) {
                continue;
            }

            var service = Rsd.services[i];
         
            for(var j in service.api) {
                //console.log(service.api[j]); 
                var item =service.api[j].data;
                item.Key = service.api[j].key||'';
                if (!Rsd.isEmpty(_key)
                    && item.Key.toLowerCase().indexOf(_key) < 0
                    && item.Description.toLowerCase().indexOf(_key) < 0
                    && item.Name.toLowerCase().indexOf(_key) < 0 
                ) {
                    continue;
                }
                
                list.push(item);
            }
        }
         
       
        callback(list) ;
    },
    /**
     * */
    format_key:function format_key(row)
    {
        return [Rsd.newLine(),Rsd.text('['+row['Description']+']','black')];
    },
    /**
    * */
    isWebMethodFormat:function isWebMethodFormat(row) {
        if (row['IsWebMethod'])
        {
            return [Rsd.circle(8,'green'),Rsd.blankspan(),Rsd.text('T','green')]  ;
        }
        else
        {
            return [Rsd.circle(8,'red'),Rsd.blankspan(),Rsd.text('F','red')]  ;
        }
    },
    /**
    * */
    enabledSessionFormat:function enabledSessionFormat(row)
    {
        if (row['EnabledSession'])
        {
            return [Rsd.circle(8,'red'),Rsd.blankspan(),Rsd.text('T','red')]  ;
        }
        else
        {
            return [Rsd.circle(8,'green'),Rsd.blankspan(),Rsd.text('F','green')]  ;
        }
    },
    checkSessionFormat:function checkSessionFormat(row ) {
        if (row['CheckSession'])
        {
            return [Rsd.circle(8,'green'),Rsd.blankspan(),Rsd.text('T','green')]  ;
        }
        else
        {
            return [Rsd.circle(8,'red'),Rsd.blankspan(),Rsd.text('F','red')]  ;
        }
    },
    /*
     * */
    templateFormat:function templateFormat(row){

        var me = this;
        var  btn = Rsd.button('详情',function(){

            var form = Rsd.create('Rsd.developer.ApiDialog',{title:'['+ row.Name + ']服务详情'});
            form.showDialog(null,null,null,0).load(row);
        } )


        var  btn1 = Rsd.button('测试记录',function(){
            if(row['IsWebMethod']==false)
            {
                Rsd.alert("服务未公开不可测试！");
                return;
            }
            var form = Rsd.create('Rsd.developer.ApiTestDialog',{title:'['+ row.Name + ']服务详情'});
            form.showDialog(null,null,null,0).load(row);
        } );
        var btn2 = Rsd.button(" 复制",function () {
            Rsd.copy(row.url);
        });

        return [Rsd.newLine(),btn,Rsd.blankspan(2),btn1,Rsd.blankspan(2),btn2] ;

    }

});