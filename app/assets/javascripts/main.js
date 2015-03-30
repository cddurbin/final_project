function request(method, url, data) {
  return $.ajax({
            url: url,
            method: method,
            dataType: "json",
            data: data
          })
}

$(document).ready(function() {
  loadQuestions ();
  $('#add-answer-btn').on('click', createAnswerEditor);
  $('#answer-editor-container').on('click', $('#answer-submit'), submitAnswer);

});