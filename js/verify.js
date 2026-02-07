/**
 * ============================================
 * CV Analyzer - Verification Page JavaScript
 * ============================================
 * Handles CV data verification and job selection
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
  // Skills management
  const skillsList = document.getElementById('skillsList');
  const addSkillBtn = document.getElementById('addSkillBtn');
  
  // Remove skill buttons
  skillsList?.addEventListener('click', (e) => {
    if (e.target.closest('.skill-remove')) {
      const badge = e.target.closest('.badge');
      badge.style.opacity = '0';
      badge.style.transform = 'scale(0.8)';
      setTimeout(() => badge.remove(), 200);
    }
  });
  
  // Add skill button
  addSkillBtn?.addEventListener('click', () => {
    const skill = prompt('Enter a skill:');
    if (skill && skill.trim()) {
      const badge = document.createElement('span');
      badge.className = 'badge badge--primary';
      badge.style.cssText = 'display: flex; align-items: center; gap: var(--space-2); animation: fadeIn 0.3s ease;';
      badge.innerHTML = `
        ${skill.trim()}
        <button type="button" class="skill-remove" style="background: none; border: none; cursor: pointer; padding: 0; display: flex;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      `;
      skillsList.appendChild(badge);
    }
  });
  
  // Job selection
  const jobSelect = document.getElementById('jobSelect');
  const jobDetails = document.getElementById('jobDetails');
  const jobRequirements = document.getElementById('jobRequirements');
  
  // Job requirements data
  const jobData = {
    'frontend-dev': [
      '3+ years of experience with React',
      'Strong JavaScript/TypeScript skills',
      'Experience with state management (Redux, MobX)',
      'Knowledge of CSS preprocessors',
      'Understanding of REST APIs'
    ],
    'backend-dev': [
      '3+ years of experience with Node.js or Python',
      'Experience with databases (SQL/NoSQL)',
      'Knowledge of microservices architecture',
      'Understanding of cloud platforms (AWS/GCP)',
      'Experience with Docker and Kubernetes'
    ],
    'fullstack-dev': [
      '4+ years of full-stack development experience',
      'Proficiency in React and Node.js',
      'Database design and management',
      'API development and integration',
      'DevOps and deployment experience'
    ],
    'devops-engineer': [
      '3+ years of DevOps experience',
      'Strong knowledge of AWS/Azure/GCP',
      'Experience with CI/CD pipelines',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'Container orchestration (Kubernetes)'
    ],
    'data-scientist': [
      'Masters or PhD in relevant field',
      'Experience with Python and R',
      'Machine learning and statistical modeling',
      'SQL and data visualization',
      'Big data technologies (Spark, Hadoop)'
    ],
    'product-manager': [
      '3+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with agile methodologies',
      'Excellent communication skills',
      'Technical background preferred'
    ],
    'ui-ux-designer': [
      'Portfolio demonstrating strong design skills',
      'Proficiency in Figma, Sketch, or Adobe XD',
      'Understanding of user-centered design',
      'Experience with design systems',
      'Knowledge of HTML/CSS basics'
    ],
    'software-architect': [
      '7+ years of software development experience',
      'Deep understanding of design patterns',
      'Experience with distributed systems',
      'Strong system design skills',
      'Leadership and mentoring experience'
    ]
  };
  
  jobSelect?.addEventListener('change', () => {
    const selectedJob = jobSelect.value;
    
    if (selectedJob && jobData[selectedJob]) {
      // Update requirements list
      jobRequirements.innerHTML = jobData[selectedJob]
        .map(req => `<li>${req}</li>`)
        .join('');
      
      // Show job details
      jobDetails.classList.remove('hidden');
      jobDetails.style.animation = 'fadeIn 0.3s ease';
      
      // Store selection
      sessionStorage.setItem('cvAnalyzerJob', JSON.stringify({
        id: selectedJob,
        title: jobSelect.options[jobSelect.selectedIndex].text
      }));
    } else {
      jobDetails.classList.add('hidden');
    }
  });
  
  // Load saved job selection if exists
  const savedJob = sessionStorage.getItem('cvAnalyzerJob');
  if (savedJob) {
    const job = JSON.parse(savedJob);
    jobSelect.value = job.id;
    jobSelect.dispatchEvent(new Event('change'));
  }
  
  // Form inputs - save on change
  const formInputs = document.querySelectorAll('.form-input');
  formInputs.forEach(input => {
    input.addEventListener('change', () => {
      saveFormData();
    });
  });
  
  // Save form data
  function saveFormData() {
    const formData = {
      fullName: document.getElementById('fullName')?.value,
      email: document.getElementById('email')?.value,
      phone: document.getElementById('phone')?.value,
      location: document.getElementById('location')?.value
    };
    sessionStorage.setItem('cvAnalyzerFormData', JSON.stringify(formData));
  }
  
  // Load saved form data
  const savedFormData = sessionStorage.getItem('cvAnalyzerFormData');
  if (savedFormData) {
    const data = JSON.parse(savedFormData);
    Object.keys(data).forEach(key => {
      const input = document.getElementById(key);
      if (input && data[key]) {
        input.value = data[key];
      }
    });
  }
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
