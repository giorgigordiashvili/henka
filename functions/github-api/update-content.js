let Octokit
require('dotenv').config()

// Environment variables
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME

exports.handler = async function (event, context) {
  // Dynamically import Octokit at runtime
  try {
    const { Octokit: OctokitImport } = await import('@octokit/rest')
    Octokit = OctokitImport
  } catch (error) {
    console.error('Error importing Octokit:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify({ error: 'Failed to initialize GitHub API client' })
    }
  }

  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  }

  // Handle OPTIONS request (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    }
  }

  // Check HTTP method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method not allowed. Only POST requests are supported.'
      })
    }
  }

  // Check if required environment variables are set
  if (!GITHUB_ACCESS_TOKEN || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Missing GitHub environment variables' })
    }
  }

  try {
    // Parse request body
    let payload
    try {
      payload = JSON.parse(event.body)
    } catch (e) {
      console.error('Error parsing JSON body:', e)
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' })
      }
    }

    const { filePath, content, commitMessage, imageBase64, fileName } = payload

    if (!filePath) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing filePath parameter' })
      }
    }

    // Initialize Octokit
    const octokit = new Octokit({
      auth: GITHUB_ACCESS_TOKEN
    })

    let sha
    let existingFile

    // Try to get the existing file to get its SHA
    try {
      existingFile = await octokit.repos.getContent({
        owner: GITHUB_REPO_OWNER,
        repo: GITHUB_REPO_NAME,
        path: filePath
      })

      if (existingFile.data && existingFile.data.sha) {
        sha = existingFile.data.sha
      }
    } catch (error) {
      // File doesn't exist yet, which is fine for new files
      console.log(`File doesn't exist yet: ${filePath}`)
    }

    // Determine content to upload
    let contentToUpload
    let contentType

    if (imageBase64) {
      // This is an image upload
      contentToUpload = imageBase64
      contentType = 'base64'
    } else if (content) {
      // This is a text content update
      contentToUpload = Buffer.from(content).toString('base64')
      contentType = 'base64'
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing content or imageBase64 parameter'
        })
      }
    }

    // Create or update file
    const response = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      path: filePath,
      message: commitMessage || `Update ${filePath}`,
      content: contentToUpload,
      sha: sha,
      committer: {
        name: 'Henka Admin Dashboard',
        email: 'admin-dashboard@example.com'
      }
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'File updated successfully',
        data: response.data
      })
    }
  } catch (error) {
    console.error('Error updating content:', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Error updating content'
      })
    }
  }
}
