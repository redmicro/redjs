
/**
* 
* */
Rsd.define("Rsd.developer.JobListPage", {
    extend: "Rsd.view.BaseListPage",
    requires: ['Rsd.control.MulitiSelect'],
    xtype: "list-job",
    border: false,
    titleField:"Title",
    readOnly:true, 
    /**
     * 
     */
    gridColumns:[
        {
            "text": "序号",
            "xtype": "index",
            "width": 40,
            "index": 0
        },
        {
            "name": "Title",
            "dataIndex": "Title",
            "sortable": false,
            "text": "标题",
            align:'left',
            "index": 22,
            "exist": true,
            "xtype": "template",
            formatString:'<span style=\'color:blue;\'>#=Title=#</span>',
            format:'title_format',
            "width": 220,
            "nobr": false
        },
        {
            "name": "Status",
            "dataIndex": "Status",
            "sortable": false,
            "text": "状态",
            "index": 30,
            "exist": true, 
            "xtype": "enum",
            "enum": {
                "name": "Rsd.Dudu.Core.TimerStatus",
                "valueMember": "code",
                "textMember": "text",
                "items": [
                    {
                        "code": "Created",
                        "value": 0,
                        "text": "已创建"
                    },
                    {
                        "code": "Loaded",
                        "value": 1,
                        "text": "已加载/等待执行"
                    },
                    {
                        "code": "Runing",
                        "value": 2,
                        "text": "正在运行"
                    },
                    {
                        "code": "Completed",
                        "value": 4,
                        "text": "已完成"
                    },
                    {
                        "code": "Sleep",
                        "value": 8,
                        "text": "已休眠"
                    },
                    {
                        "code": "Closed",
                        "value": 16,
                        "text": "已关闭"
                    }
                ]
            },
            "width": 100,
            format:'status_format',
            "nobr": true
        },
        {
            "name": "Timer",
            "dataIndex": "Timer",
            "sortable": false,
            "text": "时间",
            align:'left',
            formatString:"创建:<span style=\'color:blue;\'>#=CreateTime=#</span></br>计划:<span style=\'color:green;\'>#=Year=#-#=Month=#-#=Day=# #=Hour=#:#=Minute=#:#=Second=#</span>",
            "index": 36,
            "exist": true,
            "xtype": "template",
            format:'time_format',
            "width": 160,
            "precision": 0
        },  
        {
            "name": "CodeType",
            "dataIndex": "CodeType",
            "sortable": false,
            "text": "执行",
            align:'center',
            "index": 50,
            "exist": true,
            "xtype": "template",
            formatString:"<span style=\'color:blue;\'>#=CodeType=#</span>&nbsp;&nbsp;次数:<span style=\'color:green;\'>[#=Count=#]</span>&nbsp;&nbsp;<span style=\'color:green;\'>#=ResultStatus=#</span>",
            "width": 180,
            format:'code_format',
            "nobr": true
        }, 
        {
            "name": "RunHost",
            "dataIndex": "RunHost",
            "sortable": false,
            "text": "主机",
            align:'left',
            "index": 66,
            "exist": true,
            "xtype": "template",
            formatString:'主机：<span style=\'color:blue;\'>#=RunHostId=#</span>',
            format:'host_format',
            "width": 160,
            "nobr": true
        } 
    ],   
    sort:[{name:'CreateTime',direction:'DESC'}],
    
    /** 
     * 获取后台日志列表的api接口名称
    */
   serviceName:null,
    /*
     * */
    constructor: function JobListPage(config) {
        config = config || {};
        this.apply(config);
        this.toolBar.searchColumns=[
            {
                text:"标题:",
                style:{fontWeight:'bold'},
                name:"Title",
                width:250
            },
            {
                xtype:'mulitiselect',
                label:'状态:',
                name: 'Status',
                width:300,
                style:{fontWeight:'bold'},
                op:'in',
                dataSource:[
                    {text:'已创建',value:'Created'},
                    {text:'已加载',value:'Loaded'},
                    {text:'正在运行',value:'Runing'},
                    {text:'已完成',value:'Completed'},
                    {text:'已休眠',value:'Sleep'},
                    {text:'已关闭',value:'Close'},
                 ]
            },
            {
                xtype:'combobox',
                label:'有效期:',  
                name: 'EndTime',
                style:{fontWeight:'bold'},
                width:200,
                nullText:false,
                selectedIndex:0,
                op:'equals',
                dataSource:[{text:'全部',value:0},{text:'未过期',value:1},{text:'已过期',value:2}]
            },
            {
                xtype:'combobox',
                label:'禁用状态:',  
                name: 'Disabled',
                style:{fontWeight:'bold'},
                width:200,
                nullText:false,
                selectedIndex:0,
                op:'equals',
                dataSource:[{text:'全部',value:''},{text:'已禁用',value:1},{text:'未禁用',value:0}]
            }, 
            {
                xtype:'combobox',
                label:'执行结果:',  
                name: 'ResultStatus',
                style:{fontWeight:'bold'},
                width:200,
                nullText:false,
                selectedIndex:0,
                op:'equals',
                dataSource:[{text:'全部',value:''},{text:'成功',value:'Success'},{text:'失败',value:'Failure'}]
            }

        ];
    },
    /*
    *加载数据
    * */
    load:function load(args,callback) {

        var _args = args||{};
        
        var _serviceName = this.serviceName||this.menu.serviceName;
        if(Rsd.isEmpty(_serviceName))
        {
            Rsd.alert("未设置属性serviceName");
        }
        this.dataStore = Rsd.app.getService(_serviceName);
        _args.sort = this.sort||this.menu.sort||[];
        _args.where =[];
        
        var _where =  this.toolBar.getWhere()||[];
        for(var i in _where)
        {
            if(_where[i].name == "EndTime")
            { 
                if(_where[i].value ==0)
                {}
                if(_where[i].value ==1)
                {
                    _args.where.push({group:'date',grouplogic:'and',logic:'or',name:'EndTime',op:'morethan',value:Date.now()});
                    _args.where.push({group:'date',grouplogic:'and',logic:'or', name:'EndTime',op:'equals',value:0});
                }
                if(_where[i].value == 2)
                {
                    _args.where.push({group:'date',name:'EndTime',op:'lessthan',value:Date.now()});
                    _args.where.push({group:'date',grouplogic:'and',logic:'and', name:'EndTime',op:'notEquals',value:0});
                }
                
            }
            else
            {
                _where[i].group = _where[i].group||_where[i].name || 'defualt';
                _args.where.push(_where[i]);
            }
            
        }
        this.callParent(_args,callback) ;
    },
     /**
      * 
      * @param {*} row 
      */
    title_format:function title_format(row)
    {  
        var btns = [
            Rsd.newLine(), 
            Rsd.text('有效期:'+ new Date(row['StartTime']).format('yyyy-MM-dd hh:mm:ss')) ,
            Rsd.newLine(),
            Rsd.blankspan(2),Rsd.text('    至' + (row['EndTime']==0?' 无限期':new Date(row['EndTime']).format('yyyy-MM-dd hh:mm:ss'))), 
            Rsd.newLine()
           
        ];
        if(row['EndTime'] > 0 &&row['EndTime'] < Date.now())
        { 
            btns.push(Rsd.blankspan(2));
            btns.push(Rsd.label('已失效', 'red'));  
        }
        

        if(row['Disabled'])
        {  
            btns.push(Rsd.blankspan(2));
            btns.push(Rsd.label((row['Disabled']?'已禁用':'未禁用'),row['Disabled']?'red':'green')); 
            
        } 
        {
            btns.push(Rsd.blankspan(2));
            btns.push(Rsd.label((row['ManualEnabled']?'允许手动':'禁止手动'),row['ManualEnabled']?'green':'red') ); 
        }

        return btns;
    },

    host_format:function host_format(row)
    {
        return [
            Rsd.text((row['IsFixed']>0?"（绑定）":"（未绑定）"),0,row['IsFixed']>0?'red':'blue'),
            Rsd.newLine(),
            Rsd.text('失效时间：'+ new Date(row['HostExpireTime']).format('yyyy-MM-dd hh:mm:ss')),
            Rsd.newLine(),
           
            Rsd.text('局域网IP：'+row['RunHostIP']),Rsd.newLine(),
            Rsd.text('类型:'+row['RunHostType'],0,'green')
            ];     
    },
    status_format:function status_format(row)
    {
        return [
            Rsd.newLine(),
            Rsd.text('['+ new Date(row['StatusChangeTime']).format('yyyy-MM-dd hh:mm:ss') + ']',0,'','最新状态更新时间'),
        ];
    },
    time_format:function time_format(row)
    {
          
       return [
            Rsd.newLine(),
            Rsd.text('固定间隔:'+ (row['IsInterval']>0?"是":"否") +"(间隔时长：" +  row['Interval'] + ")"),Rsd.newLine(),
            Rsd.text('每周执行:'+ (row['IsWeek']>0?"是":"否") ),Rsd.newLine()
       ];
    },
    /**
     * 
     * @param {*} row 
     */
    code_format:function code_format(row)
    {
        var me = this; 
        var _view_log = function()
        {
             Rsd.create('Rsd.developer.JobLogListDialog',{
                 title:row['Title'], 
                 serviceName:me.logServiceName||me.menu.logServiceName, 
                 where:[{name:'JobId',op:'equals',value:row['Key']}],
                }).showDialog();
        };
        
        var _view_code = function(){
            Rsd.requestService('job.GetCodeView',{key:row.Key},function(data)
            {
                var list = data.data.split('\r\n'); 
                var code = "";
                for(var c in list)
                {
                    code+='<span>' + list[c].replace('<','&lt;').replace('>','&gt;').replace('     ','&nbsp;&nbsp;&nbsp;&nbsp;').replace('   ','&nbsp;&nbsp;').replace(' ','&nbsp;') + '</span></br>';
                }
                Rsd.showHtml('查看Job执行代码',code);
            });
            
            };

            var _view_result = function(){
                Rsd.showHtml('最后一次执行结果',row['LastResult']);
                };

         return [
            Rsd.newLine(),
            Rsd.text( '['+ new Date(row['LastExeTime']).format('yyyy-MM-dd hh:mm:ss')+ ']',0,'','最后一次执行时间'),
            Rsd.newLine(), 
            Rsd.newLine(), 
            Rsd.button('查看代码',_view_code,this,{},{float:'right'}),
            Rsd.blankspan(2,{float:'right'}),
            Rsd.button('查看执行结果',_view_result,this,{},{float:'right'}),
            Rsd.blankspan(2,{float:'right'}),
            Rsd.button('查看日志',_view_log,this,{},{float:'right'}) 
         ];
         
    } 
});
