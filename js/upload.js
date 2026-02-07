/**
 * ============================================
 * CV Analyzer - Upload Page JavaScript
 * ============================================
 * Handles drag & drop file upload functionality
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('fileInput');
  const filePreview = document.getElementById('filePreview');
  const fileName = document.getElementById('fileName');
  const fileSize = document.getElementById('fileSize');
  const removeFileBtn = document.getElementById('removeFile');
  const continueBtn = document.getElementById('continueBtn');
  const uploadLoading = document.getElementById('uploadLoading');
  const uploadInfo = document.getElementById('uploadInfo');
  
  let selectedFile = null;
  
  // Click on upload zone triggers file input
  uploadZone.addEventListener('click', () => {
    fileInput.click();
  });
  
  // Keyboard accessibility
  uploadZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });
  
  // File input change
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  });
  
  // Drag and drop events
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('upload-zone--dragover');
  });
  
  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('upload-zone--dragover');
  });
  
  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('upload-zone--dragover');
    
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (isValidFileType(file)) {
        handleFile(file);
      } else {
        showError('Please upload a PDF, DOC, or DOCX file');
      }
    }
  });
  
  // Remove file button
  removeFileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetUpload();
  });
  
  // Continue button
  continueBtn.addEventListener('click', () => {
    if (selectedFile) {
      simulateUpload();
    }
  });
  
  // Handle selected file
  function handleFile(file) {
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      showError('File size must be less than 10MB');
      return;
    }
    
    // Validate file type
    if (!isValidFileType(file)) {
      showError('Please upload a PDF, DOC, or DOCX file');
      return;
    }
    
    selectedFile = file;
    
    // Update preview
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    
    // Show preview, hide upload zone
    uploadZone.classList.add('hidden');
    filePreview.classList.remove('hidden');
    continueBtn.disabled = false;
  }
  
  // Reset upload state
  function resetUpload() {
    selectedFile = null;
    fileInput.value = '';
    
    uploadZone.classList.remove('hidden');
    filePreview.classList.add('hidden');
    continueBtn.disabled = true;
    uploadLoading.classList.add('hidden');
    uploadInfo.classList.remove('hidden');
  }
  
  // Simulate upload process
  function simulateUpload() {
    // Hide preview and info, show loading
    filePreview.classList.add('hidden');
    uploadInfo.classList.add('hidden');
    uploadLoading.classList.remove('hidden');
    continueBtn.disabled = true;
    
    // Simulate processing time
    setTimeout(() => {
      // Store file info in session
      sessionStorage.setItem('cvAnalyzerFile', JSON.stringify({
        name: selectedFile.name,
        size: selectedFile.size,
        uploaded: true
      }));
      
      // Redirect to verification page
      window.location.href = 'verify.html';
    }, 2000);
  }
  
  // Validate file type
  function isValidFileType(file) {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return validTypes.includes(file.type) || 
           file.name.endsWith('.pdf') || 
           file.name.endsWith('.doc') || 
           file.name.endsWith('.docx');
  }
  
  // Show error message
  function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert--error';
    alert.style.marginTop = 'var(--space-4)';
    alert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      ${message}
    `;
    
    uploadZone.parentElement.appendChild(alert);
    
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }
  
  // Format file size
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
});
