/**
 * Created by seeker910 on 2014/8/19.
 *
 */
Rsd.define('Rsd.template.Component', {
    extend: 'Rsd.container.Component',
    requires: [],
    xtype: 'template',
    header:{cls:'x-t-header'},
    //sizeUnit:'rem',
    /*
    * */
    constructor: function template(config) {

        config = config || {};
        this.apply(config);
    },

    /*
    * 将page 转化成html输出,静态化处理
    * */
    toH5Code:function toH5Code(dataSource) {
        alert('toH5Code暂未实现');
    },
    /*
    * */
    toWxAppCode:function toWxAppCode(dataSource) {
        alert('toWxAppCode暂未实现');
    },
    /*
    * */
    toWebCode:function toWebCode(dataSource) {
        alert('toWebCode暂未实现');
    },
    /**
     * @description 页面打开后自动执行 根据子控件的name属性自动递归加载数据
     * */
    loadData:function loadData() {

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