


function getAllQuestions(){
  request("GET", '/questions', null).done(function(response) {
    console.log(response);

    // Handlebars.registerHelper('voteTotal', function(votes) {
    //   var scores = []
    //   var total = 0;
    //   for(var i = 0; i < votes.length; i++){
    //     var vote = votes[i];
    //     scores.push(vote.score);
    //   }
      
    //   $.each(scores,function() {
    //     total += parseInt(this);
    //   });
    //   return total;
    // });

    // var source = $("#question-tpl").html();
    // var template = Handlebars.compile(source);
    // $("#question-container").html(template(response));
  });
};

$(document).ready(function(){
  // getAllQuestions();
});