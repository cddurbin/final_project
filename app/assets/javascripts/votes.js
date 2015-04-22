function updateVoteTotal (button, value) {
  var voteTotal = parseInt(button.parent().children()[0].innerHTML);
  return button.parent().children()[0].innerHTML = voteTotal + value;
};

function postAnswerVote (answerId, votable_type, value, button) {
  var currentUserId = gon.current_user.id;
  request("POST", '/answers/' + answerId + '/votes', {vote:{user_id: currentUserId, votable_id: answerId, votable_type: votable_type, score: value }}).done(function(){
    updateVoteTotal(button, value);
    
  });
};

function acceptedAnswerVotes (acceptedAnswer) {
  console.log(acceptedAnswer); 
  var votes = acceptedAnswer[0].votes
  var total = getVoteTotal (votes);
  console.log(total);
  return $('#accepted-total').text(total);
};

function getVoteTotal (votes) {
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
};

function removeWantAnswerClick () {
  $('#want-answer-label').removeClass('want-answer-clickable');
};

Handlebars.registerHelper('voteTotal', function(votes) {
  return getVoteTotal (votes) 
});

$(document).ready(function(){

  $('.post-vote-container.question').on('click', $('.want-answer-clickable'), function(){
    console.log('this is an upvote');
    postQuestionVote('Question', 1);
    removeWantAnswerClick ();
  });

  $('.answers-container').on('click', '.helpful-btn', function(){
    console.log('this is an answer upvote');
    var answerId = $(this).attr('value');
    postAnswerVote(answerId, 'Answer', 1, ($(this)));
  });

  $('.answers-container').on('click', '.unhelpful-btn', function(){
    console.log('this is an answer downvote');
    var answerId = $(this).attr('value');
    postAnswerVote(answerId, 'Answer', -1, ($(this)));
  });

  // $('.answers-container').on('click', '.unhelpful-btn', function(){
  //   console.log('this is an answer upvote');
  //   var answerId = $(this).attr('value');
  //   console.log(answerId);
  //   postAnswerVote(answerId, 'Answer', -1, ($(this)));
  // });

  // $('#sorted-answers-container').on('click', '.helpful-btn', function(){
  //   console.log('this is an answer downvote');
  //   var answerId = $(this).attr('value');
  //   console.log(answerId);
  //   postAnswerVote(answerId, 'Answer', 1, ($(this)));
  // });
});
