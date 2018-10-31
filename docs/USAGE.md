## Usage
```
const {
    getGlobalDir,
    getGlobalPackagePath,
    getGlobalPackages,
    getGlobalPackages,
} = require('get-global-packages');

const globalDir = getGlobalDir({ client: 'npm' });
// /Users/foo/.nvm/versions/node/v8.11.1/lib

const globalPackagePath = getGlobalDir({ name: 'npm-packlist-cli' });
/Users/lmigliorero/.config/yarn/global/node_modules/npm-packlist-cli

const globalPackages = getGlobalPackages();
// ['react', 'react-router', 'vue', 'lodash', '@myscope/react-utils']

const scopedGlobalPackages = getGlobalPackages({
    client: 'npm',
    filter: name => name.includes('react'),
});
// ['react', 'react-router', '@myscope/react-utils']
```