# Dinner Menu Recommender

## Overview

This project is a simple, mobile-responsive Dinner Menu Recommender. It randomly selects a dinner menu from a predefined list and displays it along with a matching image. The application is built with vanilla HTML, CSS, and JavaScript.

## Features

*   **Random Menu Recommendation:** Randomly selects one dinner menu from a diverse list (Korean, Chinese, Western, etc.).
*   **Visual Display:** Displays a high-quality image corresponding to the recommended menu.
*   **Mobile Responsive:** The layout adapts seamlessly to mobile screens.
*   **Dark Mode:** Supports Light and Dark themes with a toggle button and system preference detection.
*   **Real-time Clock:** Displays the current date and time.

## Project Structure

*   `public/index.html`: The main entry point. Links to external CSS and JS.
*   `public/style.css`: Styles for the application, including responsive design and dark mode variables.
*   `public/main.js`: Logic for recommending menus, handling images, and theme toggling.
*   `wrangler.jsonc`: Cloudflare configuration for deploying the `public` directory.

## Deployment

The project is configured for deployment (e.g., Cloudflare Pages) pointing to the `public` directory.