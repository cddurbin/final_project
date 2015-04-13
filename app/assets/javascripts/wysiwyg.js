function iFrameOn () {
  $('#richTextField')[0].contentDocument.designMode = 'On';
};

// function editorControls (button, arg) {
//   console.log(button);
//   $('#richTextField')[0].document.execCommand(button, false, arg);
// };

function editorBold () {
  console.log('bold');
  $('#richTextField')[0].contentDocument.execCommand('bold', false, null);
};

function editorUnderline () {
  $('#richTextField').document.execCommand('underline', false, null);
};

function editorItalic () {
  $('#richTextField').document.execCommand('italic', false, null);
};

function editorTextSize () {
  var size = prompt('Enter a size 1-7', '');
  $('#richTextField').document.execCommand('fontSize', false, size);
}

function editorTextColor () {
  var color = prompt('Provide a color', '');
  $('#richTextField').document.execCommand('foreColor', false, color);
}

function editorLink () {
  var linkUrl = prompt('Enter a link', 'http://')
  $('#richTextField').document.execCommand('CreateLink', false, linkUrl);
}

function editorUnlink () {
  $('#richTextField').document.execCommand('Unlink', false, null);
}

function editorHorizontalRule () {
  $('#richTextField').document.execCommand('insertHorizontalRule', false, null);
}

function editorUnorderedList () {
  $('#richTextField').document.execCommand('InsertUnorderedList', false, 'newUL');
}

function editorOrderedList () {
  $('#richTextField').document.execCommand('InsertOrderedList', false, 'newOL');
}

function editorCode () {
  $('#richTextField').document.execCommand("insertHTML", false, "<pre><code class='editor-code'>"+ document.getSelection()+"</code></pre>");
}

function sumbitQuestion () {
  var textArea = $('#hidden-text-area').val()
  textArea = window.frames['richTextField'].document.body.innerHTML
  $('#new-question').submit();
}

$(document).ready(function() {
  iFrameOn();
  $('#bold').on('click', editorBold);
  // sumbitQuestion();
});