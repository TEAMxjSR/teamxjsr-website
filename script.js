// TEAMxJSR - Professional JavaScript File
// Enhanced with error handling, performance optimization, and bug fixes

// Global user data storage with localStorage persistence
let userData = {
    // Coin balances
    boostCoins: 156,
    referralCoins: 12,
    totalEarned: 168,
    totalSpent: 0,
    
    // User stats
    totalBans: 89,
    totalReferrals: 12,
    successRate: 87,
    globalRank: 47,
    referralRank: 23,
    
    // OG Level
    ogLevel: 'intermediate',
    ogPoints: 450,
    
    // Upload stats
    targetsUploaded: 5,
    totalUploads: 5,
    
    // Transactions history
    transactions: [
        { 
            type: 'earn', 
            coinType: 'boost',
            amount: 15, 
            description: 'Priority Target Bonus', 
            date: '2024-01-15' 
        },
        { 
            type: 'earn', 
            coinType: 'boost',
            amount: 8, 
            description: 'Banned @premium_scammer', 
            date: '2024-01-15' 
        },
        { 
            type: 'earn', 
            coinType: 'boost',
            amount: 5, 
            description: 'Banned @fake_profile', 
            date: '2024-01-14' 
        },
        { 
            type: 'earn', 
            coinType: 'referral',
            amount: 1, 
            description: 'Referral Bonus - @newuser1', 
            date: '2024-01-14' 
        },
        { 
            type: 'earn', 
            coinType: 'boost',
            amount: 12, 
            description: 'Banned @spam_king', 
            date: '2024-01-13' 
        }
    ]
};

// Initialize user data from localStorage
function initializeUserData() {
    try {
        const savedData = localStorage.getItem('teamxjsr_userdata');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            userData = { ...userData, ...parsedData };
        }
    } catch (error) {
        console.warn('Could not load user data from localStorage:', error);
    }
}

// Save user data to localStorage
function saveUserData() {
    try {
        localStorage.setItem('teamxjsr_userdata', JSON.stringify(userData));
    } catch (error) {
        console.warn('Could not save user data to localStorage:', error);
    }
}

// Loading screen management with improved animation
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    const loadingProgress = document.getElementById('loadingProgress');
    
    if (!loadingScreen || !loadingProgress) {
        document.body.style.overflow = 'auto';
        return;
    }
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 500);
            }, 500);
        }
    }, 100);
}

// Navigation and UI functions with error handling
function updateNavigation() {
    try {
        // Update coin balances in navigation
        const navBoostCoins = document.getElementById('navBoostCoins');
        const navReferralCoins = document.getElementById('navReferralCoins');
        const navUserRank = document.getElementById('navUserRank');
        
        if (navBoostCoins) navBoostCoins.textContent = userData.boostCoins;
        if (navReferralCoins) navReferralCoins.textContent = userData.referralCoins;
        if (navUserRank) navUserRank.textContent = '#' + userData.globalRank;
    } catch (error) {
        console.error('Error updating navigation:', error);
    }
}

function updateWalletDisplay() {
    try {
        // Update wallet page displays
        const boostCoinBalance = document.getElementById('boostCoinBalance');
        const referralCoinBalance = document.getElementById('referralCoinBalance');
        const boostTotalEarned = document.getElementById('boostTotalEarned');
        const boostTotalSpent = document.getElementById('boostTotalSpent');
        const referralTotalEarned = document.getElementById('referralTotalEarned');
        const referralTotalSpent = document.getElementById('referralTotalSpent');
        
        if (boostCoinBalance) boostCoinBalance.textContent = userData.boostCoins;
        if (referralCoinBalance) referralCoinBalance.textContent = userData.referralCoins;
        if (boostTotalEarned) boostTotalEarned.textContent = userData.totalEarned;
        if (boostTotalSpent) boostTotalSpent.textContent = userData.totalSpent;
        if (referralTotalEarned) referralTotalEarned.textContent = userData.referralCoins;
        if (referralTotalSpent) referralTotalSpent.textContent = '0';
        
        updateNavigation();
    } catch (error) {
        console.error('Error updating wallet display:', error);
    }
}

// Enhanced modal management with better event handling
function openModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add escape key listener
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal(modalId);
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
        }
    } catch (error) {
        console.error('Error opening modal:', error);
    }
}

function closeModal(modalId) {
    try {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

// Close modal when clicking outside - Enhanced version
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});

