/**
 * Created by seeker910 on 2017/7/27.
 * 图片轮播组件  
 */
Rsd.define('Rsd.web.CSlideImagePart', {
    extend: 'Rsd.control.ImageList',
    xtype: 't-slide-image',
    requires: [],
    /*
    * [{src:'',formatString:'',text:''},{src:'',text:''}]
    * */
    dataSource:[],
    /**
     * 
     * @param {*} config 
     */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    },
     
    /**
     * 
     */
    handler:function onClick() {
        if(this.url)
        {
            window.open(this.url);
        }
    }
});