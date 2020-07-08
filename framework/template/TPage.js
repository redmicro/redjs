/**
 * Created by seeker910 on 2014/8/20.
 *
 *将当前对象展示到document.body对象上，兼容移动端和PC端
 */
Rsd.define('Rsd.template.TPage', {
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
    /** 
     * 将page 转化成html输出,静态化处理
     * */ 
    toWebCode:function toWebCode(dataSource) {
        alert('toWebCode暂未实现');
    }
   
});