import styles from "./ChatScreen.module.css";
import React, { useState, useEffect } from "react";

function ChatScreen() {
  // All the use states variables to store the questions and answers

  const [chatHistory, setChatHistory] = useState([]);
  const [newuserInput, setNewuserInput] = useState("");
  const [chatSession, setChatSession] = useState(null);

  // Handler for new answer input change
  const handleNewuserInputChange = (e) => {
    setNewuserInput(e.target.value);
  };
  // Handler for sending a new message
  const handleSendMessage = () => {
    if (newuserInput.trim()) {
      // Update the last question with the new answer
      setChatHistory((prevChatHistory) => {
        const newMessage = {
          role: "user",
          parts: [{ text: newuserInput }],
        };
        return [...prevChatHistory, newMessage];
      });

      handleAIModalCall(newuserInput);
      // Clear the new answer input
      setNewuserInput("");
    }
  };

  // Function to call the AI model and get a new response
  const handleAIModalCall = async (userInput) => {
    try {
      console.log("chathistory", userInput);
      sendMessage(userInput);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };
  async function sendMessage(message) {
    try {
      const response = await fetch("http://localhost:8082/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log("result", data.response.response_AI);
      setChatHistory([
        ...chatHistory,
        { role: "user", parts: [{ text: message }] },
        { role: "model", parts: [{ text: data.response.response_AI }] },
      ]);
    } catch (error) {
      console.error("Error:", error);
      fetch("http://localhost:8082/api/StopChat");
      setChatHistory([
        ...chatHistory,
        {
          role: "model",
          parts: [{ text: "An error occurred while processing your request." }],
        },
      ]);
    }
  }
  return (
    <div className={styles.outerContainer}>
     
 

      <div className={styles.container}>
      <div>Nancy:- Your AI Insurance Assistant</div>
      <br />
        <div className={styles.chatContainer}>
       
        
          {chatHistory.map((message) => (
            <div key={message.id}>
              {message.role === "user" && (
                <div key={message.id + "question"} className={styles.message}>
                  {"User :" + message.parts[0].text}
                </div>
              )}
              {message.role === "model" && (
                <div
                  key={message.id + "answer"}
                  className={styles.messageAnswer}
                >
                  {"Nancy :" + message.parts[0].text}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <textarea
            rows={5}
            onChange={handleNewuserInputChange}
            className={styles.messageBox}
            value={newuserInput}
          ></textarea>
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
