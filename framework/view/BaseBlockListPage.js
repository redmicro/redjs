/*
 * redmicro all Copyright (c)
 */

Rsd.define('Rsd.view.BaseBlockListPage', {
    extend: 'Rsd.container.Page',
    requires: [
        'Rsd.controlEx.ModelViewer',
        'Rsd.control.ListView',
        'Rsd.control.GridToolBar',
        'Rsd.control.PagingBar'
    ],
    xtype: 'base-list-page',
    border: false,
    tabTitle: 'Title',
    layout: 'border',
    selected:true,
    /**
     * @description 是否分页显示
    * */
    pagging:true,
    /**
     * 
     */
    items:[
        {
            xtype:'grid-tool-bar',
            region:'top',
            searchHandler:'searchListData',
            height:50
        },
        {
            xtype: 'list-view',
            region:'center',
            margin: '0 1 0 0',
            itemXtype:'label', 
            itemDblClick: 'list_item_dblclick',
            itemClick:''
        },
        {
            xtype:'paging-bar',
            indexChanged:'pageIndexChanged',
            region:'bottom',
            height:50
        }
    ],
    //
    //itemXtype:'',
    //itemStyle:{},
    /**
     * 
     */
    itemDblClick:'',
    
    /*
    * */
    //formFields:[],
    /**
     * 获取数据源的 服务名 优先使用serviceName
     */
    serviceName:null,
    /**
     * 数据源，在 serviceName 没有有效值时 ，有效
     */
    dataStore:null,
    /*
    * */
    constructor: function BaseListPage(config) {
        config = config || {};
        this.apply(config);
    }, 
    /*
     * */
    pageIndexChanged: function pageIndexChanged(pagingOpt) {
        //debugger;

        this.load({});//只需重新加载，pagingOpt 信息自动获取

    },
   /*
   *
   * */
    searchListData:function searchListData(where) {

        var me = this;
        var _args = {};
        if(!Rsd.isEmpty(where))
        {
            _args.where=where;
        }
        this.load(_args);
    },
    /*
     args :api 接口需要的参数
    *
    * */
    load:function load(args,callback) {
        
        this.callParent();
        //debugger;
        var me = this;
        var listView = me.items[1];
        if(!(listView instanceof Rsd.control.ListView))
        {
            console.error("me.items[1] is not Rsd.control.ListView");
        }
        Rsd.showWaiting(me.id, listView);

        var _serviceName = this.serviceName||this.menu.serviceName;
        if(!Rsd.isEmpty(_serviceName))
        {  
            this.dataStore = Rsd.app.getService(_serviceName);
            if(this.dataStore && this.listMember)
            {
                this.dataStore.listName = this.listMember
            }
        }
        
        if(me.dataStore)
        {
            listView.dataSource = me.dataStore;
        }
       
        setTimeout(function () {
            //console.log(args);console.log(opt);console.log(_args);
            var opt  = me.getPagingOpt();
            var _args =  Rsd.isArray(args)? args : Rsd.apply(args||{}, {pageSize:opt.pageSize,pageIndex:opt.pageIndex});
            listView.removeAll();
            listView.loadData(_args, function (data) {

               
                if(data && data.success)
                {
                    var _data = data.data;
                    if(Rsd.isArray(_data))
                    {
                        me.setPagingOpt({pageSize:opt.pageSize,pageIndex:0,pageCount:1,totalCount:_data.length});
                    }
                    else
                    {
                        me.setPagingOpt({pageSize:_data.pagesize,pageIndex:_data.pageindex,pageCount:_data.pagecount,totalCount:_data.total});
                    }
                }

                var _f = Rsd.callFunction(me, callback||function (__data) {

                    if(Rsd.isEmpty(__data))
                    {
                        Rsd.alert('数据加载失败', '未获取到数据（网络故障）。');
                        return false;
                    }
                    if(Rsd.isArray(__data))
                    {
                        return true;
                    }
                    if(__data.success)
                    {}
                    else
                    {

                        if(Rsd.isEmpty(__data.msg))
                        {
                            __data.msg = '未知错误(UI0009),请查看日志。';
                            console.error(__data);
                        }
                        __data.msg = '数据加载失败:' +  __data.msg;
                        return true;
                    }

                    return true;

                }, arguments);

                Rsd.closeWaiting(me.id);
                //console.log('BaseListPage.loadData return: ' + _f);
                return _f;
            });

        }, 50);

    },

    /**
    * @description 获取分页信息,在查询时，自动加上分页信息
    * */
    getPagingOpt:function getPagingOpt() {
        
      if(this.items[2] instanceof  Rsd.control.PagingBar)
      {
          return this.items[2].getPaging();
      }
      return {};
    },

    /**
    * @description 设置分页信息,一般在查询条件发发生改变时，需重新设置分页 {pageIndex: 0}
    * */
    setPagingOpt:function setPagingOpt(opt) {

        if(this.items[2] instanceof  Rsd.control.PagingBar)
        {
            return this.items[2].setPaging(opt);
        }
    },
    
     
    /*
    * */
    list_item_dblclick:function list_item_dblclick(item,evt)
    {
        this.funApplyByIOC(this.itemDblClick,[item.content,evt]);
    },
    /*
    * 展示详细信息
    * */
    showView:function showView(row,btns,readOnly,title,height,width)
    {
        var _record=row;
        var _titleField = this.titleField || this.titleMember || this.menu.titleField || this.menu.titleMember;
        var _sub = (_titleField== null || _titleField.length ==0) ?"titleField未设置" :(_record ? (_record[_titleField]||'-') :'*');
        var _title = ( this.formTitle ||'无标题') +  '[' + _sub + ']';
        var _type = this.modelType;
        if(!_type.startWith('Rsd.'))
        {
            _type = Rsd.app.assembelyName + '.' + this.modelType;
        }

        var form = Rsd.create('Rsd.view.SingleDialog', {
            modelType:_type,
            fields:this.formFields,
            buttons:btns,
            schema:null,
            parent:this,
            readOnly:readOnly,
            title: title||_title,
            height:height||500,
            width:width||480,
            data:row
        });

        form.showDialog();
    },
    
    /**
     * 本也表格数据导出excel
     * @param {*} sheet 
     * @param {*} file 仅文件名称（不是路径）
     */
    "export": function _export(sheet,file) {
        var grid = this.items[0];
        grid.export(sheet,file);
    }


},function(type){


    //formFields
    var _formFieldsGetter = function () {
        if(this.__formFields == undefined)
        {
            this.__formFields = [];
        }
        return this.__formFields;
    };

    var _formFieldsSetter = function (value) {
        this.__formFields = value;
    }

    this.defineProperty(type,"formFields", _formFieldsGetter, _formFieldsSetter,true);

    
   //toolbar
    var _toolBarGetter = function () {

        if(this.items.length ==0)
        {
            return null;            
        }
        return this.items[0]; 
    };

    var _toolBarSetter = function (value) {

        if(Rsd.isString(value))
        {
            this.items[0].xtype = value;
            return;
        }

        if(Rsd.isObject(value) ) {
            Rsd.apply(this.items[0], value);
            return;
        }
    }

    this.defineProperty(type,"toolBar", _toolBarGetter, _toolBarSetter,false);

    //footbar
    var _footBarGetter = function () {

        return this.items[2];
    };

    var _footBarSetter = function (value) {

        this.items[2] = value;

        if(Rsd.isObject(value) && !value.hasOwnProperty('xtype'))
        {
            this.items[2].xtype = 'paging-bar';
        }

    }

    this.defineProperty(type,"footBar", _footBarGetter, _footBarSetter,false);

    //itemXtype 
    this.defineProperty(type,"itemXtype", function(){return this.items[1].itemXtype;}, function(value){return this.items[1].itemXtype=value;},false);
    //itemStyle 
    this.defineProperty(type,"itemStyle", function(){return this.items[1].itemStyle;}, function(value){return this.items[1].itemStyle=value;},false);
      
});