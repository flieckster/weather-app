$(document).ready(function () {

  // <!-- 0e3a06de362672136f4d5f71a9cc90db api key BrianFlieckWeatherKe -->
  let DateTime = luxon.DateTime;
  let localDatetime = DateTime.local().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  let localDateOnly = DateTime.local().toLocaleString(DateTime.DATE_SHORT);


  var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
 


  for (var i = 0; i < citiesArray.length; i++){
    var searchedbutton = $("<button>");
    searchedbutton.addClass("btn btn-light border");
    searchedbutton.text(citiesArray[i])
    $("#previouscity").append(searchedbutton);
  };

  $(document).on("click", ".searchedbutton", function(event) {
    event.preventDefault();
    checkCurrentCity($(this).text());
})



$("#submit-btn").on("click", function () {

 var searchTerm = $("#search-bar").val();
 var icon = "http://openweathermap.org/img/wn/";
 const apiKey = "0e3a06de362672136f4d5f71a9cc90db";

 citiesArray.push(searchTerm);
 localStorage.setItem("cities", JSON.stringify(citiesArray));

fetch("http://api.openweathermap.org/data/2.5/weather?q="+searchTerm+"&units=imperial&appid=0e3a06de362672136f4d5f71a9cc90db")

.then(Response => Response.json())
.then(data => {
 var nameValue = data['name'];
 console.log(data);
 var tempvalue = data['main']['temp'];
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


 fiveDay(data);

 function fiveDay () {

  $("#fiveDayRow").empty();
  let html = " ";
  data.forEach((fiveDay, i) => {

    if (i > 4) return;


    html += `<div class="col-m-2">
<div class="card border-light mb-3" style="max-width: 20rem;">
    <div class="card-header">Date:‏‏‎ ‎‏‏‎ ‎${localDateOnly} </div>
    <div class="card-body">
    <img src="https://openweathermap.org/img/wn/${fiveDay.weather[0].icon}@2x.png" >
        <p class="card-text">Temp:‏‏‎ ‎‏‏‎ ‎${fiveDay.tempvalue}‎‏‏‎ ‎°F</p>
        <p class="card-text">Humidity:‏‏‎ ‎‏‏‎ ‎${fiveDay.humidity}‎‏‏‎ ‎%</p>
    </div>
</div>
</div>`

});


$("#fiveDayRow").append(html);


}



});

 })

//  .catch(err => alert("wrong city name"));
});
})





;