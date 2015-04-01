function updateHelpfulTotal (button) {
  var voteTotal = button.siblings('.helpful-total').children();
  var voteTotalNum = parseInt(voteTotal.text());
  return voteTotal.text(voteTotalNum + 1);
};

function postAnswerVote (answerId, votable_type, value, button) {
  var currentUserId = $('body').attr('name');
  request("POST", '/answers/' + answerId + '/votes', {vote:{user_id: currentUserId, votable_id: answerId, votable_type: votable_type, score: value }}).done(function(){
    updateHelpfulTotal(button);
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

$(document).ready(function(){

  $('.post-vote-container.question').on('click', '#want-answer', function(){
    console.log('this is an upvote');
    postQuestionVote('Question', 1);
  });

  // $('.post-vote-container.question').on('click', '#question-downvote', function(){
  //   console.log('this is a downvote');
  //   questionVote('Question', -1);
  // });

  $('.row.answers-container').on('click', '#helpful', function(){
    console.log('this is an answer upvote');
    var answerId = $(this).attr('value');
    postAnswerVote(answerId, 'Answer', 1, ($(this)));
  });

  $('.row.answers-container').on('click', '#answer-downvote', function(){
    console.log('this is an answer downvote');
    var answerId = $(this).attr('value');
    answerVote(answerId, 'Answer', -1);
  });
});
