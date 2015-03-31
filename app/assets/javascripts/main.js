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
  $('.post-container.question').on('click', '#more-content', toggleQuestionContent);
  $('.post-vote-container.question').on('click', '#question-upvote', function(){
    console.log('this is an upvote');
    vote('Question', 1);
  });
  $('.post-vote-container.question').on('click', '#question-downvote', function(){
    console.log('this is a downvote');
    vote('Question', -1);
  });

});