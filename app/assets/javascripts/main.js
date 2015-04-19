function request(method, url, data) {
  return $.ajax({
            url: url,
            method: method,
            dataType: "json",
            data: data
          })
};

function loadQuestionShowPage() {
    Handlebars.registerPartial("user", $("#answer-user-partial").html());
    Handlebars.registerPartial("comment", $("#comment-partial").html());
    Handlebars.registerPartial("answer-voting", $("#answer-voting-partial").html());
  
    getQuestion();
    getAnswers();
    toggleQuestionComments ();
    toggleAnswerComments ();
};

Handlebars.registerHelper("formatDate", function(created_at){
  var date = new Date(created_at);
  return date.toDateString();
});

$(document).ready(function() {

  // hljs.initHighlightingOnLoad();
  // $('pre code').each(function(i, e) {hljs.highlightBlock(e)});

 

  if($('body').is('.questions.show')){
    loadQuestionShowPage();
  };

});