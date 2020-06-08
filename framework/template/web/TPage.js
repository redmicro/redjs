/**
 * Created by seeker910 on 2014/8/20.
 *
 *将当前对象展示到document.body对象上，兼容移动端和PC端
 */
Rsd.define('Rsd.template.web.TPage', {
    extend: 'Rsd.template.Component',
    requires: [],
    xtype:'t-page',
    margin:"0 0 0 0",
    designModel:false,
    width:'100%',
    spm:null,
    dataSource:null,
    /*
    *
    * */
    constructor: function TPage(config) {
        config = config || {};
        this.apply(config);
    },

    /*
    *
    * 将page 展示到document.body对象上
    * */
    show:function show()
    {

        var me = this;
        Rsd.onResize(this,this.doLayout);
        Rsd.empty(document.body);

        this.callParent('fadeIn',100);

        setTimeout(function () {

            if(me.load)
            {
                me.load();
            }
        },50);

        return this;
    },
    /**
    * @description 页面打开后自动执行 根据子控件的name属性自动递归加载数据
    * */
    load:function load() {

        var _data =  this.dataSource ||{};

        for(var i in this.items)
        {

            if(this.items[i].loadData)
            {
                var _key = this.items[i].name||'';
                if(Rsd.isEmpty(_key))
                {
                    this.items[i].loadData();
                }
                else {
                    this.items[i].loadData(_data[_key]);
                }
            }
        }
    }
});