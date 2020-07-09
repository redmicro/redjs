/**
 * 
 */
Rsd.createApplication({
        appTitle:'南京红微信息科技有限公司',
        appFolder: '',
        appHost:'',
        isDebug:false,
        appVersion:'1.0.0.1',
        appDate:new Date().getTime(),//开发时使用
        //appDate:new Date('2018-08-07').getTime(),
        isDemo:false,
        imgHost:'http://image.dpxcn.com/',
        requires:[],
        beforeRun:function beforeRun() {

            Rsd.onResize(function () {
                Rsd.defineRem(Rsd.isMobile()?640:800);
            });
        },
        /**
         * 
         */
        launch: function launch() {

            var _title = Rsd.getUrlParam('title')||Rsd.app.appTitle;
            var _spm = Rsd.getUrlParam('spm')||'';
            var str = Rsd.getUrlParam('tpl')||'Home';
            str = str.toLowerCase();
            //首字母大写
            var _tpl = str.replace(/\b\w+\b/g, function(word){
                return word.substring(0,1).toUpperCase()+word.substring(1);
            });
            document.title = _title;
            var docEl = document.documentElement;
            var _w = (docEl.clientWidth-1280)/2;
            _w = _w<0?2:_w;
            var _m = [];
            _m.push(0);
            _m.push(_w);
            _m.push(0);
            _m.push(_w);

            var _theme = Rsd.getUrlParam('theme')||'gov';
            var _class = 'Rsd.template.'+_theme+'.web.T' + _tpl + 'Page';
            console.log(_class);
            Rsd.create(_class, { spm:_spm,margin:_m.join(' '),}).show();
        }
    }
);