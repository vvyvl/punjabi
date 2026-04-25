/* ==========================================
   PUNJABI SAMOSA WEBSITE - SCRIPT.JS
   JavaScript for Interactivity & Music Control
   ========================================== */

// ==========================================
// AUDIO PLAYER FUNCTIONALITY
// ==========================================

const bgMusic = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const muteBtn = document.getElementById('muteBtn');

// Auto-play music on page load
window.addEventListener('load', () => {
    // Play music automatically
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Autoplay prevented. User interaction required.');
            showToast('🎵 Click Play to start the music!');
        });
    }
});

// Play button functionality
playBtn.addEventListener('click', () => {
    bgMusic.play();
    showToast('🎵 Music is now playing!');
    playBtn.style.opacity = '0.7';
    setTimeout(() => {
        playBtn.style.opacity = '1';
    }, 300);
});

// Pause button functionality
pauseBtn.addEventListener('click', () => {
    bgMusic.pause();
    showToast('⏸️ Music paused');
    pauseBtn.style.opacity = '0.7';
    setTimeout(() => {
        pauseBtn.style.opacity = '1';
    }, 300);
});

// Mute button functionality
let isMuted = false;
muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    if (isMuted) {
        showToast('🔇 Music muted');
        muteBtn.textContent = '🔇 Unmute';
    } else {
        showToast('🔊 Sound enabled!');
        muteBtn.textContent = '🔇 Mute';
    }
    muteBtn.style.opacity = '0.7';
    setTimeout(() => {
        muteBtn.style.opacity = '1';
    }, 300);
});

// ==========================================
// WELCOME POPUP FUNCTIONALITY
// ==========================================

const popup = document.getElementById('welcomePopup');
const closeBtn = document.querySelector('.close');
const popupBtn = document.querySelector('.popup-btn');

// Show popup on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        popup.style.display = 'flex';
    }, 500);
});

// Close popup functionality
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

popupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close popup when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    // Remove the show class after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// CONTACT FORM FUNCTIONALITY
// ==========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Validate form
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        showToast('❌ Please fill in all fields!');
        return;
    }

    // Show success message
    showToast(`✅ Thanks ${name}! Your message has been received!`);

    // Log the form data (in a real app, this would be sent to a server)
    console.log('Form Data:', {
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString()
    });

    // Reset the form
    contactForm.reset();
});

// ==========================================
// SMOOTH SCROLL BEHAVIOR
// ==========================================

// Already set in CSS with 'scroll-behavior: smooth'
// This section adds click handlers to navigation links if needed

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// ANIMATION ON SCROLL
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation on scroll
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ==========================================
// BUTTON CLICK ANIMATIONS
// ==========================================

document.querySelectorAll('.btn, .music-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener('keydown', (e) => {
    // P - Play music
    if (e.key.toLowerCase() === 'p') {
        bgMusic.play();
        showToast('▶️ Music Playing!');
    }
    // Space - Toggle Play/Pause
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (bgMusic.paused) {
            bgMusic.play();
            showToast('▶️ Playing!');
        } else {
            bgMusic.pause();
            showToast('⏸️ Paused!');
        }
    }
    // M - Mute/Unmute
    if (e.key.toLowerCase() === 'm') {
        isMuted = !isMuted;
        bgMusic.muted = isMuted;
        showToast(isMuted ? '🔇 Muted' : '🔊 Sound On');
    }
});

// ==========================================
// PAGE LOAD COMPLETE MESSAGE
// ==========================================

window.addEventListener('load', () => {
    console.log('🥒 Punjabi Samosa Website loaded successfully!');
    console.log('🎵 Background music is playing.');
    console.log('✨ Keyboard shortcuts:');
    console.log('   P - Play music');
    console.log('   SPACE - Toggle Play/Pause');
    console.log('   M - Mute/Unmute');
});

// ==========================================
// DYNAMIC TIME-BASED GREETING
// ==========================================

function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    
    if (hour < 12) {
        return 'Good Morning! 🌅';
    } else if (hour < 18) {
        return 'Good Afternoon! ☀️';
    } else {
        return 'Good Evening! 🌙';
    }
}

// Display greeting in console
window.addEventListener('load', () => {
    console.log('%c' + getTimeBasedGreeting(), 'color: #ff6b35; font-size: 16px; font-weight: bold;');
});

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Add keyboard focus styles
document.querySelectorAll('button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '3px solid #ff6b35';
        this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ==========================================
// ERROR HANDLING FOR AUDIO
// ==========================================

bgMusic.addEventListener('error', () => {
    console.error('Audio file not found. Make sure punjabi-song.mp3 is in the same directory.');
    showToast('❌ Audio file not found. Please add punjabi-song.mp3');
});

// ==========================================
// END OF SCRIPT
// ========================================== 