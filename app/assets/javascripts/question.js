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
      $( '#want-answer-label').replaceWith( "<div class='total-label'>Want Answers</div>" );
      
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
  
  content.toggle('blind', 500);
};

function updateWantAnswerTotal () {
  var voteTotal = parseInt(($('#want-answer')).text());
  console.log(voteTotal);
  return $('#want-answer').text(voteTotal + 1);
};

function postQuestionVote (votable_type, value) {
  var questionId = $('.post-container.question').attr('value');
  var currentUserId = gon.current_user.id;
  request("POST", '/questions/' + questionId + '/votes', {vote:{user_id: currentUserId, votable_id: questionId, votable_type: votable_type, score: value }}).done(function(){
    console.log('want answer clicked')
    updateWantAnswerTotal();
  });
};

function sumbitQuestion () {
  var data = $('#hidden-text-area').val()
  console.log(data);
  var title = $('#title').val();
  var currentUserId = gon.current_user.id;
  var tagList = $('#tag-list').val();
  console.log(tagList);

  data = window.frames['richTextField'].document.body.innerHTML;
  request("POST", '/questions', {question:{content: data, title: title, user_id: currentUserId, tag_list: tagList }}).done(function(){
    console.log('submit');
    $('#addQuestionModal').foundation('reveal', 'close');

    var currentUrl = window.location.origin

    window.location.replace(currentUrl + '/questions')
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

  $('.add-question').on('click', function () {
    iFrameOn('#add-question-iframe');
  });
  //autofocus the title field in new question modal
  $(document).on('opened', '[data-reveal]', function () {
    $('#title').first().focus();
  });

  $('.post-container.question').on('click', '.post-title.question-show', toggleQuestionContent);

  $('#submit-question').on('click', sumbitQuestion);
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