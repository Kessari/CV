/**
 * ============================================
 * CV Analyzer - Results Page JavaScript
 * ============================================
 * Handles results display and interactions
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load and display results
  loadResults();
  
  // Animate progress bars
  animateProgressBars();
  
  // Animate circular progress
  animateCircularProgress();
});

function loadResults() {
  const results = JSON.parse(sessionStorage.getItem('cvAnalyzerResults') || '{}');
  
  if (!results.overallScore) {
    // No results found, use default/demo data
    return;
  }
  
  // Update score
  const scoreText = document.querySelector('.circular-progress__text');
  if (scoreText) {
    scoreText.textContent = results.overallScore + '%';
  }
  
  // Update status
  const statusEl = document.querySelector('.score-card__status');
  if (statusEl) {
    statusEl.textContent = results.status;
    statusEl.className = 'score-card__status ' + getStatusClass(results.overallScore);
  }
  
  // Update breakdown
  if (results.breakdown) {
    updateBreakdown(results.breakdown);
  }
  
  // Update missing keywords
  if (results.missingKeywords) {
    updateMissingKeywords(results.missingKeywords);
  }
  
  // Update suggestions
  if (results.suggestions) {
    updateSuggestions(results.suggestions);
  }
  
  // Update recommended jobs
  if (results.recommendedJobs) {
    updateRecommendedJobs(results.recommendedJobs);
  }
}

function getStatusClass(score) {
  if (score >= 80) return 'score-card__status--excellent';
  if (score >= 60) return 'score-card__status--good';
  return 'score-card__status--needs-improvement';
}

function updateBreakdown(breakdown) {
  const items = document.querySelectorAll('.breakdown-item');
  const data = [
    { label: 'Skills Match', value: breakdown.skillsMatch },
    { label: 'Experience', value: breakdown.experience },
    { label: 'Industry Fit', value: breakdown.industryFit },
    { label: 'Seniority', value: breakdown.seniority }
  ];
  
  items.forEach((item, index) => {
    if (data[index]) {
      const valueEl = item.querySelector('.breakdown-item__value');
      const barEl = item.querySelector('.progress__bar');
      
      if (valueEl) valueEl.textContent = data[index].value + '%';
      if (barEl) barEl.style.width = data[index].value + '%';
    }
  });
}

function updateMissingKeywords(keywords) {
  const container = document.querySelector('.keywords-grid');
  if (!container) return;
  
  container.innerHTML = keywords.map(keyword => 
    `<span class="keyword-tag">${keyword}</span>`
  ).join('');
}

function updateSuggestions(suggestions) {
  const container = document.querySelector('.suggestions-list');
  if (!container) return;
  
  container.innerHTML = suggestions.map(suggestion => `
    <div class="suggestion-item">
      <svg class="suggestion-item__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <p class="suggestion-item__text">${suggestion}</p>
    </div>
  `).join('');
}

function updateRecommendedJobs(jobs) {
  const container = document.querySelector('.jobs-list');
  if (!container) return;
  
  container.innerHTML = jobs.map(job => `
    <div class="job-item">
      <div class="job-item__info">
        <span class="job-item__title">${job.title}</span>
        <span class="job-item__company">${job.company}</span>
      </div>
      <span class="job-item__match">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${job.match}% Match
      </span>
    </div>
  `).join('');
}

function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress__bar');
  
  progressBars.forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 300);
  });
}

function animateCircularProgress() {
  const circle = document.querySelector('.circular-progress__fill');
  if (!circle) return;
  
  const circumference = 2 * Math.PI * 45; // r = 45
  const score = parseInt(document.querySelector('.circular-progress__text')?.textContent || '75');
  const offset = circumference - (score / 100) * circumference;
  
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
  
  setTimeout(() => {
    circle.style.strokeDashoffset = offset;
  }, 300);
}

// Export results functionality
function exportResults() {
  const results = JSON.parse(sessionStorage.getItem('cvAnalyzerResults') || '{}');
  
  // Create a simple text report
  const report = `
CV Analyzer Report
==================

Overall Score: ${results.overallScore || 75}%
Status: ${results.status || 'Good Match'}

Breakdown:
- Skills Match: ${results.breakdown?.skillsMatch || 85}%
- Experience: ${results.breakdown?.experience || 80}%
- Industry Fit: ${results.breakdown?.industryFit || 70}%
- Seniority: ${results.breakdown?.seniority || 65}%

Missing Keywords:
${(results.missingKeywords || ['TypeScript', 'GraphQL', 'Jest']).join(', ')}

Generated on: ${new Date().toLocaleDateString()}
  `.trim();
  
  // Create download
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cv-analysis-report.txt';
  a.click();
  URL.revokeObjectURL(url);
}
