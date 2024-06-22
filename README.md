# AI-AR-Enhanced-Document
2023-2024 Computer Science MSc Summer Project
## Development Documentation: EasyDoc Application

### Table of Contents

1. Project Overview
2. Environment Setup
3. Project Structure
4. Feature Implementation
5. Running the Project
6. Theme Toggle Functionality
7. Related Links

### 1. Project Overview

EasyDoc is a React Native application developed using Expo. The application features a homepage, camera page, chat page, and settings page. Users can toggle the application theme (light mode and dark mode) from the settings page.

### 2. Environment Setup

Before starting development, ensure your development environment is properly set up. You will need the following tools:

- Node.js
- npm or yarn
- Expo CLI

### 3. Project Structure

Below is the basic structure of the project:

```lua
EasyDoc/
├── components/
│   └── ThemeContext.js
├── src/
│   ├── CameraPage.js
│   ├── ChatPage.js
│   ├── HomePage.js
│   └── SetPage.js
├── App.js
├── app.json
├── babel.config.js
└── package.json

```

### 4. Feature Implementation

### 4.1 Creating `ThemeContext`

`ThemeContext` is used to manage and toggle the application theme (light mode and dark mode).

### 4.2 Setting up the App Entry

Set up navigation and the theme provider in `App.js`.

### 4.3 Implementing the Homepage

`HomePage` displays the main functionality entry points of the application.

### 4.4 Implementing the Settings Page

In `SetPage.js`, a button is added to toggle the theme.

### 5. Running the Project

To run the project, use the following command:

```lua
npm install react-native-paper @react-navigation/native @react-navigation/stack lottie-react-native lottie-ios@3.1.8
npm install webview@13.8.6
expo start
```
