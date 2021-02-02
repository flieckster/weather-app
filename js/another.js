$(document).ready(function () {


  let DateTime = luxon.DateTime;
  let localDateOnly = DateTime.local().toLocaleString(DateTime.DATE_SHORT);


  let timeofday = DateTime.local().toLocaleString(DateTime.TIME_SIMPLE);
  console.log(timeofday);
  var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
  const apiKey = "0e3a06de362672136f4d5f71a9cc90db";
  var icon = "https://openweathermap.org/img/wn/";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
  const forecast = "https://api.openweathermap.org/data/2.5/onecall?lat=";
  const forecastlon = "&lon=";
  const url2 = "&units=imperial&appid=0e3a06de362672136f4d5f71a9cc90db";

  // function background () {
  if (timeofday <= "11:00 AM") {
    $("#background").addClass("backroundAM");
  } else if (timeofday >= "12:00 PM") {
    $("#background").addClass("backgroundMid");
  } else if (timeofday >= "12:00 PM" && timeofday <= "4:00 PM") {
    $("#background").addClass("backgroundAfternoon");
  } else {
    $("#background").addClass("backgroundNight");
  }

  // }

  // get previous citys
  for (var i = 0; i < citiesArray.length; i++) {
    var searchedbutton = $("<button>");
    searchedbutton.addClass("btn btn-light border-dark previous");
    searchedbutton.text(citiesArray[i])
    $("#previouscity").prepend(searchedbutton);
  };



  $(document).on("click", ".previous", function () {
    var searchTerm = $(this).text();
    $("#search-bar").val(searchTerm);
    console.log("name of city", searchTerm);
    $("#submit-btn").click();
  });



  function recentbutton() {
    $("#previouscity").empty();
    for (var i = 0; i < citiesArray.length; i++) {
      var searchedbutton = $("<button>");
      searchedbutton.addClass("btn btn-light border-dark previous");
      searchedbutton.text(citiesArray[i])
      $("#previouscity").prepend(searchedbutton);
    };

  }

  function getMainWeather() {

    var searchTerm = $("#search-bar").val();
    console.log("line 70", searchTerm);
    if (searchTerm && searchTerm.length) {
      citiesArray.push(searchTerm);
      localStorage.setItem("cities", JSON.stringify(citiesArray));
    }
    fetch(url + searchTerm + url2)


      .then(Response => Response.json())
      .then(data => {
        var nameValue = data['name'];
        console.log("line 81",data);
        var tempvalue = data['main']['temp'];
        var descValue = data['weather'][0]['description'];
        var iconValue = icon + data['weather'][0]['icon'] + ".png";
        var windspeed = data['main']['feels_like'];
        var longitude = data['coord']['lon'];
        var latitude = data['coord']['lat'];

        $("#name").html("City: " + nameValue);
        $("#date").html("Current Time: " + localDateOnly);
        $("#temp").html("Temperature: " + tempvalue + " &#8457");
        $("#desc").html("Weather Condition: " + descValue);
        $("#icon").html("<img src=" + iconValue + ">");
        $("#windspeed").html("Feels Like: " + windspeed + " &#8457");
        $("#latlon").html("Latitue: " + latitude + " Longitute: " + longitude);
        fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey)
          .then(Response => Response.json())
          .then(data => {
            var uvValue = data['value'];
            console.log(uvValue);
            $("#uv").html("UV index: " + uvValue);

            if (uvValue < 2) {
              $("#uv").addClass("uvGreen");
            } else if (uvValue >= 2 && uvValue <= 5) {
              $("#uv").addClass("uvYellow");
            } else if (uvValue >= 5 && uvValue <= 7) {
              $("#uv").addClass("uvOrange");
            } else {
              $("#uv").addClass("uvRed");
            };

            fetch(forecast + latitude + forecastlon + longitude + url2)

              .then(Response => Response.json())

              .then(data => {
                console.log(Response);

              data.daily.forEach((day,i)=>{
                if (i > 4) return
                console.log(day, i)
                var day1temp = day.temp.day;
                var day1feelslike = day.feels_like.day;
                var day1desc = day.weather[0].main;
                var futureday = DateTime.local().plus({ days: i+1}).toLocaleString();
                var day1icon = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';

                $("[id^='day']").addClass('card bg-light mb-3 border');
                $("#day1").html("<h5>" + futureday + "</h5>" + "<br>");
                $("#day1").html("<img src=" + day1icon + ">");
                $("#day1").html("Temp: " + day1temp + " &#8457 <br>");
                $("#day1").html("Feels Like: " + day1feelslike + " &#8457 <br>");
                $("#day1").html(day1desc + "<br>");
              })

                // var day1temp = data.daily[1].temp.day;
                // var day1feelslike = data.daily[1].feels_like.day;
                // var day1desc = data.daily[1].weather[0].main;
                // var day1icon = 'http://openweathermap.org/img/wn/' + data.daily[1].weather[0].icon + '@2x.png';

                // var day2temp = data.daily[2].temp.day;
                // var day2feelslike = data.daily[2].feels_like.day;
                // var day2desc = data.daily[2].weather[0].main;
                // var day2icon = 'http://openweathermap.org/img/wn/' + data.daily[2].weather[0].icon + '@2x.png';

                // var day3temp = data.daily[3].temp.day;
                // var day3feelslike = data.daily[3].feels_like.day;
                // var day3desc = data.daily[3].weather[0].main;
                // var day3icon = 'http://openweathermap.org/img/wn/' + data.daily[3].weather[0].icon + '@2x.png';

                // var day4temp = data.daily[4].temp.day;
                // var day4feelslike = data.daily[4].feels_like.day;
                // var day4desc = data.daily[4].weather[0].main;
                // var day4icon = 'http://openweathermap.org/img/wn/' + data.daily[4].weather[0].icon + '@2x.png';

                // var day5temp = data.daily[5].temp.day;
                // var day5feelslike = data.daily[5].feels_like.day;
                // var day5desc = data.daily[5].weather[0].main;
                // var day5icon = 'http://openweathermap.org/img/wn/' + data.daily[5].weather[0].icon + '@2x.png';


                // $("[id^='day']").addClass('card bg-light mb-3 border');
                // $("#day1").append("<h5>" + futureDays1 + "</h5>" + "<br>");
                // $("#day1").append("<img src=" + day1icon + ">");
                // $("#day1").append("Temp: " + day1temp + " &#8457 <br>");
                // $("#day1").append("Feels Like: " + day1feelslike + " &#8457 <br>");
                // $("#day1").append(day1desc + "<br>");

                // $("#day2").append("<h5>" + futureDays2 + "</h5>" + "<br>");
                // $("#day2").append("<img src=" + day2icon + ">");
                // $("#day2").append("Temp: " + day2temp + " &#8457 <br>");
                // $("#day2").append("Feels Like: " + day2feelslike + " &#8457 <br>");
                // $("#day2").append(day2desc + "<br>");

                // $("#day3").append("<h5>" + futureDays3 + "</h5>" + "<br>");
                // $("#day3").append("<img src=" + day3icon + ">");
                // $("#day3").append("Temp: " + day3temp + " &#8457 <br>");
                // $("#day3").append("Feels Like: " + day3feelslike + " &#8457 <br>");
                // $("#day3").append(day3desc + "<br>");

                // $("#day4").append("<h5>" + futureDays4 + "</h5>" + "<br>");
                // $("#day4").append("<img src=" + day4icon + ">");
                // $("#day4").append("Temp: " + day4temp + " &#8457 <br>");
                // $("#day4").append("Feels Like: " + day4feelslike + " &#8457 <br>");
                // $("#day4").append(day4desc + "<br>");

                // $("#day5").append("<h5>" + futureDays5 + "</h5>" + "<br>");
                // $("#day5").append("<img src=" + day5icon + ">");
                // $("#day5").append("Temp: " + day5temp + " &#8557 <br>");
                // $("#day5").append("Feels Like: " + day5feelslike + " &#8557 <br>");
                // $("#day5").append(day5desc + "<br>");

              })



          });
      });


  }


  $("#submit-btn").on("click", function () {
    getMainWeather()
    recentbutton()
  });



});