/*
 * redmicro all Copyright (c)
 */

/**
 * Created by seeker910 on 14-3-17.
 * 本地JSON数据对象
 */
Rsd.define('Rsd.data.Json', {
    extend:'Rsd.common.Object',
    xtype:'json',
    data:null,
    constructor: function Json (config) {
        config = config || {};
        this.apply(config);
    }
});
