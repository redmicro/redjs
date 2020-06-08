/**
 * Created by seeker910 on 2014/9/2.
 */
Rsd.define('Rsd.web.CHtmlPart', {
    extend: 'Rsd.template.Component',
    requires: ['Rsd.control.HtmlBox'],
    xtype:'t-html-content',
    htmlContent:'',
    layout:'fit',
    items:[
        {
       xtype:'html-box'
    }],
    /*
    *
    * */
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
    },
    afterRender:function()
    {
        this.items[0].setHtml(this.htmlContent);
    },
    setHtml:function(html)
    {
        this.htmlContent = html;
        if(this.isRendered()){
            this.items[0].setHtml(this.htmlContent);
        }
    }
});
