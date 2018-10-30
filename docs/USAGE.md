## Usage
```
const {
    getGlobalDir,
    getGlobalPackages,
    getGlobalPackages,
} = require('get-global-packages');

const globalDir = getGlobalDir({ client 'npm' });
// /Users/foo/.nvm/versions/node/v8.11.1/lib

const globalPackages = getGlobalPackages();
// ['react', 'react-router', 'vue', 'lodash', '@myscope/react-utils']

const scopedGlobalPackages = getGlobalPackages({
    client: 'npm',
    filter: name => name.includes('react'),
});
// ['react', 'react-router', '@myscope/react-utils']
```