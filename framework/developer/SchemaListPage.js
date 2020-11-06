/*
 * redmicro all Copyright (c)
 */
Rsd.define("Rsd.developer.SchemaListPage", {
    extend: "Rsd.view.BaseListPage",
    requires: [],
    xtype: "list-schema",
    border: false,
    titleField:"typename",
    
     /** 
     * 获取后台Servic服务列表的api接口名称
    */
    serviceName:null,
    gridColumns: [
        {
            "text": "序号",
            "xtype": "index",
            "width": 40
        },
        {
            "name": "TypeFullName",
            "text": "名称",
            "dataindex": "TypeFullName",
            "sortable": true,
            "width": 250,
            "nobr": true,
            format:'btn_copy'
        },
        {
            "name": "TableAlias",
            "text": "说明",
            "dataindex": "TableAlias",
            "sortable": true,
            "width": 150,
            "nobr": true
        },
        {
            "name": "IsAbstract",
            "text": "抽象类",
            "dataindex": "IsAbstract",
            "xtype": "template",
            "format":"isAbstractFormat",
            "sortable": true,
            "width": 100,
            "nobr": true
        },
        {
            "name": "BaseType",
            "text": "父类",
            "dataindex": "BaseType",
            "sortable": true,
            "width": 200,
            "nobr": true
        },
        {
            "name": "KeyProperty",
            "text": "主键",
            "dataindex": "KeyProperty",
            "sortable": true,
            "width": 60,
            "nobr": true
        },
        {
            "name": "TableName",
            "text": "表名称",
            "dataindex": "TableName",
            "sortable": true,
            "width": 150,
            "nobr": true
        },
        {
            "name": "AssemblyName",
            "text": "程序集",
            "dataindex": "AssemblyName",
            "sortable": true,
            "width": 150,
            "nobr": true
        }
    ],
    templateCols: [
        {
            name: "preview",
            text: "预 览",
            nobr:true,
            xtype: "template",
            format:"templateFormat_p"
        },
        {
            name: "copy",
            text: "复制结构",
            nobr:true,
            xtype: "template",
            format:"templateFormat_c"
        },{
            name: "space",
            text: "",
            xtype: "template",
            width: 5,
            hideable: false,
            sortable: false
        }
    ],
    searchColumns:[{name:"key",text:"关键字",width:350}],
    newButtons:[
        {text:"发布数据库",visible:true,handler:"btn_update_db"}
    ],
    dataStore:null,
    /**
     * */
    constructor: function TSchemaListPage(config) {
        config = config || {};
        this.apply(config);
        this.toolBar.searchColumns = this.searchColumns;
        this.toolBar.newButtons = this.newButtons;
    },
    /**
     *
     * */
    load:function load(args,callback)
    {
        var me = this;
        var _args=args||{};
        var _serviceName = this.serviceName||this.menu.serviceName;
        if(Rsd.isEmpty(_serviceName))
        {
            Rsd.alert("未设置属性serviceName,请在页面属性或菜单属性中设置serviceName值");
            return;
        }
        this.dataStore = Rsd.app.getService(_serviceName.toLowerCase());
 
        if(Rsd.isEmpty(this.dataStore))
        {
            Rsd.alert("服务["+_serviceName+"]不存在");
            return;
        }
        
        _args.pageSize=200; 
        this.callParent(_args,function(data)
        {
            if( !data.success)
            {
                Rsd.alert(data.msg||'发生了未知的错误');
                console.log(data);
            }
            var rows = data.data.rows;
            var _where =_args.where||[];

            var _key = null;
            for(var i in _where)
            {
                if(_where[i].name == "key")
                {
                    _key = _where[i].value;
                    _key = _key.substr(3,_key.length-6).trim().toLowerCase();
                    continue;
                }

            }

            var list = [];
            for(var i in rows)
            {
                var item = rows[i];

                if(!Rsd.isEmpty(_key)
                    && item.TypeFullName.toLowerCase().indexOf(_key)<0
                    && item.TableAlias.toLowerCase().indexOf(_key)<0
                    && item.TableName.toLowerCase().indexOf(_key)<0
                )
                {
                    continue;
                }
                list.push(item);
            }
            me.callParentFn("load",[list,callback]);

            return;
        }) ;

        

    },
    /*
    * */
    isAbstractFormat:function isAbstractFormat(row) {
      if(row["IsAbstract"])
      {
          return [Rsd.circle(8,"red"),Rsd.blankspan(2),Rsd.text("true","red")];
      }
      return [Rsd.circle(8,"green"),Rsd.blankspan(1),Rsd.text("false","gray")];

    },
    /*
     * */
    templateFormat_p:function templateFormat_p(row) {


        var modelType = row["TypeFullName"];
        var btn = document.createElement("a");
        btn.href = "#";
        btn.innerHTML = "Form";
        $(btn).click(function () {
            Rsd.app.showModelView(modelType, [], {}, row["TableAlias"]+"(只读)",true);
        });
        return [btn,Rsd.blankspan(1)] ;

    },
    /*
    *
    * */
    templateFormat_c:function templateFormat_c(row){

        var me = this;

        var modelType = row["TypeFullName"];
        var  btn1 = document.createElement("a");
        btn1.href="#";
        btn1.innerHTML = "表格";
        $(btn1).click (function(){

            var _fn = function (schema) {
                if(schema instanceof Rsd.data.Schema) {

                    Rsd.copy(JSON.stringify(schema.columns,null,4));
                }else
                {
                    Rsd.msg("模型："+modelType + "不存在或返回值不是Rsd.data.Schema类型。");
                }
            }
            if(Rsd.isFunction(Rsd.app.getSchemaHandler))
            {
                Rsd.app.getSchema(modelType,_fn);
                return;
            }

            Rsd.msg("getSchemaHandler不存在");
        } );

        var  btn2 = document.createElement("a");
        btn2.href="#";
        btn2.innerHTML = "表单";
        $(btn2).click (function(){

            var _fn = function (schema) {

                if(schema instanceof Rsd.data.Schema) {

                    Rsd.copy(JSON.stringify(schema.fields,null,4));
                }else
                {
                    Rsd.msg("模型："+modelType + "不存在或返回值不是Rsd.data.Schema类型。");
                }
            }
            if(Rsd.isFunction(Rsd.app.getSchemaHandler)){

                Rsd.app.getSchema(modelType,_fn);
                return;
            }

            Rsd.msg("getSchemaHandler不存在");
        } );
        return [btn1,Rsd.blankspan(1),btn2] ;

    },
    /*
    * */
    btn_update_db:function btn_update_db() {

        var me = this;

        Rsd.showWaiting(me.id);

        var _service =  Rsd.app.getService("DeveloperService.UpdateDb");

        _service.requestJson({},function (data) {

            Rsd.closeWaiting(me.id);
            Rsd.showMessage((data.success?"更新成功":("更新失败："+data.msg)));

        });
    },
    /*
    * */
    btn_copy:function btn_copy(row) {

       return [Rsd.newLine(),Rsd.btn(' 复 制 ',function (){Rsd.copy(row['TypeFullName']);})] ;
    }


});