// Professional authentication functions
function showLogin() {
    Swal.fire({
        title: 'Login to TEAMxJSR',
        html: `
            <div style="text-align: left;">
                <div class="form-group">
                    <label>Username or Email</label>
                    <input type="text" id="loginUsername" class="swal2-input" placeholder="Your username or email" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="loginPassword" class="swal2-input" placeholder="Your password" required>
                </div>
                <div class="form-footer" style="margin-top: 1rem; text-align: center;">
                    <a href="#" onclick="showForgotPassword()" style="color: #ff4444; text-decoration: none;">Forgot Password?</a>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ff0000',
        preConfirm: () => {
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!username || !password) {
                Swal.showValidationMessage('Please enter both username and password');
                return false;
            }
            
            if (password.length < 6) {
                Swal.showValidationMessage('Password must be at least 6 characters');
                return false;
            }
            
            return { username: username, password: password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate login process with API call
            simulateAPICall(1500).then(() => {
                Swal.fire({
                    title: 'Welcome Back! 👋',
                    text: 'Successfully logged in to your account',
                    icon: 'success',
                    background: '#1a1a1a',
                    color: '#ffffff',
                    confirmButtonColor: '#ff0000'
                });
            });
        }
    });
}

function showRegister() {
    Swal.fire({
        title: 'Join TEAMxJSR',
        html: `
            <div style="text-align: left;">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="regUsername" class="swal2-input" placeholder="Choose username" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="regEmail" class="swal2-input" placeholder="your@email.com" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" id="regPassword" class="swal2-input" placeholder="Create strong password" required>
                </div>
                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" id="regConfirmPassword" class="swal2-input" placeholder="Confirm your password" required>
                </div>
                <div class="form-group">
                    <label>Referral Code (Optional)</label>
                    <input type="text" id="regReferral" class="swal2-input" placeholder="Friend's referral code">
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Create Account',
        cancelButtonText: 'Cancel',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ff0000',
        preConfirm: () => {
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const referral = document.getElementById('regReferral').value;
            
            if (!username || !email || !password || !confirmPassword) {
                Swal.showValidationMessage('Please fill all required fields');
                return false;
            }
            
            if (password.length < 6) {
                Swal.showValidationMessage('Password must be at least 6 characters');
                return false;
            }
            
            if (password !== confirmPassword) {
                Swal.showValidationMessage('Passwords do not match');
                return false;
            }
            
            if (!isValidEmail(email)) {
                Swal.showValidationMessage('Please enter a valid email address');
                return false;
            }
            
            return { 
                username: username, 
                email: email, 
                password: password, 
                referral: referral 
            };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Simulate registration process
            simulateAPICall(2000).then(() => {
                Swal.fire({
                    title: 'Welcome to TEAMxJSR! 🎉',
                    html: `
                        <div style="text-align: center;">
                            <p>Your account has been created successfully!</p>
                            <p><strong>🎁 Start with 10 free Boost Coins!</strong></p>
                            <p>Check your email to verify your account.</p>
                        </div>
                    `,
                    icon: 'success',
                    background: '#1a1a1a',
                    color: '#ffffff',
                    confirmButtonColor: '#ff0000'
                }).then(() => {
                    // Add bonus coins
                    addCoins(10, 'boost', 'Welcome Bonus');
                    saveUserData();
                });
            });
        }
    });
}

