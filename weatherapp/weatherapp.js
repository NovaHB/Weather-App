
        //getting elements
        var body = document.body;
        var country= document.querySelector(".country");
        var latitude= document.querySelector(".latitude");
        var longitude= document.querySelector(".longitude");



        var weathercondition= document.querySelector(".weatherconditions");
        var temp= document.querySelector(".temp");
        var condition= document.querySelector(".condition");
        var visibility= document.querySelector(".visibility");
        var humidity= document.querySelector(".humidity");
        var pressure= document.querySelector(".pressure");
        var windspeed= document.querySelector(".windspeed");
        var winddeg= document.querySelector(".winddeg");

        var displayweather= document.querySelector(".displayweather");
        var input_field= document.getElementById("inputt");

        function effect () {
        var inputted_value = document.getElementById("inputted").value;

        //using the fetch api to get data from openweathermap.org

        var returned = fetch('https://api.openweathermap.org/data/2.5/weather?q= '+ inputted_value +' &appid=cccc533290da2a6e97f3b13e763a4a98')
       .then(response => {if (response.ok){
           return  response.json();}
           else {alert("INVALID LOCATION, NOT A CITY");}
           })
       .then( data => {
           console.log(data);
            if (typeof data != "undefined") 
            {
                 //Makess some animation 
                if ( inputted_value.length > 1) { 
           // input_field.style.transform="translateY(-330px)";
           input_field.style.transform="translateY(-330px)";
            document.getElementById("enterlocation").style.display="none";
                                                }
            else if(inputted_value== " "){
            input_field.style.border="2px solid red";
                                        }
            //display weather tab fades in
            displayweather.style.animation="fadein 4s ease";
            displayweather.style.display="block";
         
            //gets coordinate
            latitude.textContent = "Lat:" + data["coord"]["lat"];
            longitude.textContent = "Long:" + data["coord"]["lon"];
            //Gets country name:
            country.textContent=data["sys"]["country"];

            //weather condition
            weathercondition.textContent ="Description: " + data["weather"][0]["description"];
            //converting kelvin to Celsius.
            var celsius=  data["main"]["temp"] - 273.15;
            temp.innerHTML ="Temperature: " + celsius.toFixed(1) + "<sup>o</sup>C";
            humidity.textContent= "Humidity: " + data["main"]["humidity"];
            pressure.textContent= "Pressure: " + data["main"]["pressure"] + "hPa";
            //Wind
            windspeed.textContent="Wind Speed: " + data["wind"]["speed"] + "m/s";
            winddeg.textContent= "Wind Degree: " + data["wind"]["deg"];
            //changing background image based on returned information
            condition.textContent= "Over-all Condition: " + data["weather"][0]["main"];
            switch(data["weather"][0]["main"].toUpperCase()){
                case "RAIN":
                    body.style.backgroundImage='url("images/rain_background.jpg")';
                    body.style.color="white";
                    break
                case "THUNDERSTORM":
                    body.style.backgroundImage='url("images/thunderstorm_background.jpg ")'
                    break
                case "DRIZZLE":
                    body.style.backgroundImage='url("images/drizzle_background.jpg ")'
                    break
                case "SNOW":
                    body.style.backgroundImage='url("images/snow_background.jpg")';
                    body.style.color="black";
                    break
                case "CLOUDS":
                    body.style.backgroundImage='url("images/cloudy_background.jpg ")';
                    body.style.color="black";

                    break
                default:
                    body.style.backgroundImage='url("images/default_background.jpg ")'
            }
            };
           
         
           }).catch((error) => {alert("Network Error")});
        };

        function cloose(){
        displayweather.style.animation="fadeout 2s ease";
        document.getElementById("enterlocation").style.display="block";
        document.getElementById("enterlocation").style.animation="fadein 3s ease";
        input_field.style.transform="translateY(0)";
    setTimeout(() =>displayweather.style.display="none",1500); //sets a 3s  time out to let the fade effect works and make the display none
        }