/**
 * Created by seeker910 on 14-1-15.
 */
Rsd.define('Rsd.control.NumberIndex', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Label'
    ],
    xtype: 'number-index',
    height: 30,
    layout:'hbox',
    ctrlTagName: 'div',
    cls: 'x-number-index',
    /*
    *索引总数
    * */
    valueList:[],
    /*
   * 起始序号
   * */
    startIndex:0,
    /*
    * 要显示的索引最大个数
    * */
    size: 10,
    /*
    * 当前索引值
    * */
    value: 1,

    /*
    event
    * */
    selectedChanged:null,
    /*
    *
    * */
    selectedItem:null,
    /*
    *
    * */
    constructor: function NumberIndex(config) {
        config = config || {};
        this.apply(config);
    },
    /*
     * */
    onAfterRender: function onAfterRender() {
        this.callParent();
        this.bind();
    },
    /*
    * */
    bind:function bind(start)
    {
        var v = 0;
        var _item = null;
        this.removeAll();

        this.startIndex = start||0;
        if(Rsd.isArray(this.valueList))
        {
            for (var i = this.startIndex; i < this.size && i < this.valueList.length; i++) {

                v = this.valueList[i];
                _item = {
                    xtype:'label',
                    text:v,
                    flex:25,
                    cls:'x-number',
                    margin:'0 0 0 0',
                    style:{lineHeight:'26px'},
                    value:v,
                    label:{visible:false},
                    handler:'onSelected'
                };
                if(this.value==v)
                {
                    _item['ctrlCls']='x-itemselected';
                }
                //debugger;
                _item = this.add( _item );
                if(this.value==v)
                {
                    this.selectedItem = _item;
                }
            }
        }
        this.width = this.items.length * 25;
        this.doLayout();
    },

    /*
    *
    * */
    onSelected:function onSelected(sender,event)
    {
        if(this.selectedItem == null || sender.value != this.value)
        {
            if(this.selectedItem)
            {
                this.selectedItem.removeCls('ctrl','x-itemselected');
            }

            this.selectedItem = sender;
            this.selectedItem.addCls('ctrl','x-itemselected');
            this.value = sender.value;
            this.funApplyByIOC(this.selectedChanged,[this.value]);
            if((this.value%this.size) > (this.size/2))
            {
                this.bind(this.value/this.size * this.size);
            }

        }
    }
});