function showForgotPassword() {
    Swal.fire({
        title: 'Reset Password',
        html: `
            <div style="text-align: left;">
                <p>Enter your email to reset your password:</p>
                <input type="email" id="resetEmail" class="swal2-input" placeholder="your@email.com" required>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Send Reset Link',
        cancelButtonText: 'Cancel',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ff0000',
        preConfirm: () => {
            const email = document.getElementById('resetEmail').value;
            if (!email || !isValidEmail(email)) {
                Swal.showValidationMessage('Please enter a valid email address');
                return false;
            }
            return { email: email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Check Your Email',
                text: 'Password reset link has been sent to your email',
                icon: 'success',
                background: '#1a1a1a',
                color: '#ffffff',
                confirmButtonColor: '#ff0000'
            });
        }
    });
}

// Enhanced coin management functions
function addCoins(amount, type = 'boost', description = '') {
    try {
        if (type === 'boost') {
            userData.boostCoins += amount;
            userData.totalEarned += amount;
        } else if (type === 'referral') {
            userData.referralCoins += amount;
        }
        
        // Add to transaction history
        userData.transactions.unshift({
            type: 'earn',
            coinType: type,
            amount: amount,
            description: description,
            date: new Date().toISOString().split('T')[0],
            timestamp: new Date().getTime()
        });
        
        updateWalletDisplay();
        saveUserData();
        
        return true;
    } catch (error) {
        console.error('Error adding coins:', error);
        return false;
    }
}

function spendCoins(amount, type = 'boost', description = '') {
    try {
        let sufficientBalance = false;
        
        if (type === 'boost' && userData.boostCoins >= amount) {
            userData.boostCoins -= amount;
            userData.totalSpent += amount;
            sufficientBalance = true;
        } else if (type === 'referral' && userData.referralCoins >= amount) {
            userData.referralCoins -= amount;
            sufficientBalance = true;
        }
        
        if (sufficientBalance) {
            // Add to transaction history
            userData.transactions.unshift({
                type: 'spend',
                coinType: type,
                amount: amount,
                description: description,
                date: new Date().toISOString().split('T')[0],
                timestamp: new Date().getTime()
            });
            
            updateWalletDisplay();
            saveUserData();
            return true;
        } else {
            const coinType = type === 'boost' ? 'Boost' : 'Referral';
            const currentBalance = type === 'boost' ? userData.boostCoins : userData.referralCoins;
            
            Swal.fire({
                title: 'Insufficient Coins',
                text: `You need ${amount - currentBalance} more ${coinType} Coins to complete this action`,
                icon: 'warning',
                background: '#1a1a1a',
                color: '#ffffff',
                confirmButtonColor: '#ff0000'
            });
            return false;
        }
    } catch (error) {
        console.error('Error spending coins:', error);
        return false;
    }
}

// Utility functions with enhanced features
function formatNumber(num) {
    if (typeof num !== 'number') return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTimeAgo(dateString) {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    } catch (error) {
        return 'Recently';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateAPICall(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

// Enhanced animation helpers
function animateValue(element, start, end, duration) {
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = formatNumber(value);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Enhanced demo function for index page
function showDemo() {
    Swal.fire({
        title: 'TEAMxJSR System Demo',
        html: `
            <div style="text-align: center;">
                <p>Experience our powerful OG Boost system:</p>
                <div style="background: #2a2a2a; padding: 20px; border-radius: 10px; margin: 15px 0;">
                    <i class="fas fa-rocket" style="font-size: 3rem; color: #ff0000; margin-bottom: 10px;"></i>
                    <p style="margin: 10px 0;"><strong>OG Boost Technology</strong></p>
                    <p style="color: #cccccc; font-size: 0.9rem;">Advanced algorithm boosting for faster results</p>
                </div>
                <p>Key Features:</p>
                <ul style="text-align: left; color: #cccccc;">
                    <li>🚀 Dual Coin Economy</li>
                    <li>🎯 Mass Reporting System</li>
                    <li>📊 Real-time Analytics</li>
                    <li>🏆 Competitive Leaderboards</li>
                </ul>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Try Live Demo',
        cancelButtonText: 'Learn More',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ff0000',
        cancelButtonColor: '#333333'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'og-boost.html';
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = 'index.html#features';
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 TEAMxJSR Website Initializing...');
    
    // Initialize user data from storage
    initializeUserData();
    
    // Initialize loading screen
    initializeLoadingScreen();
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic',
            delay: 100
        });
    }
    
    // Update navigation with user data
    updateNavigation();
    
    // Initialize wallet if on wallet page
    if (document.getElementById('boostCoinBalance')) {
        updateWalletDisplay();
    }
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced scroll effect to navbar
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            // Clear the timeout if it's already set
            clearTimeout(scrollTimeout);
            
            // Add scrolled class immediately
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Set a timeout to debounce the style changes
            scrollTimeout = setTimeout(() => {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                    navbar.style.backdropFilter = 'blur(20px)';
                    navbar.style.borderBottom = '2px solid #ff0000';
                } else {
                    navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.borderBottom = '2px solid #ff0000';
                }
            }, 10);
        }
    });
    
    // Animate stats on homepage
    const bansCount = document.getElementById('bansCount');
    if (bansCount) {
        // Start animation after a delay for better UX
        setTimeout(() => {
            animateValue(bansCount, 0, 1247, 2000);
        }, 1000);
    }
    
    // Initialize specific page functions
    initializePageSpecificFunctions();
    
    // Add CSS for scrolled navbar state
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            box-shadow: 0 4px 20px rgba(255, 0, 0, 0.15);
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ TEAMxJSR Website Initialized Successfully!');
});

