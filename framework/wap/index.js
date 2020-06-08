/**
 * 该空间下控件 可自动加载数据,用于手机html5页面开发
 * @namespace Rsd.wap
 *
 * @interface
 *
 *
 * @description 接口方法 页面打开后自动执行 根据子控件的name属性自动递归加载数据
 *
 * loadData:function loadData() {

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
    return this;
},
 */


