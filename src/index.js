const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { get } = require('@vercel/edge-config');


const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for specific origin
app.use(cors({
//   origin: "https://example.com"
}));

// Parse request body and extended the size to 1mb

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// export const config = { matcher: '/welcome' };

// GET route
app.get("/", (req, res) => {
    const greeting = await get('greeting');
 
  let data = {};
  data["GET"] = req.query;
  // res.send(data);
   var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
// res.send({"status":"OK","API":"WORKING @ V1","API_V1":"/API/V1","url":fullUrl,"CORS":"allowed","GET":req.query,"headers":req.headers});
if(data['GET']['view']=='chatbot')
{
    res.status(301).redirect("https://kivtechs.cloud/chao")
}
  else 
{
  console.log(data);
}
  
});

// POST route
app.post("/", (req, res) => {
  console.log("POST request received");
  let data={};
   data['POST'] = req.body;
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
