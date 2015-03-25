/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
  // Define changes to default configuration here.
  // For complete reference see:
  // http://docs.ckeditor.com/#!/api/CKEDITOR.config
  // config.toolbar_mini = [
  //     ["Bold",  "Italic",  "Underline",  "Strike",  "-",  "Subscript",  "Superscript"],
  //   ];
  // config.toolbar = "simple";

  // The toolbar groups arrangement, optimized for two toolbar rows.
  config.toolbarGroups = [
    // { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    { name: 'paragraph',   groups: [ 'list', 'blocks' ] },
    // { name: 'editing',     groups: [ 'spellchecker' ] },
    { name: 'links' },
    { name: 'insert', groups: [ 'spellchecker' ] }, 
    // { name: 'forms' },
    // { name: 'tools' },
    { name: 'document',    groups: [ 'mode', 'document', 'doctools', 'undo' ] },
    // { name: 'others' },
    // '/',
    
    // { name: 'styles' },
    // { name: 'colors' },
    // { name: 'about' }
  ];

  // Remove some buttons provided by the standard plugins, which are
  // not needed in the Standard(s) toolbar.
  config.removeButtons = 'Underline,Subscript,Superscript,Anchor,Table,CreateDiv, PageBreak';

  config.removePlugins = 'elementspath,save,font,find,selection,selectall, flash, image, maximize, showblocks, templates, smiley, iframe, newpage, preview, print, pastefromword';

  config.extraPlugins = 'codeTag';

}