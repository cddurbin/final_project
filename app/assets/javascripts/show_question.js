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

// function getQuestionComments () {
//   var questionId = $('#question-container').attr('value');
  
//   request("GET", '/questions/' + questionId + '/comments', null).done(function(response) {
//     console.log(response);
//     var source = $("#question-comments-tpl").html();
//     var template = Handlebars.compile(source);
//     $("#question-comments-container").html(template(response));
//   });
// };

function getAnswers () {
  var questionId = $('#question-container').attr('value');
  
  request("GET", '/questions/' + questionId + '/answers', null).done(function(response) {
    console.log(response);
    var source = $("#answers-tpl").html();
    var template = Handlebars.compile(source);
    $("#answers-container").html(template(response));
  });
};

function toggleQuestionComments () {
  $("#question-container").on('click', '#question-comments-btn', function() {
  console.log('clicked');
    $('.question-comments-container').toggle();
  });
};

function toggleAnswerComments () {
  $('#answers-container').on('click', '#answer-comments-btn', function() {
    console.log('clicked');
    $(this).next().toggle();
  });
};

// function getAnswerComments (answerId) {
//   request("GET", '/answers/' + answerId + '/comments', null).done(function(response) {
//     console.log(response);

//     // Handlebars.registerPartial("answer-comment", $("#answer-comment-partial").html(response));
//     var source = $("#answer-comments-tpl").html();
//     var template = Handlebars.compile(source);
//     $(".answers-comments-container").html(template(response));
//   });
// };
// $('#answers-container').on('click', 'button', function() {
//   var answerId = $(this).data('id');
//   console.log(answerId);
//   getAnswerComments (answerId);
// });

$(document).ready(function() {
  getQuestion();
  toggleQuestionComments ()
  // getQuestionComments ();
  getAnswers();
  toggleAnswerComments ()

  
  
 
});