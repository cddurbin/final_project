//designMode on
function iFrameOn (iframe) {
  setTimeout(function() {
  $(iframe)[0].contentDocument.designMode = 'on';
  }, 1000);
}

//activate the basic editor controls whose value is null
function activateBasicControl () {
  var control = $(this).attr('name');
  var iframeId = $(this).parent().parent().children()[2].children[0].id;
  console.log(iframeId);
  $('#' + iframeId)[0].contentDocument.execCommand(control, false, null);
}

//activate advanced editor controls which need a value argument
function activateAdvancedControl () {
  var control = $(this).attr('name');
  var arg = $(this).attr('id');
  console.log(arg);
  var iframeId = $(this).parent().parent().children()[2].children[0].id;
  $('#' + iframeId)[0].contentDocument.execCommand(control, false, arg)
};

function editorBold () {
  $('#richTextField').document.execCommand('bold', false, null);
}

function editorUnderline () {
  $('#richTextField').document.execCommand('underline', false, null);
}

function editorItalic () {
  $('#richTextField').document.execCommand('italic', false, null);
}

function editorTextSize () {
  var size = prompt('Enter a size 1-7', '');
  $('.richTextField').document.execCommand('fontSize', false, size);
}

function editorTextColor () {
  var color = prompt('Provide a color', '');
  $('.richTextField').document.execCommand('foreColor', false, color);
}

function editorLink () {
  var linkUrl = prompt('Enter a link', 'http://');
  $('.richTextField').document.execCommand('CreateLink', false, linkUrl);
}

function editorUnorderedList () {
  $('.richTextField').document.execCommand('InsertUnorderedList', false, 'newUL');
}

function editorOrderedList () {
  $('.richTextField').document.execCommand('InsertOrderedList', false, 'newOL');
}

function editorCode () {
  var iframeId = $(this).parent().parent().children()[2].children[0].id;
  $('#' + iframeId)[0].contentDocument.execCommand("formatBlock", false, "PRE")
}

$(document).ready(function() {
  
  //Editor control click events
  $('.basic-control').on('click', activateBasicControl );

  $('.advanced-control').on('click', activateAdvancedControl );
    
    
    // activateAdvancedControl ('insertHTML', "<pre><code class='editor-code'>"+ $('.richTextField')[0].contentWindow.getSelection().anchorNode + "</code></pre>");
  

  $('#link').on('click', function () {
    activateAdvancedControl('CreateLink', false, (document.getSelection()));
  });
  

});