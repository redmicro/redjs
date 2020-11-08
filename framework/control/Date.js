/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-11-8
 * Time: 上午1:35
 * To change this template use File | Settings | File Templates.
 *
 * 输入值为 string型 表示时间的字符串
 * 返回 string型 表示时间的字符串
 */
Rsd.define('Rsd.control.Date', {
    extend: 'Rsd.control.Input',
    requires:['Rsd.control.Calendar'],
    xtype: 'date',
//    height: 30,
//    widht: 80,
    inputType:'date',
    /*
     yyyy-MM-dd  date - 选择日、月、年
     yyyy-MM month - 选择月、年
     yyyy-MM-dd week - 选择周、年
     HH:mm:ss time - 选择时间（时、分）
     yyyy-MM-dd  datetime - 选择时间、日期、月、年（UTC 时间）
     yyyy-MM-dd hh:mm:ss datetime-local -选择时间、日期、月、年（本地时间）
     yyyy-MM-dd hh:mm:ss:S
     */
    formatString:'yyyy-MM-dd',
    /*
     click:方法可被注入
    * */
    handler: function () {
        //console.log(this.getValue());
    },
    listeners:{
        'blur':{
            element:'ctrl',
            fn:function (sender,event) {
                return true;
            }
        },
        'focus':{
            element:'ctrl',
            fn:function (sender,event) {
                if(this.readOnly == false) {

                    var me = this;
                    event.isCancel = true;

                    if (this.___calendar) {

                        this.___calendar.setValue(this.value || new Date());

                        this.___calendar.showTip(this, 10, this.getHeight() + 15, 200, function () {
                            var _calendar = this;
                            //延时加入 队列 防止click 事件 关闭显示
                            Rsd.events.add(Rsd, 'click', this.id, function (e) {

                               if(e.target == me.ctrl)
                               {
                                   return false;
                               }

                                _calendar.hide(10,function () {
                                    Rsd.events.remove(Rsd,'click',me.id);
                                });

                            }, true);
                        });
                    }

                }
                return true;
            }
        },
        'keyup':{
            element:'ctrl',
            fn:function (sender,event) {

                if (event.code == 'Enter')
                {
                    var me = this;
                    this.___calendar.hide(500,function () {
                        Rsd.events.remove(Rsd,'click',me.id);
                    });

                }
                if (event.code == 'Escape')
                {
                    var me = this;
                    this.___calendar.hide(500),function () {
                        Rsd.events.remove(Rsd,'click',me.id);
                    };

                }
                if (event.code == 'ArrowUp')
                {

                }
                if (event.code == 'ArrowDown')
                {

                }

            }
        }
    },
    /*
    * 选择框面版样式
    * */
    panelStyle:{marginTop:45,marginLeft:100},
    /*
    * */
    constructor: function Date(config) {
        config = config || {};
        this.apply(config);

    },

    /*
    *
    * */
    onBeforeInit:function onBeforeInit()
    {
        this.callParent();
        this.formatString = this.formatString||'yyyy-MM-dd';
        this.inputType = 'text';
        this.placeholder = this.formatString;


    },
   onAfterInit:function onAfterInit() {

        this.callParent();
        var me = this;

       if (Rsd.isEmpty(this.___calendar)) {

           this.___calendar = Rsd.create('Rsd.container.Component', {
               layout:'fit',
               width: 350,
               height: 320,
               parent:me,
               style:me.panelStyle,
               listeners: {
                   'click': {
                       element: 'dom',
                       fn: function (sender, event) {
                           event.isCancel = true;
                       }
                   }
               },
               items:[
                   {
                       xtype:'calendar',
                       DAYS: ['日', '一', '二', '三', '四', '五', '六'],
                       MONTHS: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                       text: '日期',
                       onchange:function (date) {

                           me.setValue(date);

                       }

                   }
               ],
               setValue:function (value) {
                   me.___calendar.items[0].setValue(value);
               }

           });

       }

   },
    /*
    *
    * */
    setValue:function setValue(value)
    {
       var _value = value || null;
        if(Rsd.isString(_value)) {

           _value = new Date(_value);
        }
        this.__value = _value;
        if (this.ctrl) {

            this.ctrl.value = ( _value == undefined || _value==null )? '' :_value.format(this.formatString);
            var me = this;
            setTimeout(function () {
                me.___notShowPopupBox = true;

                if ("createEvent" in document) {
                    var evt = document.createEvent("HTMLEvents");
                    evt.initEvent("change", false, true);
                    me.ctrl.dispatchEvent(evt);
                }
                else
                {
                    me.ctrl.fireEvent("onchange");
                }

                me.___notShowPopupBox = false;
            },10);

        }
    },
    /**
    *
    * */
    getValue:function getValue() {

        if (this.ctrl && this.ctrl.value) {
            this.__value = new Date(this.ctrl.value.replace(/-/g,"/"));
        }
        if( this.__value == undefined || this.__value==null )
        {
            return '';
        }
        else
        {
            return this.__value.format(this.formatString);
        }

    },
    /**
     * 
     */
    checkValue:function checkValue() {

        //debugger;
        this.error = '';
        var _rs = this.callParent();
        //console.log(_rs);
        if (!_rs) {
            return false;
        }


        if (this.ctrl && this.ctrl.value) {
            this.value = new Date(this.ctrl.value.replace(/-/g, "/"));
        }

        if(Rsd.isString(this.value))
        {
            this.value = new Date(this.value.replace(/-/g, "/"));
        }
        if (this.value && this.value.isValid && !this.value.isValid()) {

            this.error = '【' + this.label.content + '】不是有效的时间值';
            return false;
        }

        if(this.value instanceof Date){
            this.ctrl.value = this.value.format(this.formatString);
        }
        return true;


    }

});

