// ===================================
// MOBILE MENU TOGGLE
// ===================================

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===================================
// CHARACTER COUNTER FOR TEXTAREA
// ===================================

const questionTextarea = document.getElementById('question');
const charCount = document.getElementById('charCount');

if (questionTextarea && charCount) {
    questionTextarea.addEventListener('input', () => {
        const count = questionTextarea.value.length;
        charCount.textContent = count;
        
        // Change color when approaching limit
        if (count > 450) {
            charCount.style.color = 'var(--error)';
        } else if (count > 400) {
            charCount.style.color = 'var(--warning)';
        } else {
            charCount.style.color = 'var(--text-light)';
        }
    });
}

// ===================================
// FORM SUBMISSION HANDLER
// ===================================

const questionForm = document.getElementById('questionForm');
const formMessage = document.getElementById('formMessage');

if (questionForm) {
    questionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(questionForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.email || !data.question || !data.category) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        if (!isValidEmail(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = questionForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        try {
            // OPTION 1: Send to your backend API
            // Uncomment and replace with your actual API endpoint
            /*
            const response = await fetch('YOUR_API_ENDPOINT_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Submission failed');
            }
            */
            
            // OPTION 2: Send to Google Forms
            // Replace FORM_ID and entry IDs with your Google Form details
            /*
            const googleFormURL = 'https://docs.google.com/forms/d/e/FORM_ID/formResponse';
            const googleFormData = new FormData();
            googleFormData.append('entry.NAME_ENTRY_ID', data.name);
            googleFormData.append('entry.EMAIL_ENTRY_ID', data.email);
            googleFormData.append('entry.QUESTION_ENTRY_ID', data.question);
            googleFormData.append('entry.CATEGORY_ENTRY_ID', data.category);
            
            await fetch(googleFormURL, {
                method: 'POST',
                mode: 'no-cors',
                body: googleFormData
            });
            */
            
            // OPTION 3: Send to email service (e.g., Formspree, EmailJS)
            // Example with Formspree:
            /*
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Submission failed');
            }
            */
            
            // FOR DEMO: Simulate successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            showMessage('Thank you! Your question has been submitted. We\'ll review it and may feature it on our next show.', 'success');
            
            // Reset form
            questionForm.reset();
            charCount.textContent = '0';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Oops! Something went wrong. Please try again or email us directly at hello@voicesandvibes.fm', 'error');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// ===================================
// SUBSCRIBE FORM HANDLER
// ===================================

const subscribeForm = document.getElementById('subscribeForm');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = subscribeForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        const submitBtn = subscribeForm.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        try {
            // TODO: Replace with your email list service (Mailchimp, ConvertKit, etc.)
            // Example with Mailchimp:
            /*
            const response = await fetch('YOUR_MAILCHIMP_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });
            
            if (!response.ok) {
                throw new Error('Subscription failed');
            }
            */
            
            // FOR DEMO: Simulate successful subscription
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Thank you for subscribing! Check your email for confirmation.');
            emailInput.value = '';
            
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Oops! Something went wrong. Please try again later.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

function showMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide success messages after 10 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 10000);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip empty hrefs
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// BACK TO TOP BUTTON
// ===================================

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// ===================================
// ANALYTICS TRACKING (Optional)
// ===================================

// Track button clicks
document.querySelectorAll('.btn, .social-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.currentTarget.textContent.trim();
        const buttonHref = e.currentTarget.getAttribute('href') || 'no-href';
        
        // Send to your analytics service (Google Analytics, Plausible, etc.)
        console.log('Button clicked:', buttonText, buttonHref);
        
        // Example with Google Analytics (ga4):
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'button_text': buttonText,
                'button_href': buttonHref
            });
        }
        */
    });
});

// Track form submissions
if (questionForm) {
    questionForm.addEventListener('submit', () => {
        // Example with Google Analytics:
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'form_name': 'family_question_form'
            });
        }
        */
        console.log('Form submitted: Family Question Form');
    });
}

// ===================================
// PAGE LOAD ANIMATIONS (Optional)
// ===================================

window.addEventListener('load', () => {
    // Fade in elements on load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for fade-in animation
document.querySelectorAll('.feature-card, .schedule-card, .testimonial-card, .resource-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('Voices & Vibes - Family Matters Monday page loaded successfully! 🎙️');
