Rsd.define('Rsd.template.biz.web.TRegisterPage', {
    extend: 'Rsd.template.TPage',
    requires: [
        'Rsd.control.ImageFile',
        'Rsd.web.CTopBarPart',
        'Rsd.web.CImageBarPart',
        'Rsd.web.CBottomPart',
        'Rsd.web.CSitePathPart',
        'Rsd.web.CListViewPart' ,
        'Rsd.control.Link',
        'Rsd.web.CNewsTitlePart',
        'Rsd.web.CHtmlPart'
    ],
    xtype:'t-register-page',
    layout:'vbox',
    height:'100%',
    sizeUnit:'px',
    header:{
        height:60,
        xtype: 'list-view', 
        cls:'x-navigation',
        style:{backgroundColor:'rgba(255, 24, 0, 0.62)',color:'#000'},
        config:{ 
            label:{xtype:'image',src:'../../resources/images/LOGO.PNG',position:'left',width:120,height:40},
            margin:'10 20 10 10',
            width:'100%', 
            height:60,
            itemStyle:{height:40,width:120,textAlign:'center',lineHeight:40,color:'white'},
            dataSource:[]
            
        }
    },
    items:[
        {
            xtype:'image-file',
            label:'营业执照',
            readOnly:false,
            border:0,
            width:180,
            height:120
        },
        {
            xtype:'input',
            label:'公司名称',
            height:40
        }
    ],
     /**
    * 
    * @param {*} config 
    */
   constructor: function constructor(config) {
       config = config || {};
       Rsd.apply(this, config);
   },
   /**
    * 
    */
   load:function load()
   {

   }
});