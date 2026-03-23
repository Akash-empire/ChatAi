const chat = document.getElementById("chat");
let conversation = [];
AIzaSyBGc2HI9VW2wGa0lP4GKJM-VLQVcDQbSjI
/* Q&A */
let replies = [
  { q: ["anything else"], a: "Always more to learn 😄" },
  { q: ["hi", "hii", "hiii", "hello","helo", "hey"], a: "Hello 👋" },

  { q: ["fine"], a: "Good to hear 😊" }
];

/* SEND */
function sendMessage() {
  let input = document.getElementById("msg");
  let text = input.value.trim();
  if (text === "") return;

  addMessage(text, "sent");
  conversation.push({ role: "user", text: text });
  input.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();
    let reply = generateReply(text);
    addMessage(reply, "received");
    conversation.push({ role: "bot", text: reply });
  }, 1000);
}

/* FIXED MATCHING */
function generateReply(text) {
  let userText = text.toLowerCase().replace(/[^\w\s]/gi, "").trim();

  // EXACT MATCH
  let found = replies.find(item =>
    item.q.some(k => userText === k)
  );
  if (found) return found.a;

  // SAFE WORD MATCH
  let words = userText.split(" ");
  found = replies.find(item =>
    item.q.some(k => words.includes(k))
  );
  if (found) return found.a;

  // CONTEXT
  let lastUser = conversation.slice(-2, -1)[0];
  if (lastUser) {
    let prev = lastUser.text.toLowerCase();

    if (prev.includes("how are you") && userText.includes("you")) {
      return "I'm doing great! 😊";
    }

    if (prev.includes("help") && userText.includes("yes")) {
      return "Tell me what you need 👍";
    }
  }

  return getFallback(userText);
}

/* FALLBACK */
function getFallback(text) {
  if (text.includes("how")) return "Can you explain more?";
  if (text.includes("why")) return "Interesting question 🤔";
  if (text.includes("what")) return "Let me think...";
  return "Tell me more 😊";
}

/* ADD MESSAGE */
function addMessage(content, type) {
  let div = document.createElement("div");
  div.className = "message " + type;
  let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  div.innerHTML = content + `<div>${time}</div>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* TYPING */
function showTyping() {
  let div = document.createElement("div");
  div.className = "message received";
  div.id = "typing";
  div.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  chat.appendChild(div);
}

function removeTyping() {
  let t = document.getElementById("typing");
  if (t) t.remove();
}

/* ENTER KEY */
document.getElementById("msg").addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

/* FILE */
document.getElementById("file").addEventListener("change", function () {
  let file = this.files[0];
  if (!file) return;

  let reader = new FileReader();

  reader.onload = function (e) {
    let content = file.type.startsWith("image/")
      ? `<img src="${e.target.result}">`
      : `<a href="${e.target.result}" download>${file.name}</a>`;

    addMessage(content, "sent");
    showTyping();

    setTimeout(() => {
      removeTyping();
      addMessage("File received 👍", "received");
    }, 1000);
  };

  reader.readAsDataURL(file);
});