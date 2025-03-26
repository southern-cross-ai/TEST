function transitionToChat() {
    const input = document.getElementById("initialInput");
    const question = input.value.trim();
    if (question === "") return;

    document.getElementById("page1").style.transform = "translateY(-100%)";
    document.getElementById("page2").style.transform = "translateY(0)";

    setTimeout(() => {
      addMessage(question, "user");
      addMessage("The model is not implemented yet", "bot");
    }, 600);
  }

  function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    input.value = "";

    setTimeout(() => {
      addMessage("The model is not implemented yet", "bot");
    }, 500);
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