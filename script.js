// Add smooth scrolling to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Track current card index
let currentCardIndex = 0;

// Handle View Work button click (now Shuffle button)
document.getElementById('viewWorkBtn').addEventListener('click', function() {
    const cards = document.querySelectorAll('.card');
    const button = this;
    
    // Change button text after first click
    if (button.innerHTML === 'View My Work') {
        button.innerHTML = 'Shuffle Cards';
        
        // Initial setup - stack cards
        cards.forEach((card, index) => {
            // Remove any existing transforms first
            card.style.transform = '';
            
            // Short timeout to ensure clean transition
            setTimeout(() => {
                card.style.animation = 'none';
                card.style.transition = 'all 0.5s ease';
                card.style.transform = 'translate(-50%, -50%)';
                card.style.position = 'absolute';
                card.style.left = '50%';
                card.style.top = '50%';
                card.style.zIndex = cards.length - index;
                card.classList.add('stacked');
            }, 50);
        });
        
        // Disable parallax effect
        document.removeEventListener('mousemove', handleParallax);
    } else {
        // Shuffle animation
        const currentCard = cards[currentCardIndex];
        
        // Animate current card out
        currentCard.style.transform = 'translate(-50%, -150%) rotate(10deg)';
        currentCard.style.opacity = '0';
        
        // After animation, move card to back
        setTimeout(() => {
            currentCard.style.transform = 'translate(-50%, -50%)';
            currentCard.style.opacity = '1';
            currentCard.style.zIndex = 0;
            
            // Update z-indices of other cards
            cards.forEach(card => {
                if (card !== currentCard) {
                    card.style.zIndex = parseInt(card.style.zIndex) + 1;
                }
            });
        }, 500);
        
        // Update index for next shuffle
        currentCardIndex = (currentCardIndex + 1) % cards.length;
    }
});

// Separate parallax handler function
const handleParallax = (e) => {
    const cards = document.querySelectorAll('.card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    cards.forEach((card, index) => {
        if (!card.classList.contains('expanded')) {
            const depth = (index + 1) * 10;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            card.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${index * 5 - 5}deg)`;
        }
    });
};

document.addEventListener('mousemove', handleParallax);