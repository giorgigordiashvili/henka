// Use dynamic import to handle ES Module compatibility
const handler = async (event, context) => {
  // Extract the path from the event
  const path = event.path

  // Route to the appropriate handler based on the path
  if (path.includes('/list-assets')) {
    const listAssets = await import('./list-assets.js')
    return listAssets.handler(event, context)
  } else if (path.includes('/health')) {
    const health = await import('./health.js')
    return health.handler(event, context)
  } else {
    // Default to update-content for backward compatibility
    const updateContent = await import('./update-content.js')
    return updateContent.handler(event, context)
  }
}

exports.handler = handler
