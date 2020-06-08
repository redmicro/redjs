
Rsd.define('Rsd.template.wap.THomeWap', {
    extend: 'Rsd.template.wap.TWap',
    requires: [  'Rsd.wap.CBannerPart','Rsd.wap.CSearchPart'],
    xtype:'t-home-wap',
    layout:'vbox',
    margin:"0 0 0 0",
    designModel:false,
    width:'100%',
    spm:null,
    items:[
        {
            xtype:'c-search',
            height:6,
            margin:'0 0 2 0',
            border:true
        },
        {
            xtype:'c-banner',
            border:true ,
            height:'25rem',
            name:'banner',
            dataSource:[
                {src:'./resources/images/banner1.jpg',formatString:'',text:'',url:'./release.html?c=ActivateHome'},
                {src:'./resources/images/banner2.png',text:'',url:'./release.html?c=ActivateHome'},
                {src:'./resources/images/banner3.jpg',text:'',url:'./release.html?c=ActivateHome'}
            ]
        },
    ],
    dataSource:null,

    /*
    *
    * */
    constructor: function TPage(config) {
        config = config || {};
        this.apply(config);
    }


});