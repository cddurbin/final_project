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
  });
};

function getAnswers () {
  var questionId = $('.post-container.question').attr('value');
  
  request("GET", '/questions/' + questionId + '/answers', null).done(function(response){
    console.log(response);

    var source = $("#answers-tpl").html();
    var template = Handlebars.compile(source);
    $(".row.answers-container").html(template(response));




    // var voting = $('#answer-voting-tpl').html();
    // console.log(voting)
    // var votingTemplate = Handlebars.compile(voting);
    // $(".post-vote-container.answer").html(votingTemplate(response));

   
  });
};

function toggleQuestionComments () {
  $(".post-container.question").on('click', '#question-comments-btn', function() {
    console.log('toggle question comments');
    $('.post-comments-container.question').toggle();
  });
};

function toggleAnswerComments () {
  $('.answers-container').on('click', '#answer-comments-btn', function() {
    console.log('toggle Answer comments');
    $(this).next().toggle();
  });
};

function createAnswerEditor () {
  $('#answer-editor-container').append("<textarea id='add-answer-editor'></textarea><button id='answer-submit'>Add Answer</button>")
  $('#add-answer-btn').off('click').on('click', removeAnswerEditor);
  CKEDITOR.replace('add-answer-editor');
  $(this).text('Nevermind');
};

function removeAnswerEditor () {
  CKEDITOR.instances['add-answer-editor'].destroy();
  $('#answer-editor-container').empty();
  var user_name = $('.post-container.question').attr('name');
  $(this).text('Help ' + user_name + ' out.');
  $('#add-answer-btn').off('click').on('click', createAnswerEditor);
  
};

function submitAnswer (){
  var data = CKEDITOR.instances['add-answer-editor'].getData();
  console.log(data);
  var questionId = $('.post-container.question').attr('value');
  var currentUserId = $('body').attr('name');
  request("POST", '/questions/' + questionId + '/answers', {answer:{content: data, question_id: questionId, user_id: currentUserId }}).done(function(){
    console.log('submit done');
    var user_name = $('.post-container.question').attr('name');
    $('#add-answer-btn').text('Help ' + user_name + ' out.');
    getAnswers();
    removeAnswerEditor();
    
  });
}

function loadQuestionShowPage() {
    Handlebars.registerPartial("user", $("#user-partial").html());
    Handlebars.registerPartial("comment", $("#comment-partial").html());
    Handlebars.registerPartial("answer-voting", $("#answer-voting-partial").html());
  
    getQuestion();
    getAnswers();
    toggleQuestionComments ();
    toggleAnswerComments ();
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

function updateWantAnswer () {
  var voteTotal = $('.want-answer-total').children()
  var voteTotalNum = parseInt(voteTotal.text());
  return voteTotal.text(voteTotalNum + 1);
};

function postQuestionVote (votable_type, value) {
  var questionId = $('.post-container.question').attr('value');
  var currentUserId = $('body').attr('name');
  request("POST", '/questions/' + questionId + '/votes', {vote:{user_id: currentUserId, votable_id: questionId, votable_type: votable_type, score: value }}).done(function(){
    updateWantAnswer();
  });
};

function postAnswerVote (answerId, votable_type, value) {
  console.log(answerId);
  var currentUserId = $('body').attr('name');
  request("POST", '/answers/' + answerId + '/votes', {vote:{user_id: currentUserId, votable_id: answerId, votable_type: votable_type, score: value }}).done(function(){
  
  });
};











Handlebars.registerHelper('voteTotal', function(votes) {
  var scores = []
  var total = 0;
  for(var i = 0; i < votes.length; i++){
    var vote = votes[i];
    scores.push(vote.score);
  }
  
  $.each(scores,function() {
    total += parseInt(this);
  });
  return total;
});

Handlebars.registerHelper('answerTotal', function(sorted_answers) {
  var num = Object.keys(sorted_answers).length;
  var answer = 'Answer'
  if(num > 1){
    return num + ' Answers'
  } else {
    return num + ' Answer'
  }
});

// $(Handlebars.partials["user"]()).appendTo('#question-container');

// $(document).ready(function() {
//    var template = Handlebars.compile($("#question-tpl").html());
//    Handlebars.registerPartial("user", $("#question-user-partial").html());

//    template(yourData);
//  }


// -------------------------------------------------



// ----------------------------------------------

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