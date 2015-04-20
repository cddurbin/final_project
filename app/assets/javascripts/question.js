function getQuestion(){

  //grab question id
  var questionId = $('.post-container.question').attr('value');

  //ajax request for the question
  request("GET", '/questions/' + questionId, null).done(function(response) {

    //compile handlebars question template
    var source = $("#question-tpl").html();
    var template = Handlebars.compile(source);
    $(".post-container.question").html(template(response));

    //compile handlebars question voting template
    var voting = $('#question-voting-tpl').html();
    var votingTemplate = Handlebars.compile(voting);
    $(".post-vote-container.question").html(votingTemplate(response));

    //compile handlebars question tags
    var voting = $('#tags-tpl').html();
    var votingTemplate = Handlebars.compile(voting);
    $(".post-tags-container").html(votingTemplate(response));

    //grab current user if logged in
    if(gon.current_user !== null){
      var currentUserId = gon.current_user.id;
    };
   

    //grab question owner id
    var questionUserId = $('.post-container.question').data('id')

    //if current user and question owner are the same replace
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
  console.log('click');
  var moretext = "more";
  var lesstext = "less";

  if($(this).hasClass("less")) {
      $(this).removeClass("less");
  } else {
      $(this).addClass("less");
  };
  $('.moreellipses').toggle();
  $('.morecontent').toggle('blind', 350);


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
    updateWantAnswerTotal();
    
  });
};

function sumbitQuestion () {
  var data = $('#hidden-text-area').val()
  console.log('hello');
  var title = $('#title').val();
  if(gon.current_user) {
    var currentUserId = gon.current_user.id;
  };
  
  var tagList = $('#tag-list').val();

  data = $('#add-question-iframe')[0].contentDocument.body.innerHTML;
  request("POST", '/questions', {question:{content: data, title: title, user_id: currentUserId, tag_list: tagList }}).done(function(){
    console.log('submit');
    $('#addQuestionModal').foundation('reveal', 'close');

    var currentUrl = window.location.origin
    window.location.replace(currentUrl + '/questions');
  });
};


//Handlebars helpser ----------------------------------------------------------------

Handlebars.registerHelper('answerTotal', function(sorted_answers) {
  var num = Object.keys(sorted_answers).length;
  if(num > 1) {
    return num + ' Answers';
   } else {
    if (num === 0) {
      return 'Waiting for Answers';
    } else {
      return num + ' Answer';
    }
  }
});

Handlebars.registerHelper('acceptedAnswerTotal', function(sorted_answers) {

  var num = Object.keys(sorted_answers).length + 1;
  if(num > 1) {
    return num + ' Answers';
  } else {
    if (num === 0) {
      return 'Waiting for Answers';
    } else {
      return num + ' Answer';
    }
  }
  
});

Handlebars.registerHelper("splitQuestionContent", function(questionContent){
  
  var showChar = 100;
  var ellipsestext = "...";
  console.log(questionContent)

  if(questionContent.length > showChar) {
    var firstSection = questionContent.substr(0, showChar);
    var secondSection = questionContent.substr(showChar-1, questionContent.length - showChar);

    var html = firstSection + '<span class="moreellipses">' + ellipsestext + ' </span><span class="morecontent"><span>' + secondSection + '</span>';
    
    return html;
  };

}); 

//functions on load -------------------------------------------------------------- 

$(document).ready(function(){

  //make iframe editable
  $('.add-question').on('click', function () {
    iFrameOn('#add-question-iframe');
  });

  //autofocus the title field in new question modal
  $(document).on('opened', '[data-reveal]', function () {
    $('#title').first().focus();
    $('#email-input').first().focus();
  });

  //reveal and hide the content of the question
  $('.post-container.question').on('click', '.more-content-button', toggleQuestionContent);

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