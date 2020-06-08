/*
 * */
String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    return this.substring(this.length - s.length) == s;
};

/*
 * */
String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    return this.substr(0, s.length) == s;
};

/*
 * */
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};

/*
 * */
String.prototype.format = function format(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}


/**
 * @description 删除左边的空格
 */
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, '');
}
/**
 * @description 删除右边的空格
 */
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, '');
}

/**
 * @description 值有效性判断
 * */
Date.prototype.isValid = function isValid() {
    return !(this == 'Invalid Date');
};

/**
 *
 * @description 格式：yyyy-MM-dd
 * */
Date.prototype.format = function format(fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };

    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/*
*
* */
Date.prototype.getWeek = function getWeek() {
    var result;
    var now = new Date();
    var day;
    switch (now.getDay()) {
        case 0:
            day = "日";
            break;
        case 1:
            day = "一";
            break;
        case 2:
            day = "二";
            break;
        case 3:
            day = "三";
            break;
        case 4:
            day = "四";
            break;
        case 5:
            day = "五";
            break;
        case 6:
            day = "六";
            break;
    }
    return '星期' + day;
};

var Rsd = {
    appType: 'wxapp'
};

/**
    * @public
    * */
Rsd.getType = function getType(obj) {
    return Object.prototype.toString.apply(obj);
};
/**
 * 对象合并
 */
Rsd.apply = function apply(obj, config) {
    var _obj = obj || {};
    var _config = config || {};
    for (var i in _config) {
        _obj[i] = _config[i];
    }
    return _obj;
};


/**
     *@public
     * */
Rsd.isEmpty = function isEmpty(obj) {


    if (obj == undefined || obj == null || obj == '') {
        return true;
    }
    if (obj instanceof Function) {
        return false;
    }
    if (obj instanceof Array) {
        return obj.length == 0
    }

    if (obj instanceof Date) {
        return false
    }
    
    if (obj instanceof Object) {

        return Object.keys ? Object.keys(obj).length == 0 : JSON.stringify(obj) == "{}";
    }

    return false;
};

/**
 * @public
 * */
Rsd.isNull = function isNull(obj) {
    return Rsd.getType(obj) == '[object Null]';

};

/**
 *@public
 *
 * */
Rsd.isNaN = function isNaN(obj) {
    return isNaN(obj);
};

/**
 * */
Rsd.isUndefined = function isUndefined(obj) {
    return Rsd.getType(obj) == '[object Undefined]';
};

/**
 * @public
 * */
Rsd.isNullOrUndefined = function isNullOrUndefined(obj) {
    return Rsd.isNull(obj) || Rsd.isUndefined(obj);
};

/**
 * @public
 * */
Rsd.isBoolean = function isBoolean(obj) {
    return Rsd.getType(obj) === Rsd.getType(true);
};

/**
 * @public
 * */
Rsd.isTrue = function isTrue(obj) {

    if (Rsd.isNullOrUndefined(obj)) {
        return false;
    }
    if (Rsd.isBoolean(obj)) {
        return obj;
    }
    if (Rsd.isString(obj)) {
        return obj.toLowerCase() == 'true';
    }


    return new Boolean(obj);
};

/**
 * @public
 * */
Rsd.isString = function isString(obj) {
    return Rsd.getType(obj) === Rsd.getType('');
};

/**
 * @public
 * @description 是否是数字
 * */
Rsd.isNumber = function isNumber(obj) {

    return !isNaN(Number(obj));
};

/**
 * @public
 * */
Rsd.isFunction = function isFunction(obj) {
    return obj instanceof Function;
};
/*
*
* */
Rsd.isArguments = function isArguments(obj) {
    return Rsd.getType(obj) == Rsd.getType(arguments);
};

/**
 * @public
 * @description 是否是原生态对象,Rsd.getType(obj) == Rsd.getType({})
 * */
Rsd.isObject = function isObject(obj) {
    return Rsd.getType(obj) == Rsd.getType({});
};

/**
 * @public
 * @description  判断对象是否是数组
 * @return boolean
 * */
Rsd.isArray = function isArray(obj) {

    return Rsd.getType(obj) == Rsd.getType([]);
};

/**
 * @public
 * @description obj instanceof  type
 * @param {object} obj 对象
 * @param {class} type 类型名称
 * @return boolean
 * */
Rsd.isType = function isType(obj, type) {
    if (Rsd.isString(type)) {
        return Rsd.getType(obj) == type;
    }
    return obj instanceof type || Rsd.getType(obj) == '[object ' + type.name + ']';
};


    /**
     * @public
     *  @description 货币格式化，不做四舍五入处理
     *  @param {number} num 金额
     *  @param {string} currency 货币符号 ￡(英镑) ￥(人民币,日元) €(欧元) ＄(美元)
     *  @return string
     * */
    Rsd.formatCurrency = function formatCurrency(num, currency) {
        if (num == undefined || num == null) {
            return "";
        }
        num = num.toFixed(2);
        //num = Rsd.toString(num);
        var str = (currency || '') + num.split('').reverse().join('').replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, '$1,').split('').reverse().join('');
        return str;
    };

    /**
     * @public
     * @description 金额小写转大写
     * */
    Rsd.formatCurrencyCN = function formatCurrencyCN(num) {
        var fraction = ['角', '分'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];
        var head = num < 0? '欠': '';
        num = Math.abs(num);

        var s = '';

        for (var i = 0; i < fraction.length; i++)
        {
            s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        num = Math.floor(num);

        for (var i = 0; i < unit[0].length && num > 0; i++)
        {
            var p = '';
            for (var j = 0; j < unit[1].length && num > 0; j++)
            {
                p = digit[num % 10] + unit[1][j] + p;
                num = Math.floor(num / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');

    };

    /**
     * @public
     * @description 时间转化
     * @param {Number|String} timestamp
     * @param {string} [format] 格式：yyyy-MM-dd|yyyy-MM-dd hh:mm:ss|yyyy-MM-dd hh:mm:ss S
     * */
    Rsd.formatTimestamp = function formatTimestamp(timestamp, format) {
        var _s = timestamp;
        if (Rsd.isString(_s)) {
            _s = Number(_s);
        }
        if (Rsd.isNumber(_s)) {
            return new Date(_s).format(format || 'yyyy-MM-dd hh:mm:ss');
        }
        return timestamp;
    };

    /**
     * @public
     * @description 数字格式化
     * @param {Number|String} value
     * @param {Number} precision
     * */
    Rsd.formatNumber = function formatNumber(value, precision) {
        var _n = Number(value);
        if (isNaN(_n)) {
            return 0;
        }
        return _n.toFixed(precision || 0);
    };

    /**
     * @public
     * @description 格式化json
     * @param {string|object} json
     * @param {Function|String|Number} [replacer]
     * @param {Number|String} [space]
     * */
    Rsd.formatJson = function formatJson(json, replacer, space) {
        return JSON.stringify(json, replacer || null, space || 4);
    };

