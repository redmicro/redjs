/**
 * Created by seeker910 on 2014/8/20.
 *
 *将当前对象展示到document.body对象上，兼容移动端和PC端
 */
Rsd.define('Rsd.template.TWap', {
    extend: 'Rsd.template.Component',
    requires: [],
    xtype:'t-wap',
    margin:"0 0 0 0",
    designModel:false,
    width:'100%',
    spm:null,
    style:{overflow:'auto'},
    dataSource:null,
    sizeUnit:'rem',
    /*
    *
    * */
    constructor: function TWap(config) {
        config = config || {};
        this.apply(config);
    },

     /**
      * 将page 转化成html输出,静态化处理
      * @param {*} dataSource 
      */
    toH5Code:function toH5Code(dataSource) {
        alert('toH5Code暂未实现');
    },
    /**
     * 小程序页面转化
     * 
     */ 
    toWxAppCode:function toWxAppCode(dataSource) {
        alert('toWxAppCode暂未实现');
    }
});