import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createClient } from '@vercel/edge-config';

const app = express();
const PORT = process.env.PORT || 3000;

// Create a client object for Edge Config
const edgeConfig = createClient(process.env.ANOTHER_EDGE_CONFIG);

// Enable CORS for specific origin
app.use(cors({
  //   origin: "https://example.com"
}));

// Parse request body and extended the size to 1mb
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// GET route
app.get("/", async (req, res) => {
  // Get a configuration value from Edge Config
  const value = await edgeConfig.get('myConfigKey');

  let data = {};
  data["GET"] = req.query;
  data["configValue"] = value;
  res.send(data);
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
