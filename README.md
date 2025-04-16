# Henka Website with JAMstack Admin Dashboard

This is a Next.js project with a JAMstack admin dashboard for content management, deployed on Netlify.

## Features

- Next.js frontend with i18n support (Georgian, English, Russian)
- JAMstack admin dashboard for content management
- Netlify Identity for authentication
- Serverless functions to commit changes to GitHub
- Image upload capability
- Multi-language content management

## Admin Dashboard

The admin dashboard allows you to:

- Edit website content for all languages
- Upload and manage images
- Import/export language files
- All changes are committed directly to GitHub

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin dashboard.

## Deployment on Netlify

1. Fork or clone this repository to your GitHub account
2. Create a new site on Netlify connecting to your GitHub repository
3. Configure the following environment variables in Netlify:
   - `GITHUB_ACCESS_TOKEN`: A GitHub personal access token with repo permissions
   - `GITHUB_REPO_OWNER`: Your GitHub username or organization
   - `GITHUB_REPO_NAME`: The name of your repository

### Setting up Netlify Identity

1. Enable Netlify Identity in your site settings
2. Set registration to invite-only for security
3. Invite admin users via email

## Content Structure

- Content is stored in JSON files in the `dictionaries` folder
- Images are stored in the `public/assets` folder
- All content changes through the admin dashboard are automatically committed to GitHub

## Authentication

The admin dashboard uses Netlify Identity for authentication. Only authorized users can access the dashboard and make changes.
