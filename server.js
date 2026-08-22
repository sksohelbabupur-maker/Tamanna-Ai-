const express = require("express");
const OpenAI = require("openai");
const path = require("path");

const app = express();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/chat", async (req, res) => {
  try {
    const message = req.body.message;

    const response = await client.responses.create({
      model: "gpt-5.6",
      instructions:
        "তোমার নাম তামান্না AI। তুমি বন্ধুত্বপূর্ণভাবে বাংলায় উত্তর দেবে। উত্তর সহজ, পরিষ্কার এবং সাহায্যকারী হবে।",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI-এর সাথে যোগাযোগ করা যাচ্ছে না।"
    });
  }
});

app.listen(3000, () => {
  console.log("তামান্না AI চলছে");
});
