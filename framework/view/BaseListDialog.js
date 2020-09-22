/**
 * Created by seeker910 on 2017/5/5.
 */
Rsd.define('Rsd.view.BaseListDialog', {
    extend: 'Rsd.container.Dialog',
    requires: [ 'Rsd.control.Grid'],
    xtype: 'base-list-dialog',
    width: 480,
    layout: 'vbox',
    readOnly:true,
    items:[
            {
                xtype:'grid',
                flex:1,
                margin: '0 1 0 0',
                rowdblclick: 'dblclick',
                footBar:null,
                toolBar:null
            },
            {
            height: 45,
            margin: '2 2 2 10',
            layout:'hbox',
            width:200,
            "style":{"float": 'right'},
            items: [
                {
                    xtype: 'button',
                    text: '保 存',
                    width:70,
                    minWidth: 65,
                    minHeight: 23,
                    margin: '2 2 2 5',
                    handler: 'save'
                },
                {width:20},
                {
                    xtype: 'button',
                    text: '取 消',
                    width:70,
                    minWidth: 65,
                    minHeight: 23,
                    margin: '2 2 2 5',
                    handler: 'cancel'
                }
            ]

        }

    ],
    saveHandler:null,
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
    /*
     *
     * */
    onBeforeInit:function onBeforeInit( ) {

        if(this.readOnly)
        {
             this.items.pop();
        }

        this.callParent();
    },
    /*
     args :api 接口需要的参数
     * */
    load:function load(args,callback) {
        //debugger;
        var me = this;
        Rsd.showWaiting(this.id, this.items[0]);
        var grid = me.items[0];
        grid.dataSource = me.dataStore;

        setTimeout(function () {
            grid.loadData(args, function () {

                Rsd.callFunction(me, callback, arguments);
                Rsd.closeWaiting(me.id);
            });
        }, 50);

        return this;
    },
    /*
    * */
    addRow:function addRow(row) {
        if(this.items[0] instanceof Rsd.control.Grid)
        {
            this.items[0].newRow(row||{});
        }
    },
    /*
    *
    * 刷新数据
    * */
    refresh:function refresh() {
        if(this.items[0] instanceof Rsd.control.Grid)
        {
            this.items[0].refresh();
        }

    },
    /*
     * @private
     * */
    buildGridColumns:function buildGridColumns() {
        var _cols = this.gridColumns||[];

        var _space = {
            name: 'space',
            text: '',
            xtype: 'template',
            width: 5,
            hideable: false,
            sortable: false
        };
        //连接后为新对象，不影响原对象
        _cols = _cols.concat(_space);

        var grid = this.items[0];
        if(grid instanceof Rsd.control.Grid)
        {
            grid.buildColumns(_cols);
        }
        else
        {
            grid.columns = _cols;
        }
    },
    /**
    * @description 获取表格的数据
     * */
    getListData:function getListData()
    {
        var grid = this.items[0];
        return grid.rows;
    },
    cancel:function cancel() {
        this.close();
    },
    save:function () {
        if(this.saveHandler)
        {
            var _grid =  this.items[0];
            var flag = this.funApplyByIOC(this.saveHandler,[_grid.rows]);
            if(flag)
            {
                this.close();
            }

        }
        else
        {
            Rsd.alert('saveHandler未实现。');
        }
    }

},function (type) {
    this.defineProperty(type,'sort',function(){return this.__sort||[];},function(sort){
        this.__sort = sort;
    },false);

    this.defineProperty(type,'where',function(){return this.__where||[];},function(where){
        this.__where = where;
    },false);

    var _columnsGetter = function () {
        if(this.__gridColumns == undefined)
        {
            this.__gridColumns = [];
        }
        return this.__gridColumns;
    };

    var _columnsSetter = function (value) {
        this.__gridColumns = value;

        this.buildGridColumns();
    }

    this.defineProperty(type,"gridColumns", _columnsGetter, _columnsSetter,true);


    var _toolBarGetter = function () {
        return this.items[0].toolBar;
    };

    var _toolBarSetter = function (value) {
        this.items[0].toolBar = value;
    }

    this.defineProperty(type,"toolBar", _toolBarGetter, _toolBarSetter,true);

    var _footBarGetter = function () {
        return this.items[0].footBar;
    };

    var _footBarSetter = function (value) {
        this.items[0].footBar = value;
    }

    this.defineProperty(type,"footBar", _footBarGetter, _footBarSetter,true);
});