const apiKey = "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"; // Replace with your OpenAI API Key
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Handle sending a message
sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, "user");
        userInput.value = "";
        fetchResponse(userMessage);
    }
});

userInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendButton.click();
    }
});

// Add a message to the chat box
function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('message', sender);
    const messageText = document.createElement('div');
    messageText.classList.add('text');
    messageText.textContent = text;
    message.appendChild(messageText);
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Fetch response from OpenAI API
async function fetchResponse(prompt) {
    addMessage("Typing...", "ai");

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await response.json();
        document.querySelector(".ai:last-child .text").textContent = data.choices[0].message.content.trim();
    } catch (error) {
        document.querySelector(".ai:last-child .text").textContent = "Error: Unable to fetch response.";
        console.error(error);
    }
}
