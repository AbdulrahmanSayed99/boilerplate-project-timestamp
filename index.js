// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
let timeObject = {}
app.get('/api/:timestamp', (req, res)=>{
  time= req.params.timestamp
  console.log(time)
  if (isNaN(new Date(Number(time)).getTime()) && isNaN(new Date(time).getTime())) {timeObject = { error : "Invalid Date" }
  }
  

 else if (time.includes('-') || time.includes('/') || time.includes(' ')) {
    timeObject= {"unix": new Date(time).getTime(),
      "utc": new Date(time).toUTCString()
    }
  }
  else { 
    
    timeObject= {"unix": Number(time),
    "utc": new Date(Number(time)).toUTCString()
  }}
  res.json(timeObject)
})

app.get('/api', (req,res)=>{
  timeObject= {"unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  }
  res.json(timeObject)
})
