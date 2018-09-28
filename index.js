var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {
    
    var request = require('request');
    var opn = require('opn');
    var token = "xoxp-442873755396-443061927298-444145097904-180ea4fed0773f1c7f8584ac64e041ee";
    var channelId = "CD2CAFPU6";
    var getUrl = "https://slack.com/api/files.list?token="+token+"&channel="+channelId+"&types=images";

    function actualHttpGet(url) {
      return new Promise(resolve => {
          request(url, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(body.files[body.files.length-1].permalink_public);  
            var link = body.files[body.files.length-1].permalink_public;
            opn(link);  
            console.log("popped");    
        });
      });
    }

    async function httpGet(url){
        const imageUrl = await actualHttpGet(url);
        return imageUrl;
    }

    httpGet(getUrl).then((returnCode) => {
        console.log(returnCode);
    });    
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});