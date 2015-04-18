function getAnswers () {
  var questionId = $('.post-container.question').attr('value');
  
  request("GET", '/questions/' + questionId + '/answers', null).done(function(response){
    console.log(response);

    var source = $("#answers-tpl").html();
    var template = Handlebars.compile(source);
    $(".answers-container").html(template(response));

    if(response.accepted_answer.length > 0) {
      console.log('true');
      acceptedAnswerVotes (response.accepted_answer);
    } else {
      if(gon.current_user !== null) {
        var currentUserId = gon.current_user.id
        var questionUserId = $('.post-container.question').data('id');
        if(currentUserId === questionUserId){
          acceptAnswerButton();
        }
      };
      
    };
  });
};

function toggleAnswerInput () {
  $('#add-answer-input').toggle();
};

function focusAnswerEditoriFrame () {
  document.getElementById('add-answer-iframe').contentWindow.focus()
  // var iframe = $('#add-answer-iframe')[0].contentWindow;
  // iframe.focus();
};

function openAnswerEditor () {

  toggleAnswerInput ();

  $('#answer-editor-container').toggle('blind', 500);
  iFrameOn('#add-answer-iframe');

  setTimeout(focusAnswerEditoriFrame, 500);
};

function closeAnswerEditor () {
  toggleAnswerInput ()
  $('#answer-editor-container').toggle('blind', 500);
};

function submitAnswer (){

  var currentUserId = gon.current_user.id;
  var questionId = $('.post-container.question').attr('value');
  var data = $('#add-answer-iframe')[0].contentDocument.body.innerHTML;
  console.log(data);
  
  request("POST", '/questions/' + questionId + '/answers', {answer:{content: data, question_id: questionId, user_id: currentUserId }}).done(function(){
    console.log('submit done');

    $('#add-answer-container').toggle('blind', 500);

    getAnswers ();
    
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
  var currentUserId = gon.current_user.id
  request("PUT", '/answers/' + answerId, {answer:{accepted: true }}).done(function(){
    console.log('done');
    
  });
};


$(document).ready(function(){

  //close answer editor
  $('#nevermind').on('click', closeAnswerEditor);

  //on add answer, if logged in show editor else store the click and login
  $('#add-answer-input').on('click', function () {
    if(gon.current_user !== null){
      openAnswerEditor();
    } else {
      var addAnswerInputMemory = "click1";
      localStorage.setItem("addAnswerInputMemory", addAnswerInputMemory);
    };

    //when login btn clicked store current url
    $('#login-btn').on('click', function (){
      var addAnswerLoginUrl = window.location.href;
      localStorage.setItem("addAnswerLoginUrl", addAnswerLoginUrl);
    });
  });

  var addAnswerInputMemory = localStorage.getItem("addAnswerInputMemory");
  var addAnswerLoginUrl = localStorage.getItem("addAnswerLoginUrl");

  //if add answer was clicked and login url equal current url reset login url and toggle editor
  if(addAnswerInputMemory === "click1" && addAnswerLoginUrl === window.location.href) {
    var addAnswerLoginUrl = '';
    localStorage.setItem("addAnswerLoginUrl", addAnswerLoginUrl);
    openAnswerEditor();
  };

  //submit answer when button clicked
  $('#submit-answer').on('click', submitAnswer);

  //when accepted answer button is hit, mark answer as accepted
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


