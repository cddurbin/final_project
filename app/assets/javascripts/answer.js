function answersTotalHeading (response) {
  var acceptedTotal = response.accepted_answer.length
  var sortedTotal = response.sorted_answers.length
  var overall;

  if(acceptedTotal > 0){
    overall = sortedTotal + 1;
    console.log(overall);
    if(overall > 1) {
      $('#answers-total').text(overall + ' Answers');
    } else {
      if (overall === 0) {
        $('#answers-total').text('Waiting for Answers');
      } else {
        $('#answers-total').text(overall + ' Answer');
      }
    }
  } else {
    overall = sortedTotal;
    if(overall > 1) {
      $('#answers-total').text(overall + ' Answers');
    } else {
      if (overall === 0) {
        $('#answers-total').text('Waiting for Answers');
      } else {
        $('#answers-total').text(overall + ' Answer');
      }
    }
  }
};

function removeAcceptCheck (response) {
  $('.accepted-selector').empty();
  // var acceptedTotal = response.accepted_answer.length
  // if(acceptedTotal > 0 ) {
  //   console.log('remove this please');
  //   return $('.accepted-selector').empty();
  // };
};

function checkForAcceptedAnswer (response) {
  if(response.accepted_answer.length > 0) {
    var accepted_source = $("#accepted-answer-tpl").html();
    var accepted_template = Handlebars.compile(accepted_source);
    $("#accepted-container").html(accepted_template(response.accepted_answer[0]));
    console.log('true');
    acceptedAnswerVotes (response.accepted_answer);
    removeAcceptCheck (response);
  } else {
    return false;
  };
};

function compileSortedAnswers (response) {
  var source = $("#answers-tpl").html();
  var template = Handlebars.compile(source);
  $("#sorted-answers-container").html(template(response));
};

function compareCurerentUserToQuestionUser (response) {
  var questionUserId = $('.post-container.question').data('id');

  if(gon.current_user !== null) {
    var currentUserId = gon.current_user.id
    
    if(currentUserId === questionUserId){
      return false;
    } else {
      removeAcceptCheck (response);
    }

  } else {
    removeAcceptCheck (response);
  }
};

function getAnswers () {
  var questionId = $('.post-container.question').attr('value');
  
  request("GET", '/questions/' + questionId + '/answers', null).done(function(response){
    console.log(response);

    
    compileSortedAnswers (response);
    checkForAcceptedAnswer (response);
    compareCurerentUserToQuestionUser (response);
    answersTotalHeading (response);
    

  });
};

function toggleAnswerInput (effect, rate) {
  $('#add-answer-input').toggle(effect, rate);
};

function focusAnswerEditoriFrame () {
  document.getElementById('add-answer-iframe').contentWindow.focus()
  // var iframe = $('#add-answer-iframe')[0].contentWindow;
  // iframe.focus();
};

function openAnswerEditor () {

  toggleAnswerInput ();
  // $('#add-answer-input').replace('$('#answer-editor-container').toggle()')
  $('#answer-editor-container').toggle('blind', 500);
  iFrameOn('#add-answer-iframe');

  setTimeout(focusAnswerEditoriFrame, 500);
};

function closeAnswerEditor () {
  
  $('#answer-editor-container').toggle('blind', function() {
    if($('#answer-editor-container').is(':visible')) {
      return false;
    } else {
      toggleAnswerInput ('blind', 200);
    };
  },500);
  

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


function acceptAnswer (answerId) {
  var check = $('.accept-answer-check#' + answerId)
  console.log(check)
  var currentUserId = gon.current_user.id
  request("PUT", '/answers/' + answerId, {answer:{accepted: true }}).done(function(){
    console.log('accepted');
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
  $('.answers-container').on('click', '.accept-answer-check', function(){
    var answerId = $(this).attr('id');
    var changeId = $(this).attr('id', 'accepted-answer-check');
    acceptAnswer (answerId);
    getAnswers();

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


