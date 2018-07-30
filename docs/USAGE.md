## Usage
```
const { getGlobalPackages } = require('get-global-packages');

const yarnGlobalDir = getGlobalDir();
const yarnGlobalPackages = getGlobalDir();

const npmGlobalDir = getGlobalDir({ client 'npm' });
const npmGlobalPackages = getGlobalDir();
const npmScopedGlobalPackages = getGlobalDir({
    client: 'npm',
    scope: '@custom-scope',
    filter: name => name.includes('starter-kit'),
});
```