
const { query } = require("express");
const express = require("express");
const https = require("https");
const { dirname } = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
   
   res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
    console.log(req.body.cityName); 

    const query = req.body.cityName;
   const apiKey = "{YOUR API KEY}";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";

   https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDesc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The Weather is currently " + weatherDesc + "</p>"); 
        res.write("<h1>The Temperature in " + query +" is " + temp + "degree Celsius.</h1>");
        res.write("<img src="+ imageUrl + ">");
        res.send();
    })
   })
})

app.listen(3000, function() {
    console.log("Server in running in port 3000");
})
