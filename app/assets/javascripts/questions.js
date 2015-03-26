function request(method, url, data) {
  return $.ajax({
            url: url,
            method: method,
            dataType: "json",
            data: data
          })
}

function getQuestion(){
  var questionId = $('#question-container').attr('value');
  console.log(questionId);
  request("GET", '/questions/' + questionId, null).done(function(response) {
    console.log(response);
    var source = $("#questiontpl").html();
    var template = Handlebars.compile(source);
    var votes = response.votes
    console.log(votes);
    $("#question-container").html(template(response));
    Handlebars.registerHelper('voteTotal', function(votes) {
      for (var i = 0; i <= votes.length; i++) {
        console.log(votes.score);
      };;
    });
  });
};

$(document).ready(function() {
  getQuestion();


});