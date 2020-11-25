/**
 * Created by seeker910 on 2014/8/23.
 * 列表组件（header + list ）
 */
Rsd.define('Rsd.web.CListViewPart', {
    extend: 'Rsd.control.ListView',
    requires: [],
    xtype:'t-list-view',
    autoScroll:false,
    //itemStyle:{height:'60px',lineHeight:'60px'} ,
    label:{ cls:'x-t-header',position:'top',align:'center',height:40,space:1},
    dataSource:null,
    border:false,
    /*
    * */
    constructor: function CListViewPart(config) {

        config = config || {};
        this.apply(config);

    },
    /**
     * 
     */
    onAfterRender:function onAfterRender() {

        this.callParent();

        if(this.autoScroll){
            this.scroll();
        }
    }, 
    /**
     * 
     */
    scrollItem:function scrollItem(){
        var _list = Rsd.select('#'+ this.id + ' li');
        if(_list.length > 0)
        {
            $(function(){
                $(_list[0]).fadeOut('slow',function(){
                    $(this).clone().appendTo($(this).parent()).fadeIn('slow');
                    $(this).remove();

                });
            });
        }

    },
    /** 
     * */ 
    stop:function stop(){
        clearInterval(this.sn);
    },
    /** 
     * */ 
    scroll:function scroll(){
        var  me = this;
        if(me.sn)
        {
            clearInterval(me.sn);
        }
        var _fn = function()
         {
             me.scrollItem.call(me);
         }
         setTimeout(function(){
            me.sn = setInterval(_fn,2000);
         },200);
       
    }

});
