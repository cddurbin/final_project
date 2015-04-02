function getQuestion(){
  var questionId = $('.post-container.question').attr('value');
  request("GET", '/questions/' + questionId, null).done(function(response) {
    console.log(response);
    var source = $("#question-tpl").html();
    var template = Handlebars.compile(source);
    $(".post-container.question").html(template(response));

    
    var voting = $('#question-voting-tpl').html();
    var votingTemplate = Handlebars.compile(voting);
    $(".post-vote-container.question").html(votingTemplate(response));

    // var feed = $('#feed-tpl').html();
    // var feedTemplate = Handlebars.compile(feed);
    // $(".feed-container").html(feedTemplate(response));

    
    if(gon.current_user.id !== null){
      var currentUserId = gon.current_user.id
    }
    var questionUserId = $('.post-container.question').data('id')
    if(currentUserId === questionUserId) {
      console.log('true');
      $( '#want-answer').replaceWith( '<h3>Want Answer</h3>' );
      
    };
  });
};

function toggleQuestionComments () {
  $(".post-container.question").on('click', '#question-comments-btn', function() {
    console.log('toggle question comments');
    $('.post-comments-container.question').toggle();
  });
};

function toggleQuestionContent() {
  console.log('toggle question content');
  var content = $('.post-content.question');
  var label = $(this).text();
  
  if(label === "More") {
    label = "Less";
    content.toggle();
  } else {
    label = "More";
    content.toggle();
  };
  $(this).text(label);
};

function updateWantAnswerTotal () {
  var voteTotal = $('.want-answer-total').children()
  console.log(voteTotal);
  var voteTotalNum = parseInt(voteTotal.text());
  console.log(voteTotalNum);
  return voteTotal.text(voteTotalNum + 1);
};

function postQuestionVote (votable_type, value) {
  var questionId = $('.post-container.question').attr('value');
  var currentUserId = $('body').attr('name');
  request("POST", '/questions/' + questionId + '/votes', {vote:{user_id: currentUserId, votable_id: questionId, votable_type: votable_type, score: value }}).done(function(){
    updateWantAnswerTotal();
  });
};

Handlebars.registerHelper('answerTotal', function(sorted_answers) {
  var num = Object.keys(sorted_answers).length;
  var answer = 'Answer'
  if(num > 1){
    return num + ' Answers'
  } else {
    return num + ' Answer'
  }
});

Handlebars.registerHelper('acceptedAnswerTotal', function(sorted_answers) {

  var num = Object.keys(sorted_answers).length + 1;
  var answer = 'Answer'
  if(num > 1){
    return num + ' Answers'
  } else {
    return num + ' Answer'
  }
});

$(document).ready(function(){
  $('.post-container.question').on('click', '#more-content', toggleQuestionContent);
});



// $(Handlebars.partials["user"]()).appendTo('#question-container');

// $(document).ready(function() {
//    var template = Handlebars.compile($("#question-tpl").html());
//    Handlebars.registerPartial("user", $("#question-user-partial").html());

//    template(yourData);
//  }


// -------------------------------------------------
// function getAllQuestions(){
//   request("GET", '/questions', null).done(function(response) {
//     console.log(response);
    
//     var source = $('#questions-tpl').html();
//     // console.log(source);
//     var template = Handlebars.compile(source);

//     $('#questions-container').html(template(response));
    
//   });
// };

// ---------------------------------------------
// function getQuestionComments () {
//   var questionId = $('#question-container').attr('value');
  
//   request("GET", '/questions/' + questionId + '/comments', null).done(function(response) {
//     console.log(response);
//     var source = $("#question-comments-tpl").html();
//     var template = Handlebars.compile(source);
//     $("#question-comments-container").html(template(response));
//   });
// };