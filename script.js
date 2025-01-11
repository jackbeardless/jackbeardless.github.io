// Theme switcher functionality
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

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
        
        // Initial setup - stack cards in order (card1 on top)
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
                // Set z-index in reverse order (first card on top)
                card.style.zIndex = cards.length - index;
                card.classList.add('stacked');
                
                // Show content only for the top card (card1)
                if (index === 0) {
                    card.querySelector('.card-content').style.opacity = '1';
                } else {
                    card.querySelector('.card-content').style.opacity = '0';
                }
            }, 50);
        });
        
        // Disable parallax effect
        document.removeEventListener('mousemove', handleParallax);
    } else {
        // Get next card index
        const nextIndex = (currentCardIndex + 1) % cards.length;
        const currentCard = cards[currentCardIndex];
        const nextCard = cards[nextIndex];
        
        // Show next card content before animation starts
        nextCard.querySelector('.card-content').style.opacity = '1';
        nextCard.style.zIndex = cards.length - 1;  // Put next card just below current
        currentCard.style.zIndex = cards.length;   // Ensure current card is on top for animation
        
        // Animate current card out
        currentCard.style.transform = 'translate(-50%, -150%) rotate(10deg)';
        currentCard.style.opacity = '0';
        
        // After animation, move card to back
        setTimeout(() => {
            currentCard.style.transform = 'translate(-50%, -50%)';
            currentCard.style.opacity = '1';
            currentCard.style.zIndex = 0;
            currentCard.querySelector('.card-content').style.opacity = '0';
            
            // Update z-indices of other cards
            cards.forEach((card, index) => {
                if (card !== currentCard && card !== nextCard) {
                    card.style.zIndex = parseInt(card.style.zIndex) - 1;
                }
            });
        }, 500);
        
        // Update index for next shuffle
        currentCardIndex = nextIndex;
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