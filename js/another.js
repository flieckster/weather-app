$(document).ready(function () {


  let DateTime = luxon.DateTime;
  let localDateOnly = DateTime.local().toLocaleString(DateTime.DATE_SHORT);
 

  let timeofday = DateTime.local().toLocaleString(DateTime.TIME_SIMPLE);
  console.log(timeofday);
  var citiesArray = JSON.parse(localStorage.getItem("cities")) || [];
  var  forecasttitle = document.getElementById("forecast");
  forecasttitle.style.display = "none";

  const apiKey = "0e3a06de362672136f4d5f71a9cc90db";
  const icon = "https://openweathermap.org/img/wn/";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=";
  const forecast = "https://api.openweathermap.org/data/2.5/onecall?lat=";
  const forecastlon = "&lon=";
  const url2 = "&units=imperial&appid=0e3a06de362672136f4d5f71a9cc90db";


  //change background pix based on time of day
  var s =  timeofday.split(':');
  var st = parseInt(s[0])
  background();
  function background () {
    if (s <= 11) {
      console.log("AM");
      $("#background").addClass("backroundAM");
    } else if (s >= 11) {
      console.log("MID");
      $("#background").addClass("backgroundMid");
    } else if (s >= 1 && s <= 4) {
      console.log("AFTERNOON");
      $("#background").addClass("backgroundAfternoon");
    } else {
      $("#background").addClass("backgroundNight");
      console.log("NIGHT");
    }
  }


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

            // display 5 day forecast header
            forecasttitle.style.display = "block";
            fetch(forecast + latitude + forecastlon + longitude + url2)

              .then(Response => Response.json())

              .then(data => {
                console.log(Response);

              data.daily.forEach((day,i)=>{
                if (i > 4) return
                // console.log(day, i)
                var day1temp = day.temp.day;
                var day1feelslike = day.feels_like.day;
                var futureday = DateTime.local().plus({ days: i+1}).toLocaleString();
                var day1icon = 'https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png';
                var icon = new Image();
                icon.src = day1icon;
             
                var cardstart  = $('<div>');
                cardstart.addClass('card bg-light text-dark m-auto');
                var cardBody = $('<div>');
                cardBody.addClass('card-body');
                var cardtitle = $('<h5>');
                cardtitle.text(futureday);
                var cardbody1 = $('<p>');
                cardbody1.text("Temp: " + day1temp +" °F");
                var cardbody2 = $('<p>');
                cardbody2.text("Feels Like: " + day1feelslike +" °F");

                cardBody.append(cardtitle);
                cardBody.append(cardbody1);
                cardBody.append(cardbody2);
                cardstart.append(icon)
                cardstart.append(cardBody);
                $('#fiveday').append(cardstart);

              })

              })



          });
      });


  }


  $("#submit-btn").on("click", function () {
    getMainWeather()
    recentbutton()
  });



});