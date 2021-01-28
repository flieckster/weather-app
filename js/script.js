$(document).ready(function () {

  // <!-- 0e3a06de362672136f4d5f71a9cc90db api key BrianFlieckWeatherKe -->



$("#submit-btn").on("click", function () {

  var searchTerm = $("#search-bar").val();


fetch("http://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&appid=0e3a06de362672136f4d5f71a9cc90db")

.then(Response => Response.json())
.then(data => {
 var nameValue = data['name'];
 console.log(nameValue);
 var tempvalue = data['main']['temp'];
 console.log(tempvalue);
 var descValue = data['weather'][0]['description'];
 var iconValue = data['weather'][0]['icon'];
$("#name").text(nameValue);
$("#temp").text(tempvalue);
$("#desc").text(descValue);
$("#icon").text(iconValue);

// //  .catch(err => alert("wrong city name"));
})


})
});