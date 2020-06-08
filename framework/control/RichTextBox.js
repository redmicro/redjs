/*
 * redmicro all Copyright (c)
 */

/**
 * Created by seeker910 on 2014/8/13.
 */
Rsd.define('Rsd.control.RichTextBox', {
    extend: 'Rsd.control.Component',
    xtype: 'rich-text-box',
    height: 30,
    margin: '3 5 10 5',
    label:{position:'top',content:null,height:45},
    labelTagName:'div',
    ctrlTagName: 'textarea',
    uploadUrl:'',
    readOnly: false,
    /*
    * all,全内容
    * doc,文档编辑模式
    * form,可数据录入表单
    * web,网页编辑模式
    * */
    modelType:'all',
    /*
    * {name:'info',icon:'http://localhost/mission/redjs/resources/images/LOGO.PNG', text:'page information',handler:'btn_get_info'}
    * */
    exPlugins:[],
    saveHandler:null,
    instanceReadyHandler:null,
    "static":function __init(callback)
    {
        //https://cdn.ckeditor.com/
        var _pluginHost = Rsd.getRedjsHost() + 'plugin/ckeditor/';
        window.CKEDITOR_BASEPATH = _pluginHost;

        var _fn = function (data) {


            if(callback)
            {
                callback.call();
            }

            CKEDITOR.disableAutoInline = true;

            CKEDITOR.on('instanceLoaded', function (ev) {

                ev.editor.title = 'redmicro';
                if (CKEDITOR.lang && CKEDITOR.lang['zh-cn']) {
                    CKEDITOR.lang['zh-cn']['editor'] = 'redmicro';
                }

            });
            Rsd.loadScriptFile( window.CKEDITOR_BASEPATH + 'adapters/jquery.js');
        };

        if($empty(window.CKEDITOR)) {

            Rsd.loadScriptFile( window.CKEDITOR_BASEPATH + "ckeditor.js", _fn);

        }

    },
    constructor: function RichTextBox(config) {
        config = config || {};
        this.apply(config);
        var me = this;
        me.isReady =  true;

        CKEDITOR.once('instanceReady', function( ev ) {

            me.editor = ev.editor;
            ev.editor.title = 'redmicro';
            me.setReadOnly(me.readOnly);
            ev.editor.resize('100%', '100%',true);

            ev.editor.on('save', function (evt) {
                me.funApplyByIOC(me.saveHandler, [evt.editor.getData()]);
            });

            me.funApplyByIOC(me.instanceReadyHandler, [ev]);

        });

        me.on('afterrender',function(){

            var _exPlugin = [];
            for(var i in this.exPlugins)
            {
                var item = this.exPlugins[i];
                var _name = me.parent.xtype + '__' + item.name;
                _exPlugin.push(_name);
                this.addPlugin(_name,item.text,item.icon || './resources/images/LOGO.PNG',item.position || 'extra,'+i,item.handler);
            }

            me.initialCKEDITOR(_exPlugin);
        });


    },

    /*
    * */
    getDocConfig:function getDocConfig(exPlugin) {
        var me = this;
        return  {
            // Define the toolbar: http://docs.ckeditor.com/#!/guide/dev_toolbar
            // The full preset from CDN which we used as a base provides more features than we need.
            // Also by default it comes with a 3-line toolbar. Here we put all buttons in a single row.
            toolbar: [
                { name: 'document', items: [ 'Print'] },
                { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                { name: 'styles', items: [ 'Format', 'Font', 'FontSize' ] },
                { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting' ] },
                { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                { name: 'align', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
                { name: 'links', items: [ 'Link', 'Unlink' ] },
                { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
                { name: 'insert', items: [ 'Image', 'Table' ] },
                { name: 'tools', items: [ 'Maximize' ] },
                { name: 'editing', items: [ 'Scayt' ,'Save'] },
                { name: 'extra', items: exPlugin }
            ],

            // Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
            // One HTTP request less will result in a faster startup time.
            // For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
            customConfig: '',

            // Sometimes applications that convert HTML to PDF prefer setting image width through attributes instead of CSS styles.
            // For more information check:
            //  - About Advanced Content Filter: http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
            //  - About Disallowed Content: http://docs.ckeditor.com/#!/guide/dev_disallowed_content
            //  - About Allowed Content: http://docs.ckeditor.com/#!/guide/dev_allowed_content_rules
            disallowedContent: 'img{width,height,float}',
            extraAllowedContent: 'img[width,height,align]',

            // Enabling extra plugins, available in the full-all preset: http://ckeditor.com/presets-all
            extraPlugins: 'tableresize,uploadimage,uploadfile,' + exPlugin.toString(),
            //
            uploadUrl: me.uploadUrl,
            /*********************** File management support ***********************/
            // In order to turn on support for file uploads, CKEditor has to be configured to use some server side
            // solution with file upload/management capabilities, like for example CKFinder.
            // For more information see http://docs.ckeditor.com/#!/guide/dev_ckfinder_integration

            // Uncomment and correct these lines after you setup your local CKFinder instance.
            // filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
            // filebrowserUploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
            /*********************** File management support ***********************/

            // Make the editing area bigger than default.
            height: 800,

            // An array of stylesheets to style the WYSIWYG area.
            // Note: it is recommended to keep your own styles in a separate file in order to make future updates painless.
            contentsCss: [  Rsd.getRedjsUrl('./redjs/plugin/ckeditor/contents.css'),  Rsd.getRedjsUrl('./redjs/plugin/ckeditor/docstyles.css') ],

            // This is optional, but will let us define multiple different styles for multiple editors using the same CSS file.
            bodyClass: 'document-editor',

            // Reduce the list of block elements listed in the Format dropdown to the most commonly used.
            format_tags: 'p;h1;h2;h3;pre',

            // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
            removeDialogTabs: 'image:advanced;link:advanced',

            // Define the list of styles which should be available in the Styles dropdown list.
            // If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
            // (and on your website so that it rendered in the same way).
            // Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
            // that file, which means one HTTP request less (and a faster startup).
            // For more information see http://docs.ckeditor.com/#!/guide/dev_styles
            stylesSet: [
                /* Inline Styles */
                { name: 'Marker', element: 'span', attributes: { 'class': 'marker' } },
                { name: 'Cited Work', element: 'cite' },
                { name: 'Inline Quotation', element: 'q' },

                /* Object Styles */
                {
                    name: 'Special Container',
                    element: 'div',
                    styles: {
                        padding: '5px 10px',
                        background: '#eee',
                        border: '1px solid #ccc'
                    }
                },
                {
                    name: 'Compact table',
                    element: 'table',
                    attributes: {
                        cellpadding: '0',
                        cellspacing: '0',
                        border: '1px solid',
                        bordercolor: 'black'
                    },
                    styles: {
                        'border-collapse': 'collapse'
                    }
                },
                { name: 'Borderless Table', element: 'table', styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
                { name: 'Square Bulleted List', element: 'ul', styles: { 'list-style-type': 'square' } }
            ]
        };
    },
    /*
    * */
    getFormConfig:function getFormConfig(exPlugin) {
        var me = this;
      return  {
          // Define the toolbar: http://docs.ckeditor.com/#!/guide/dev_toolbar
          // The standard preset from CDN which we used as a base provides more features than we need.
          // Also by default it comes with a 2-line toolbar. Here we put all buttons in a single row.
          toolbar: [
              { name: 'document', items: [ 'Source' ] },
              { name: 'basicstyles', items: [ 'Bold', 'Italic' ] },
              { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
              { name: 'links', items: [ 'Link', 'Unlink' ] },
              { name: 'insert', items: [ 'CodeSnippet', 'Image', 'Mathjax' ] },
              { name: 'styles', items: [ 'Format', 'Styles' ] },
              { name: 'extra', items: exPlugin }
          ],

          // Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
          // One HTTP request less will result in a faster startup time.
          // For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
          customConfig: '',

          // Enabling extra plugins, available in the standard-all preset: http://ckeditor.com/presets-all
          extraPlugins: 'codesnippet,image2,mathjax,uploadimage,uploadfile,'+ exPlugin.toString(),
          uploadUrl:me.uploadUrl,
          // Remove the default image plugin because image2, which offers captions for images, was enabled above.
          removePlugins: 'image',

          // See http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-mathJaxLib
          mathJaxLib: 'https://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML',

          // See http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-codeSnippet_theme
          codeSnippet_theme: 'ir_black',

          /*********************** File management support ***********************/
          // In order to turn on support for file uploads, CKEditor has to be configured to use some server side
          // solution with file upload/management capabilities, like for example CKFinder.
          // For more information see http://docs.ckeditor.com/#!/guide/dev_ckfinder_integration

          // Uncomment and correct these lines after you setup your local CKFinder instance.
          // filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
          // filebrowserUploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
          /*********************** File management support ***********************/

          // Make the editing area bigger than default.
          height: 461,

          // An array of stylesheets to style the WYSIWYG area.
          // Note: it is recommended to keep your own styles in a separate file in order to make future updates painless.
          contentsCss: [ Rsd.getRedjsUrl('./redjs/plugin/ckeditor/contents.css'), Rsd.getRedjsUrl('./redjs/plugin/ckeditor/formstyles.css') ],

          // Reduce the list of block elements listed in the Format dropdown to the most commonly used.
          format_tags: 'p;h1;h2;h3;pre',

          // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
          removeDialogTabs: 'image:advanced;link:advanced;link:target',

          // Define the list of styles which should be available in the Styles dropdown list.
          // If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
          // (and on your website so that it rendered in the same way).
          // Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
          // that file, which means one HTTP request less (and a faster startup).
          // For more information see http://docs.ckeditor.com/#!/guide/dev_styles
          stylesSet: [
              /* Inline Styles */
              { name: 'Marker',			element: 'span', attributes: { 'class': 'marker' } },
              { name: 'Cited Work',		element: 'cite' },
              { name: 'Inline Quotation',	element: 'q' },

              /* Object Styles */
              {
                  name: 'Special Container',
                  element: 'div',
                  styles: {
                      padding: '5px 10px',
                      background: '#eee',
                      border: '1px solid #ccc'
                  }
              },
              {
                  name: 'Compact table',
                  element: 'table',
                  attributes: {
                      cellpadding: '5',
                      cellspacing: '0',
                      border: '1',
                      bordercolor: '#ccc'
                  },
                  styles: {
                      'border-collapse': 'collapse'
                  }
              },
              { name: 'Borderless Table',		element: 'table',	styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
              { name: 'Square Bulleted List',	element: 'ul',		styles: { 'list-style-type': 'square' } },

              /* Widget Styles */
              { name: 'Illustration', type: 'widget', widget: 'image', attributes: { 'class': 'image-illustration' } },
              { name: 'Featured snippet', type: 'widget', widget: 'codeSnippet', attributes: { 'class': 'code-featured' } },
              { name: 'Featured formula', type: 'widget', widget: 'mathjax', attributes: { 'class': 'math-featured' } }
          ]
      }
    },
    /*
    * */
    getWebConfig:function getWebConfig(exPlugin) {
        var me = this;
        return {
            // Define the toolbar: http://docs.ckeditor.com/#!/guide/dev_toolbar
            // The standard preset from CDN which we used as a base provides more features than we need.
            // Also by default it comes with a 2-line toolbar. Here we put all buttons in a single row.
            toolbar: [
                { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                { name: 'styles', items: [ 'Styles', 'Format' ] },
                { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
                { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
                { name: 'links', items: [ 'Link', 'Unlink' ] },
                { name: 'insert', items: [ 'Image', 'EmbedSemantic', 'Table' ] },
                { name: 'tools', items: [ 'Maximize' ] },
                { name: 'editing', items: [ 'Scayt' ] },
                { name: 'extra', items: exPlugin }
            ],

            // Since we define all configuration options here, let's instruct CKEditor to not load config.js which it does by default.
            // One HTTP request less will result in a faster startup time.
            // For more information check http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-customConfig
            customConfig: '',

            // Enabling extra plugins, available in the standard-all preset: http://ckeditor.com/presets-all
            extraPlugins: 'autoembed,embedsemantic,image2,uploadimage,uploadfile,'+ exPlugin.toString(),
            uploadUrl:me.uploadUrl,
            /*********************** File management support ***********************/
            // In order to turn on support for file uploads, CKEditor has to be configured to use some server side
            // solution with file upload/management capabilities, like for example CKFinder.
            // For more information see http://docs.ckeditor.com/#!/guide/dev_ckfinder_integration

            // Uncomment and correct these lines after you setup your local CKFinder instance.
            // filebrowserBrowseUrl: 'http://example.com/ckfinder/ckfinder.html',
            // filebrowserUploadUrl: 'http://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
            /*********************** File management support ***********************/

            // Remove the default image plugin because image2, which offers captions for images, was enabled above.
            removePlugins: 'image',

            // Make the editing area bigger than default.
            height: 461,

            // An array of stylesheets to style the WYSIWYG area.
            // Note: it is recommended to keep your own styles in a separate file in order to make future updates painless.
            contentsCss: [  Rsd.getRedjsUrl('./redjs/plugin/ckeditor/contents.css'),  Rsd.getRedjsUrl('./redjs/plugin/ckeditor/webstyles.css') ],

            // This is optional, but will let us define multiple different styles for multiple editors using the same CSS file.
            bodyClass: 'article-editor',

            // Reduce the list of block elements listed in the Format dropdown to the most commonly used.
            format_tags: 'p;h1;h2;h3;pre',

            // Simplify the Image and Link dialog windows. The "Advanced" tab is not needed in most cases.
            removeDialogTabs: 'image:advanced;link:advanced',

            // Define the list of styles which should be available in the Styles dropdown list.
            // If the "class" attribute is used to style an element, make sure to define the style for the class in "mystyles.css"
            // (and on your website so that it rendered in the same way).
            // Note: by default CKEditor looks for styles.js file. Defining stylesSet inline (as below) stops CKEditor from loading
            // that file, which means one HTTP request less (and a faster startup).
            // For more information see http://docs.ckeditor.com/#!/guide/dev_styles
            stylesSet: [
                /* Inline Styles */
                { name: 'Marker',			element: 'span', attributes: { 'class': 'marker' } },
                { name: 'Cited Work',		element: 'cite' },
                { name: 'Inline Quotation',	element: 'q' },

                /* Object Styles */
                {
                    name: 'Special Container',
                    element: 'div',
                    styles: {
                        padding: '5px 10px',
                        background: '#eee',
                        border: '1px solid #ccc'
                    }
                },
                {
                    name: 'Compact table',
                    element: 'table',
                    attributes: {
                        cellpadding: '5',
                        cellspacing: '0',
                        border: '1',
                        bordercolor: '#ccc'
                    },
                    styles: {
                        'border-collapse': 'collapse'
                    }
                },
                { name: 'Borderless Table',		element: 'table',	styles: { 'border-style': 'hidden', 'background-color': '#E6E6FA' } },
                { name: 'Square Bulleted List',	element: 'ul',		styles: { 'list-style-type': 'square' } },

                /* Widget Styles */
                // We use this one to style the brownie picture.
                { name: 'Illustration', type: 'widget', widget: 'image', attributes: { 'class': 'image-illustration' } },
                // Media embed
                { name: '240p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-240p' } },
                { name: '360p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-360p' } },
                { name: '480p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-480p' } },
                { name: '720p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-720p' } },
                { name: '1080p', type: 'widget', widget: 'embedSemantic', attributes: { 'class': 'embed-1080p' } }
            ]
        };
    },
    /*
    * */
    initialCKEDITOR:function(exPlugin)
    {
        var me = this;

        var _config={};
        if(this.modelType && this.modelType.toLocaleLowerCase() == 'doc')
        {
            _config = this.getDocConfig(exPlugin);
        }
        if(this.modelType && this.modelType.toLocaleLowerCase() == 'form')
        {
            _config = this.getFormConfig(exPlugin);
        }
        if(this.modelType && this.modelType.toLocaleLowerCase() == 'web')
        {
            _config = this.getWebConfig(exPlugin);
        }

        var _ctrlId = me.ctrl.id;
        $( '#' + _ctrlId ).ckeditor(_config);

    },
     /*
     设置为只读
     * */
    setReadOnly:function setReadOnly(readonly) {
        var editor = this.editor;
        if(editor)
        {
            editor.setReadOnly( readonly );
            this.readOnly =  readonly;
            if(readonly)
            {
                editor.commands.save.disable();
            }
            else
            {
                editor.commands.save.enable();
            }

        }

    },
    /*
    * */
    setMenuVisible:function setMenuVisible(visible) {


        if(visible)
        {

            $('#' + this.id).find('.cke_top').show();
        }
        else
        {
            $('#' + this.id).find('.cke_top').hide();
        }

    },

    /*
    * */
    setUIColor:function(c)
    {
        var editor = this.editor;
        if(editor)
        {
            editor.setUiColor(c);
        }

    },
    /*
    *
    * */
    getValue:function getValue() {
        var editor = this.editor;
        if(editor)
        {
            return this.getData();
        }
        return null;
    },
    /*
    * */
    setValue:function setValue(data) {
        var editor = this.editor;
        if(editor)
        {
            return editor.setData(data);
        }
    },
    /*
    * */
    remove:function remove() {
        this.callParent();
        if( this.editor)
        {
            this.editor.destroy();
        }

    },
    /*
    *
    * */
    addPlugin:function (name,text,icon,position,handler) {
        var me = this;
        var pluginName =  name;

        var _plugin = CKEDITOR.plugins.get(pluginName);
        if(_plugin)
        {
            //console.info( 'Plugin ' + name + ' is exist.');
            return;
        }
        var _cmd = {
            readOnly: 1,
            exec: function( editor ) {

                Rsd.callFunction(editor.parent,handler,arguments);
            }
        };

        // Register a plugin
        CKEDITOR.plugins.add(pluginName, {
            // jscs:disable maximumLineLength
            //lang: 'af,ar,az,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,oc,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
            // jscs:enable maximumLineLength
          // %REMOVE_LINE_CORE%
            hidpi: false, // %REMOVE_LINE_CORE%
            init: function( editor ) {

                //alert(pluginName + ' plugin is for replace mode only.');

                if ( editor.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE )
                    return;

                var command = editor.addCommand( pluginName, _cmd );

                command.modes = { wysiwyg: 1 };

                editor.ui.addButton && editor.ui.addButton( pluginName, {
                    label: text,
                    icon: icon,
                    command: pluginName,
                    toolbar: position
                } );
            }
        } );
    }

},function(type){

    var _editorGetter = function () {

        var _ctrlId = this.ctrl.id;
        var _instance = CKEDITOR.instances[_ctrlId];
        if(_instance && Rsd.isNullOrUndefined(_instance.parent))
        {
            _instance.parent = this;
        }

        return _instance || this.__editor;
    };
    var _editorSetter = function (editor) {
        this.__editor = editor;
       return ;
    };

    this.defineProperty(type,"editor", _editorGetter, _editorSetter,true);

});
