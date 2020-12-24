/**
 * Created by dwj on 2020/12/24.
 */
Rsd.define('Rsd.data.Plugin', {
    extend: 'Rsd.common.Object',
    xtype:'plugin',
    text:'unnamed',
    icon:null, 
    name:'', 
    /*
    * 菜单
    * */
    menu:null, 
    /*
    *
    * */
    constructor: function Menu(config) {

        config = config || {};
        var _menus = config['menus'] || config['children'];
        delete config['menus'];
        delete config['children'];
        this.apply(config);
        
        this.menu = new Rsd.data.Menu(); 
        this.menu.loadData(_menus);
    },
     
     

},function(type)
{
    
});