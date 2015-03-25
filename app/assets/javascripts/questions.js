function request(method, url, data) {
  return $.ajax({
            url: url,
            method: method,
            dataType: "json",
            data: data
          })
}

function getQuestion(){
  questionId = $('.question').attr('value');
  request("GET", "/questions/" + questionId, null).done(function(response) {
    console.log(response);
  });
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