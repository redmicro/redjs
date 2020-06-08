/*
 *
  */
Rsd.define('Rsd.debug.test.ListPage', {
    extend: 'Rsd.view.BaseListPage',
    requires: ['Rsd.Avengers.stores.ListStore','Rsd.control.GridToolBarSimple'],
    xtype: 'list-page',
    //dataStore: 'listStore',
    readOnly: false,
    /*
    * 合并后使用
    * */
    fields: [],
    /*
    * 合并后使用
    * */
    columns: [],
    templateCols: [
        {
            name: 'edit',
            text: '操 作',
            nobr: true,
            width: 100,
            xtype: 'template',
            format: 'templateFormat'
        }, {
            name: 'space',
            text: '',
            xtype: 'template',
            width: 5,
            hideable: false,
            sortable: false
        }],
    toolBar:{xtype:'grid-tool-bar-simple',width:'100%',height:50},
    autoLoad:false,
    /*
    * */
    constructor: function ListPage(config) {
        config = config || {};
        this.apply(config);

    },
    onBeforeInit: function onBeforeInit() {

        if (this.readOnly) {
            this.templateCols = [{
                name: 'space',
                text: '',
                xtype: 'template',
                width: 5,
                hideable: false,
                sortable: false
            }];
        }
        this.callParent();
    },
    /*
    *
    * */
    onBeforeRender: function onBeforeRender() {

        this.menu = this.menu || {};
        //debugger;

        this.modelType = this.modelType || this.menu.modelType;
        this.titleField = this.titleField || this.menu.titleField;
        var me = this;

        if ((me.gridColumns.length == 0 || me.formFields.length == 0)
            && me.modelType) {
            Rsd.app.getSchema(me.modelType, function (schema) {
                try {
                    if (schema) {
                        me.schema = schema;
                        if (me.gridColumns.length == 0) {
                            me.gridColumns = schema.getColumns(me.columns||[]);
                        }

                        if (me.formFields.length == 0) {
                            me.formFields = schema.getFields(me.fields||[]);
                        }
                    }

                } catch (ex) {
                    Rsd.error('加载模型结构失败', ex);
                }
            });
        }

        if (Rsd.isString(this.toolBar)) {
            this.toolBar = {xtype: this.toolBar};
        }
        var columns = this.searchColumns||[];
        var _list = [];
        for(var i in columns)
        {
            var _c = columns[i];
            _c.xtype = _c.xtype ||'text';
            _c.label = {content:_c.label || _c.text,height:30};
            _c.dataIndex = _c.dataIndex||_c.name;
            _c.name = _c.name || _c.dataIndex ;
            _c.margin = _c.margin || "0 0 0 20";
            _list.push(_c)

        }
        this.toolBar.newButtons = Rsd.arrayConcat(_list,this.newButtons||[]);

        this.callParent();

    },
    /*
    *
    * */
    load: function load(args) {
        args = args || {};

        var _args = Rsd.apply(args || {}, {
            modelType: this.modelType,
            where: Rsd.arrayConcat(args.where || [],this.where, this.menu.where, this.getWhere()),
            sort: Rsd.arrayConcat( args.sort || [],this.sort, this.menu.sort)
        });

        if (Rsd.isString(this.dataStore)) {
            this.dataStore = Rsd.widget(this.dataStore);
        }

        this.callParent(_args);
        this.____lastWhere = this.getWhere();
    },

    /*
     * */
    templateFormat: function templateFormat(row) {
        if (this.readOnly) {
            return [];
        }
        var me = this;
        var btn = document.createElement('a');
        btn.href = '#';
        btn.innerHTML = '修改';
        $(btn).click(function () {
            me.openItem(row);
        });

        var btnDel = document.createElement('a');
        btnDel.href = '#';
        btnDel.innerHTML = '删除';
        $(btnDel).click(function () {
            me.deleteItem(row);
        });

        return [btn, $('<span>&nbsp;&nbsp;</span>')[0], btnDel];
    },

    /*
     * */
    openItem: function openItem(record) {
        var _titleField = this.titleField;
        var _sub = Rsd.isEmpty(_titleField) ? "titleField未设置" : (record ? record[_titleField] : '*');
        var _title = this.title + '[' + _sub + ']'
        Rsd.app.showModelView(this.modelType, this.fields, record, _title, false);
    },
    /*
     * */
    deleteItem: function (record) {
        var me = this;
        if (record == null) {
            return;
        }
        Rsd.app.getService('deleteData').requestJson(record);
    },
    btn____search:function btn____search() {

        //友好做法时：在查询条件发发生改变时，设置分页 {pageIndex: 0}
        if(this.whereIsChange())
        {
            this.setPagingOpt({pageIndex:0});
        }

        this.load({});
    },
    /*
   * */
    getWhere:function getWhere(){

        var _c = [];
        var _default =  this.toolBar;
        for(var i in this.searchColumns) {
            var _item = this.searchColumns[i];
            var _ctrl = _default.getItemByName(_item.name);
            var _value = _ctrl.getValue();
            if (_value == null || _value == '') {
                continue;
            }
            _value = _value.trim();
            if (_item.op == undefined || _item.op == null || _item.op == '' || _item.op == 'like') {
                _value = '%' + _value + '%';
            }
            if(_ctrl instanceof Rsd.control.CheckBox )
            {
                if(!_ctrl.isChecked())
                {
                    continue;
                }
            }


            var _dataIndex = _item.dataIndex || _item.name || _item.key;
            if (Rsd.isArray(_dataIndex))
            {
                for(var i in _dataIndex)
                {
                    if(Rsd.isEmpty(_dataIndex[i]))
                    {
                        continue;
                    }
                    _c.push({group:_item.group||_item.name||'defualt',name:_dataIndex[i],value:_value + '',op:_item.op || 'like',logic:(i==0)?'none':'or'});
                }
            }
            else
            {
                if (_item.op != undefined && (_item.op.toLowerCase() == 'isnull' || _item.op.toLowerCase()  == 'isnotnull' )) {

                    _c.push({name:_dataIndex,op:_item.op});
                }
                else
                {
                    _c.push({name:_dataIndex,value:_value + '',op:_item.op || 'like'});
                }


            }

        }
        return _c;
    },
    /*
    * */
    whereIsChange:function whereIsChange() {
        var _where = this.getWhere();
        if (Rsd.isEmpty(this.____lastWhere) && Rsd.isEmpty(_where)) {
            return false;
        }
        if (Rsd.isEmpty(this.____lastWhere) || !Rsd.isEmpty(_where)) {
            return true;
        }
        if (!Rsd.isEmpty(this.____lastWhere) || Rsd.isEmpty(_where)) {
            return true;
        }
        if (this.____lastWhere.length  != _where.length) {
            return true;
        }
        for(var i in _where)
        {

        }
        return true;
    }


},function (type) {

    var _modelTypeGetter = function () {

        if (Rsd.isEmpty(this.__modelType)) {
            this.__modelType = this.menu.modelType;
        }
        return this.__modelType;
    };
    var _modelTypeSetter = function (value) {

        this.__modelType = value;

    };
    this.defineProperty(type,"modelType", _modelTypeGetter, _modelTypeSetter,false);


    this.defineProperty(type,'sort',function(){return Rsd.isFunction(this.getSort)?this.getSort():(this.__sort||[]);},function(sort){
        this.__sort = sort;
    },true);

    this.defineProperty(type,'where',function(){return this.__where||[];},function(where){
        this.__where = where;
    },true);

    var _newButtonsGetter = function () {

        return this.__newButtons||[{xtype:'button', text: '刷 新' ,visible:true,height:45,margin: '0 5 15 10', width: 120, handler:'btn____search'}];
    };

    var _newButtonsSetter = function (value) {

        this.__newButtons = Rsd.arrayConcat([{xtype:'button', text: '刷 新' ,visible:true,height:45,margin: '0 5 15 10', width: 120, handler:'btn____search'}],value||[]);

    }

    this.defineProperty(type,"newButtons", _newButtonsGetter, _newButtonsSetter,true);


    var _searchColumnsGetter = function _searchColumnsGetter() {

        return this.__searchColumns;
    }

    var _searchColumnsSetter = function _searchColumnsSetter(value) {

        this.__searchColumns = value;
    }

    this.defineProperty(type,"searchColumns", _searchColumnsGetter, _searchColumnsSetter,true);
});