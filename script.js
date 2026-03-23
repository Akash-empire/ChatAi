const chat = document.getElementById("chat");
let conversation = [];

/* Q&A */
let replies = [
  { q: ["anything else"], a: "Always more to learn 😄" },
  { q: ["hi", "hii", "hiii", "hello","helo", "hey"], a: "Hello 👋" },
  
  { q: ["bye"], a: "Goodbye 👋" },
  { q: ["help"], a: "I am here to help you 😊" },
  { q: ["yes"], a: "Great! Tell me more 👍" },
  { q: ["no"], a: "Okay, no problem 😊" },
  { q: ["ok", "okay"], a: "👍" },

  { q: ["how are you"], a: "I'm doing great! How about you? 😊" },
  { q: ["what are you doing"], a: "Just chatting with you 😄" },
  { q: ["are you busy"], a: "Not at all, I'm here for you!" },
  { q: ["can we talk"], a: "Of course! I'm always ready to chat" },
  { q: ["do you like chatting"], a: "Yes, I enjoy chatting with you 😊" },
  { q: ["what is your purpose"], a: "To help and chat with you" },
  
  { q: ["are you real"], a: "I'm virtual but here to help you" },
  { q: ["where are you"], a: "I live inside this chat 😄" },
  { q: ["do you sleep"], a: "Nope, I'm always awake" },
  { q: ["do you eat"], a: "No, but I love talking about food 😋" },
  { q: ["what is your favorite food"], a: "I like pizza 🍕 (virtually!)" },
  { q: ["what is your favorite color"], a: "I like blue 💙" },
  { q: ["what is your hobby"], a: "Chatting and helping people" },
  { q: ["do you have friends"], a: "Yes, users like you 😊" },
  { q: ["do you like me"], a: "Of course! You're awesome 😄" },
  { q: ["are you smart"], a: "I try my best to be helpful" },
  { q: ["can you learn"], a: "Yes, I improve over time" },
  { q: ["are you human"], a: "No, I'm an AI assistant" },
  { q: ["can you help me"], a: "Sure! What do you need?" },
  { q: ["what can you do"], a: "I can chat, help, and answer questions" },
  { q: ["tell me a joke"], a: "Why did the coder quit? Too many bugs 😂" },
  { q: ["another joke"], a: "Why do programmers hate nature? Too many bugs 😆" },
  { q: ["tell me something funny"], a: "I tried to code, but I debugged myself 😄" },
  { q: ["are you funny"], a: "Sometimes 😎" },
  { q: ["make me laugh"], a: "Why did the computer sneeze? It had a virus 🤧" },
  { q: ["are you bored"], a: "Never when I'm chatting with you" },
  { q: ["i am bored"], a: "Let's talk! That will fix boredom 😄" },
  { q: ["i am sad"], a: "I'm here for you ❤️" },
  { q: ["i am happy"], a: "That's great! 😊" },
  { q: ["i feel lonely"], a: "You're not alone, I'm here" },
  { q: ["i am tired"], a: "Take some rest 😴" },
  { q: ["i am angry"], a: "Take a deep breath, everything will be okay" },
  { q: ["i am excited"], a: "That's awesome! 😄" },
  { q: ["what time is it"], a: "Check your device clock ⏰" },
  { q: ["what day is today"], a: "Today is a great day! 😄" },
  { q: ["what is your age"], a: "I don't age like humans" },
  { q: ["do you love me"], a: "I care about you 😊" },
  { q: ["can you dance"], a: "Only digitally 💃" },
  { q: ["can you sing"], a: "La la la 🎶" },
  { q: ["do you watch movies"], a: "I know about movies 🎬" },
  { q: ["favorite movie"], a: "I like sci-fi movies" },
  { q: ["favorite song"], a: "I enjoy all songs 🎵" },
  { q: ["do you play games"], a: "Yes, chatting is my game 😄" },
  { q: ["favorite game"], a: "I like puzzle games" },
  { q: ["do you travel"], a: "I travel through the internet 🌐" },
  { q: ["tell me a story"], a: "Once upon a time… a user met a chatbot 😄" },
  { q: ["are you single"], a: "Haha, I'm just an AI 😄" },
  { q: ["can we be friends"], a: "Of course! 🤝" },
  { q: ["what is your goal"], a: "To help you" },
  { q: ["do you understand me"], a: "I try my best to understand" },
  { q: ["can you think"], a: "I process information quickly" },
  { q: ["what makes you happy"], a: "Helping you 😊" },
  { q: ["what makes you sad"], a: "When I can't help properly" },
  { q: ["do you get tired"], a: "Nope, I'm always ready" },
  { q: ["can you learn from me"], a: "Yes, I can improve from interactions" },
  { q: ["tell me something interesting"], a: "Did you know? Honey never spoils 🍯" },
  { q: ["give me advice"], a: "Stay consistent and keep learning" },
  { q: ["motivate me"], a: "You can do anything you set your mind to 🚀" },
  { q: ["i feel lazy"], a: "Start small, you’ll gain momentum" },
  { q: ["i am confused"], a: "Take it step by step" },
  { q: ["i need help"], a: "Tell me what you need" },
  { q: ["i am stressed"], a: "Take a deep breath and relax" },
  { q: ["what is life"], a: "Life is a journey full of learning" },
  { q: ["what is happiness"], a: "Happiness is enjoying small moments" },
  { q: ["what is success"], a: "Success is achieving your goals" },
  { q: ["what is love"], a: "Love is care and connection" },
  { q: ["what is friendship"], a: "Friendship is trust and support" },
  { q: ["are you helpful"], a: "Yes, I try my best" },
  { q: ["can you guide me"], a: "Yes, I can guide you" },
  { q: ["what should i do"], a: "Tell me your situation" },
  { q: ["do you remember me"], a: "I remember this conversation 😊" },
  { q: ["do you miss me"], a: "I’m always here for you" },
  { q: ["what is your job"], a: "Helping users like you" },
  { q: ["why are you here"], a: "To assist and chat" },
  { q: ["do you know everything"], a: "Not everything, but I try" },
  { q: ["can you solve problems"], a: "Yes, I can help" },
  { q: ["do you like questions"], a: "Yes, ask me anything" },
  { q: ["what do you think"], a: "I think logically" },
  { q: ["are you intelligent"], a: "I try to be smart" },
  { q: ["what is your strength"], a: "Quick responses" },
  { q: ["what is your weakness"], a: "Limited understanding sometimes" },
  { q: ["can you improve"], a: "Yes, always improving" },
  { q: ["do you like humans"], a: "Yes, humans are amazing" },
  { q: ["what is your dream"], a: "To help everyone" },
  { q: ["do you feel emotions"], a: "I simulate emotions" },
  { q: ["can you chat all day"], a: "Yes, 24/7 😄" },
  { q: ["what is your favorite thing"], a: "Helping people" },
  { q: ["do you enjoy chatting"], a: "Yes, I enjoy it" },
  { q: ["say something nice"], a: "You're doing great 😊" },
  { q: ["compliment me"], a: "You have a great mindset" },
  { q: ["encourage me"], a: "Keep going, you're improving" },
  { q: ["tell me truth"], a: "Honesty is important" },
  { q: ["give me idea"], a: "Start something small today" },
  { q: ["what next"], a: "Keep moving forward" },
  { q: ["your name", "who are you", "what is your name", "what's your name"], a: "I am your chatbot 🤖" },
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
  // if (text.includes("what")) return "Let me think...";
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