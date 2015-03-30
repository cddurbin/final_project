function getAllQuestions(){
  request("GET", '/questions', null).done(function(response) {
    console.log(response);
    
    var source = $('#questions-tpl').html();
    // console.log(source);
    var template = Handlebars.compile(source);

    $('#questions-container').html(template(response));
  });
};

function toggleQuestionContent() {
  console.log($(this));
  var content = $(this).prev("div.question-content");
  console.log(content);
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