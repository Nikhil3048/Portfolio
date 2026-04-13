/**
 * contact.js — Contact form handler
 * Sends messages directly to rajnikhil8092@gmail.com via mailto:
 * No backend or API keys required — works out of the box.
 */

const CONTACT_EMAIL = 'rajnikhil8092@gmail.com';

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    const status = document.getElementById('form-status');

    // Collect form data
    const fromName    = form.querySelector('#contact-name')?.value.trim()    || '';
    const fromEmail   = form.querySelector('#contact-email')?.value.trim()   || '';
    const subject     = form.querySelector('#contact-subject')?.value.trim() || 'Portfolio Contact';
    const message     = form.querySelector('#contact-message')?.value.trim() || '';

    // Validation
    if (!fromName || !fromEmail || !message) {
      showStatus(status, 'error', '⚠️ Please fill in all required fields.');
      return;
    }

    if (!isValidEmail(fromEmail)) {
      showStatus(status, 'error', '⚠️ Please enter a valid email address.');
      return;
    }

    // Build mailto: link
    const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const mailBody = encodeURIComponent(
      `Hi Nikhil,\n\nYou received a message from your portfolio website.\n\n` +
      `Name   : ${fromName}\n` +
      `Email  : ${fromEmail}\n\n` +
      `Message:\n${message}\n\n` +
      `---\nSent via portfolio contact form.`
    );

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success feedback
    showStatus(status, 'success', '✅ Your email client has opened! Send the pre-filled email to reach Nikhil.');
    showToast('Email client opened! 📧', 'success');

    // Re-enable button after short delay
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-check"></i> Opening email...';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 3000);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(el, type, message) {
  if (!el) return;
  el.textContent = message;
  el.className = `form-status ${type}`;
  el.style.display = 'block';
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✅' : '❌'} ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', initContactForm);
