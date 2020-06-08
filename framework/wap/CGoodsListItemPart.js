/**
 * Created by seeker910 on 2017/6/30.
 */
Rsd.define('Rsd.wap.CGoodsListItemPart', {
    extend: 'Rsd.control.ListView',
    xtype: 'goods-list-item',
    margin:'2 0 2 0',
    labelTagName:'img',
    border:false,
    width:'100%',
    height:'100%',
    itemStype:{height:'3rem',lineHeight:'3rem'},
    label:{position:'left',width:90,height:60,visible:true},
    //height:85,
    cls:'x-goods-list-item',
    /*
     * */
    constructor: function GoodsListItem(config) {
        config = config || {};
        this.apply(config);
        this.label = this.gImage;
    },
    initComponentEx: function initComponentEx()
    {
        this.callParent();

    },
    afterLayout:function afterLayout() {

        var _ds = [];
        _ds.push({width:'100%',text:this.gName});

        var _adv = this.gAdv||[];
        _ds.push({width:'100%',text:_adv.join(' ')});


        var _price = document.createElement('nobr');
        _price.style.width = '100%';
        _price.style.fontSize = '120%';
        _price.style.lineHeight = '4rem';
        _price.style.color ='red';
        _price.appendChild(document.createTextNode(Rsd.formatCurrency(this.gPrice,'￥')));
        _ds.push(_price);

        this.loadData(_ds);
    }


});