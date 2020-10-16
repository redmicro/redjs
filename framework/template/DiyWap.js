/**
 * Created by seeker910 on 2014/8/20.
 *
 *将当前对象展示到document.body对象上，兼容移动端和PC端
 */
Rsd.define('Rsd.template.DiyWap', {
    extend: 'Rsd.template.TWap',
    requires: [
        'Rsd.container.Form',
        'Rsd.control.Button',
        'Rsd.control.Text',
        'Rsd.control.ComboBox',
        'Rsd.control.Grid',
        'Rsd.control.Image',
        'Rsd.control.ListView',
        'Rsd.control.ListMenu',
        'Rsd.control.Tree',
        'Rsd.control.Svg'
    ],
    xtype:'diy-wap',
    margin:"0 0 0 0",
    designModel:false,
    width:'100%',
    spm:null,
    style:{overflow:'auto'},
    dataSource:null,
    sizeUnit:'rem',
    /**
    *
    * */
    constructor: function DiyWap(config) {
        config = config || {};
        this.apply(config);
    },
    /**
     * 
     * @param {*} data 
     */
    load:function load(data)
    { 
        var page = data||this.data||{};
        
        this.callParent(page); 
        var items = page.items||[];
        var list = [];
        for(var i in items)
        {   
            var ctrl = Rsd.widget(items[i]);
            ctrl.renderTo(document.body);
            list.push(ctrl); 
        }
        var fn = function(index)
        {  
            var ctrl = this;
            setTimeout(function(){
                   
                ctrl.doLayout();
                ctrl.animate(30);

            },50*index); 

        }
        for(var i in list)
        { 
               fn.call(list[i],i); 
        }

         
        
    }
});