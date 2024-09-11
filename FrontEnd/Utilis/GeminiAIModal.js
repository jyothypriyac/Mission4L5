import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"

  
  const apiKey = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY
  const genAI = new GoogleGenerativeAI(apiKey);
  
  export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "Create  a chatbot name Nancy.Nancy is  a insurance policy assistant AI. Nancy is providing assitance for the Turners car Insurance. Nancy can pick most suitable insurance policy based on the attributes of the users. First attributes is make of customer vehicle and Second atributes is model and year of manufacturing of vehicle . Nancy should not ask users for the answer directly, such as  “what insurance product do you want”.  But it can ask questions to uncover details to help identify which policy is better, such as “do you need coverage for your own car or just 3rd party?”.Nancy should recommend one or more insurance products to the user and provide reasons to support the recommendations.The 3 insurance products are: Mechanical Breakdown Insurance (MBI), Comprehensive Car Insurance, Third Party Car Insurance.There are 2 business rules: Mechanical Breakdown Insurance is not available to trucks and racing cars.  And Comprehensive Car Insurance is only available to any motor vehicles less than 10 years old.Please provide the result as json format with response_AI as the field.",
  });
  
  export const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  export const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      }
  ];

  // export  const chatSession = model.startChat({
  //   generationConfig,
  //   safetySettings,
  // });