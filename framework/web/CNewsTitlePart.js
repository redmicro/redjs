/**
 * Created by seeker910 on 2014/9/1.
 * 新闻标题
 */
Rsd.define('Rsd.web.CNewsTitlePart', {
    extend: 'Rsd.container.Component',
    requires: [
        'Rsd.control.Label',
        'Rsd.control.Link'
    ],
    xtype:'t-news-title',
    text:'',
    layout:'vbox',
    height:200,
    sizeUnit:'px',
    items:[
        {
            xtype:'label',
            flex:6,
            style:{
                fontSize:'30px',
                textAlign:'center'
            }
        },
        {
          flex:2,
          cls:'x-sub-title',
          layout:'hbox',
          items:[
              {
                  flex:1
              },
              {
                  xtype:'label',
                  width:400,
                  style:{
                      textAlign:'left'
                  },
                  text:'扬中市房屋专项维修资金管理中心门户网站'
              },
              {
                  xtype:'label',
                  width:300,
                  style:{
                      textAlign:'center'
                  },
                  text:'发布时间：2014-09-01'
              },
              {
                  xtype:'label',
                  width:150,
                  style:{
                      textAlign:'right'
                  },
                  text:'来源：宣传处'
              },
              {
                  flex:1
              }
          ]
        },
        {
            layout:'hbox',
            flex:2,
            cls:'x-sub-title',
            items:[
                { flex:1},
                {
                    width:200,
                    layout:{type:'hbox',align:'center'},
                    items:[
                        {  xtype:'label',flex:1,text:'【'},
                        {  xtype:'label',flex:2,text:'字体：'},
                        {
                            xtype:'label',flex:1,text:'大', useHoverStyle:true, margin:'0 5 0 5',
                            listeners:{
                                click:{
                                    element:'dom',
                                    fn:function(){
                                        this.parent.parent.parent.parent.body.style.fontSize = "120%";

                                    }
                                }
                            }
                        },
                        {
                            xtype:'label',flex:1,text:'中', useHoverStyle:true, margin:'0 5 0 5',
                            listeners:{
                                click:{
                                    element:'dom',
                                    fn:function(){
                                        this.parent.parent.parent.parent.body.style.fontSize = "100%";

                                    }
                                }
                            }
                        },
                        {
                            xtype:'label',flex:1,text:'小', useHoverStyle:true, margin:'0 5 0 5',
                            listeners:{
                                click:{
                                    element:'dom',
                                    fn:function(){
                                        this.parent.parent.parent.parent.body.style.fontSize = "80%";

                                    }
                                }
                            }
                        },
                        {  xtype:'label',flex:1,text:'】'}
                    ]

                },
                {
                    xtype:'label',
                    width:100,
                    useHoverStyle:true,
                    style:{
                        textAlign:'center'
                    },
                    text:'打印本页',
                    listeners:{
                        click:{element:'dom',fn:function(){
                            Rsd.print(this.parent.parent.parent.id);

                        }
                        }
                    }
                },
                {
                    xtype:'label',
                    width:100,
                    useHoverStyle:true,
                    style:{
                        textAlign:'center'
                    },
                    text:'分享'
                },
                {
                    flex:1
                }
            ]
        }


    ],
    /**
     * 
     * @param {*} config 
     */
    constructor: function constructor(config) {
        config = config || {};
        Rsd.apply(this, config);
        this.setText(this.text);
    },
    /*
    * */
    setText:function(text){
        this.text = text;
        if(this.isRendered()){
            this.items[0].setText(text);
        } else{
            this.items[0].text = this.text;
        }

    }

});