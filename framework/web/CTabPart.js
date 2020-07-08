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
        this.on('afterselected','page_loadData')
    },
  
    /**
     * 
     * @param {*} e 
     */
    page_loadData:function page_loadData(e)
    { 
        var page = e.page;
        var _data =  e.page.dataSource ||{};
          
        if(page.isLoaded)
        {
            return ;
        }

        for(var i in page.items)
        {  
            if(page.items[i].loadData)
            { 
                var _key = page.items[i].name||'';
                if(Rsd.isEmpty(_key))
                {
                    page.items[i].loadData();
                }
                else {
                    page.items[i].loadData(_data[_key]);
                }
            }
        }
        page.isLoaded = true;
    },
    /**
     * */
    loadData:function loadData()
    { 
        var me =this;
        for(var i in this.pages){

            var page = Rsd.create('Rsd.container.Page',this.pages[i]);
            this.add(page); 
            this.pages[i] = page;
            page.isLoaded = false;
        }
        setTimeout(function(){
            me.pages[0].isLoaded = false;
            me.page_loadData({page:me.pages[0]});
        },200);
        
    }
});
