/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-11-9
 * Time: 上午1:38
 * To change this template use File | Settings | File Templates.
 *
 *
 * 封装bindrows方法为load
 * 扩展dataSource数据源功能，使其同时接受store对象和数组对象
 */
Rsd.define('Rsd.control.Grid', {
    extend: 'Rsd.control.Table',
    requires: [
        'Rsd.control.Link',
        'Rsd.control.Label',
        'Rsd.control.ComboBox',
        'Rsd.control.AutoComplete',
        'Rsd.data.Store',
        'Rsd.data.Service'
    ],
    xtype: 'grid',
    cls:'x-gird',
    /*
    * 数据源:JsonStore ，dataStore
    * */
    dataSource:null, 
    /*
     * */
    constructor: function Grid(config) {
        this.apply(config);
    },

    /*
     *
     * */
    loadData:function loadData(args,callback) {
        //debugger;
        if(Rsd.isArray(args))
        {
            this.dataSource = args;
        }
        if(this.dataSource == null)
        {
            Rsd.warn('Grid.dataSource is null.');
            Rsd.callFunction(this,callback,[{data:null}]);
            return this;
        }
       
        if(Rsd.isString(this.dataSource))
        {
            this.dataSource =  Rsd.widget(this.dataSource,{parent:this,listName:'rows'});
        }
        var me = this;

        //debugger;
        if(this.dataSource instanceof Rsd.data.Store) {

            var _args = Rsd.apply({}, args);

            this.dataSource.load(_args,function(data){
                if (data != null) {

                    Rsd.debug("Rsd.control.Grid.loadData()");

                    if(!data.hasOwnProperty('success'))
                    {
                        throw new Error('返回数据格式不正确，未找到[success]属性。');
                    }

                    if (data.success) {
                        var _data = data.data;
                        if(Rsd.isArray(_data))
                        {
                            me.buildRows(_data,1);
                        }
                        else
                        {
                            var indexStart = _data.pagesize * _data.pageindex  + 1;
                            me.buildRows(_data[me.dataSource.listName||'rows'],indexStart);
                        }

                    }

                }

                return Rsd.callFunction(me,callback,arguments);

            });

            return this;
        }

        if(this.dataSource instanceof Rsd.data.Service) {

            var _args = Rsd.apply({}, args);

            this.dataSource.requestJson(_args,function(data){
                if (data != null) {
                    Rsd.debug("Rsd.control.Grid.loadData()");
                    if(!data.hasOwnProperty('success'))
                    {
                        throw new Error('返回数据格式不正确，未找到[success]属性。');
                    }

                    if (data.success) {
                        var _data = data.data;
                        if(Rsd.isArray(_data)){
                            me.buildRows(_data,1);
                        }
                        else {
                            var indexStart = _data.pagesize * _data.pageindex + 1;
                            me.buildRows(_data[me.dataSource.listName||'rows'],indexStart);
                        }

                    }

                }
                return Rsd.callFunction(me,callback,arguments);

            });
            return this;
        }

        if(this.dataSource instanceof Array)
        {
            //grid对象loadData方法
            var _rows =  this.dataSource;

            this.buildRows(_rows,1);

            Rsd.callFunction(me,callback,[{success:true,data:_rows,msg:''}]);

            return this;
        }

        Rsd.callFunction(me,callback,[{success:true,data:this.dataSource,msg:''}]);

        Rsd.warn('Grid属性dataSource不是有效值(' + this.dataSource + ').');

        return this;
    }


},function(type){

});
