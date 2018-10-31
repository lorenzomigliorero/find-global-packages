const { writeFile, readFileSync } = require('fs');
const path = require('path');
const jsdoc2md = require('jsdoc-to-markdown');

const docs = jsdoc2md.renderSync({ files: path.resolve(__dirname, '../index.js') });
const header = readFileSync(path.resolve(__dirname, 'BANNER.md'));

writeFile(path.resolve(__dirname, '../README.md'), `
${header}
${docs}
`.trim(), () => {});
