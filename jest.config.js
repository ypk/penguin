module.exports = {
    verbose: true,
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    automock: false,
    setupFiles: ["<rootDir>/src/___tests___/setupJest.js"]
  };