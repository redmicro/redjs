/**
 * Created by seeker910 on 2017/6/29.
 * 
 * dataSource 可绑定动态数据源和静态数据源 Rsd.data.Store ,Rsd.data.Service ， Array
 */
Rsd.define('Rsd.control.ListView', {
    extend: 'Rsd.control.List',
    requires: [
        'Rsd.data.Store',
        'Rsd.control.Text',
        'Rsd.control.ComboBox',
        'Rsd.container.FieldSet'
    ],
    xtype:'list-view',
    cls: 'x-list-view',
    /**   
     * */ 
    constructor: function ListViewControl(config) {
        config = config || {};
        if(config.label && Rsd.isString(config.label))
        {
            config.label={content:config.label,position:'top',align:'center',height:40};
        }
        this.apply(config);

    },
    /**
     @public
     * */
    loadData:function loadData(args,callback) {

        this.dataSource = args||this.dataSource;
        
        if(this.dataSource == null)
        {
            Rsd.log('dataSource value is null for Control ListView(id:' +this.id+ ').');
            Rsd.callFunction(this,callback,null);
            return;
        }
        var me = this;
        //debugger;
        //数据源 为Rsd.data.Store
        if(this.dataSource instanceof Rsd.data.Store) {

            var _args = Rsd.apply({}, args);

            this.dataSource.load(_args,function(data){
                if (data != null) {
                    Rsd.debug("Rsd.control.ListView.loadData()");
                    if(!data.hasOwnProperty('success'))
                    {
                        throw new Error('返回数据格式不正确，未找到[success]属性。');
                    }
                    if (data.success) {
                        var _data = data.data;

                        me.indexStart = _data.pagesize * _data.pageindex  + 1;
                        me.callParent(_data.rows);

                    }
                    else
                    {
                        Rsd.alert('加载数据出现错误 ', data.msg|| '未知错误');
                    }
                }
                Rsd.callFunction(me,callback,arguments);
            });
            return;
        }
        //数据源为 Rsd.data.Service
        if(this.dataSource instanceof Rsd.data.Service) {
            var _args = Rsd.apply({}, args);

            this.dataSource.requestJson(_args,function(data){
                if (data != null) {
                    Rsd.debug("Rsd.control.ListView.loadData()");
                    if(!data.hasOwnProperty('success'))
                    {
                        throw new Error('返回数据格式不正确，未找到[success]属性。');
                    }
                    if (data.success) {
                        var _data = data.data;

                        me.indexStart = _data.pagesize * _data.pageindex  + 1;
                        me.callParent(_data.rows);

                    }
                    else
                    {
                        Rsd.alert('加载数据出现错误 ', data.msg|| '未知错误');
                    }
                }
                Rsd.callFunction(me,callback,arguments);
            });
            return;
        }
        //数据源 为数组
        if(this.dataSource instanceof Array)
        {
            //grid对象load方法
            this.callParent(this.dataSource);
            Rsd.callFunction(me,callback,arguments);
            return;
        }

        Rsd.callFunction(me,callback,arguments);
        Rsd.error('ListView属性dataSource不是有效值：' + this.dataSource );
    }
});