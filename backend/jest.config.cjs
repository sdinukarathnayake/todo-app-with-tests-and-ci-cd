module.exports = {
    testEnvironment: 'node',
    transform: { '^.+\\.js$': 'babel-jest' },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}