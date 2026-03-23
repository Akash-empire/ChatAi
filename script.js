var API_KEY = "AIzaSyAxJ5tW7Mx4X0buomvKFPXL2DRKyiK-BQY";

const chat = document.getElementById("chat");

// ================= MEMORY =================
let history = [];

// ================= SEND =================
function sendMessage() {
  let input = document.getElementById("msg");
  let text = input.value.trim();

  if (text === "") return;

  addMessage(text, "sent");
  input.value = "";

  showTyping();

  setTimeout(async () => {
    removeTyping();

    let reply = await generateReply(text);

    addMessage(reply, "received");

  }, 100);
}

// ================= GEMINI API =================
async function generateReply(text) {
  // 1. Update history with user input
  history.push({
    role: "user",
    parts: [{ text: text }]
  });

  try {
    // Use the STABLE v1 endpoint instead of v1beta
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: history
        })
      }
    );

    // Check if the server actually returned a 200 OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Details:", errorData);
      return "Connection error. Please try again later. 🛠️";
    }

    const data = await response.json();

    // Safely extract the reply using Optional Chaining
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return "I'm sorry, I couldn't generate a response. Please rephrase.";
    }

    // 2. Store AI reply in history for conversation context
    history.push({
      role: "model",
      parts: [{ text: reply }]
    });

    return reply;

  } catch (err) {
    console.error("Network Error:", err);
    return "Network error. Check your internet connection. 🌐";
  }
}

// ================= UI =================
function addMessage(content, type) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = `message ${type}`;

  div.innerHTML = `<div class="text-box">${content}</div>`;

  chat.appendChild(div);

  // Smooth scroll with bounce effect
  chat.scrollTo({
    top: chat.scrollHeight,
    behavior: 'smooth'
  });
}

// Logic to auto-resize textarea
const tx = document.getElementById("msg");
tx.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

function showTyping() {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = "message received";
  div.id = "typing";
  div.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  let t = document.getElementById("typing");
  if (t) t.remove();
}

// ENTER KEY
document.getElementById("msg").addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});