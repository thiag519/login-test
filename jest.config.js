const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  detectOpenHandles:true,
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
  /*transformIgnorePatterns: [
    "/node_modules/(?!uuid)/"
  ],*/
};