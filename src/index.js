import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { kv } from '@vercel/kv';

const app = express();
const PORT = process.env.PORT || 3000;

//check wheter kv is present in env variable or not
console.log(process.env);

// Enable CORS for specific origin
app.use(cors({
//   origin: "https://example.com"
}));

// Parse request body and extended the size to 1mb

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// GET route
app.get("/", (req, res) => {
  let data = {};
  data["GET"] = req.query;
  // res.send(data);
  res.send(process.env);
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
