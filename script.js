// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Toggle hamburger icon between bars and times
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth scrolling for anchor links starting with # on the same page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Skip for empty hash or external links
        if (targetId === '#' || targetId.includes('.html')) return;

        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Chat Modal Functionality
const chatModal = document.getElementById('chatModal');
const chatInput = document.querySelector('.chat-footer input');
const chatBtn = document.querySelector('.chat-footer button');
const chatBody = document.querySelector('.chat-body');

// Global variables to track open state
let isChatOpen = false;

function openChat() {
    chatModal.style.display = 'flex';
    isChatOpen = true;
}

function closeChat() {
    chatModal.style.display = 'none';
    isChatOpen = false;
}

// Simple bot response simulation for chat
chatBtn.addEventListener('click', handleChatSubmit);
chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleChatSubmit();
    }
});

function handleChatSubmit() {
    const text = chatInput.value.trim();
    if (text === '') return;

    // Append user message
    appendMessage(text, 'user');
    chatInput.value = '';

    // Scroll chat to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate bot replying instantly and focusing on CALL
    setTimeout(() => {
        appendMessage('For instant Delta Airlines & US Major Airlines bookings, Child Visa queries, or UNMR assistance, please click our CALL button: +1 888 299 1968. We are available 24/7.', 'bot');
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function appendMessage(text, sender) {
    const msgP = document.createElement('p');
    msgP.textContent = text;

    if (sender === 'user') {
        msgP.style.background = '#003366';
        msgP.style.color = '#fff';
        msgP.style.padding = '10px 15px';
        msgP.style.borderRadius = '15px';
        msgP.style.borderBottomRightRadius = '0';
        msgP.style.marginBottom = '15px';
        msgP.style.marginLeft = 'auto';
        msgP.style.maxWidth = '80%';
        msgP.style.width = 'fit-content';
    } else {
        msgP.className = 'bot-msg';
    }

    chatBody.appendChild(msgP);
}

// Close chat if clicked outside (Optional UX enhancement)
window.addEventListener('click', (e) => {
    if (isChatOpen && e.target === chatModal) {
        closeChat();
    }
});
