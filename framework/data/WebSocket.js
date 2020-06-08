/**
 * Created by seeker910 on 2017/4/5.
 */
Rsd.define('Rsd.data.WebSocket', {
    extend: 'Rsd.common.Object',
    xtype: 'web-socket',
    wsUri:'',
    isConnected:false,
    messageHandler:'',
    "static":function __init()
    {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
    },
    /*
     * */
    constructor: function Ajax(config) {
        config = config || {};
        this.apply(config);
    },

    /*
    *
    * */
    onOpen: function onOpen(evt) {

        console.debug("CONNECTED");
    },
    /*
    * */
    onClose: function onClose(evt) {
        console.debug("DISCONNECTED");
    },

    /*
    * */
    onError: function onError(evt) {

        console.error(evt);
    },
    /*
    * */
    open:function open() {
        var me = this;
        var websocket = new WebSocket(me.wsUri);//创建时 即打开连接
        websocket.onopen = function (evt) {
            me.onOpen(evt);
            if(me._list)
            {
                for(var i in me._list)
                {
                    me.websocket.send(me._list[i]);
                }
                me._list = [];
            }
        };
        websocket.onclose = function (evt) {
            me.onClose(evt);
        };
        websocket.onmessage = function (evt) {

            var data= null;
            if(evt&&evt.data)
            {
                data = evt.data;
            }
            if(me.messageHandler)
            {
                me.funApplyByIOC(me.messageHandler,[Rsd.toJson(data)]);
            }else {
                console.log(data);
            }
        };
        websocket.onerror = function (evt) {
            me.onError(evt);
        };
        this.websocket = websocket;
    },
    /*
    * */
    send: function send(message) {

        var me = this;

        var _msg = message || ' ';

        if(Rsd.isObject(message))
        {
            _msg = ' ';
            for (var i in message)
            {
                if(message[i] != undefined)
                {
                    _msg += i + ' ' +  message[i] + ' ';
                }

            }

        }

        if(me.websocket.readyState == 1)
        {
            me.websocket.send(Rsd.toString(_msg));
            return;
        }
        if(me.websocket.readyState == 0)
        {
            this._list = this._list ||[];
            this._list.push(Rsd.toString(_msg));
            return;
        }
        if(me.websocket.readyState == 3 || me.websocket.readyState == 4)
        {
            Rsd.alert('连接已关闭或不可用。');
            return;
        }


    },
    /*
    * */
    close:function close() {
        this.websocket.close();
    }
});