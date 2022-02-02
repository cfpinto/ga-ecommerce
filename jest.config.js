/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'd.ts', 'ts', 'tsx', 'json', 'node'],
  coverageReporters: ['clover'],
};
