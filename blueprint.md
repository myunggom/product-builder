# Lotto Number Generator

## Overview

This project is a simple, mobile-responsive Lotto Number Generator. It generates 6 unique random numbers between 1 and 45, similar to the Korean Lotto 6/45 format. The application is built with vanilla HTML, CSS, and JavaScript.

## Features

*   **Random Number Generation:** Generates 6 unique numbers from 1 to 45.
*   **Visual Display:** Numbers are displayed as colored balls, mimicking real lotto balls.
*   **Mobile Responsive:** The layout adapts seamlessly to mobile screens.
*   **Dark Mode:** Supports Light and Dark themes with a toggle button and system preference detection.
*   **Animation:** Simple animations for revealing numbers.

## Project Structure

*   `public/index.html`: The main entry point. Links to external CSS and JS.
*   `public/style.css`: Styles for the application, including responsive design, ball colors, and dark mode variables.
*   `public/main.js`: Logic for generating/sorting random numbers and handling theme toggling.
*   `wrangler.jsonc`: Cloudflare configuration for deploying the `public` directory.

## Changelog

*   **2026-01-10**:
    *   Refactored inline CSS and JS into `style.css` and `main.js`.
    *   Added Dark Mode feature with toggle button and localStorage persistence.
    *   Updated `index.html` structure.

## Deployment

The project is configured for deployment (e.g., Cloudflare Pages) pointing to the `public` directory.
