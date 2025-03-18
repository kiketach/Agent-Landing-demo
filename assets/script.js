/* filepath: c:\Users\Audisoft\Documents\Proyectos\Agent-Landing\assets\script.js */
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

/* filepath: c:\Users\Audisoft\Documents\Proyectos\Agent-Landing\assets\script.js */
async function sendMessage() {
    const input = document.getElementById("chatMessage");
    const message = input.value.trim();
    if (!message) return;

    const chatBody = document.getElementById("chatBody");
    chatBody.innerHTML += `<div class="message user"><strong>Tú:</strong> ${message}</div>`;
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
            // Format the agent's response
            const agentResponse = `
                <div class="message bot">
                    <strong>💬 Hat Trick:</strong><br><br>
                    🔥 ¡Hola! Estoy aquí para ayudarte con tu compra. 🏆👟<br><br>
                    📋 Para coordinar tu pedido y agendar una llamada de confirmación, por favor indícame los siguientes datos:<br><br>
                    1️⃣ Tu nombre ✍️:<br>
                    2️⃣ Tu número de teléfono 📞:<br>
                    3️⃣ Modelo de zapatillas 👟:<br>
                    4️⃣ Talla 🔢:<br>
                    5️⃣ Color 🎨:<br>
                    6️⃣ Fecha y hora para la llamada 📅⏰:<br>
                    7️⃣  (Si no tienes preferencia, puedo sugerirte horarios disponibles).<br><br>
                    📲 ¡Envíame esta información y programaremos tu llamada de inmediato! 🚀
                </div>
            `;
            chatBody.innerHTML += agentResponse;
        } else {
            chatBody.innerHTML += `<div class="message bot"><strong>Hat Trick:</strong> Respuesta inválida</div>`;
        }
    } catch (error) {
        console.error("Error al conectar con el agente:", error);
        chatBody.innerHTML += `<div class="message bot"><strong>Hat Trick:</strong> No se pudo conectar</div>`;
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}


// Basic Cart Functionality (new - ADDED TO EXISTING SCRIPT)
function addToCart(productName, price) {
    // This is a VERY basic example.  A real cart would need to:
    // 1. Store cart data in local storage or a cookie.
    // 2. Display the cart contents to the user.
    // 3. Handle quantities.
    alert('Added ' + productName + ' to cart for $' + price);  // Replace with actual cart logic
}

// Example of how to call addToCart from your HTML:
// In your product item:  <a href="#" class="add-to-cart" onclick="addToCart('Nombre Zapatilla 1', 99.99)">Añadir al carrito</a>