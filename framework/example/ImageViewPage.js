Rsd.define('Rsd.example.ImageViewPage', {
    extend: 'Rsd.container.Page',
    xtype:'p-image-view',
    requires: [
        'Rsd.controlEx.ImageViewer',
        'Rsd.control.Button'
    ],
    items:[
        {
            width:'100%', height:30
        },
        {
            xtype:'button',
            width:150,
            text:'Show ImageView',
            handler:function () {
                {
                    var _view = Rsd.create('Rsd.controlEx.ImageViewer',{width:'100%', height:300});

                    _view.showDialog().loadData([
                        'https://js.redmicro.cn/resources/images/LOGO.PNG',
                        'https://js.redmicro.cn/resources/images/redmicro/001.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/002.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/003.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/004.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/005.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/006.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/007.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/008.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/009.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/010.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/011.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/012.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/013.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/014.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/015.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/017.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/018.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/019.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/020.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/021.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/022.jpeg',
                        'https://js.redmicro.cn/resources/images/redmicro/023.jpeg'


                    ]);

                }
            }
        }

    ],
    /* */
    constructor: function RedjsPage(config) {
        config = config || {};
        this.apply(config);

    },
    load:function () {

    }



},function(type){


});