function getAnswers () {
  var questionId = $('.post-container.question').attr('value');
  
  request("GET", '/questions/' + questionId + '/answers', null).done(function(response){
    console.log(response);

    var source = $("#answers-tpl").html();
    var template = Handlebars.compile(source);
    $(".row.answers-container").html(template(response));

    if(response.accepted_answer.length > 0) {
      console.log('true');
      acceptedAnswerVotes (response.accepted_answer);
    } else {
      var currentUserId = $('body').data('id');
      var questionUserId = $('.post-container.question').data('id');
      if(currentUserId === questionUserId){
        acceptAnswerButton();
      }
    };
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
  var currentUserId = $('body').data('id');
  request("POST", '/questions/' + questionId + '/answers', {answer:{content: data, question_id: questionId, user_id: currentUserId }}).done(function(){
    console.log('submit done');
    var user_name = $('.post-container.question').attr('name');
    $('#add-answer-btn').text('Help ' + user_name + ' out.');
    getAnswers();
    removeAnswerEditor();
    
  });
}

function toggleAnswerComments () {
  $('.answers-container').on('click', '#answer-comments-btn', function() {
    console.log('toggle Answer comments');
    $(this).next().toggle();
  });
};

function acceptAnswerButton () {
  $('.accepted-selector').append('<h3><a href="#", id:"accept-answer">Accept</a></h3>');
}

function acceptAnswer (answerId) {
  console.log(answerId);
  var currentUserId = $('body').data('id');
  request("PUT", '/answers/' + answerId, {answer:{accepted: true }}).done(function(){
    console.log('done');
    
  });
};


$(document).ready(function(){
  $('#add-answer-btn').on('click', createAnswerEditor);
  $('#answer-editor-container').on('click', $('#answer-submit'), submitAnswer);
  $('.answers-container').on('click', $('#accept-answer'), function(){
    var answerId = $('.post-container.answer').data('id');
    acceptAnswer (answerId);
  });
});

//---------------------------------------------------------------------

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


