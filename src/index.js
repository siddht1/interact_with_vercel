const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require('@vercel/edge-config');

const vercel_token = process.env.interact_with_vercel_token;

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for specific origin
app.use(cors({
//   origin: "https://example.com"
}));

// Parse request body and extended the size to 1mb

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// Initialize Vercel Edge config
async function initializeEdgeConfig() {
  const client = createClient(vercel_token);
  const config = await client.fetch();
  return config;
  // Do something with the config, e.g. modify headers or rewrite URLs
}

// GET route
app.get("/", (req, res) => {
  let data = {};
  data["GET"] = req.query;
  res.send(config);
});

// POST route
app.post("/", (req, res) => {
  console.log("POST request received");
  let data={};
   data['POST'] = req.body;
  res.send(initializeEdgeConfig());
});

// Start the server and initialize Vercel Edge config
app.listen(PORT, async () => {
  console.log(`API is listening on port ${PORT}`);
  await initializeEdgeConfig();
});
