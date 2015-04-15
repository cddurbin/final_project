//designMode 'on'
function iFrameOn () {
  setTimeout(function() {
    $('#richTextField')[0].contentDocument.designMode = 'on';
  }, 100);
};

//activate the basic editor controls whose value is null
function activateBasicControl () {
  var control = $(this).attr('name');
  $('#richTextField')[0].contentDocument.execCommand(control, false, null);
};

//activate advanced editor controls which need a value argument
function activateAdvancedControl (control, arg) {
  
  // $('#richTextField')[0].contentWindow.getSelection().anchorNode
  $('#richTextField')[0].contentDocument.execCommand(control, false, arg);
}



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
  console.log(textArea);
  var title = $('#title').val();
  var currentUserId = gon.current_user.id;
  var tagList = $('#tag-list').val();
  console.log(tagList);

  textArea = window.frames['richTextField'].document.body.innerHTML;
  request("POST", '/questions', {question:{content: textArea, title: title, user_id: currentUserId, tag_list: tagList }}).done(function(){
    console.log('submit');
  });
};

$(document).ready(function() {
  
  

  //initialize editor for editing
  $('.add-question').on('click', function (){
    iFrameOn();
  });
  
  //Editor control click events
  $('.basic').on('click', activateBasicControl );
  $('.submit-question').on('click', sumbitQuestion);
  $('#code').on('click', function() {
    activateAdvancedControl ('insertHTML', "<pre><code class='editor-code'>"+ $('#richTextField')[0].contentWindow.getSelection().anchorNode + "</code></pre>");
  });


  $('#link').on('click', function () {
    activateAdvancedControl('CreateLink', false, (document.getSelection())) 
  });
  
});