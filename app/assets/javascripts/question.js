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
  
  request("GET", '/questions/' + questionId, null).done(function(response) {
    console.log(response);

    // Handlebars.registerHelper('voteTotal', function(votes) {
    //   var scores = []
    //   var total = 0;
    //   for(var i = 0; i < votes.length; i++){
    //     var vote = votes[i];
    //     scores.push(vote.score);
    //   }
      
    //   $.each(scores,function() {
    //     total += parseInt(this);
    //   });
    //   return total;
    // });

    var source = $("#question-tpl").html();
    var template = Handlebars.compile(source);
    $("#question-container").html(template(response));
  });
};

function getQuestionComments () {
  var questionId = $('#question-container').attr('value');
  
  request("GET", '/questions/' + questionId + '/comments', null).done(function(response) {
    console.log(response);
    var source = $("#question-comments-tpl").html();
    var template = Handlebars.compile(source);
    $("#comments-container").html(template(response));
  });
};

function getAnswers () {
  var questionId = $('#question-container').attr('value');
  
  request("GET", '/questions/' + questionId + '/answers', null).done(function(response) {
    console.log(response);
    var source = $("#answers-tpl").html();
    var template = Handlebars.compile(source);
    $("#answers-container").html(template(response));
  });
};

function getAnswerComments (answerId) {
  request("GET", '/answers/' + answerId + '/comments', null).done(function(response) {
    console.log(response);
    var source = $("#answer-comments-tpl").html();
    var template = Handlebars.compile(source);
    $("#answer-comments-container").html(template(response));
    // Handlebars.registerPartial("answer-comment", $("#answer-comment-partial").html());
  });
};

$(document).ready(function() {
  getQuestion();
  getQuestionComments ();
  getAnswers();

  $('#answers-container').on('click', $('.button'), function() {

    console.log($(this))
    // var answerId = $('.answer-container').attr('value');
    // console.log(answerId);
    // getAnswerComments (answerId);
  });
});