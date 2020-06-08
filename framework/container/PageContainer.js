/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:18
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.container.PageContainer', {
    extend: 'Rsd.container.Component',
    xtype: 'pageContainer',
    layout: 'fit',
    cls:'x-page-container',
    bodyCls:'x-c-body',
    muliti: true,
    currentPage: null,
    pages: {},
    //items: [],
    constructor: function PageContainer(config) {
        config = config || {};
        this.apply(config);
    },
    /*
     * */
    contain: function contain(id) {
        var me = this;
        return me.pages.hasOwnProperty(id) && me.get(id) != null;
    },
    /*
     * */
    get: function get(id) {
        var me = this;
        return me.pages[id];
    },
    /*
     * */
    select: function select(id,speed) {

        var me = this;
        var _p = me.pages[id];
        if (_p == null)
        {
            console.error( new Error('page not found:' + id));
            return;
        }

        if(_p == me.currentPage)
        {
            return;
        }

        if (me.currentPage) {
            me.currentPage.hide();
        }
        _p.select(speed);
        me.currentPage = _p;

    },
    /*
     * */
    add: function add(page) {
        var me = this;

        if (me.muliti) {
            if(!me.contain(page.id))
            {
                me.callParent(page);
                me.pages[page.id] = page;

            }

        } else {

            if(me.pages.hasOwnProperty(page.id))
            {
                delete  me.pages[page.id];
            }

            if (me.currentPage) {
                me.remove(me.currentPage.id);
            }

            me.removeAll();

            me.callParent(page);

            me.pages[page.id] = page;

        }

        //page.hide();

       
    },
    /*
     * */
    remove: function remove(id) {
        var me = this;

        if (me.pages[id]) {
            me.pages[id].close();
            if(me.pages[id] == me.currentPage)
            {
                me.currentPage = null;
            }
            me.removeItem(me.pages[id]);
            delete me.pages[id];
        }
    }
});
