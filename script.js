const chatBox = document.getElementById("chat-box");

async function sendMessage() {
    const input = document.getElementById("user-input");
    const userText = input.value.trim();
    if (userText === "") return;

    addMessage(userText, "user");
    input.value = "";

    addMessage("Typing...", "bot");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer sk-...3v4A"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userText }]
        })
    });

    const data = await response.json();
    chatBox.lastChild.remove();

    addMessage(data.choices[0].message.content, "bot");
}

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
