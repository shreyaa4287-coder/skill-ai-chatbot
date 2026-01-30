const chatBox = document.getElementById("chat-box");

async function sendMessage() {
    const input = document.getElementById("user-input");
    const userText = input.value.trim();
    if (!userText) return;

    addMessage(userText, "user");
    input.value = "";

    addMessage("Typing...", "bot");

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer sk-...FpkA"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: userText }]
            })
        });

        const data = await response.json();
        chatBox.lastChild.remove();

        addMessage(data.choices[0].message.content, "bot");
    } catch (error) {
        chatBox.lastChild.remove();
        addMessage("Error fetching response 😢", "bot");
    }
}

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}
