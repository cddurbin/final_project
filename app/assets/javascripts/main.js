function request(method, url, data) {
  return $.ajax({
            url: url,
            method: method,
            dataType: "json",
            data: data
          })
}

$(document).ready(function() {
  hljs.initHighlightingOnLoad();
  // $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  if($('body').is('.questions.show')){
    loadQuestionShowPage ();
  }
  // getAllQuestions();
  $('#add-answer-btn').on('click', createAnswerEditor);
  $('#answer-editor-container').on('click', $('#answer-submit'), submitAnswer);
  $('.post-container.question').on('click', $('#more-content'), toggleQuestionContent);

});