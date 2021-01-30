$(document).ready(function () {

  // <!-- 0e3a06de362672136f4d5f71a9cc90db api key BrianFlieckWeatherKe -->
  let DateTime = luxon.DateTime;
  //  let hour = DateTime.local().hour;
  let localDatetime = DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  //hide button for now, fix later
  // previousCity.style.display = "none";


 

$("#submit-btn").on("click", function () {

 var searchTerm = $("#search-bar").val();
 var icon = "http://openweathermap.org/img/wn/";
 const apiKey = "0e3a06de362672136f4d5f71a9cc90db";

 var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
 citiesArray.push(searchTerm);
 localStorage.setItem("cities", JSON.stringify(citiesArray));


//  for (var i = 0; i < citiesArray.length; i++) {
//    var previousSearchButtons = $("<button>");
//    previousSearchButtons.addClass("btn btn-secondary my-2 searchHistoryButton");
//    previousSearchButtons.text(citiesArray[i]); 
//    $("#previousCity").append(previousSearchButtons);
//    // previousCity.style.display = "block";
//  }
//         checkCurrentCity(searchTerm);
//         var previousSearchButtons = $("<button>");
//         previousSearchButtons.addClass("btn btn-secondary my-2 searchHistoryButton");
//         previousSearchButtons.text(searchTerm);
//         $("#previousCity").append(previousSearchButtons);


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
$("#date").html("Current Time: " + localDatetime);
$("#temp").html("Temperature: " + tempvalue + " &#8457");
$("#desc").html("Weather Condition: "+ descValue);
$("#icon").html("<img src=" + iconValue+ ">");
$("#windspeed").html("Feels Like: " + windspeed + " &#8457");
$("#latlon").html("Latitue: "+latitude + " Longitute: "+longitude);
$("#previousCity").html(localStorage.getItem("cities"));
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