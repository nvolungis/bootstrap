const { exec } = require("child_process");
var path = require('path');

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars


const perform = (cmd) => new Promise((resolve, reject) => {
  exec(`docker exec -t server ${cmd}`, (error, stdout, stderr) => {
    if (error || stderr) {
      reject(error)
    } else {
      console.log(stdout)
      resolve(stdout)
    }
  });
});

module.exports = (on, config) => {
  on('task', {
    'run': perform,
  });

  on('before:browser:launch', (browser, launchOptions) => {
    const extensionPath = path.resolve(__dirname, '../../urql-extension');
    launchOptions.extensions.push(extensionPath);
    launchOptions.args.push('--auto-open-devtools-for-tabs')
    return launchOptions;
  });
}
