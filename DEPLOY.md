# Deploying Your Henka Admin Dashboard

This guide will help you deploy your Henka website with the JAMstack admin dashboard to Netlify.

## Prerequisites

1. A GitHub account
2. A Netlify account
3. A personal access token from GitHub with `repo` permissions

## Step 1: Fork or Push the Repository

Either fork this repository to your GitHub account or push it to a new repository you own.

## Step 2: Configure Netlify

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select GitHub as your provider
4. Find and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Show advanced" and add the following environment variables:
   - `GITHUB_ACCESS_TOKEN`: Your GitHub personal access token
   - `GITHUB_REPO_OWNER`: Your GitHub username
   - `GITHUB_REPO_NAME`: The name of your repository
7. Click "Deploy site"

## Step 3: Enable Netlify Identity

1. Once your site is deployed, go to the Netlify dashboard
2. Navigate to "Site settings" > "Identity"
3. Click "Enable Identity"
4. Under "Registration preferences", select "Invite only" for security
5. Scroll down to "Services" and click "Edit settings" in the "Git Gateway" section
6. Enable Git Gateway to allow the admin dashboard to commit to your GitHub repository

## Step 4: Invite Admin Users

1. Go to "Identity" > "Invite users"
2. Enter the email address of each admin user
3. Click "Send" to send invitation emails

## Step 5: Access the Admin Dashboard

1. Once deployed, you can access the admin dashboard at: `https://your-site-name.netlify.app/admin`
2. Users will need to accept their invitation and set a password before they can log in

## Step 6: Test Functionality

After logging in, test the following functionalities:

1. Edit content in different languages
2. Upload images
3. Export/import language files

## Troubleshooting

### Serverless Functions Not Working

1. Check that your environment variables are correctly set in Netlify
2. Verify that your GitHub token has `repo` permissions
3. Check the Netlify function logs for more detailed error messages

### Authentication Issues

1. Make sure Netlify Identity is properly configured
2. Check that users have accepted their invitations
3. Try resetting passwords if needed

## Maintenance

- Regularly rotate your GitHub access token for security
- Monitor your Netlify usage to stay within the free tier limits or upgrade as needed
- Keep your dependencies updated with `npm update`
