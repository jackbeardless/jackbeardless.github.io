document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add animation to button
    const button = this.querySelector('.submit-btn');
    button.innerHTML = 'Sending...';
    button.style.opacity = '0.7';

    // Simulate form submission (replace with actual form submission)
    setTimeout(() => {
        button.innerHTML = 'Message Sent!';
        button.style.backgroundColor = '#27ae60';
        button.style.opacity = '1';

        // Reset form
        setTimeout(() => {
            this.reset();
            button.innerHTML = 'Send Message';
            button.style.backgroundColor = '';
        }, 2000);
    }, 1500);
});

// Add floating animation to social cards
document.querySelectorAll('.social-card').forEach((card, index) => {
    card.style.animation = `floatCard 3s ease-in-out infinite ${index * 0.2}s`;
}); 