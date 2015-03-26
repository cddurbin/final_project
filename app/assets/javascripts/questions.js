function request(method, url, data) {
  return $.ajax({
            url: url,
            method: method,
            dataType: "json",
            data: data
          })
}

function getQuestion(){
  var questionId = $('#question-container').attr('value');
  console.log(questionId);
  request("GET", '/questions/' + questionId, null).done(function(response) {
    console.log(response);
    var source = $("#questiontpl").html();
    var template = Handlebars.compile(source);
    $("#question-container").html(template(response));
  });
};

$(document).ready(function() {
  getQuestion();

});