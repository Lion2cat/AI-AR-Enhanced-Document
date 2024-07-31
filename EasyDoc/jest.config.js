module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-reanimated|expo-font|@expo|expo-app-loading|expo-constants|expo-file-system|expo-font|expo-linking|expo-modules-core|expo-permissions|expo-secure-store|expo-splash-screen|expo-status-bar|expo-updates|expo-web-browser)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(ttf|otf|eot|svg|png|jpg|jpeg|html)$': '<rootDir>/__mocks__/htmlMock.js',
    '^expo-font$': '<rootDir>/__mocks__/expo-font.js',
  },
};
