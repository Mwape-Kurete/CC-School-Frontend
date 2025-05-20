<template>
  <div class="upload-container">
    <div class="card">
      <!-- Toast Notification -->
      <div v-if="toast.visible" class="toast" :class="toast.severity">
        {{ toast.message }}
      </div>

      <!-- File Upload Component -->
      <div class="file-upload">
        <input 
          type="file" 
          ref="fileInput"
          @change="handleFileSelect" 
          multiple
          accept="image/*"
          style="display: none"
        >
        
        <!-- Header Section -->
        <div class="upload-header">
          <div class="button-group">
            <button @click="triggerFileInput" class="button secondary">
              <i class="icon">📁</i> Select Files
            </button>
            <button @click="uploadFiles" class="button success" :disabled="!files.length">
              <i class="icon">☁️</i> Upload
            </button>
            <button @click="clearFiles" class="button danger" :disabled="!files.length">
              <i class="icon">X </i> 
            </button>
          </div>
          
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div>
            <span class="progress-text">{{ totalSize }}B / 1MB</span>
          </div>
        </div>

        <!-- Content Section -->
        <div class="upload-content">
          <div v-if="files.length" class="file-section">
            <h5>Pending</h5>
            <div class="file-grid">
              <div v-for="(file, index) in files" :key="file.name + index" class="file-card">
                <img v-if="file.preview" :src="file.preview" width="100" height="50" class="file-preview">
                <div v-else class="file-icon">📄</div>
                <span class="file-name">{{ file.name }}</span>
                <div class="file-size">{{ formatSize(file.size) }}</div>
                <span class="badge warning">Pending</span>
                <button @click="removeFile(index)" class="button danger small">
                  <i class="icon">×</i>
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!files.length" class="empty-state">
            <div class="empty-icon"><img src="./assets/CC Blk logo.png" alt=""></div>
            <p>Drag and drop files here or click to browse</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [], // Stores all selected files
      uploadProgress: 0, // Tracks upload percentage (0-100)
      toast: {
        visible: false,
        message: '',
        severity: 'info' // Can be 'info', 'success', 'error'
      }
    }
  },
  computed: {
    totalSize() {
      return this.files.reduce((sum, file) => sum + file.size, 0) // calculates total size of files in bytes 
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileSelect(event) {
      const newFiles = Array.from(event.target.files).map(file => ({
        ...file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }))
      this.files = [...this.files, ...newFiles]
    },
    removeFile(index) {
      this.files.splice(index, 1)
    },
    clearFiles() {
      this.files = []
      this.uploadProgress = 0
    },
    async uploadFiles() {
      this.uploadProgress = 0
      const chunkSize = 1024 * 1024 // 1MB chunk size (simulate progress)
      
      try {
        // Simulate upload progress
        const interval = setInterval(() => {
          this.uploadProgress += 10
          if (this.uploadProgress >= 100) {
            clearInterval(interval)
            this.showToast('Files uploaded successfully!', 'success')
            // In a real app, we need to process the files here
            console.log('Files to upload:', this.files)
          }
        }, 300)
        
      } catch (error) {
        this.showToast('Upload failed', 'error')
        console.error('Upload error:', error)
      }
    },
    formatSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    showToast(message, severity = 'info') {
      this.toast = { visible: true, message, severity }
      setTimeout(() => {
        this.toast.visible = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');

/* Base Styles */ 
.upload-container {
  max-width: 60vw;
  margin: 2rem auto;
  font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-weight:300;
  
}


.card {
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

/* Toast Notification */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 4px;
  color: white;
  animation: fadeIn 0.3s;
  z-index: 1000;
}

.toast.info {
  background: #212121; /* blue */
}

.toast.success {
  background: #D0DFCC; /* green */
}

.toast.error {
  background: #EF4444; /* red */
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Upload Header */
.upload-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  
}

.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
 font-family: "Quicksand", sans-serif;
  font-optical-sizing: auto;
  font-weight:300;
  transition: all 0.2s;
}

.button:hover {
  filter: brightness(0.95);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button.secondary {
  border-color: #6B7280;
  color: #4B5563;
}

.button.secondary:hover {
  background-color: #212121;
  color: white;
}

.button.success {
  background: white;
  color: #212121;
  border-color: #D0DFCC;
}

.button.success:hover {
  background-color: #D0DFCC;
  color: #212121;
}

.button.danger {
  background: white;
  color: #212121;
  border-color: #F0F1A5;
}

.button.danger:hover {
  background-color: #F0F1A5;
  color: #212121;
}

.button.small {
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Progress Bar */
.progress-container {
  flex-grow: 1;
  max-width: 300px;
  background: #E5E7EB;
  border-radius: 4px;
  height: 6px;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: #D0DFCC;
  border-radius: 4px;
  transition: width 0.3s;
}

.progress-text {
  position: absolute;
  right: 0;
  top: 10px;
  font-size: 0.75rem;
  white-space: nowrap;
}

/* File Grid */
.upload-content {
  margin-top: 1rem;
}

.file-section {
  margin-bottom: 1.5rem;
}

.file-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.file-card {
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 160px;
}

.file-preview {
  object-fit: cover;
  border-radius: 4px;
}

.file-icon {
  font-size: 2rem;
}

.file-name {
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-align: center;
  font-size: 0.875rem;
}

.file-size {
  font-size: 0.75rem;
  color: #6B7280;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.warning {
  border-color: #212121;
  background: white;
  color: #212121;
}

.badge.warning:hover{
  background-color: #FEF3C7;
  color: #212121;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #6B7280;
}

.empty-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.empty-icon img {
  width: 80px;        /* Default size */
  height: auto;
  max-width: 100%;
}

/* Adjust for different screen sizes */
@media (min-width: 768px) {
  .empty-icon img {
    width: 100px;     /* Slightly larger on bigger screens */
  }
}

@media (max-width: 480px) {
  .empty-icon img {
    width: 60px;      /* Smaller on mobile */
  }
}

/* Responsive */
@media (max-width: 768px) {
  .upload-header {
    flex-direction: column;
  }
  
  .progress-container {
    width: 100%;
    max-width: 100%;
  }
}
</style>