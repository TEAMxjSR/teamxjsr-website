// Counter Animation
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialize counters when page loads
document.addEventListener('DOMContentLoaded', function() {
    const bansCount = document.getElementById('bans-count');
    animateCounter(bansCount, 847, 2000);
});

// Smooth scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Target acceptance
function acceptTarget(targetId) {
    alert(`Target ${targetId} accepted! Join our Telegram for submission guidelines.`);
    // Here you can add tracking logic
}

// Modal functions
function openOrderForm(serviceType) {
    document.getElementById('serviceType').value = serviceType;
    document.getElementById('orderModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
}

// Form submission
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const serviceType = document.getElementById('serviceType').value;
    const targetUsername = document.getElementById('targetUsername').value;
    const platform = document.getElementById('platform').value;
    const userContact = document.getElementById('userContact').value;
    
    // Create order summary
    const orderDetails = {
        service: serviceType,
        target: targetUsername,
        platform: platform,
        contact: userContact,
        timestamp: new Date().toISOString()
    };
    
    // Here you would integrate with Cashfree
    // For now, we'll show a confirmation and contact info
    alert(`ORDER RECEIVED!\n\nService: ${serviceType.toUpperCase()}\nTarget: ${targetUsername}\nPlatform: ${platform}\n\nWe will contact you at: ${userContact}\n\nPlease complete payment via Cashfree.`);
    
    // Close modal and reset form
    closeModal();
    this.reset();
    
    // In real implementation, redirect to Cashfree payment page
    // window.location.href = 'your-cashfree-payment-link';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
        closeModal();
    }
});