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
   * @description 设置控件dataSource后可以 使用this.callPanrent() 统一加载
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