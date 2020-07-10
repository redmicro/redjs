/**
 * Created by seeker910 on 2014/8/20.
 */
Rsd.define('Rsd.control.Link', {
    extend: 'Rsd.control.Component',
    xtype: 'link',
    margin:'0 0 0 0',
    text: '',
    cls:'x-link',
    domTagName:'a',
    ctrlTagName: 'span',
    height:30,
    href:'javascript:void(0)',//http://www.baidu.com
    format:null,
    /*
    * */
    constructor: function Link(config) {
        config = config || {};
        this.apply(config);

    } ,
    /**
     * 
     */
    onAfterInit: function onAfterInit() {

        if (this.text) {
            this.ctrl.appendChild(document.createTextNode(this.text));
        }
        if(this.href)
        {
            this.setHref(this.href);
        }
        this.callParent();
    },
    /**
     * 
     */
    onAfterLayout:function onAfterLayout()
    {
        if(Rsd.isNumber(this.height))
        {
            this.ctrl.style.lineHeight = this.height+ 'px';
            this.label.element.style.lineHeight = this.height+ 'px';
        }
        this.callParent();
    },
    //
    setHref:function setHref(href)
    {
        this.href = href;
        this.setElAttribute(this.dom,'href',this.href);

    },
    /*
     * */
    getText: function () {
        return  this.text;
    },
    /*
     * */
    setText: function (text) {
        var me = this;
        me.text = text || '';
        if (me.ctrl) {
            me.ctrl.innerHTML = '';
            //while(me.ctrl.childNodes.length > 0)
            //{
            //    me.ctrl.remove(me.ctrl.childNodes[0]);
            //}
            me.ctrl.appendChild(document.createTextNode(me.text));

        }
    }
});
