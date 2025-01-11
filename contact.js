document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add animation to button
    const button = this.querySelector('.submit-btn');
    button.innerHTML = 'Sending...';
    button.style.opacity = '0.7';

    // Get form data
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_email: 'jdbeard@proton.me'
    };

    // Send email using EmailJS
    emailjs.send('service_wswabj6', 'template_nrvdlgm', templateParams)
        .then(function() {
            button.innerHTML = 'Message Sent!';
            button.style.backgroundColor = '#27ae60';
            button.style.opacity = '1';

            // Reset form
            setTimeout(() => {
                document.getElementById('contactForm').reset();
                button.innerHTML = 'Send Message';
                button.style.backgroundColor = '';
            }, 2000);
        }, function(error) {
            button.innerHTML = 'Error Sending';
            button.style.backgroundColor = '#e74c3c';
            button.style.opacity = '1';
            console.error('Email failed to send:', error);

            // Reset button after error
            setTimeout(() => {
                button.innerHTML = 'Send Message';
                button.style.backgroundColor = '';
            }, 2000);
        });
});

// Add floating animation to social cards
document.querySelectorAll('.social-card').forEach((card, index) => {
    card.style.animation = `floatCard 3s ease-in-out infinite ${index * 0.2}s`;
}); 