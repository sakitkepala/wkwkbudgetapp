const path = require('path');
const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: [path.join(__dirname, '/test-setup.js')],
};
