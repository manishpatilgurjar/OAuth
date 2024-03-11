module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    reporters: [
      "default",
      ["jest-junit", {
        "outputDirectory": "test-results/jest",
        "outputName": "results.xml"
      }]
    ]
    
  };
  