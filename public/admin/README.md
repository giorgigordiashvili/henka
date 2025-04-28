# Henka Content Management System

This folder contains the Decap CMS (formerly Netlify CMS) setup for the Henka website. The CMS allows non-technical users to edit content on the website without having to modify code.

## How to Access

1. Navigate to `/admin/` on your website.
2. Log in using the Netlify Identity service.

## Content Structure

The CMS is configured to manage the following content:

### Pages

- **Home Page**: Manage hero section, about section, products, and "Where To Buy" section.

### Settings

- **Navigation**: Manage menu items in the header.
- **Footer**: Manage copyright text and social media links.

## Multilingual Support

This CMS supports content in three languages:

- English (en)
- Georgian (ge)
- Russian (ru)

Content can be edited for each language individually.

## Media Management

Images can be uploaded through the CMS and will be stored in the `/public/assets/uploads/` directory.

## Technical Details

- The CMS uses Decap CMS v3.0.0
- Authentication is handled by Netlify Identity
- Content is stored as JSON files in the `/public/content/` directory
- The site is built using Next.js and styled-components