// Page specific initializations with enhanced functionality
function initializePageSpecificFunctions() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    console.log(`Initializing page: ${currentPage}`);
    
    switch(currentPage) {
        case 'leaderboards.html':
            initializeLeaderboards();
            break;
        case 'referral.html':
            initializeReferralPage();
            break;
        case 'upload.html':
            initializeUploadPage();
            break;
        case 'wallet.html':
            initializeWalletPage();
            break;
        case 'og-boost.html':
            initializeOGBoostPage();
            break;
        case 'ebook.html':
            initializeEbookPage();
            break;
        default:
            initializeHomePage();
    }
}

// Enhanced leaderboards page functions
function initializeLeaderboards() {
    console.log('📊 Initializing leaderboards...');
    
    // Update user stats on leaderboards page
    if (typeof userData !== 'undefined') {
        const userGlobalRank = document.getElementById('userGlobalRank');
        const userTotalCoins = document.getElementById('userTotalCoins');
        const userBansCount = document.getElementById('userBansCount');
        const userReferrals = document.getElementById('userReferrals');
        
        if (userGlobalRank) userGlobalRank.textContent = '#' + userData.globalRank;
        if (userTotalCoins) userTotalCoins.textContent = userData.totalEarned;
        if (userBansCount) userBansCount.textContent = userData.totalBans;
        if (userReferrals) userReferrals.textContent = userData.totalReferrals;
    }
    
    // Add tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to current button and content
            button.classList.add('active');
            const targetTab = document.getElementById(tabName);
            if (targetTab) targetTab.classList.add('active');
        });
    });
}

// Enhanced referral page functions
function initializeReferralPage() {
    console.log('👥 Initializing referral page...');
    
    // Update referral stats
    if (typeof userData !== 'undefined') {
        const totalReferrals = document.getElementById('totalReferrals');
        const referralEarnings = document.getElementById('referralEarnings');
        const referralRank = document.getElementById('referralRank');
        
        if (totalReferrals) totalReferrals.textContent = userData.totalReferrals;
        if (referralEarnings) referralEarnings.textContent = userData.referralCoins;
        if (referralRank) referralRank.textContent = '#' + userData.referralRank;
    }
}

// Enhanced upload page functions
function initializeUploadPage() {
    console.log('📤 Initializing upload page...');
    
    // Update upload stats
    if (typeof userData !== 'undefined') {
        const totalUploads = document.getElementById('totalUploads');
        const successRate = document.getElementById('successRate');
        const activeHunters = document.getElementById('activeHunters');
        
        if (totalUploads) totalUploads.textContent = userData.totalUploads || 0;
        if (successRate) successRate.textContent = userData.successRate + '%';
        if (activeHunters) activeHunters.textContent = '124'; // Static for demo
    }
}

// Enhanced wallet page functions
function initializeWalletPage() {
    console.log('💰 Initializing wallet page...');
    
    // Wallet page is already handled by its own script
    // This function ensures compatibility
    if (typeof initializeWallet === 'function') {
        setTimeout(initializeWallet, 500);
    }
}

// OG Boost page functions
function initializeOGBoostPage() {
    console.log('🚀 Initializing OG Boost page...');
    
    // Update OG Boost stats
    if (typeof userData !== 'undefined') {
        const userBans = document.getElementById('userBans');
        const userEarned = document.getElementById('userEarned');
        const userSuccessRate = document.getElementById('userSuccessRate');
        const userOGLevel = document.getElementById('userOGLevel');
        
        if (userBans) userBans.textContent = userData.totalBans;
        if (userEarned) userEarned.textContent = userData.totalEarned;
        if (userSuccessRate) userSuccessRate.textContent = userData.successRate + '%';
        if (userOGLevel) {
            const ogIcons = {
                'beginner': '🥚',
                'intermediate': '🦊', 
                'pro': '🐺',
                'elite': '🐉',
                'legend': '👑'
            };
            userOGLevel.textContent = ogIcons[userData.ogLevel] || '🥚';
        }
    }
}

// Ebook page functions
function initializeEbookPage() {
    console.log('📚 Initializing ebook page...');
    // Ebook page has its own specific JavaScript
}

// Home page functions
function initializeHomePage() {
    console.log('🏠 Initializing home page...');
    // Home page specific initializations
}

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        userData,
        addCoins,
        spendCoins,
        updateWalletDisplay,
        initializeUserData,
        saveUserData
    };
}

// Global error handler for better debugging
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`🕒 Page loaded in ${loadTime}ms`);
        }, 0);
    });
}