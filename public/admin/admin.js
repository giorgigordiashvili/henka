// Admin dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginMessage = document.querySelector('.login-message')
  const dashboardContainer = document.querySelector('.dashboard-container')
  const languageSelector = document.getElementById('language')
  const sectionSelector = document.getElementById('section')
  const formFields = document.getElementById('form-fields')
  const saveContentBtn = document.getElementById('save-content')
  const sidebarLinks = document.querySelectorAll('.sidebar a')
  const panelSections = document.querySelectorAll('.panel-section')
  const toastNotification = document.getElementById('toast-notification')
  const imageUploadForm = document.getElementById('image-upload-form')
  const imageFileInput = document.getElementById('image-file')
  const previewContainer = document.getElementById('preview-container')
  const foldersContainer = document.getElementById('folders-container')
  const imagesGrid = document.getElementById('images-grid')
  const currentFolderPath = document.getElementById('current-folder-path')
  const parentFolderBtn = document.getElementById('parent-folder')

  // Language data cache
  const languageData = {
    en: null,
    ge: null,
    ru: null
  }

  // Current form data
  let currentFormData = {}

  // Current folder path
  let currentFolder = 'public/assets'

  // Netlify Identity Authentication
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on('init', (user) => {
      if (user) {
        // User is logged in, show dashboard
        showDashboard()
      }
    })

    window.netlifyIdentity.on('login', () => {
      showDashboard()
      window.netlifyIdentity.close()
    })

    window.netlifyIdentity.on('logout', () => {
      // User logged out, hide dashboard
      hideDashboard()
    })
  }

  // Show dashboard content
  function showDashboard() {
    loginMessage.style.display = 'none'
    dashboardContainer.style.display = 'flex'
    // Load initial content
    loadLanguageData('en')
  }

  // Hide dashboard content
  function hideDashboard() {
    loginMessage.style.display = 'block'
    dashboardContainer.style.display = 'none'
  }

  // Navigation between dashboard sections
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault()

      // Remove active class from all links and sections
      sidebarLinks.forEach((l) => l.classList.remove('active'))
      panelSections.forEach((s) => s.classList.remove('active'))

      // Add active class to clicked link
      link.classList.add('active')

      // Show corresponding section
      const sectionId = link.getAttribute('data-section')
      document.getElementById(sectionId).classList.add('active')
    })
  })

  // Load language data from dictionaries
  async function loadLanguageData(language) {
    try {
      if (!languageData[language]) {
        const response = await fetch(`/dictionaries/${language}.json`)
        if (!response.ok)
          throw new Error(`Failed to load ${language} dictionary`)
        languageData[language] = await response.json()
      }

      // Update the form with the selected section
      updateFormFields()

      // Show success notification
      showToast(
        `${language.toUpperCase()} language data loaded successfully`,
        'success'
      )
    } catch (error) {
      console.error('Error loading language data:', error)
      showToast(`Error loading language data: ${error.message}`, 'error')
    }
  }

  // Update form fields based on selected language and section
  function updateFormFields() {
    const language = languageSelector.value
    const section = sectionSelector.value

    if (!languageData[language] || !languageData[language][section]) {
      formFields.innerHTML = '<p>No data available for this section</p>'
      return
    }

    const sectionData = languageData[language][section]
    formFields.innerHTML = '' // Clear previous fields

    // Create form fields for each property in the section
    createFormFields(sectionData, '')
  }

  // Recursively create form fields for nested objects
  function createFormFields(data, prefix) {
    for (const [key, value] of Object.entries(data)) {
      const fieldId = prefix ? `${prefix}-${key}` : key

      if (typeof value === 'object' && value !== null) {
        // Create a fieldset for nested objects
        const fieldset = document.createElement('fieldset')
        fieldset.className = 'form-fieldset'

        const legend = document.createElement('legend')
        legend.textContent = key.charAt(0).toUpperCase() + key.slice(1)
        fieldset.appendChild(legend)

        formFields.appendChild(fieldset)

        // Recursively create fields for nested properties
        createFormFields(value, fieldId)
      } else {
        // Create input field for primitive values
        const formGroup = document.createElement('div')
        formGroup.className = 'form-group'

        const label = document.createElement('label')
        label.setAttribute('for', fieldId)
        label.textContent =
          key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')

        let input
        if (value && value.length > 80) {
          // Use textarea for longer text
          input = document.createElement('textarea')
        } else {
          // Use input for shorter text
          input = document.createElement('input')
          input.type = 'text'
        }

        input.id = fieldId
        input.name = fieldId
        input.value = value || ''
        input.setAttribute('data-path', prefix ? `${prefix}.${key}` : key)

        formGroup.appendChild(label)
        formGroup.appendChild(input)
        formFields.appendChild(formGroup)
      }
    }
  }

  // Save content changes
  async function saveContent() {
    const language = languageSelector.value
    const section = sectionSelector.value

    if (!languageData[language] || !languageData[language][section]) {
      showToast('No data available to save', 'error')
      return
    }

    // Gather form data
    const formInputs = formFields.querySelectorAll('input, textarea')
    const updatedData = { ...languageData[language] }

    formInputs.forEach((input) => {
      const path = input.getAttribute('data-path')
      const value = input.value

      if (path.includes('.')) {
        // Handle nested properties
        const pathParts = path.split('.')
        const lastPart = pathParts.pop()
        let current = updatedData

        // Navigate to the nested object
        for (const part of pathParts) {
          if (!current[part]) current[part] = {}
          current = current[part]
        }

        // Update the value
        current[lastPart] = value
      } else {
        // Update top-level property
        updatedData[section][path] = value
      }
    })

    try {
      // Save to GitHub via serverless function
      const response = await fetch(
        '/.netlify/functions/github-api/update-content',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filePath: `dictionaries/${language}.json`,
            content: JSON.stringify(updatedData, null, 2),
            commitMessage: `Update ${language} content for ${section} section`
          })
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save content')
      }

      // Update cache
      languageData[language] = updatedData

      // Show success message
      showToast('Content saved successfully!', 'success')
    } catch (error) {
      console.error('Error saving content:', error)
      showToast(`Error saving content: ${error.message}`, 'error')
    }
  }

  // Handle image upload
  async function handleImageUpload(e) {
    e.preventDefault()

    const imageFile = imageFileInput.files[0]
    if (!imageFile) {
      showToast('Please select an image file', 'warning')
      return
    }

    const imagePath = document.getElementById('image-path').value
    const imageName =
      document.getElementById('image-name').value ||
      imageFile.name.split('.')[0]
    const fileExtension = imageFile.name.split('.').pop()
    const fileName = `${imageName}.${fileExtension}`

    try {
      // Convert image to base64
      const base64Image = await fileToBase64(imageFile)
      const base64Data = base64Image.split(',')[1] // Remove the data URL prefix

      // Save image to GitHub via serverless function
      const response = await fetch(
        '/.netlify/functions/github-api/update-content',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filePath: `public/${imagePath}/${fileName}`,
            imageBase64: base64Data,
            fileName: fileName,
            commitMessage: `Upload image: ${fileName}`
          })
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to upload image')
      }

      // Show success message
      showToast('Image uploaded successfully!', 'success')

      // Clear form
      imageUploadForm.reset()
      previewContainer.innerHTML = ''
    } catch (error) {
      console.error('Error uploading image:', error)
      showToast(`Error uploading image: ${error.message}`, 'error')
    }
  }

  // Convert file to base64
  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  // Show image preview
  function showImagePreview(file) {
    if (!file) {
      previewContainer.innerHTML = ''
      return
    }

    const reader = new FileReader()
    reader.onload = function (e) {
      previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview">`
    }
    reader.readAsDataURL(file)
  }

  // Show toast notification
  function showToast(message, type = 'info') {
    const toast = document.getElementById('toast-notification')
    const toastContent = toast.querySelector('.toast-content')

    // Set message and type
    toastContent.textContent = message
    toast.className = 'toast show'
    toast.classList.add(type)

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show')
    }, 3000)
  }

  // Load assets from GitHub repository
  async function loadAssets(folderPath = 'public/assets') {
    try {
      foldersContainer.innerHTML =
        '<div class="loading">Loading folders...</div>'
      imagesGrid.innerHTML = '<div class="loading">Loading images...</div>'

      const response = await fetch(
        `/.netlify/functions/github-api/list-assets?folder=${encodeURIComponent(
          folderPath
        )}`
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to load assets')
      }

      const data = await response.json()

      // Update current folder path
      currentFolder = data.currentPath
      currentFolderPath.textContent = currentFolder

      // Display folders
      if (data.folders && data.folders.length > 0) {
        foldersContainer.innerHTML = ''
        data.folders.forEach((folder) => {
          const folderItem = document.createElement('div')
          folderItem.className = 'folder-item'
          folderItem.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" fill="#5c0e15" stroke="#5c0e15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${folder.name}</span>
          `
          folderItem.addEventListener('click', () => loadAssets(folder.path))
          foldersContainer.appendChild(folderItem)
        })
      } else {
        foldersContainer.innerHTML = '<div>No subfolders found</div>'
      }

      // Display images
      if (data.images && data.images.length > 0) {
        imagesGrid.innerHTML = ''
        data.images.forEach((image) => {
          const imageItem = document.createElement('div')
          imageItem.className = 'image-item'
          imageItem.innerHTML = `
            <img src="${image.url}" alt="${image.name}" loading="lazy">
            <div class="image-info">
              <div class="image-name">${image.name}</div>
              <div class="image-actions">
                <button class="copy-path" data-path="/${image.path.replace(
                  'public/',
                  ''
                )}">Copy Path</button>
              </div>
            </div>
          `

          // Add event listener to copy path button
          imageItem
            .querySelector('.copy-path')
            .addEventListener('click', (e) => {
              const path = e.target.getAttribute('data-path')
              navigator.clipboard
                .writeText(path)
                .then(() => {
                  showToast('Path copied to clipboard!', 'success')
                })
                .catch((err) => {
                  console.error('Error copying path:', err)
                  showToast('Failed to copy path', 'error')
                })
            })

          imagesGrid.appendChild(imageItem)
        })
      } else {
        imagesGrid.innerHTML = '<div>No images found in this folder</div>'
      }
    } catch (error) {
      console.error('Error loading assets:', error)
      foldersContainer.innerHTML = `<div>Error loading folders: ${error.message}</div>`
      imagesGrid.innerHTML = `<div>Error loading images: ${error.message}</div>`
      showToast(`Error loading assets: ${error.message}`, 'error')
    }
  }

  // Go to parent folder
  function goToParentFolder() {
    if (currentFolder === 'public/assets') {
      showToast('Already at the root assets folder', 'warning')
      return
    }

    const pathParts = currentFolder.split('/')
    pathParts.pop() // Remove the last part
    const parentPath = pathParts.join('/')

    loadAssets(parentPath)
  }

  // Event listener for parent folder button
  parentFolderBtn.addEventListener('click', goToParentFolder)

  // Load assets when image manager is activated
  sidebarLinks.forEach((link) => {
    if (link.getAttribute('data-section') === 'image-manager') {
      link.addEventListener('click', () => {
        loadAssets()
      })
    }
  })

  // Event Listeners

  // Language selection change
  languageSelector.addEventListener('change', () => {
    const language = languageSelector.value
    loadLanguageData(language)
  })

  // Section selection change
  sectionSelector.addEventListener('change', updateFormFields)

  // Save content button
  saveContentBtn.addEventListener('click', saveContent)

  // Image file selection
  imageFileInput.addEventListener('change', () => {
    showImagePreview(imageFileInput.files[0])
  })

  // Image upload form
  imageUploadForm.addEventListener('submit', handleImageUpload)

  // Export language data
  document
    .getElementById('export-en')
    .addEventListener('click', () => exportLanguage('en'))
  document
    .getElementById('export-ge')
    .addEventListener('click', () => exportLanguage('ge'))
  document
    .getElementById('export-ru')
    .addEventListener('click', () => exportLanguage('ru'))

  // Import language data
  document
    .getElementById('import-file')
    .addEventListener('click', importLanguage)

  // Export language data to JSON
  function exportLanguage(lang) {
    if (!languageData[lang]) {
      showToast(`${lang.toUpperCase()} language data not loaded yet`, 'warning')
      return
    }

    const dataStr = JSON.stringify(languageData[lang], null, 2)
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportLink = document.createElement('a')
    exportLink.setAttribute('href', dataUri)
    exportLink.setAttribute('download', `${lang}.json`)
    document.body.appendChild(exportLink)
    exportLink.click()
    document.body.removeChild(exportLink)
  }

  // Import language data from JSON
  async function importLanguage() {
    const importLang = document.getElementById('import-language').value
    const importContent = document.getElementById('import-content').value

    if (!importContent) {
      showToast('Please paste JSON content to import', 'warning')
      return
    }

    try {
      // Parse the JSON to validate
      const parsedData = JSON.parse(importContent)

      // Save to GitHub via serverless function
      const response = await fetch(
        '/.netlify/functions/github-api/update-content',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            filePath: `dictionaries/${importLang}.json`,
            content: JSON.stringify(parsedData, null, 2),
            commitMessage: `Update ${importLang} language file via import`
          })
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to import language data')
      }

      // Update cache
      languageData[importLang] = parsedData

      // Show success message
      showToast(
        `${importLang.toUpperCase()} language data imported successfully`,
        'success'
      )

      // Clear import area
      document.getElementById('import-content').value = ''

      // Refresh form if current language matches imported language
      if (languageSelector.value === importLang) {
        updateFormFields()
      }
    } catch (error) {
      console.error('Error importing language data:', error)
      showToast(`Error importing language data: ${error.message}`, 'error')
    }
  }
})
