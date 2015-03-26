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
    var source = $("#question-comments-tpl").html();
    var template = Handlebars.compile(source);
    $("#comments-container").html(template(response));
  });
};

$(document).ready(function() {
  getQuestion();
  getQuestionComments ();
});