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
- JDK 17

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
npm install
npm install expo@50
npm install @expo/metro-runtime@3.1.3
npm install expo-camera@14.1.3
npm install expo-font@11.10.3
npm install expo-status-bar@1.11.1
npm install expo-system-ui@2.9.4
npm install lottie-react-native@6.5.1
npm install react-native@0.73.6
npm install react-native-reanimated@3.6.2
npm install react-native-safe-area-context@4.8.2
npm install react-native-screens@3.29.0
npm install react-native-webview@13.6.4
npm install @reactvision/react-viro
npm i react-native-gesture-handler //repaire gesture-handler
npx expo run:android
```
