/**
 * Created by seeker910 on 2017/8/24.
 */
Rsd.define('Rsd.control.Calendar', {
    extend: 'Rsd.control.Component',
    xtype: 'calendar',
    /*
    * 日期值
    * */
    //date:null,
    ctrlTagName: 'div',
    cls: 'x-control-calendar',
    DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    text:'Date',
    dateVisible:true,
    monthVisible:true,
    /*
     *
     * */
    constructor: function Calendar(config) {
        config = config || {};
        this.apply(config);


    },
    /*
     * */
    initComponentEx: function initComponentEx() {
        var me = this;
        this.callParent();
        //月 区域
        this.__monthPicker = document.createElement('div');
        this.__monthPicker.className = 'x-month';
        this.ctrl.appendChild(this.__monthPicker);

        //左尖头
        this.__monthArrowL = document.createElement('div');
        //
        this.__monthArrowL.classList.add('x-arrow');
        this.__monthArrowL.classList.add('x-arrow-left');
        this.__monthArrowL.innerHTML = '<';
        this.__monthPicker.appendChild(this.__monthArrowL);
        this.__monthArrowL.onclick = function () {
            me.showPreviousMonth();
        }

        // 月份
        this.__monthTitle = document.createElement('div');
        this.__monthTitle.className = 'x-month-title';
        this.__monthPicker.appendChild(this.__monthTitle);
        //右尖头
        this.__monthArrowR = document.createElement('div');
        this.__monthArrowR.classList.add('x-arrow');
        this.__monthArrowR.classList.add('x-arrow-right');
        this.__monthArrowR.innerHTML = '>';
        this.__monthPicker.appendChild(this.__monthArrowR);
        this.__monthArrowR.onclick = function()
        {
            me.showNextMonth();
        }

        if(this.monthVisible == false)
        {
            this.__monthPicker.style.display = 'none';
        }

        // 星期
        this.__dayHeaders = document.createElement('ul');
        this.__dayHeaders.className = 'x-day-week';
        this.ctrl.appendChild(this.__dayHeaders);

        //天 区域
        this.__days = document.createElement('ul');
        this.__days.className = 'x-days';
        this.ctrl.appendChild(this.__days);

        //底部文字
        this.__dateDisplay = document.createElement('div');
        this.__dateDisplay.className = 'x-date';
        if(this.dateVisible==false)
        {
            this.__dateDisplay.style.display = 'none';
            this.__days.style.bottom = '0px';
        }
        this.ctrl.appendChild(this.__dateDisplay);


    },
    /*
    * */
    onAfterInit:function onAfterInit () {
        this.callParent();
        var me = this;

        setTimeout(function () {
            me.draw();
        },10);
    },
    /*
     *
     * */
    showPreviousMonth: function () {
        this.setMounth(this.getMonth()-1);
        return this;
    },
    /*
     * */
    showNextMonth: function () {
        this.setMounth(this.getMonth()+1);
        return this;
    },

    /*
    * @private
    * */
    setMounth:function setMounth(month)
    {
        var _m = month - 1;
        var _y = this.getYear() ;

        this.___date = new Date(_y, _m, this.getDate());
        this.draw();
        return this;
    },


    /*
     * */
    draw: function draw() {

        this.__monthTitle.innerHTML = '';
        var _txt = "" + (this.nameOfMonth(this.getMonth()) + " " + (this.getYear()));
        this.__monthTitle.appendChild(document.createTextNode (_txt));

        this.drawWeek();
        this.drawDateDisplay();
        this.drawDays(this.buildDays());
        return this;
    },
    /*
    *
    * */
    drawWeek:function () {

        var day, _i, _len;
        this.__dayHeaders.innerHTML = '';
        for (_i = 0, _len = this.DAYS.length; _i < _len; _i++) {
            day = this.DAYS[_i];

            this.__dayHeaders.appendChild($("<li>" + day + "</li>")[0]);
        }
    },
    /*
     * day:{
     * date:1,
     * month:2,year:2017,
     * inRange:false,selected:true,disabled:false,
     * context: {xtype:'label'}|'战略会议,市委领导来访',
     * tag:null
     * }
     *
     * */
    buildDays:function buildDays() {

        var me = this;
        var date = new Date(this.getYear(), this.getMonth() - 1, 1);

        var _day = date.getDay();
        date = new Date(this.getYear(), this.getMonth() - 1, 1 - _day);


        var _days = [];
        for(var i = 1 ;i<43;i++)
        {
            var _d = {date:date.getDate(),month:date.getMonth()+1,year:date.getFullYear()};


            _d.tag=null;
            _d.inRange = false ;

            if(_d.month == this.getMonth())
            {

                _d.selected = (_d.date == this.getDate());
                _d.disabled = false;
            }
            else
            {
                _d.inRange = false;
                _d.selected = false;
                _d.disabled = true;
            }

            date.setDate(date.getDate() + 1);
            _days.push(_d);

        }
        me.funApplyByIOC(me.buildContent,[_days]);

        return _days;
    },

    /*
     *
     * */
    drawDays: function (days) {


        var me = this;
        this.__days.innerHTML = '';

        var j=1;
        for(var i in days)
        {

            var _d = days[i];
            var _cls = '';
            if(j%7 == 0)
            {
                _cls += ' x-day-last-in-row';
            }
            if(_d==null || Rsd.isEmpty(_d.date))
            {
                _cls += ' x-day-empty';
            }
            else
            {
                if(_d.disabled)
                {
                    _cls += ' x-day-disabled';
                }
                if(_d.selected)
                {
                    _cls += ' x-day-selected';
                }
                if(_d.inRange)
                {
                    _cls += ' x-day-in-range';
                }
                //if ((i + 1) == days.length || ((i + 1) < days.length && days[i+1].inRange==false))
                //{
                //    _cls += ' x-day-last-in-range';
                //}
            }

            j++;
            var _li = document.createElement('li');
            _li.className = _cls;
            _li.appendChild(document.createTextNode(_d.date ));
            _li.appendChild(document.createElement('br'));
            var _content = document.createElement('div');
            _content.style.width='100%';
            _content.style.height='100%';
            _content.style.position = 'relative';
            _li.appendChild(_content);
            _li.tag = _d;
            _li.title = _d.year + '-' + _d.month + '-' + _d.date;

            _li.ondblclick = function () {
                //模拟body点击关闭显示框
                document.body.click();
            };
            this.__days.appendChild(_li);

            if(Rsd.isString(_d.content))
            {
                _content.appendChild(document.createTextNode(_d.content));
            }
            if(Rsd.isArray(_d.content))
            {
                for(var i in _d.content)
                {
                    var _c = _d.content[i];
                    if(Rsd.isString(_c))
                    {
                        _content.appendChild(document.createTextNode(_c.content));
                    }
                    if(Rsd.isObject(_c))
                    {
                        _c.style = _c.style||{};
                        _c.style.position='relative';
                        var _ctrl = Rsd.widget(_c);
                        _ctrl.parent = me;
                        _ctrl.date = _d;
                        _ctrl.renderTo(_content);
                        _ctrl.doLayout();
                    }
                }
                continue;
            }
            if(Rsd.isObject(_d.content))
            {
                _d.content.style = _d.content.style|| {};
                _d.content.style.position='relative';
                var _ctrl = Rsd.widget(_d.content);
                _ctrl.parent = me;
                _ctrl.date = _d;
                _ctrl.renderTo(_content);
                _ctrl.doLayout();
            }
            if(!_d.content)
            {
                _content.style.display = "none";
            }
        }

        this.__days.onclick = function (evt) {

            evt.name = evt.name || "calendar";

            if(evt.target.tagName =='LI')
            {
                var date = evt.target.tag;
                if(date)
                {
                    me.setValue(new Date(date.year,date.month-1,date.date));

                    Rsd.callFunction(me,me.onchange,[me.date]);
                }

                return  me;
            }
            else
            {
                evt.isCancel = true;
            }
            return false;

        };

        this.__days.ondblclick = function (evt) {

            evt.name = evt.name || "calendar";

            if(evt.target.tagName =='LI')
            {
                var date = evt.target.tag;
                if(date)
                {
                    me.setValue(new Date(date.year,date.month-1,date.date));

                    Rsd.callFunction(me,me.onchange,[me.date]);
                }

                return  me;
            }
            else
            {

            }

            return false;
        };

        return this.__days;
    },
    /*
     *
     *  */
    drawDateDisplay: function () {
        this.__dateDisplay.innerHTML = '';

        return this.__dateDisplay.appendChild(document.createTextNode(this.text + ':' + this.date.format('yyyy-MM-dd')));
    },

    /*
     * 年
     *  */
    getYear: function () {
        return this.date.getFullYear();
    },

    /*
     * 月
     * */
    getMonth: function () {
        return this.date.getMonth() + 1;
    },
    /*
     * 日
     * */
    getDate: function () {
        return this.date.getDate();
    },
    /*
    * 星期
    * */
    getDay: function () {
        return this.date.getDay();
    },

    /*
     *
     * */
    nameOfWeek: function (day) {
        return this.DAYS[day];
    },
    /*
     * */
    nameOfMonth: function (month) {
        return this.MONTHS[month - 1];
    },

    /*
    *
    * */
    getValue:function getValue() {
        return this.date;
    },
    /*
    *
    * */
    setValue:function setValue(value) {


        if(value instanceof  Date)
        {
            this.___date = new Date(value.getTime());
        }
        if(Rsd.isString(value))
        {
            this.___date  = new Date(value);
        }
        if( this.date instanceof Date)
        {
            this.draw();
        }

    }

},function (type) {
    {
        var _dateGetter = function () {
            if(!this.hasOwnProperty('___date'))
            {
                this.date = new Date();
            }
            return this.___date;
        };
        var _dateSetter = function (value) {
            this.___date = value;

        }

        this.defineProperty(type,"date", _dateGetter, _dateSetter,false);
    }
});