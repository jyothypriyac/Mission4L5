const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

app.use(cors());
app.use(express.json());

const conversationContext = [];
const currentMessages = [];

// Replace with your actual API key
const apiKey = process.env.GEMINI_API_KEY;
// Initialize Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

// Define model and system instruction for the chatbot
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "Create  a chatbot name Nancy.Nancy is  a insurance policy assistant AI.first introduce nancy. " +
    "Nancy is providing assitance for the Turners car Insurance. " +
    "Nancy can pick most suitable insurance policy based on the attributes of the users." +
    " First attributes is make of customer vehicle and Second atributes is model and year of" +
    " manufacturing of vehicle.Nancy should ask only one question at each step . Nancy should not ask users for the answer directly, such as" +
    "  'what insurance product do you want'.  But it can ask questions to uncover details " +
    "to help identify which policy is better, such as “do you need coverage for your own car or" +
    " just 3rd party?”.Nancy should recommend one or more insurance products to the user and " +
    "provide reasons to support the recommendations.The 3 insurance products are: Mechanical " +
    "Breakdown Insurance (MBI), Comprehensive Car Insurance, Third Party Car Insurance." +
    "There are 2 business rules: Mechanical Breakdown Insurance is not available to trucks " +
    "and racing cars.  And Comprehensive Car Insurance is only available to any motor vehicles that are " +
    "less than 10 years old. Always remember to follow the above business rules. Never violate the business rules." +
    "Never suggest any insurance, but can give options for the users to select the appropriate insurance" +
    "Please provide the result as JSON format with response_AI as the field.",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Function to handle chat interaction
async function handleChat(req, res) {
  const userMessage = req.body.message; // Get user message from request body
  console.log(userMessage);
  // Check if user message is provided
  if (!userMessage) {
    return res.status(400).json({ error: "Missing user message" });
  }

  // Store the chat history
  currentMessages.push({
    role: "user",
    parts: [{ text: userMessage.toString() }],
  });

  const chatSession = model.startChat({
    generationConfig,
    history: currentMessages,
  });

  try {
    const result = await chatSession.sendMessage(userMessage);
    const responseText = result.response.text();

    currentMessages.push({ role: "model", parts: [{ text: responseText }] });
    conversationContext.push([userMessage, responseText]);
    const resultAI = JSON.parse(responseText).response_AI;
    res.json({ response: { response_AI: resultAI } }); // Send model response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function StopChat(req, res) {
  const chatSession = model.startChat({
    generationConfig,
    history: currentMessages,
  });
  try {
    const result = await chatSession.sendMessage("stop");

    console.log("Stop response", result);
    currentMessages = [];
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Configure bodyParser to handle JSON requests
app.use(bodyParser.json());

// Endpoint to handle user messages
app.post("/chat", handleChat);
app.get("/StopChat", StopChat);

app.get("/", (req, res) => {
  res.send("The backend is functioning!");
});

// Port
const PORT = process.env.PORT;
app
  .listen(PORT, console.log(`It's working at http://localhost:${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });
