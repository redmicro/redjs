/**
 * Created by seeker910 on 2017/4/15.
 */
Rsd.define('Rsd.data.EnumItem', {
    extend:'Rsd.common.Object',
    xtype:'enum-item',
    text:'',
    code:'',
    value:'',
    color:'',
    /*
    * 图形标签：circle,
    * */
    prefix:'circle',
    
    constructor: function EnumItem (config) {
        config = config || {};
        this.apply(config);

        this.text = config.text||config.Text||'';
        this.value = (config.value==null||config.value== undefined)?(config.Value||''):config.value;
        this.color = config.color||config.Color||'';
        this.code = config.code||config.Code||'';

    },
    /*
    *
    * */
    makeControl:function makeControl(config) {
        var _config = config||{};
        var _ctrl = document.createElement('label');
        var me = this;
        _ctrl.appendChild(document.createTextNode(_config.text||_config.Text||me.text||me.Text));
        _ctrl.style.color = _config.color　||_config.Color||me.color||me.Color ;
        /*_ctrl.style.position = 'relative';*/
        _ctrl.style.width = '100%';
        _ctrl.style.height = '100%';
        _ctrl.title = _config.value||_config.Value||'';
        
        var _pre = null;
        if((_config.prefix || me.prefix) == 'circle')
        {
            _pre = Rsd.circle(8, _config.color||_config.Color||me.color||me.Color);
        }
        if(_pre != null)
        {
            return [_pre, Rsd.blankspan(1), _ctrl];
        }
        else
        {
            return [_ctrl];
        }

    }

});