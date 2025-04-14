// Use dynamic import to handle ES Module compatibility
const handler = async (event, context) => {
  // Re-export the handler from update-content.js
  const updateContent = await import('./update-content.js')
  return updateContent.handler(event, context)
}

exports.handler = handler
