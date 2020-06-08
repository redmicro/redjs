/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:15
 * To change this template use File | Settings | File Templates.
 */
/*

 绘制过程：Tree.onAfterRender()=>Tree.build()=>TreeNode.expand()=>TreeNode.build()
 * */
Rsd.define('Rsd.control.Tree', {
    extend: 'Rsd.control.Component',
    requires: ['Rsd.control.TreeNode'],
    xtype: 'tree',
    cls: 'x-tree',
    ctrlTagName: 'div',
    icons: {
        root: Rsd.getRedjsUrl( 'resources/images/control/tree/base.gif'),
        folder: Rsd.getRedjsUrl('resources/images/control/tree/folder.gif'),
        folderOpen: Rsd.getRedjsUrl( 'resources/images/control/tree/folderopen.gif'),
        node: Rsd.getRedjsUrl('resources/images/control/tree/page.gif'),
        empty: Rsd.getRedjsUrl('resources/images/control/tree/empty.gif'),
        line: Rsd.getRedjsUrl('resources/images/control/tree/line.gif'),
        join: Rsd.getRedjsUrl('resources/images/control/tree/join.gif'),
        joinBottom: Rsd.getRedjsUrl( 'resources/images/control/tree/joinbottom.gif'),
        plus: Rsd.getRedjsUrl('resources/images/control/tree/plus.gif'),
        plusBottom: Rsd.getRedjsUrl('resources/images/control/tree/plusbottom.gif'),
        minus: Rsd.getRedjsUrl('resources/images/control/tree/minus.gif'),
        minusBottom: Rsd.getRedjsUrl('resources/images/control/tree/minusbottom.gif'),
        nlPlus: Rsd.getRedjsUrl('resources/images/control/tree/nolines_plus.gif'),
        nlMinus: Rsd.getRedjsUrl('resources/images/control/tree/nolines_minus.gif')
    },
    /*
     * @private
     * */
    //root: null,
    rootText:"根节点",
    border:true,
    nodes: [],
    hash: {},
    expandDeep: 5,
    showRoot: true,
    showLine: true,
    useSelection: true,
    nodeClick: null,
    nodeDblClick: null,
    label:{position: 'top', align: 'left',height: 40, cls: 'x-header',visible:true},
    //toolBar:null,
    /*
     * */
    constructor: function Tree(config) {
        config = config || {};
        this.apply(config);

    },
    /*
    * */
    initComponentEx: function initComponentEx() {

        this.callParent();
        this.ctrl.style.overflow = 'auto';
        this.ctrl.style.position = 'absolute';
    },
    /*
     **/
    onAfterInit:function onAfterInit()
    {
        var me = this;
        setTimeout( function () {
            for (var i in me.icons)
            {
                Rsd.loadImage(me.icons[i]);
            }
        },10);



        this.callParent();

        if(this.toolBar )
        {
            if(!Rsd.isCreated(this.toolBar))
            {
                this.toolBar = Rsd.widget( this.toolBar.xtype, this.toolBar);
                this.toolBar.parent = this;
            }
            this.label.content = this.toolBar;
        }

    },
    /*
     * */
    onAfterRender:function onAfterRender()
    {
        this.callParent();

        this.build(true);
    },

    /*
    * */
    setRootText:function setRootText(text) {

        this.rootText = text;
        if (this.root) {
            this.root.setText(text);
        }

    },


    /*
     * */
    contain: function (id) {
        return id != null
            && id != undefined
            && this.hash[id] != null
            && this.hash[id] != undefined;
    },
    /*
     Open all nodes
     * */
    expandAll: function () {

        this.root.expandAll();
    },
    /*
     Close all nodes
     * */
    collapseAll: function () {
        this.root.collapseAll();
    },

    /*
     select node
     * */
    selectNode: function (id) {
        if (!this.useSelection)
            return;

        var node = this.hash[id];
        if (node != null) {
            node.select();
        }
    },
    /*
     *
     * */
    findNode: function (id) {
        return  this.hash[id];
    },
    /**/
    getSelectedNodes: function () {

    },
    /*
     * */
    getCheckedNodes: function () {

    },
    /**
    *@public
    * */
    removeAll:function removeAll() {

        this.ctrl.innerHTML=null;
        this.nodes = [];
        this.hash = {};
        this.root = null;
        this.build();
    },
    /**
     * @private
     * @description 以根节点开始 构建书结构,动态加载时 只构建根节点。
     * */
    build: function build() {

        var _root = this.root;
        if (_root != null ) {
            _root.build();

        }
        var _t_deep = parseInt(this.expandDeep);

        function iterator(node) {

            if (node.deep < _t_deep) {
                if(node.isAutoExpand())
                {
                    node.expand();

                    if (node.nodes) {
                        for (var i in node.nodes) {
                            iterator(node.nodes[i])
                        }
                    }
                }
            }

        }

        if (0 < _t_deep) {
            iterator(_root);
        }
    },
    /**
     * @public
     * @description 动态添加节点
     * @param treeNode {object | TreeNode}
     * */
    addTreeNode: function addTreeNode(treeNode)
    {
        if(Rsd.isEmpty(treeNode))
        {
            return this;
        }

        if (treeNode.id != undefined
            && treeNode.id != null
            && this.contain(treeNode.id)) {
            return this;
        }

        var _config = treeNode;
        var node = null ;
        if(_config instanceof Rsd.control.TreeNode)
        {
            node = _config ;
        }
        else
        {
            node =  new Rsd.control.TreeNode(_config);
        }
        node.tree = this;
        node.icon =  node.icon|| this.icons.node;

        var _pid = _config.pid;
        var _parent = (Rsd.isEmpty(_pid) || !this.contain(_pid)) ?  this.root:this.hash[_pid] ;

        _parent.addNode(node);

        return this;
    },
    /**
     * @public
     * @description 动态添加节点
     * @param id,
     * @param pid,
     * @param text,
     * @param title,
     * @param icon,
     * @param tag
     * */
    addNode: function addNode(id, pid, text, title, icon, tag) {

        if(arguments.length == 0 && Rsd.isObject(arguments[0]))
        {
            throw new Error('use addTreeNode function add treeNode object.');
        }
        return this.addTreeNode({
            id: id,
            text: text,
            title: title,
            icon: icon || this.icons.node,
            pid:pid,
            tree: this,
            tag: tag
        });
    },

    /**
     * @public
     * @description 动态批量加载节点，清楚原有节点
     * @param nodes {arrary| [{id:'', pid:'', text:'', title:'', icon:'', tag:null}]}
     * */
    loadData:function loadData(nodes)
    {
        var _nodes = nodes||this.nodes||[];
        if(!Rsd.isArray(_nodes))
        {
            console.error(_nodes);
            throw new Error('nodes 参数不是数组。');
        }
        this.removeAll();

        for(var i in _nodes)
        {
            this.addTreeNode(_nodes[i]);
        }

    }

},function(type){

    this.defineProperty(type,'toolBar',function(){return this.__toolbar;},function(bar){
        this.__toolbar = bar;
    },false);

    /*
     * */
    var rootGetter =function rootGetter() {

        var _root = this.__root;
        if(!_root)
        {
            _root  = new Rsd.control.TreeNode({id: '__root_' + this.id,autoExpanded:true, dynamic:true,text: this.rootText, tree:this,nodes: this.nodes});
            this.__root = _root;
            this.hash[_root.id] = _root;
            _root.tree=this;
            _root.parent = this;
        }
        return this.__root;
    };

    this.defineProperty(type,'root',rootGetter,function(root){
        this.__root = root;
        if(root instanceof  Rsd.control.TreeNode)
        {
            this.hash[root.id] = root;
            root.tree=this;
            root.parent = this;
        }
    },false)

});