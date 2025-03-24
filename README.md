# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# React Vite Front-End Project

This project is a React front-end application built with Vite for fast development and optimized builds. It includes linting configurations for ESLint and Stylelint following Wikimedia coding standards.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Setup Instructions](#setup-instructions)
   - [Frontend Setup](#frontend-setup)
   - [ESLint Configuration](#eslint-configuration)
   - [Stylelint Configuration](#stylelint-configuration)
5. [Development Guidelines](#development-guidelines)
6. [Contributing](#contributing)
7. [License](#license)

---

## Project Overview

This is a React-based front-end project designed for building scalable and maintainable user interfaces. The project leverages the following:

- **Vite**: For a fast and modern build process.
- **ESLint**: To ensure consistent JavaScript code quality.
- **Stylelint**: To maintain CSS coding standards.

---

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Version 14 or above
Node.js: Download and install from [Node.js official site](https://nodejs.org/en). 
Verify installation by running:
```bash
  node -v
```
- **npm**: Version 6 or above (comes with Node.js) Check the version with:
```bash
  npm -v
```

---

## Installation

To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

---

## Setup Instructions

### Frontend Setup

1. Start the development server:

```bash
npm run dev
```

2. Build the project for production:

```bash
npm run build
```

3. Preview the production build:

```bash
npm run preview
```

### ESLint Configuration

This project uses the Wikimedia ESLint configurations to enforce coding standards.

#### Installation

- Install the Wikimedia ESLint configuration package:

```bash
npm install --save-dev eslint-config-wikimedia
```

#### Configuration

Add a .eslintrc.json file to the root directory of your project. Below are examples of different configurations:

- For ES6 code:

```json
{
  "extends": "wikimedia/client/es6"
}
```

- For ES5 code:

```json
{
  "extends": "wikimedia/client/es5"
}
```

Additional Configurations:

- jQuery Support:

```json
{
  "extends": [
    "wikimedia/client/es6",
    "wikimedia/jquery"
  ]
}
```

- MediaWiki Support:

```json
{
  "extends": [
    "wikimedia/client/es6",
    "wikimedia/mediawiki"
  ]
}
```

- QUnit Test Suite:

```json
{
  "extends": [
    "wikimedia/mediawiki/qunit"
  ]
}
```

- Mocha Test Suite:

```json
{
  "root": true,
  "extends": [
    "wikimedia/server",
    "wikimedia/mocha"
  ]
}
```

- Selenium WDIO Test Suite:

```json
{
  "root": true,
  "extends": [
    "wikimedia/selenium"
  ]
}
```

- Typical Node Project:

```json
{
  "extends": "wikimedia/server"
}
```

### Stylelint Configuration

The project uses Wikimedia's Stylelint configurations for CSS.

#### Installation

- Install the Stylelint configuration package:

```bash
npm install -D stylelint-config-wikimedia
```

#### Configuration

Add a .stylelintrc.json file to the root directory of your project. Below are examples of different configurations:

- Basic Setup:

```json
{
  "extends": "stylelint-config-wikimedia"
}
```

- Modern Browser Support:

```json
{
  "extends": "stylelint-config-wikimedia/support-modern"
}
```

- MediaWiki Environment:

```json
{
  "extends": [
    "stylelint-config-wikimedia",
    "stylelint-config-wikimedia/mediawiki"
  ]
}
```

- Combine with Browser Support:

```json
{
  "extends": [
    "stylelint-config-wikimedia/support-modern",
    "stylelint-config-wikimedia/mediawiki"
  ]
}
```

- Override Rules:

```json
{
  "extends": "stylelint-config-wikimedia/support-basic",
  "rules": {
    "@stylistic/max-empty-lines": null
  }
}
```

Running Linting Tools

- To run ESLint:

```bash
npm run lint
```

- To run Stylelint:

```bash
npm run stylelint
```

---

## Development Guidelines

- Write clean and consistent code following the linting rules.
- Follow React best practices for component-based development.
- Commit frequently with meaningful messages.
