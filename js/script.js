$(document).ready(function () {

  // <!-- 0e3a06de362672136f4d5f71a9cc90db api key BrianFlieckWeatherKe -->



$("#submit-btn").on("click", function () {

  var searchTerm = $("#search-bar").val();
 var icon = "http://openweathermap.org/img/wn/";
 const apiKey = "0e3a06de362672136f4d5f71a9cc90db";

fetch("http://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&units=imperial&appid=0e3a06de362672136f4d5f71a9cc90db")

.then(Response => Response.json())
.then(data => {
 var nameValue = data['name'];
 console.log(nameValue);
 var tempvalue = data['main']['temp'];
 console.log(tempvalue);
 var descValue = data['weather'][0]['description'];
 var iconValue = icon+data['weather'][0]['icon']+".png";
 var windspeed = data['main']['feels_like'];
 var longitude = data['coord']['lon'];
 var latitude = data['coord']['lat'];
$("#name").html("City: " + nameValue);
$("#temp").html("Temperature: " + tempvalue + " &#8457");
$("#desc").html("Weather Condition: "+ descValue);
$("#icon").html("<img src=" + iconValue+ ">");
$("#windspeed").html("Feels Like: " + windspeed + " &#8457");
$("#latlon").html("Latitue: "+latitude + " Longitute: "+longitude);

// var uv = "http://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid="+apiKey;


fetch("http://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid="+apiKey)
.then(Response => Response.json())
.then(data => {
 var uvValue = data['value'];
 console.log(uvValue);
 $("#uv").html("UV index: " + uvValue);

 if (uvValue < 2){
  $("#uv").addClass("uvGreen");
 }else if (uvValue >= 2 && uvValue <= 5){
  $("#uv").addClass("uvYellow");
 }else if(uvValue >=5 && uvValue <= 7){
  $("#uv").addClass("uvOrange");
 }else{
  $("#uv").addClass("uvRed");
 };

//  $("#fiveday").empty();


//  .catch(err => alert("wrong city name"));
});
})


});
});