/**
 * Created by seeker910 on 2017/7/27.
 */
Rsd.define('Rsd.wap.CBannerPart', {
    extend: 'Rsd.control.ImageList',
    xtype: 'c-banner',
    requires: [],
    /**
    * @description 图片切换的时间间隔，默认5000毫秒
    * */
    interval:5000,
    /*
    * [{title:'logo',text:'this is a picture',src:'http://image.website.com/imagefile',link:'http://www.website.com/target'}]
    * */
    dataSource:[],
    /**
     * 
     * @param {*} config 
     */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);
    } 
});
