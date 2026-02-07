/**
 * ============================================
 * CV Analyzer - Authentication JavaScript
 * ============================================
 * Handles login and signup form interactions
 * No backend - frontend simulation only
 * ============================================
 */

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const submitBtn = this.querySelector('button[type="submit"]');
  
  // Basic validation
  if (!email || !password) {
    showError('Please fill in all fields');
    return;
  }
  
  // Simulate loading state
  setLoading(submitBtn, true);
  
  // Simulate authentication (no backend)
  setTimeout(() => {
    setLoading(submitBtn, false);
    
    // Store user session (simulated)
    sessionStorage.setItem('cvAnalyzerUser', JSON.stringify({
      email: email,
      name: 'John Anderson',
      loggedIn: true
    }));
    
    // Redirect to home page
    window.location.href = 'index.html';
  }, 1000);
});

// Signup Form Handler
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const submitBtn = this.querySelector('button[type="submit"]');
  
  // Validation
  if (!fullName || !email || !password || !confirmPassword) {
    showError('Please fill in all fields');
    return;
  }
  
  if (password !== confirmPassword) {
    showError('Passwords do not match');
    return;
  }
  
  if (password.length < 8) {
    showError('Password must be at least 8 characters');
    return;
  }
  
  // Simulate loading state
  setLoading(submitBtn, true);
  
  // Simulate registration (no backend)
  setTimeout(() => {
    setLoading(submitBtn, false);
    
    // Store user session (simulated)
    sessionStorage.setItem('cvAnalyzerUser', JSON.stringify({
      email: email,
      name: fullName,
      loggedIn: true
    }));
    
    // Redirect to home page
    window.location.href = 'index.html';
  }, 1000);
});

// Helper: Show error message
function showError(message) {
  // Remove existing error
  const existingError = document.querySelector('.auth-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Create error element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'auth-error alert alert--error';
  errorDiv.style.marginBottom = 'var(--space-4)';
  errorDiv.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    ${message}
  `;
  
  // Insert after subtitle
  const subtitle = document.querySelector('.auth-card__subtitle');
  subtitle.insertAdjacentElement('afterend', errorDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Helper: Set loading state on button
function setLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `
      <div class="spinner spinner--sm" style="border-color: rgba(255,255,255,0.3); border-top-color: white;"></div>
      Processing...
    `;
  } else {
    button.disabled = false;
    button.innerHTML = button.dataset.originalText;
  }
}

// Check if user is logged in (for protected pages)
function checkAuth() {
  const user = sessionStorage.getItem('cvAnalyzerUser');
  if (!user) {
    // Redirect to login if not authenticated
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('signup.html')) {
      window.location.href = 'login.html';
    }
  }
}

// Run auth check on page load (optional - can be enabled for protected routes)
// checkAuth();
