function toggleChat() {
    document.getElementById("chatContainer").classList.toggle("open");
}

function clearChat() {
    document.getElementById("chatBody").innerHTML = "";
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById("chatMessage");
    const message = input.value.trim();
    if (!message) return;

    const chatBody = document.getElementById("chatBody");
    chatBody.innerHTML += `<div><strong>Tú:</strong> ${message}</div>`;
    input.value = "";

    const sessionId = "defaultSession";

    try {
        const response = await fetch("https://eabril.app.n8n.cloud/webhook/agente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, sessionId })
        });

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        if (!text) {
            throw new Error("Respuesta vacía del servidor");
        }

        const data = JSON.parse(text);

        if (Array.isArray(data) && data.length > 0 && data[0].output) {
            chatBody.innerHTML += `<div><strong>Hat Trick:</strong> ${data[0].output}</div>`;
        } else {
            chatBody.innerHTML += `<div><strong>Hat Trick:</strong> Respuesta inválida</div>`;
        }
    } catch (error) {
        console.error("Error al conectar con el agente:", error);
        chatBody.innerHTML += `<div><strong>Hat Trick:</strong> No se pudo conectar</div>`;
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}