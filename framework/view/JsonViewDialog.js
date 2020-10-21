/**
 * @description支持主从结构查看
 */
Rsd.define('Rsd.view.JsonViewDialog', {
    extend: 'Rsd.container.Dialog',
    requires: [
        'Rsd.controlEx.JsonViewer'
    ],
    layout: 'fit',
    title:'Json数据查看器',
    height:750,
    width:1000,
    items: [
        {
            xtype:'json-viewer',
            width:'100%',
            height:'100%'
        }
    ],

    /*
     * */
    constructor: function constructor(config) {

        config = config || {};
        this.apply(config);

    },

    /*
    * */
    load:function load(data)
    {
        this.items[0].loadData(data);

        return this;
    }


},function (type) {


});