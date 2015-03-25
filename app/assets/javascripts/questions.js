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
    // $("#templates").load("assets/views/questions/show_question.mustache.html #template1",function(){
    // var template = $('#questiontpl').innerHTML;
    // var output = Mustache.render(template, repsonse);
    // $("#question-container").html(output);
    // var template = "<h2> {{ title }} </h2>";
    // var html = Mustache.to_html(template, response);
    // $('#question-container').html(html);
    // };
};



// function getQuestion('GET', '/') {
  
//   console.log(questionId);
//   $.ajax({
//     type: 'GET',
//     url: '/questions/' + questionId,
//     dataType: 'json'
//   }).done(function(response) {
//     console.log(response.title);
  
//   });
// }


$(document).ready(function() {
  getQuestion();

});