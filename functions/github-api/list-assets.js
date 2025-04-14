import { Octokit } from '@octokit/rest'
import 'dotenv/config'

// Environment variables
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME

exports.handler = async function (event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  }

  // Handle OPTIONS request (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
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
    // Parse query string parameters
    const folderPath = event.queryStringParameters?.folder || 'public/assets'

    // Initialize Octokit
    const octokit = new Octokit({
      auth: GITHUB_ACCESS_TOKEN
    })

    // Get the folder contents
    const response = await octokit.repos.getContent({
      owner: GITHUB_REPO_OWNER,
      repo: GITHUB_REPO_NAME,
      path: folderPath
    })

    // Filter and extract only image files
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg']
    const imageFiles = Array.isArray(response.data)
      ? response.data
          .filter((file) => {
            const fileExt = file.name
              .substring(file.name.lastIndexOf('.'))
              .toLowerCase()
            return file.type === 'file' && imageExtensions.includes(fileExt)
          })
          .map((file) => ({
            name: file.name,
            path: file.path,
            url: file.download_url,
            size: file.size,
            sha: file.sha
          }))
      : []

    // Get subfolders
    const subfolders = Array.isArray(response.data)
      ? response.data
          .filter((item) => item.type === 'dir')
          .map((dir) => ({
            name: dir.name,
            path: dir.path
          }))
      : []

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        images: imageFiles,
        folders: subfolders,
        currentPath: folderPath
      })
    }
  } catch (error) {
    console.error('Error listing assets:', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Error listing assets'
      })
    }
  }
}
