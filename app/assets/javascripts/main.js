function request(method, url, data) {
  return $.ajax({
            url: url,
            method: method,
            dataType: "json",
            data: data
          })
};

function stickyNav () {
  var subTopBar = $('#sub-top-bar');
  var menuOffsetTop = subTopBar[0].offsetTop;

  $(document).bind('ready scroll', function () {
      var docScroll = $(this).scrollTop();

      if (docScroll >= menuOffsetTop) {
          subTopBar.addClass('fixed');
      } else {
          subTopBar.removeClass('fixed');
      }
  });
}

function loadQuestionShowPage() {
    Handlebars.registerPartial("user", $("#answer-user-partial").html());
    Handlebars.registerPartial("comment", $("#comment-partial").html());
    Handlebars.registerPartial("answer-voting", $("#answer-voting-partial").html());
  
    getQuestion();
    getAnswers();
    toggleQuestionComments ();
    toggleAnswerComments ();
};

Handlebars.registerHelper("formatDate", function(created_at){
  var date = new Date(created_at);
  return date.toDateString();
});

$(document).ready(function() {

  stickyNav ();

  if($('body').is('.questions.show')){
    loadQuestionShowPage();
  };


});