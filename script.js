// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Animated name effect
    const nameElement = document.getElementById('animated-name');
    if (nameElement) {
        const name = nameElement.textContent;
        nameElement.textContent = '';
        
        // Add each letter with a delay
        for (let i = 0; i < name.length; i++) {
            const letter = document.createElement('span');
            letter.textContent = name[i];
            letter.style.opacity = '0';
            letter.style.display = 'inline-block';
            letter.style.animation = fadeInLetter 0.3s ease forwards ${i * 0.1}s;
            nameElement.appendChild(letter);
        }
    }
    
    // Navigation menu toggle for mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === #${current}) {
                link.classList.add('active');
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Function to check if EmailJS is properly configured
    function checkEmailJSConfig() {
        const userId = emailjs._userID;
        if (!userId || userId === '2MnqpWhSfvvk4UwOb') {
            console.error('EmailJS User ID not configured. Please set your EmailJS User ID in index.html');
            return false;
        }
        return true;
    }
    
    // Create a feedback message container
    function createFeedbackContainer() {
        // Check if container already exists
        if (document.getElementById('email-feedback')) {
            return document.getElementById('email-feedback');
        }
        
        const feedbackContainer = document.createElement('div');
        feedbackContainer.id = 'email-feedback';
        feedbackContainer.style.padding = '15px';
        feedbackContainer.style.marginTop = '20px';
        feedbackContainer.style.borderRadius = '5px';
        feedbackContainer.style.display = 'none';
        
        const contactSection = document.querySelector('.contact-form');
        contactSection.appendChild(feedbackContainer);
        
        return feedbackContainer;
    }
    
    // Show feedback message
    function showFeedback(message, isError = false) {
        const feedbackContainer = createFeedbackContainer();
        feedbackContainer.textContent = message;
        feedbackContainer.style.display = 'block';
        
        if (isError) {
            feedbackContainer.style.backgroundColor = '#f8d7da';
            feedbackContainer.style.color = '#721c24';
            feedbackContainer.style.border = '1px solid #f5c6cb';
        } else {
            feedbackContainer.style.backgroundColor = '#d4edda';
            feedbackContainer.style.color = '#155724';
            feedbackContainer.style.border = '1px solid #c3e6cb';
        }
        
        // Auto-hide after 5 seconds for success messages
        if (!isError) {
            setTimeout(() => {
                feedbackContainer.style.display = 'none';
            }, 5000);
        }
    }
    
    // Form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Check if EmailJS is configured
            if (!checkEmailJSConfig()) {
                showFeedback('hi', true);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            };
            
            // Get service and template IDs
            const serviceId = 'service_i34cfyw';
            const templateId = 'template_u3fp17j';
            
            // Check if service and template IDs are still placeholders
            if (serviceId === 'service_i34cfyw' || templateId === 'template_u3fp17j') {
                showFeedback('Email service not fully configured. Please set your Service ID and Template ID in script.js', true);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            
            // Send email using EmailJS
            emailjs.send(serviceId, templateId, templateParams)
                .then(function(response) {
                    console.log('Email sent successfully!', response.status, response.text);
                    
                    // Show success message
                    showFeedback('Thank you for your message! I will get back to you soon.');
                    
                    // Reset the form
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('Email sending failed:', error);
                    
                    // Show error message
                    showFeedback('Failed to send email. Please try again later or contact directly via email.', true);
                })
                .finally(function() {
                    // Restore button state
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
    
    // Add animations to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .about-image, .about-text, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run the animation function on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .skill-card, .project-card, .about-image, .about-text, .contact-info, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-card.animate, .project-card.animate, .about-image.animate, .about-text.animate, .contact-info.animate, .contact-form.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-card:nth-child(2), .project-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .skill-card:nth-child(3), .project-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .skill-card:nth-child(4), .project-card:nth-child(4) {
            transition-delay: 0.6s;
        }
        
        .skill-card:nth-child(5) {
            transition-delay: 0.8s;
        }
        
        .skill-card:nth-child(6) {
            transition-delay: 1s;
        }
    `;
    document.head.appendChild(style);
    
    // Hamburger animation
    const hamburgerStyle = document.createElement('style');
    hamburgerStyle.textContent = `
        .hamburger.active {
            background-color: transparent;
        }
        
        .hamburger.active::before {
            transform: rotate(45deg);
            top: 0;
        }
        
        .hamburger.active::after {
            transform: rotate(-45deg);
            bottom: 0;
        }
    `;
document.head.appendChild (hamburgerStyle);
});