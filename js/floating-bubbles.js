(function() {
    'use strict';

    // Configuration
    const WHATSAPP_NUMBER = '+2349067004758';
    const COMPANY_EMAILS = [
        'famoustechnq@gmail.com',
        'info@famoustech.com',
        'support@famoustech.com'
    ];

    // Create HTML structure
    function createBubblesHTML() {
        console.log('Creating floating bubbles...');
        const html = `
            <!-- Floating Contact Bubbles -->
            <div class="floating-bubbles-container">
                <!-- WhatsApp Bubble -->
                <div class="whatsapp-bubble" id="whatsappBubble" title="Chat with us on WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </div>

                <!-- Email Bubble -->
                <div class="email-bubble" id="emailBubble" title="Send us an email">
                    <i class="fas fa-envelope"></i>
                </div>
            </div>

            <!-- WhatsApp Modal -->
            <div class="whatsapp-modal" id="whatsappModal">
                <div class="whatsapp-modal-header">
                    <h5><i class="fab fa-whatsapp me-2"></i>Send WhatsApp Message</h5>
                    <button class="whatsapp-modal-close" id="closeWhatsappModal">&times;</button>
                </div>
                <div class="whatsapp-modal-body">
                    <label for="whatsappMessage">Your Message:</label>
                    <textarea 
                        id="whatsappMessage" 
                        placeholder="Type your message here..."
                        maxlength="500"
                    ></textarea>
                    <button class="whatsapp-send-btn" id="sendWhatsappBtn">
                        <i class="fab fa-whatsapp"></i>
                        Send Message
                    </button>
                </div>
            </div>

            <!-- Email Menu -->
            <div class="email-menu" id="emailMenu">
                ${COMPANY_EMAILS.map(email => `
                    <a href="mailto:${email}" class="email-menu-item">
                        <i class="fas fa-envelope"></i>
                        <span>${email}</span>
                    </a>
                `).join('')}
            </div>
        `;

        // Insert into body
        document.body.insertAdjacentHTML('beforeend', html);
        console.log('Floating bubbles HTML inserted successfully!');
    }

    // Initialize event listeners
    function initEventListeners() {
        console.log('Initializing event listeners...');
        const whatsappBubble = document.getElementById('whatsappBubble');
        const whatsappModal = document.getElementById('whatsappModal');
        const closeWhatsappModal = document.getElementById('closeWhatsappModal');
        const sendWhatsappBtn = document.getElementById('sendWhatsappBtn');
        const whatsappMessage = document.getElementById('whatsappMessage');
        
        const emailBubble = document.getElementById('emailBubble');
        const emailMenu = document.getElementById('emailMenu');

        // WhatsApp Bubble Click
        whatsappBubble.addEventListener('click', function(e) {
            e.stopPropagation();
            whatsappModal.classList.toggle('active');
            emailMenu.classList.remove('active');
            
            if (whatsappModal.classList.contains('active')) {
                whatsappMessage.focus();
            }
        });

        // Close WhatsApp Modal
        closeWhatsappModal.addEventListener('click', function(e) {
            e.stopPropagation();
            whatsappModal.classList.remove('active');
        });

        // Send WhatsApp Message
        sendWhatsappBtn.addEventListener('click', function() {
            const message = whatsappMessage.value.trim();
            
            if (message === '') {
                alert('Please enter a message before sending.');
                return;
            }

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Clear message and close modal
            whatsappMessage.value = '';
            whatsappModal.classList.remove('active');
        });

        // Allow Enter key to send (with Shift+Enter for new line)
        whatsappMessage.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendWhatsappBtn.click();
            }
        });

        // Email Bubble Hover/Click
        let emailMenuTimeout;
        
        emailBubble.addEventListener('mouseenter', function() {
            clearTimeout(emailMenuTimeout);
            emailMenu.classList.add('active');
            whatsappModal.classList.remove('active');
        });

        emailBubble.addEventListener('mouseleave', function() {
            emailMenuTimeout = setTimeout(function() {
                emailMenu.classList.remove('active');
            }, 300);
        });

        emailMenu.addEventListener('mouseenter', function() {
            clearTimeout(emailMenuTimeout);
        });

        emailMenu.addEventListener('mouseleave', function() {
            emailMenuTimeout = setTimeout(function() {
                emailMenu.classList.remove('active');
            }, 300);
        });

        // Mobile: Click to toggle email menu
        emailBubble.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
                emailMenu.classList.toggle('active');
                whatsappModal.classList.remove('active');
            }
        });

        // Close modals when clicking outside
        document.addEventListener('click', function(e) {
            if (!whatsappModal.contains(e.target) && !whatsappBubble.contains(e.target)) {
                whatsappModal.classList.remove('active');
            }
            
            if (!emailMenu.contains(e.target) && !emailBubble.contains(e.target)) {
                emailMenu.classList.remove('active');
            }
        });

        // Close modals on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                whatsappModal.classList.remove('active');
                emailMenu.classList.remove('active');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createBubblesHTML();
            initEventListeners();
        });
    } else {
        createBubblesHTML();
        initEventListeners();
    }
})();
