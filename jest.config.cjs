

module.exports = {
    preset: 'jest-expo',
    transform: {
        "^.+\\.(js?)$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(@react-native|react-native|react-native-vector-icons)/)"
    ]


};
