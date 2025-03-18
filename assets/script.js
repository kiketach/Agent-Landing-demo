/* Modelos buttom */
function scrollToProducts(event) {
    event.preventDefault(); // Prevent default link behavior
    const productsSection = document.getElementById('products-z');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}
/* Products */
const productGrid = document.querySelector('.product-grid');
const scrollLeftButton = document.querySelector('.scroll-button.scroll-left');
const scrollRightButton = document.querySelector('.scroll-button.scroll-right');

scrollLeftButton.addEventListener('click', () => {
    productGrid.scrollLeft -= 250; // Adjust scroll amount
});

scrollRightButton.addEventListener('click', () => {
    productGrid.scrollLeft += 250; // Adjust scroll amount
});
/* Products Modal */
function openModal(productId) {
    event.preventDefault(); 
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');

    let productDetails = getProductDetails(productId);

    modalContent.innerHTML = `
        <h2>${productDetails.name}</h2>
        <img src="${productDetails.image}" alt="${productDetails.name}">
        <p>${productDetails.description}</p>
        <span>${productDetails.price}</span>
        <a href="#" class="add-to-cart">Añadir al carrito</a>
    `;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}

function getProductDetails(productId) {
    // Replace this with your actual data loading logic (e.g., from an array or API)
    if (productId === 'zamba') {
        return {
            id: 'zamba',
            name: 'ZAMBA',
            image: './assets/Zamba1.png',
            description: 'Zapatilla de cuero 100%.',
            price: '$99.000'
        };
    } else if (productId === 'master') {
        return {
            id: 'master',
            name: 'MASTER',
            image: './assets/Master2.png',
            description: 'Zapatilla de cuero 100%.',
            price: '$99.000'
        };
    } else if (productId === 'ultra') {
        return {
            id: 'ultra',
            name: 'ULTRA',
            image: './assets/Ultra1.png',
            description: 'Zapatilla de cuero 100%.',
            price: '$99.000'
        };
    } else if (productId === 'copa') {
        return {
            id: 'copa',
            name: 'COPA',
            image: './assets/Copa5.png',
            description: 'Sintetico Alta Calidad.',
            price: '$89.000'
        };
    } else if (productId === 'dynamic') {
        return {
            id: 'dynamic',
            name: 'DYNAMIC',
            image: './assets/Dynamic1.png',
            description: 'Sintetico Alta Calidad',
            price: '$89.000'
        };
    } else if (productId === 'sala') {
        return {
            id: 'sala',
            name: 'SALA',
            image: './assets/Sala11.png',
            description: 'Sintetico Alta Calidad.',
            price: '$89.000'
        };
    } else {
        return {
            id: 'unknown',
            name: 'Unknown Product',
            image: './assets/placeholder.png',
            description: 'Product details not found.',
            price: 'N/A'
        };
    }
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

/* Ventana del CHAT */
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
                    3️⃣ Fecha y hora para la llamada 📅⏰:<br>
                    📲 ¡Envíame esta información y programaremos tu llamada de inmediato! 🚀
                </div>
            `;
            chatBody.innerHTML += agentResponse;
            setTimeout(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 100);
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