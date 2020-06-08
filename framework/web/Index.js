/**
 * 该空间下控件与wap一一对应，用于保证移动端和PC端兼容
 * 该空间下控件可自动加载数据 ，PC浏览器上使用的空间
 *
 * @namespace Rsd.web
 *
 *
 *  @interface
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
}

 * */