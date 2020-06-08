/**
 * Created by seeker910 on 2014/8/24.
 */
Rsd.define('Rsd.web.CTabPart', {
    extend: 'Rsd.container.TabPage',
    requires: [],
    layout:'fit',
    xtype:'t-tabPart',
    selectedColor:'brown',
    header:{height:35,style:{fontSize :'90%'}},
    border:false,
    muliti:true,
    closeBtn:false,
    selectIndex:0,
    sizeUnit:'px',
    pages:[],
    /*
     * */
    constructor: function constructor(config) {
        config = config || {};
        this.apply(config);

    },
    /**
     * */
    loadData:function loadData()
    {
        var me = this;
        for(var i in this.pages){

            var page = Rsd.create('Rsd.container.Page',this.pages[i]);
            me.add(page);
        }
    }
});
