function request(method, url, data) {
  return $.ajax({
            url: url,
            method: method,
            dataType: "json",
            data: data
          })
};

function loadQuestionShowPage() {
    Handlebars.registerPartial("user", $("#user-partial").html());
    Handlebars.registerPartial("comment", $("#comment-partial").html());
    Handlebars.registerPartial("answer-voting", $("#answer-voting-partial").html());
  
    getQuestion();
    getAnswers();
    toggleQuestionComments ();
    toggleAnswerComments ();
};

$(document).ready(function() {

  // hljs.initHighlightingOnLoad();
  // $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  $('.add-question').on('click', function (){
    iFrameOn();
    $('.basic').on('click', activateBasicControl );
  });
  if($('body').is('.questions.show')){
    loadQuestionShowPage();
  }

});