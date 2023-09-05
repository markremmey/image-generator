import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI,
// });

// const openai = new OpenAIApi(configuration);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.dir(openai, { depth: null });

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/dream", (req, res) => {
  res.send(
    "Hello, welcome to the dream endpoint. Use a POST request to create an image."
  );
});

app.post("/dream", async (req, res) => {
  const prompt = req.body.prompt;
  console.log("prompt: %s", prompt);
  const aiResponse = await openai.images.generate({
    // createImage({
    prompt: prompt,
    n: 1,
    size: "1024x1024",
  });
  // console.log("response: %s", aiResponse.data);
  console.log(JSON.stringify(aiResponse, null, 2));
  const image = aiResponse.data[0].url; // .image[0].url
  res.send({ image });
});

app.listen(8080, () => console.log("make art on http://localhost:8080/dream"));
