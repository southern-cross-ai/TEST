const OPENROUTER_API_KEY = "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";//test only API

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (message === "") return;

  addMessage(message, "user");
  input.value = "";

  try {
    const reply = await callOpenRouterAPI(message);
    addMessage(reply, "bot");
  } catch (error) {
    console.error("API Error:", error);
    addMessage("!!!Failed to connect to OpenRouter.", "bot");
  }
}

async function transitionToChat() {
  const input = document.getElementById("initialInput");
  const question = input.value.trim();
  if (question === "") return;

  document.getElementById("page1").style.transform = "translateY(-100%)";
  document.getElementById("page2").style.transform = "translateY(0)";

  setTimeout(() => addMessage(question, "user"), 600);

  try {
    const reply = await callOpenRouterAPI(question);
    setTimeout(() => addMessage(reply, "bot"), 800);
  } catch (error) {
    console.error("API Error:", error);
    addMessage("!!!Failed to connect to OpenRouter.", "bot");
  }
}

async function callOpenRouterAPI(userMessage) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(OPENROUTER_API_KEY && { "Authorization": `Bearer ${OPENROUTER_API_KEY}` })
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [{ role: "user", content: userMessage }]
      })
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Raw error response:", errorText);
      throw new Error("OpenRouter API error: " + response.status);
    }
  
    const data = await response.json();
    return data.choices[0].message.content;
  }

function addMessage(text, sender) {
  const chat = document.getElementById("chat");
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.textContent = text;
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}

function goBack() {
  document.getElementById("page1").style.transform = "translateY(0)";
  document.getElementById("page2").style.transform = "translateY(100%)";
}
