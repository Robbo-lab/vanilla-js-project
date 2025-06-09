# Vanilla JS Landing Page

This is a high-performance, module-first landing page built with vanilla JavaScript and Bulma CSS. It showcases your projects using dynamic data rendering and client-side filtering, sorting, and modal interaction.

## Features

- ⚙️ Built with modern ES6 modules
- 🧩 Bulma CSS styling for responsive, minimal UI
- Displays 12 sample project cards from a flat JSON file
- Search filter and category filter
- Sort by name or date
- Modal popup for project details
- GitHub Actions workflow for deployment to GitHub Pages

## Getting Started

1. Clone the repository or download the ZIP.
2. Serve locally or deploy directly to GitHub Pages.

### Local Preview

You can use any static file server. For example:

```bash
npx serve .
```

or with Python:

```bash
python3 -m http.server
```

### GitHub Pages Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) is included. On every push to the `main` branch, it will automatically deploy to GitHub Pages.

Make sure GitHub Pages is enabled in your repository settings and set the source to `GitHub Actions`.

## File Structure

```
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── modules/
│       ├── dataLoader.js
│       ├── eventHandlers.js
│       └── uiRenderer.js
├── data/
│   └── projects.json
└── .github/
    └── workflows/
        └── deploy.yml
```

## License

This project is open-source and free to use.
