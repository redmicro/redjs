/**
 * Created by seeker910 on 2014/8/18.
 *
 * TTCB top topic content bottom
 */
Rsd.define('Rsd.template.gov.web.THomePage', {
    extend: 'Rsd.template.TPage',
    requires: [
        'Rsd.web.CTopBarPart',
        'Rsd.web.CImageBarPart',
        'Rsd.web.CHNavigationPart', 
        'Rsd.web.CBottomPart',
        'Rsd.control.Text',
        'Rsd.web.CImageAndListPart',
        'Rsd.web.CListViewPart',
        'Rsd.web.CTabPart',
        'Rsd.web.CGridPart'
    ],
    xtype: 't-home-page',
    layout:'border',
    height:2800,
    sizeUnit:'px',
    items:[
        {
            xtype:'t-top-bar',
            region:'top',
            cls:'x-topBar'
        },
        {
            xtype:'t-image-bar',
            region:'top',
            imageUrl:'./resources/images/topic.png',
            searchService:'',
            cls:'x-topic'
        },
        {
            xtype:'t-h-navigation',
            region:'top'
        },
        {
            xtype:'t-image-news',
            region:'top',
            dataSource:[
                    {
                        width:'100%',
                        src:'http://www.gov.cn/site1/20140822/18037327d06b1560bb3002.jpg',
                        text:'习近平同蒙古国总统额勒贝格道尔吉共同签署联合宣言',
                        url:'http://www.baidu.com',
                        style:{lineHeight:'50px'}
                    },
                    {
                        width:'100%',
                        src:'http://www.gov.cn/site1/20140820/a41f72693f6e155ecfad01.jpg',
                        text:'李克强主持召开国务院常务会议',
                        style:{lineHeight:'50px'},
                        url:'http://www.sina.com'
                    },
                    {
                        width:'100%',
                        src:'http://www.gov.cn/site1/20140821/a41f72693f6e155feda001.jpg',
                        text:'水利部援藏20年投入300亿元 239万农牧民喝上放心水',
                        style:{lineHeight:'50px'},
                        url:'http://www.ifeng.com'
                    },
                    {
                        width:'100%',
                        src:'http://www.gov.cn/site1/20140822/a41f72693f6e15613efe01.jpg',
                        text:'李克强同国家杰出青年科学基金获得者代表座谈',
                        style:{lineHeight:'50px'},
                        url:'http://www.autohome.com'
                    },
                    {
                        width:'100%',
                        src:'http://www.gov.cn/site1/20140822/782bcb888b161560d95f01.jpg',
                        text:'和平使命—2014”：中外参演部队举行装备展览交流',
                        style:{lineHeight:'50px'},
                        url:'http://www.dpxcn.com'
                    }
                ]
        },
        {
            xtype:'template',
            region:'center',
            items:[
                 {
                    xtype:'t-list-view',
                    label:'公示公告',
                    margin:'40 0 0 0',
                    height:500,
                    sizeUnit:'px',
                    width:'30%',
                    autoScroll:true,
                    itemStyle:{overflow:'hidden',height:'45px',width:'100%'},
                    dataSource:[
                        {xtype:'link',width:'100%',text:'关于进一步做好日常收取的物业专项维修资金管理有关工作',href:'sec_gov.html?t=Detail&id=12345'},
                        {xtype:'link',width:'100%',text:'2013年度我市物业专项维修资金财务分析简报',href:'sec_gov.html?t=Detail&id=12345'},
                        {xtype:'link',width:'100%',text:'关于转发《〈深圳经济特区物业管理条例〉修订工作前期调研网络调查问卷》的启事',href:'sec_gov.html?t=Detail&id=12345'},
                        {xtype:'link',width:'100%',text:'关于公开征集《扬中市住房和建设局关于进一步做好日常维修资金管理有关工作',href:'sec_gov.html?t=Detail&id=12345'},
                        {xtype:'link',width:'100%',text:'关于录入物业服务企业联系人手机号码的通知',href:'sec_gov.html?t=Detail&id=12345'},
                        {xtype:'link',width:'100%',text:'2012年度物业专项维修资金归集、使用及增值情况',href:'sec_gov.html?t=Detail&id=12345'},
                        {xtype:'link',width:'100%',text:'关于开展物业维修工程造价预（结）算第三方审核服务的通知',href:'sec_gov.html?t=Detail&id=12345'},
                        {xtype:'link',width:'100%',text:'物业专项维修资金管理中心公开招考雇员公示公告',href:'sec_gov.html?t=Detail&id=12345'},
                        {xtype:'link',width:'100%',text:'深圳市物业专项维修资金专户银行招标公告',href:'sec_gov.html?t=Detail&id=12345'}
                    ]
                 },
                 {
                     xtype:'t-tabPart',
                     margin:'40 0 0 0',
                     height:500,
                     sizeUnit:'px',
                     width:'70%',
                     margin:'0 0 0 20', 
                     border:false,
                     sizeUnit:'px',
                     //title:'tab',
                     pages:[
                         {
                             tabTitle:'维修资金收取',
                             selected:true,
                             layout:'fit',
                             items:[
                                 {      //
                                     label:{visible:false},
                                     xtype: 't-grid',
                                     columns: [
                                         {text: '物业名称', name: 'col1'},
                                         {text: '收取类型', name: 'col2'},
                                         {text: '区 域', name: 'col3'},
                                         {text: '金 额', name: 'col4'},
                                         {text: '时 间', name: 'col5'}
                                     ],
                                     dataSource:
                                         [
                                             {
                                                 col1: '中熙香缤山花园',
                                                 col2: '首期归集',
                                                 col3: '宝安区',
                                                 col4: '9958126.19',
                                                 col5: '2014-08-26'
                                             },
                                             {
                                                 col1: '中熙香缤山花园幼儿园',
                                                 col2: '首期归集',
                                                 col3: '宝安区',
                                                 col4: '184733.97',
                                                 col5: '2014-08-26'
                                             },
                                             {
                                                 col1: '招商华侨城曦城（A012-0071）',
                                                 col2: '首期归集',
                                                 col3: '宝安区',
                                                 col4: '5031961.48',
                                                 col5: '2014-08-25'
                                             },
                                             {
                                                 col1: '翡翠海岸花园',
                                                 col2: '首期归集',
                                                 col3: '南山区',
                                                 col4: '6200873.77',
                                                 col5: '2014-08-22'
                                             },
                                             {
                                                 col1: '欧景花园',
                                                 col2: '首期归集(追缴)',
                                                 col3: '龙岗区',
                                                 col4: '1345448.03',
                                                 col5: '2014-08-20'
                                             },
                                             {
                                                 col1: '天元大厦',
                                                 col2: '日常收取',
                                                 col3: '罗湖区',
                                                 col4: '17871.34',
                                                 col5: '2014-08-19'
                                             },
                                             {
                                                 col1: '东湖大厦',
                                                 col2: '日常收取',
                                                 col3: '罗湖区',
                                                 col4: '51517.02',
                                                 col5: '2014-08-19'
                                             },
                                             {
                                                 col1: '新天地名居',
                                                 col2: '日常收取',
                                                 col3: '罗湖区',
                                                 col4: '422769.10',
                                                 col5: '2014-08-19'
                                             },
                                             {
                                                 col1: '东方华都大厦',
                                                 col2: '日常收取',
                                                 col3: '罗湖区',
                                                 col4: '29372.50',
                                                 col5: '2014-08-01'
                                             },
                                             {
                                                 col1: '嘉景苑',
                                                 col2: '日常收取',
                                                 col3: '罗湖区',
                                                 col4: '12875.00',
                                                 col5: '2014-08-19'
                                             },
                                             {}, {}, {}
                                         ]
                                 }
                             ]
                         },
                         {
                             tabTitle:'维修资金使用',
                             layout:'fit',
                             items:[
                                 {
                                     label:{visible:false},
                                     xtype: 't-grid',
                                     columns: [
                                         {text: '物业名称', name: 'col1'},
                                         {text: '使用类型', name: 'col2'},
                                         {text: '区 域', name: 'col3'},
                                         {text: '金 额', name: 'col4'},
                                         {text: '时 间', name: 'col5'}],
                                     dataSource: [
                                         {
                                             col1: '益田假日广场',
                                             col2: '专项维修使用',
                                             col3: '南山区',
                                             col4: '43200.00',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '红荔村(福利房)',
                                             col2: '专项维修使用',
                                             col3: '福田区',
                                             col4: '234413.38',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '百仕达花园四期',
                                             col2: '专项维修使用',
                                             col3: '罗湖区',
                                             col4: '62900.00',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '益田假日广场',
                                             col2: '专项维修使用',
                                             col3: '南山区',
                                             col4: '22400.00',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '招商名仕花园',
                                             col2: '备用金使用',
                                             col3: '南山区',
                                             col4: '30208.00',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '苹果园',
                                             col2: '专项维修使用',
                                             col3: '龙华区	',
                                             col4: '105354.78',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '益田假日广场',
                                             col2: '专项维修使用',
                                             col3: '南山区',
                                             col4: '76800.00',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '圣淘沙骏园',
                                             col2: '备用金使用',
                                             col3: '宝安区',
                                             col4: '90000.00',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '宏兴苑',
                                             col2: '专项维修使用',
                                             col3: '龙岗区',
                                             col4: '7719.80',
                                             col5: '2014-08-22'
                                         },
                                         {
                                             col1: '泊岸雅苑',
                                             col2: '专项维修使用',
                                             col3: '盐田区',
                                             col4: '1099.20',
                                             col5: '2014-08-22'
                                         },
                                         {}]
        
                                 }
                             ]
                         },
                         {
                             tabTitle:'业主投票',
                             layout:'fit',
                             items:[
                                 {
                                     label:{visible:false},
                                     xtype: 't-grid',
                                     columns: [
                                         {text: '物业名称', name: 'col1'},
                                         {text: '投票主题', name: 'col2'},
                                         {text: '区 域', name: 'col3'},
                                         {text: '投票时间', name: 'col4', width: 80}],
                                     dataSource: [
                                         {
                                             col1: '福田爱达花园小区',
                                             col2: '停车场扩建',
                                             col3: '福田区',
                                             col4: '2014.08.24 - 2014.08.25'
                                         },
                                         {col1: '中航凯特公寓', col2: '表决', col3: '罗湖区', col4: '2014.08.22 - 2014.09.24'},
                                         {
                                             col1: '中航凯特公寓',
                                             col2: '使用物业专项资金维修水泵',
                                             col3: '罗湖区',
                                             col4: '2014.08.22 - 2014.09.24'
                                         },
                                         {
                                             col1: '中航凯特公寓',
                                             col2: '使用物业专项资金维修电梯',
                                             col3: '罗湖区',
                                             col4: '2014.08.22 - 2014.09.24'
                                         },
                                         {
                                             col1: '愉园新苑',
                                             col2: '业主大会表决',
                                             col3: '龙岗区',
                                             col4: '2014.08.15 - 2014.08.27'
                                         },
                                         {
                                             col1: '愉园新苑',
                                             col2: '业主委员会选举',
                                             col3: '龙岗区',
                                             col4: '2014.08.15 - 2014.08.27'
                                         },
                                         {
                                             col1: '锦林新居1-10栋',
                                             col2: '锦林新居业主委员会选举',
                                             col3: '福田区',
                                             col4: '2014.08.15 - 2014.08.31'
                                         },
                                         {
                                             col1: '锦林新居',
                                             col2: '锦林新居业主委员会选举',
                                             col3: '福田区',
                                             col4: '2014.08.15 - 2014.08.31'
                                         },
                                         {
                                             col1: '锦林新居',
                                             col2: '锦林新居业主委员会选举',
                                             col3: '福田区',
                                             col4: '2014.08.15 - 2014.08.31'
                                         },
                                         {
                                             col1: '依山郡花园',
                                             col2: '依山郡花园业委会',
                                             col3: '龙岗区',
                                             col4: '2014.08.21 - 2014.09.08'
                                         },
                                         {}, {}, {}]
        
                                 }
                             ]
                         }
                     ]
                 },
                 {
                    xtype:'t-list-view',
                    title:'业主查询',
                    margin:'40 0 0 0',
                    height:500,
                    sizeUnit:'px',
                    margin:'0 10 0 0',
                    width:'50%',
                    border:true
                },
                {
                    xtype:'t-list-view',
                    title:'互动交流',
                    margin:'40 0 0 0',
                    height:500,
                    sizeUnit:'px',
                    margin:'0 0 0 10',
                    width:'50%',
                    border:true
                },
                {
                    xtype:'t-list-view',
                    title:'业务办理',
                    margin:'40 0 0 0',
                    height:500,
                    sizeUnit:'px',
                    width:'33%',
                    margin:'0 10 0 0',
                    border:false
                },
                {
                    xtype:'t-list-view',
                    label:'法律法规',
                    margin:'40 0 0 0',
                    height:500,
                    sizeUnit:'px',
                    width:'33%',
                    margin:'0 10 0 10',
                    itemStyle:{overflow:'hidden',height:'35px',lineHeight:'35px'},
                    dataSource:[
                        '关于在使用住宅专项维修资金的维修工程中引入监理和项目审价机制的通知（试行） 2014.03.18',
                        '住宅专项维修资金管理办法（建设部、财政部令[2007]165号） 2014.03.18',
                        '关于我市住宅专项维修资金工程计价定额有关规定的通知 2014.03.18',
                        '维修资金划拨、使用程序若干规定（试行） 2014.03.18',
                        '各类物业建筑安装工程总造价标准	2014.08.07',
                        '住房和建设局关于印发《深圳市物业管理电子投票规则（试行）》的通知	2014.08.07',
                        '物业专项维修资金管理规定	2014.08.07',
                        '关于日常收取的物业专项维修资金若干问题的通知	2014.08.07',
                        '中华人民共和国物权法	2014.08.07',
                        '物业管理条例	2014.08.07',
                        '住宅专项维修资金管理办法	2014.08.07',
                        '《江苏省物业管理条例》（2008年11月28日修订）	2014.08.07'
                    ]
                },
                {
                    xtype:'t-list-view',
                    label:'资料下载',
                    margin:'40 0 0 0',
                    height:500,
                    sizeUnit:'px',
                    width:'33%',
                    margin:'0 10 0 10',
                    itemStyle:{overflow:'hidden',height:'35px',lineHeight:'35px'},
                    dataSource:[
                        '《天津市商品住宅专项维修资金使用办法》附件      2014-03-11',
                        '天津市物业专项维修资金交存登记表               2013-11-11',
                        '物业项目共用部位、共用设施设备运行状况记录表    2013-05-23',
                        '房屋专项维修资金退款申请表及退款办理说明        2013-04-23',
                        '共用部位、共用设施设备运行状况记录表           2012-07-11',
                        '《原有住宅公共设施专项维修资金缴存单位登记表》  2010-10-08',
                        '《原有住宅公共设施专项维修资金缴存项目登记表》  2010-10-08',
                        '《原有住宅公共设施专项维修资金缴存项目明细表》  2010-10-08',
                        '《原有住宅公共设施专项维修资金缴存协议书》      2010-10-08'
                    ]
                }
            ]
        } ,
        {
            xtype:'t-bottom',
            region:'bottom',
            cls:'x-bottom',
            height:150,
            margin:'40 0 0 0'
        }
    ],
    /**
     * 
     * @param {*} config 
     */
    constructor: function constructor(config) {

        config = config || {};
        this.apply(config);
    },
    /**
     * 
     */
    load:function load()
    {
        this.items[5].loadData({companyName:'扬中市房屋专项维修资金管理中心',licenseNO:'苏ICP备1305877号'});
        this.callParent();
    }
});
