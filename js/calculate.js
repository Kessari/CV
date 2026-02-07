/**
 * ============================================
 * CV Analyzer - Calculate Page JavaScript
 * ============================================
 * Handles the compatibility calculation process
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculateBtn');
  const calculatingState = document.getElementById('calculatingState');
  const ctaContainer = document.getElementById('ctaContainer');
  const viewResultsBtn = document.getElementById('viewResultsBtn');
  
  calculateBtn?.addEventListener('click', () => {
    // Hide CTA, show loading
    ctaContainer.classList.add('hidden');
    calculatingState.classList.remove('hidden');
    
    // Simulate calculation process
    simulateCalculation();
  });
  
  function simulateCalculation() {
    // Get stored data
    const fileData = JSON.parse(sessionStorage.getItem('cvAnalyzerFile') || '{}');
    const jobData = JSON.parse(sessionStorage.getItem('cvAnalyzerJob') || '{}');
    const formData = JSON.parse(sessionStorage.getItem('cvAnalyzerFormData') || '{}');
    
    // Simulate processing steps
    const steps = [
      'Analyzing skills...',
      'Evaluating experience...',
      'Checking industry fit...',
      'Calculating seniority match...',
      'Generating recommendations...'
    ];
    
    let stepIndex = 0;
    const loadingText = calculatingState.querySelector('p.text-secondary');
    
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        loadingText.textContent = steps[stepIndex];
        stepIndex++;
      }
    }, 600);
    
    // Complete calculation
    setTimeout(() => {
      clearInterval(stepInterval);
      
      // Generate results
      const results = generateResults();
      
      // Store results
      sessionStorage.setItem('cvAnalyzerResults', JSON.stringify(results));
      
      // Show view results button
      calculatingState.classList.add('hidden');
      viewResultsBtn.classList.remove('hidden');
      viewResultsBtn.classList.add('fade-in');
      
    }, 3500);
  }
  
  function generateResults() {
    // Simulate result generation based on profile
    // In a real app, this would come from backend analysis
    
    const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'];
    const missingKeywords = ['TypeScript', 'GraphQL', 'Jest', 'CI/CD', 'Docker', 'Agile'];
    
    return {
      overallScore: 75,
      status: 'Good Match',
      breakdown: {
        skillsMatch: 85,
        experience: 80,
        industryFit: 70,
        seniority: 65
      },
      missingKeywords: missingKeywords,
      suggestions: [
        'Add specific metrics to your experience (e.g., "Increased performance by 40%")',
        'Include TypeScript experience - mentioned in 85% of Frontend Developer jobs',
        'Add a link to your GitHub portfolio or personal projects',
        'Mention testing frameworks you\'re familiar with (Jest, Cypress, etc.)'
      ],
      recommendedJobs: [
        { title: 'React Developer', company: 'TechStart Inc.', match: 92 },
        { title: 'Full Stack Developer', company: 'InnovateCo', match: 88 },
        { title: 'JavaScript Engineer', company: 'Digital Solutions Ltd', match: 85 }
      ]
    };
  }
});
