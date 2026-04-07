// Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Fix smooth scroll for all anchor links except share buttons
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Share functionality
  const pageUrl = window.location.href;
  const pageTitle = 'Suryoday Fortune - Commercial Construction';

  document.getElementById('shareWhatsapp').href = 'https://wa.me/918238222584';
  document.getElementById('shareFacebook').href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;

  document.getElementById('copyLink').addEventListener('click', () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      const msg = document.getElementById('copyMsg');
      msg.classList.add('show');
      setTimeout(() => msg.classList.remove('show'), 2500);
    });
  });

  const nativeBtn = document.getElementById('shareNative');
  if (navigator.share) {
    nativeBtn.addEventListener('click', () => {
      navigator.share({ title: pageTitle, url: pageUrl });
    });
  } else {
    nativeBtn.style.display = 'none';
  }
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  // ===== EmailJS Integration for Contact Form =====
  const EMAILJS_PUBLIC_KEY = 'MUL1n_-N7ZXo5yuQS'; // Replace with your EmailJS Public Key
  const EMAILJS_SERVICE_ID = 'service_65tapaa';
  const EMAILJS_TEMPLATE_ID_INQUIRY = 'template_x1bbrpa';
  const EMAILJS_TEMPLATE_ID_REPLY = 'template_whtxkhd';

  // Initialize EmailJS with your public key
  if (typeof emailjs !== 'undefined' && emailjs.init) {
    console.log('EmailJS SDK loaded. Initializing...');
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized with public key:', EMAILJS_PUBLIC_KEY);
  } else {
    console.error('EmailJS SDK is not loaded. Check the CDN script URL.');
  }

  // Form submission function
  async function sendInquiry() {
    console.log('sendInquiry triggered');
    if (typeof emailjs === 'undefined' || !emailjs.send) {
      console.error('EmailJS SDK missing or send() unavailable:', typeof emailjs, emailjs);
      showMessage('EmailJS SDK is not loaded. Please refresh the page.', 'error');
      return;
    }
    console.log('EmailJS ready. send() available.');
    // Get form elements
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const submitBtn = form.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');

    // Validation
    if (!nameInput.value.trim()) {
      showMessage('Please enter your name', 'error');
      return;
    }
    if (!phoneInput.value.trim()) {
      showMessage('Please enter your phone number', 'error');
      return;
    }
    if (emailInput.value.trim() && !validateEmail(emailInput.value)) {
      showMessage('Please enter a valid email address', 'error');
      return;
    }
    if (!subjectInput.value.trim()) {
      showMessage('Please specify your project type', 'error');
      return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    try {
      console.log('Sending admin email with params:', {
        name: nameInput.value,
        email: emailInput.value,
        from_name: nameInput.value,
        from_email: emailInput.value,
        phone: phoneInput.value || 'Not provided',
        subject: subjectInput.value,
        to_email: 'suryodayfortune@gmail.com'
      });

      const emailValue = emailInput.value.trim();
      const phoneValue = phoneInput.value.trim();

      // Email to admin
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_INQUIRY, {
        name: nameInput.value,
        email: emailValue,
        from_name: nameInput.value,
        from_email: emailValue,
        phone: phoneValue,
        subject: subjectInput.value,
        to_email: 'suryodayfortune@gmail.com'
      });

      if (emailValue) {
        console.log('Admin email sent successfully, sending auto-reply...');

        // Auto-reply to customer
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_REPLY, {
          name: nameInput.value,
          email: emailValue,
          to_name: nameInput.value,
          to_email: emailValue,
          reply_subject: subjectInput.value
        });
      }

      // Success message
      showMessage('✅ Inquiry sent successfully! We will contact you shortly.', 'success');
      
      // Reset form
      form.reset();
      
      // Re-enable button after 3 seconds
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Send Inquiry';
      }, 3000);

    } catch (error) {
      console.error('Email error:', error);
      const errorText = error?.text || error?.message || error?.status || 'Unknown error';
      showMessage(`❌ Error sending inquiry. ${errorText}`, 'error');
      submitBtn.disabled = false;
      submitBtn.innerText = 'Send Inquiry';
    }
  }

  // Helper function to validate email
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to show messages
  function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  }

  // Allow Ctrl+Enter to submit form
  const messageField = document.getElementById('message');
  if (messageField) {
    messageField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) {
        sendInquiry();
      }
    });
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
// Contact form submit binding
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    sendInquiry();
  });
}