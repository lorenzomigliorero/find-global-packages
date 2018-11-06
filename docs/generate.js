const { writeFile } = require('fs');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');

const pkg = require('../package.json');

const docs = jsdoc2md.renderSync({ files: path.resolve(__dirname, '../index.js') });

writeFile(path.resolve(__dirname, '../README.md'), `
# ${pkg.name}
${pkg.description}
${docs}
`.trim(), () => {});
