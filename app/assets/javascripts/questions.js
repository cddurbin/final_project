function showQuestion() {
  questionId = $('.question').attr('value');
  console.log(questionId);
  $.ajax({
    type: 'GET',
    url: '/questions/' + questionId,
    dataType: 'json'
  }).done(function(response) {
    console.log(response.title);
  
  });
}


$(document).ready(function() {
  showQuestion();

});