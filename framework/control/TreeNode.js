/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-10-24
 * Time: 下午10:10
 * To change this template use File | Settings | File Templates.
 */
/*
 * */
Rsd.define('Rsd.control.TreeNode', {
    extend:'Rsd.common.Object',
    xtype: 'treeNode',
    id: '',
    text: '',
    title: '',
    icon: null,
    imgLine: null,
    imgIcon: null,
    value: null,
    /**
     * @description 自动展开,加载完成后自动展开子节点
     * */
    autoExpanded: false,
    builded: false,
    selected: false,
    tree: null,
    parent: null,
    deep: 0,
    /**
    * @description 动态添加子节点，动态添加子节点
    * */
    dynamic:false,
    //nodes: [],
    dom: null,
    childDom: null,
    tag: null,
    click: null,
    dblClick: null,
    __expand: 'block',
    __collapse: 'none',
    /*
    *
    * */
    constructor: function TreeNode(config) {
        config = config || {};
        config.xtype = config.xtype || 'treeNode';
        config.id = config.id || Rsd.getId(config.xtype);
        this.apply(config);

    },
    /*
    *
    * */
    removeAll:function removeAll() {

        while(this.childDom && this.childDom.hasChildNodes())
        {
           this.childDom.removeChild(this.childDom.childNodes[0]);
        }
        for(var i in this.nodes)
        {
            delete this.tree.nodes[this.nodes[i].id];
        }
        this.nodes = [];
    },
    /*
     * */
    addNode: function (node) {
        var me = this;

        var _node = node;
        if (_node instanceof Object) {

        } else {
            throw new Error('call method addNode arguments error.');
        }

        if (node instanceof Rsd.control.TreeNode) {

        } else {
            _node = new Rsd.control.TreeNode(_node);
        }
        _node.parent = me;
        _node.tree = me.tree;
        _node.deep = me.deep + 1;
        if(this.isExpanded())
        {
            _node.build();
        }

        me.nodes.push(_node);
        me.tree.hash[node.id] = _node;

        return this;
    },
    /*
     * */
    expand: function () {
        var me = this;
        if (me.childDom) {
            me.childDom.style.display = me.__expand;
            me.imgLine.src = me.tree.showLine ? (me.isLast() ? me.tree.icons.minusBottom : me.tree.icons.minus) : me.tree.icons.nlMinus;
            if (me.isRoot() == false) {
                me.imgIcon.src = me.tree.icons.folderOpen;
            }

        }

        for (var c in me.nodes) {
            me.nodes[c].build();
        }
    },
    /*
     * */
    expandAll: function () {
        var me = this;
        me.expand();
        for (var i in me.nodes) {
            me.nodes[i].expandAll();
        }
    },
    /*
     *
     * */
    collapse: function () {
        var me = this;
        if (me.childDom) {
            me.childDom.style.display = me.__collapse;
            me.imgLine.src = me.tree.showLine ? (me.isLast() ? me.tree.icons.plusBottom : me.tree.icons.plus) : me.tree.icons.nlPlus;
            if (me.isRoot() == false) {
                me.imgIcon.src = me.tree.icons.folder;
            }

        }
    },
    /*
     *
     * */
    collapseAll: function () {
        var me = this;
        me.collapse();
        for (var i in me.nodes) {
            me.nodes[i].collapseAll();
        }
    },
    /*
     *
     * */
    isExpanded: function () {
        var me = this;
        return me.childDom && me.childDom.style.display == me.__expand;
    },
    /*
     *
     * */
    isAutoExpand: function () {
        return this.autoExpanded
    },
    /*
     *
     * */
    isRoot: function () {
        return this.deep == 0;
    },
    /*
     *
     * */
    isLast: function ()  {

        return this.isRoot()
            || this.parent == null
            || this.parent.nodes[ this.parent.nodes.length - 1] == this;
    },

    /*
     *
     * */
    hasChild: function () {
        return (Rsd.isArray(this.nodes ) && this.nodes.length > 0) || this.dynamic;
    },

    /*
     * High lights the selected node
     *
     * */
    select: function () {
        var me = this;
        if (me.selected) {
            return;
        }

        me.dom.classList.add("x-selected");
        me.selected = true;
    },

    /*
    *
    * */
    hide:function hide() {
        this.dom.style.display = 'none';
        this.childDom.style.display = 'none';
    },

    /*
    *
    * */
    show:function show() {
        this.dom.style.display = 'block';
        this.childDom.style.display = 'block';
    },

    /*
    *
    *
    * */
    setText:function (text) {
        this.text = text;
        if (this.link) {
            this.link.innerHTML = text;
        }
    },
    /**
     *@description 在父节点展开时构建子节点
     * */
    build: function build () {
        //debugger;
        var me = this;

        if (me.tree == null) {
            return this;
        }

        var _id = '__' + me.id;

        var _dom = this.dom;
        if (_dom == undefined || _dom == null) {

            this.dom = _dom = document.createElement('li');
            _dom.id = _id;
            _dom.classList.add('x-treenode');
            _dom.classList.add('x-treenode-level-'+me.deep);
        }

        _dom.style.display = (me.deep > 0 || me.tree.showRoot) ? me.__expand : me.__collapse;


        var _d = me.deep;
        var _deepImgs = me.deepImgs = me.deepImgs || [];

        if (_d == undefined || _d == null) {
            _d = 0;
        }


        for (var i = 0; i < _d; i++) {

            var _img = null;
            if (me.builded) {
                 _img = _deepImgs[i];
            }
            else
            {

                _img = document.createElement('img');
                _img.alt = '';
                _dom.appendChild(_img);
                _deepImgs[i] = _img;

            }

            if(me.tree.showLine == false )
            {
                _img.src =  me.tree.icons.empty;
                continue;
            }
            if(me.parent.isRoot())
            {
                _img.src =  me.tree.icons.empty;
                continue;
            }
            if(me.parent.isLast())
            {
                _img.src =  me.tree.icons.empty;
                continue;
            }
            if( i < _d-1)
            {
                _img.src =  me.tree.icons.empty;
                continue;
            }
            else
            {
                _img.src = me.tree.icons.line;
                continue;
            }

            if(me.isLast() && me.parent.isLast())
            {
                _img.src =  me.tree.icons.joinBottom;
                continue;
            }

            _img.src = me.tree.icons.empty;

        }

        if (me.isLast()) {
            _deepImgs[_d] = me.tree.icons.line;
        }


        if (me.hasChild()) {

            var _a = me.header;
            if (_a == undefined || _a == null) {
                me.header = _a = document.createElement('a');
                _dom.appendChild(_a);
                _a.id = me.id;
                _a.alt = '';
                _a.href = '#';
                _a.onclick = function () {
                    if (me.isExpanded()) {
                        me.collapse();
                    } else {
                        me.expand();
                    }
                };
            }


            var _img = me.imgLine;

            if (_img == undefined || _img == null) {
                me.imgLine = _img = document.createElement('img');
                _img.id = _id + '__img';
                _img.alt = "";
                _a.appendChild(_img);
            }


            if (me.isExpanded()) {
                _img.src = me.tree.showLine ? (me.isLast() ? me.tree.icons.minusBottom : me.tree.icons.minus) : me.tree.icons.nlMinus;
            }
            else {
                _img.src = me.tree.showLine ? (me.isLast() ? me.tree.icons.plusBottom : me.tree.icons.plus) : me.tree.icons.nlPlus;
            }


        } else {

            var _img = me.imgLine;
            if (_img == undefined || _img == null) {

                me.imgLine = _img = document.createElement('img');
                _img.alt = '';
                _dom.appendChild(_img);
            }

            _img.src = (me.tree.showLine) ? ((me.isLast()) ? me.tree.icons.joinBottom : me.tree.icons.join ) : me.tree.icons.empty;

        }

        var _icon = me.icon || me.tree.icons.node;

        if (me.hasChild()) {
            _icon = me.isExpanded() ? me.tree.icons.folderOpen : me.tree.icons.folder;
        }
        if (me.isRoot()) {
            _icon = me.icon || me.tree.icons.root;
        }

        var _img = me.imgIcon;
        if (_img == undefined || _img == null) {

            me.imgIcon = _img = document.createElement('img');
            _img.alt = '';
            _dom.appendChild(_img);
        }
        _img.src = _icon;

        if (me.xtype == 'treeNode') {

            var _a = me.link;
            if (_a == undefined || _a == null) {

                me.link = _a = document.createElement('a');

                _a.alt = '';
                _a.title = me.title || '';
                _a.innerHTML = me.text;

                _a.href = '#';
                _a.id = me.id;
                _a.ondblclick = function (e) {
                    if (me.hasChild()) {
                        if (me.isExpanded()) {
                            me.collapse();
                        } else {
                            me.expand();
                        }
                    } else {
                        me.funApplyByIOC(me.dblClick || me.tree.nodeDblClick, [me, e]);
                        me.select();
                    }

                };
                _a.onclick = function (e) {
                    me.funApplyByIOC(me.click || me.tree.nodeClick, [me, e]);
                    me.select();
                };

                _dom.appendChild(_a);
            }
        }

        //
        if (me.xtype == 'checkbox') {
          console.warn('checkbox 暂未实现')
        }


        if (!me.builded) {

            if (me.isRoot()) {
                me.tree.ctrl.appendChild(_dom);
            }
            else {
                me.parent.childDom.appendChild(_dom);
            }
        }


        if (me.hasChild() && me.childDom == null) {

            var _cDom = document.createElement('div');
            _cDom.id = _id + '__child';
            _cDom.classList.add('x-child');
            _cDom.style.display = me.isExpanded() ? me.__expand : me.__collapse;

            me.childDom = _cDom;
            if (me.deep == 0) {
                me.tree.ctrl.appendChild(_cDom);
            }
            else {
                me.parent.childDom.appendChild(_cDom);
            }
        }


        if (me.isAutoExpand()) {
            me.expand();
        }

        me.builded = true;


    }

},function(type){

    this.defineProperty(type,'nodes',function(){
            if(!this.hasProperty('__nodes'))
            {
                this.__nodes=[];
            }
            return this.__nodes;

        },
        function(nodes){

            this.__nodes = [];
            for (var n in nodes) {
                this.addNode(nodes[n]);
            }


    },false);

});
