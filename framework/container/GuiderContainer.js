/**
 * Created by seeker910 on 2017/6/17.
 */
Rsd.define('Rsd.container.GuiderContainer', {
    extend: 'Rsd.container.Component',
    requires: ['Rsd.container.Guider'],
    xtype: 'guider-container',
    cls: 'x-guider-container',
    layout:'fit',
    bodyTagName: 'div',
    /*
     *
     * */
    constructor: function GuiderContainer(config) {

        config = config || {};
        this.apply(config);
    },
    /*
    * */
    onAfterInit:function onAfterInit() {
        this.callParent();
        for(var i in this.items)
        {
            if(this.items[i] instanceof Rsd.container.Guider)
            {

            }
            else
            {
                throw new Error('Items['+i+'] is not instanceof Rsd.container.Guider in Rsd.container.GuiderContainer');
            }
        }
    }
});