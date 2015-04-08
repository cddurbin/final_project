function updateHelpfulTotal (button, value) {
  var voteTotal = parseInt(button.siblings('.total').text());
  return button.siblings('.total').text(voteTotal + value);
};

function postAnswerVote (answerId, votable_type, value, button) {
  console.log(answerId);
  var currentUserId = gon.current_user.id;
  request("POST", '/answers/' + answerId + '/votes', {vote:{user_id: currentUserId, votable_id: answerId, votable_type: votable_type, score: value }}).done(function(){
    updateHelpfulTotal(button, value);
    
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

Handlebars.registerHelper('voteTotal', function(votes) {
  return getVoteTotal (votes) 
});

$(document).ready(function(){

  $('.post-vote-container.question').on('click', $('#want-answer'), function(){
    console.log('this is an upvote');
    postQuestionVote('Question', 1);
  });

  // $('.post-vote-container.question').on('click', '#question-downvote', function(){
  //   console.log('this is a downvote');
  //   questionVote('Question', -1);
  // });

  $('.answers-container').on('click', '#helpful', function(){
    console.log('this is an answer upvote');
    var answerId = $(this).attr('value');
    postAnswerVote(answerId, 'Answer', 1, ($(this)));
  });

  $('.answers-container').on('click', '#unhelpful', function(){
    console.log('this is an answer downvote');
    var answerId = $(this).attr('value');
    console
    postAnswerVote(answerId, 'Answer', -1, ($(this)));
  });
});
