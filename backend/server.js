const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const OpenAIApi = require("openai");
const Configuration = require("openai");

const config = new Configuration({
  apiKey: "",
});

const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createChatCompletion({
    model: "text-davinci-003",
    maxtokens: 512,
    temperature: 0,
    prompt: prompt,
  });

  res.send(completion.data.choices[0].text);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});