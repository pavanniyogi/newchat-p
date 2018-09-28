var express = require('express');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname));

// set the home page route
app.get('/', function(req, res) {
    
    var request = require('request');
    var token = "xoxp-446020882759-444784640004-446345628710-4cfb37211b57380222848e3ff4a42525";
    var channelId = "CD49MBF7Y";
    var getUrl = "https://slack.com/api/files.list?token="+token+"&channel="+channelId+"&types=images";
    
    request(getUrl, { json: true }, (error, result, body) => {
        if (error) { return console.log(error); }
        res.redirect(body.files[0].permalink_public);        
    });
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});