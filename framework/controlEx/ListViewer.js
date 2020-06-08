/**
 * Created by seeker910 on 2017/6/29.
 */
Rsd.define('Rsd.controlEx.ListViewer', {
    extend: 'Rsd.control.ListView',
    requires: [
        'Rsd.control.Text',
        'Rsd.control.ComboBox',
        'Rsd.container.FieldSet'
    ],
    xtype:'list-viewer',
    /*
    */
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

        if(this.dataSource == null)
        {
            Rsd.log('ListViewControl.dataSource is null.');
            Rsd.callFunction(this,callback,null);
        }
        var me = this;
        //debugger;
        if(this.dataSource instanceof Rsd.data.Store) {

            var _args = Rsd.apply({}, args);

            this.dataSource.load(_args,function(data){
                if (data != null) {
                    Rsd.debug("Rsd.controlEx.ListViewer.loadData()");
                    if(!data.hasOwnProperty('success'))
                    {
                        throw new Error('返回数据格式不正确，未找到[success]属性。');
                    }
                    if (data.success) {
                        var _data = data.data;

                        me.indexStart = _data.pagesize * _data.pageindex  + 1;
                        me.addItems(_data.rows);

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

        if(this.dataSource instanceof Rsd.data.Service) {
            var _args = Rsd.apply({}, args);

            this.dataSource.requestJson(_args,function(data){
                if (data != null) {
                    Rsd.debug("Rsd.controlEx.ListViewer.loadData()");
                    if(!data.hasOwnProperty('success'))
                    {
                        throw new Error('返回数据格式不正确，未找到[success]属性。');
                    }
                    if (data.success) {
                        var _data = data.data;

                        me.indexStart = _data.pagesize * _data.pageindex  + 1;
                        me.addItems(_data.rows);

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
        if(this.dataSource instanceof Array)
        {
            //grid对象load方法
            this.load();
            Rsd.callFunction(me,callback,arguments);
            return;
        }
        Rsd.callFunction(me,callback,arguments);
        Rsd.error('ListViewControl属性dataSource不是有效值：' + this.dataSource );
    }
});