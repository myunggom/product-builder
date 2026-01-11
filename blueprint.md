# HEXACO Personality Test & Share

## Overview

This project is a web-based HEXACO personality assessment tool. It allows users to take a simplified HEXACO test, visualizes the results using a radar chart, and enables sharing the results with friends via a unique link (query parameters).

## Features

*   **HEXACO Assessment:** A simplified questionnaire covering the 6 dimensions:
    *   **H**onesty-Humility (정직-겸손성)
    *   **E**motionality (정서적 불안정성)
    *   **X** (e**X**traversion) (외향성)
    *   **A**greeableness (원만성)
    *   **C**onscientiousness (성실성)
    *   **O**penness to Experience (개방성)
*   **Visual Results:** Uses `Chart.js` to render a 6-axis radar chart of the user's personality profile.
*   **Shareability:** Results are encoded in the URL, allowing users to share their specific personality graph by simply copying the link.
*   **Responsive Design:** Fully optimized for mobile and desktop experiences.
*   **Dark Mode:** Automatic system-based dark mode support.

## Project Structure

*   `public/index.html`: Main entry point containing the survey UI and result view.
*   `public/style.css`: Styling for a clean, psychological-test-like atmosphere.
*   `public/main.js`: Logic for the multi-step survey, score calculation, chart rendering, and URL sharing.
*   `wrangler.jsonc`: Cloudflare Pages configuration.

## Deployment

Configured for **Cloudflare Pages** deployment with the build output directory set to `public`.

## Changelog

*   **2026-01-11**:
    *   **Bug Fix**: Restored the missing theme toggle button by correctly placing it inside the main navigation bar.
    *   **AdSense Compliance Update**: Added a global navigation bar (`.main-nav`) to `index.html` and `privacy.html`.
    *   **UI Polish**: Renamed "파일로 저장" to "이미지 저장". Integrated the theme toggle button into the main navigation bar for better accessibility and layout.
    *   **Style Update**: Updated `style.css` to support the fixed navigation bar and positioned the theme toggle button within it.
*   **2026-01-10**:
    *   Complete project reset.
    *   Implemented HEXACO quiz logic with 12 questions.
    *   Added Radar Chart visualization using Chart.js.
    *   Implemented URL-based result sharing mechanism.